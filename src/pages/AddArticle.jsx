import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import PageHero from '../components/PageHero.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import CropperModal from '../components/CropperModal.jsx';
import RichTextEditor from '../components/RichTextEditor.jsx';
import { isAdmin, logoutAdmin } from '../admin/adminAuth';
import { invalidateArticles } from '../hooks/useArticles';
import {
    byteSize, generateUniqueSlug, processRichTextImages, sanitizeTitle,
    textLength, todayISO, uploadImage, collectCloudinaryUrls, deleteCloudinaryImages,
} from '../utils/articleUtils';

const MAX_TITLE = 150;
const MAX_EXCERPT = 300;
const MAX_CHARS = 900000;       // visible characters in the body
const MAX_IMAGES_MB = 5;       // pasted/embedded images in the editor
const MAX_COVER_MB = 2;
const MAX_HTML_BYTES = 900 * 1024; // Firestore docs are capped at 1 MB

const input = 'w-full border border-line bg-white p-3 text-[16px] outline-none focus:border-gold disabled:bg-paper disabled:text-muted';
const label = 'mb-1 block text-sm font-semibold text-navy';

export default function AddArticle() {
    const { slug: editSlug } = useParams();
    const isEdit = Boolean(editSlug);
    const navigate = useNavigate();

    const [authed, setAuthed] = useState(isAdmin());
    const [loadingDoc, setLoadingDoc] = useState(isEdit);
    const [notFound, setNotFound] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'error' | 'success', text }

    const [form, setForm] = useState({ title: '', tagName: '', date: todayISO(), excerpt: '', bodyHtml: '' });

    const [articleSlug, setArticleSlug] = useState('');

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onTitleChange = (e) => {
        const title = e.target.value;

        setForm((f) => ({ ...f, title }));
        setArticleSlug(sanitizeSlug(title));
    };

    // Cover image: new upload (cropped) / direct URL / existing (edit mode)
    const [coverMode, setCoverMode] = useState('upload');
    const [coverUrl, setCoverUrl] = useState('');
    const [coverBlob, setCoverBlob] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);   // data URL fed to the cropper
    const [coverThumb, setCoverThumb] = useState('');          // object URL of cropped result
    const [cropOpen, setCropOpen] = useState(false);
    const [existingImage, setExistingImage] = useState('');

    // Load article in edit mode
    useEffect(() => {
        if (!isEdit || !authed) return;
        let alive = true;
        (async () => {
            try {
                const snap = await getDoc(doc(db, 'articles', editSlug));
                if (!alive) return;
                if (!snap.exists()) { setNotFound(true); return; }
                const d = snap.data();
                setArticleSlug(editSlug);
                setForm({
                    title: d.title || '',
                    tagName: d.tagName || '',
                    date: d.date || todayISO(),
                    excerpt: d.excerpt || '',
                    bodyHtml: d.bodyHtml || '',
                });
                setExistingImage(d.image || '');
            } catch (err) {
                console.error(err);
                if (alive) setNotFound(true);
            } finally {
                if (alive) setLoadingDoc(false);
            }
        })();
        return () => { alive = false; };
    }, [isEdit, editSlug, authed]);

    useEffect(() => () => { if (coverThumb) URL.revokeObjectURL(coverThumb); }, [coverThumb]);

    const onCoverFile = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (!file.type.startsWith('image/')) return setMessage({ type: 'error', text: 'Please choose an image file.' });
        if (file.size > MAX_COVER_MB * 1024 * 1024) return setMessage({ type: 'error', text: `Cover image must be under ${MAX_COVER_MB} MB.` });
        const reader = new FileReader();
        reader.onload = () => { setCoverPreview(reader.result); setCropOpen(true); };
        reader.readAsDataURL(file);
    };

    const onCropped = (blob) => {
        setCoverBlob(blob);
        setCoverThumb(URL.createObjectURL(blob));
    };

    const sanitizeSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/\s+/g, '-')       // Replace multiple spaces with one hyphen
            .replace(/[^a-z0-9-]/g, '') // Allow only alphanumeric and hyphens
            .replace(/-{2,}/g, '-')     // Prevent consecutive hyphens
            .slice(0, 50);              // Maximum 50 characters
    };

    const validate = () => {
        if (!form.title.trim()) return 'Title is required.';
        if (form.title.length > MAX_TITLE) return `Title must be ${MAX_TITLE} characters or fewer.`;

        if (!articleSlug.trim()) return 'Article URL slug is required.';
        if (articleSlug.length > 50) return 'URL slug cannot exceed 50 characters.';
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(articleSlug)) {
            return 'Invalid URL slug. Use only letters, numbers and single hyphens.';
        }

        if (!form.tagName.trim()) return 'Category is required.';
        if (!form.date) return 'Date is required.';
        if (!form.excerpt.trim()) return 'Excerpt is required.';
        if (!form.bodyHtml.trim() || textLength(form.bodyHtml) === 0) return 'Article body is required.';
        if (textLength(form.bodyHtml) > MAX_CHARS) return `Body exceeds ${MAX_CHARS} characters.`;
        if (coverMode === 'url' && coverUrl && !/^https?:\/\/.+/i.test(coverUrl)) return 'Cover image URL must start with http:// or https://';
        return null;
    };

    const submit = async (e) => {
        e.preventDefault();
        setMessage(null);
        const err = validate();
        if (err) return setMessage({ type: 'error', text: err });

        setSaving(true);
        try {
            // 1. Cover image
            let image = existingImage;
            if (coverMode === 'upload' && coverBlob) image = await uploadImage(coverBlob, 'articles/covers');
            else if (coverMode === 'url' && coverUrl.trim()) image = coverUrl.trim();

            // 2. Move base64 images out of the HTML into Storage
            const bodyHtml = await processRichTextImages(form.bodyHtml);
            if (byteSize(bodyHtml) > MAX_HTML_BYTES) {
                throw new Error('Article is too large to store. Shorten it or use fewer images.');
            }

            const fields = {
                excerpt: form.excerpt.trim(),
                bodyHtml,
                image,
                tagName: form.tagName.trim(),
                tag: sanitizeTitle(form.tagName),
                date: form.date,
                isActive: true,
                updatedAt: serverTimestamp(),
            };

            // 3. Save
            const slug = isEdit ? editSlug : sanitizeTitle(articleSlug);

            if (isEdit) {
                await updateDoc(doc(db, 'articles', slug), fields);
            } else {
                // Check whether the manually entered slug already exists
                const existing = await getDoc(doc(db, 'articles', slug));

                if (existing.exists()) {
                    throw new Error('This URL slug is already in use. Please choose another one.');
                }

                await setDoc(doc(db, 'articles', slug), {
                    ...fields,
                    title: form.title.trim(),
                    createdAt: serverTimestamp(),
                });
            }

            invalidateArticles();
            navigate(`/article/${slug}/`);
        } catch (e2) {
            console.error(e2);
            setMessage({ type: 'error', text: e2.message || 'Something went wrong while saving.' });
            setSaving(false);
        }
    };

    const remove = async () => {
        if (!window.confirm('Delete this article and its Cloudinary images permanently? This cannot be undone.')) return;
        setSaving(true);
        try {
            const ref = doc(db, 'articles', editSlug);
            const snap = await getDoc(ref);
            const data = snap.exists() ? snap.data() : {};
            const failed = await deleteCloudinaryImages(collectCloudinaryUrls({ image: data.image, bodyHtml: data.bodyHtml }));
            await deleteDoc(ref);
            invalidateArticles();
            if (failed.length) {
                window.alert(`Article deleted, but ${failed.length} Cloudinary image(s) could not be deleted. Please remove them manually:\n\n${failed.join('\n')}`);
            }
            navigate('/article-overview/');
        } catch (e2) {
            console.error(e2);
            setMessage({ type: 'error', text: 'Failed to delete the article.' });
            setSaving(false);
        }
    };

    const heroProps = {
        crumbs: [{ label: 'Home', to: '/' }, { label: 'Articles', to: '/article/' }, { label: isEdit ? 'Edit article' : 'Add article' }],
        title: isEdit ? 'Edit article' : 'Add article',
        sub: 'Publish a new article to the site.',
    };

    if (!authed) {
        return (
            <>
                <PageHero {...heroProps} />
                <section className="block-section paper">
                    <div className="wrap"><AdminLogin onSuccess={() => setAuthed(true)} /></div>
                </section>
            </>
        );
    }

    if (isEdit && loadingDoc) {
        return <section className="block-section wrap"><p className="text-muted">Loading article…</p></section>;
    }

    if (isEdit && notFound) {
        return (
            <section className="block-section wrap">
                <h1 className="mb-4 text-5xl">Article not found</h1>
                <p className="mb-4 text-muted">Only articles added through this page can be edited here.</p>
                <Link to="/article/" className="font-semibold text-gold">Back to Articles</Link>
            </section>
        );
    }

    return (
        <>
            <PageHero {...heroProps} />
            <section className="block-section paper">
                <div className="mx-auto w-full max-w-[920px] px-6">
                    <form onSubmit={submit} className="space-y-6 border border-line bg-white p-6 shadow-sm min-[701px]:p-10">
                        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                            <h2 className="text-[26px] text-navy">{isEdit ? 'Edit article' : 'New article'}</h2>
                            <div className="flex items-center gap-4">
                                {isEdit && (
                                    <button type="button" onClick={remove} disabled={saving} className="border border-[#a4453a] px-3 py-1.5 text-sm font-semibold text-[#a4453a] hover:bg-[#a4453a] hover:text-white disabled:opacity-50">
                                        Delete
                                    </button>
                                )}
                                <button type="button" onClick={() => { logoutAdmin(); setAuthed(false); }} className="text-sm font-semibold text-muted hover:text-gold">
                                    Sign out
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className={label} htmlFor="a-title">Title *</label>

                            <input
                                id="a-title"
                                className={input}
                                maxLength={MAX_TITLE}
                                value={form.title}
                                onChange={onTitleChange}
                                disabled={isEdit}
                                placeholder="Article title"
                            />

                            <p className="mt-1 text-xs text-muted">
                                {form.title.length}/{MAX_TITLE}
                                {isEdit && ' · title is locked because it forms the article URL'}
                            </p>

                            {/* Article URL Slug */}
                            <div className="mt-4">
                                <label className={label} htmlFor="a-slug">
                                    URL Slug *
                                </label>

                                <div className="flex items-center border border-line bg-white focus-within:border-gold">
                                    <span className="shrink-0 border-r border-line bg-paper px-3 py-3 text-sm text-muted">
                                        /article/
                                    </span>

                                    <input
                                        id="a-slug"
                                        className="min-w-0 flex-1 bg-transparent p-3 text-[16px] outline-none disabled:bg-paper disabled:text-muted"
                                        value={articleSlug}
                                        onChange={(e) => setArticleSlug(sanitizeSlug(e.target.value))}
                                        disabled={isEdit}
                                        placeholder="article-url-slug"
                                    />

                                    <span className="shrink-0 px-3 py-3 text-sm text-muted">/</span>
                                </div>

                                <p className="mt-1 text-xs text-muted">
                                    {isEdit
                                        ? 'URL slug cannot be changed after publishing.'
                                        : 'Automatically generated from the title. You can edit it before publishing.'}
                                </p>
                            </div>
                        </div>

                        {/* Category + date */}
                        <div className="grid gap-6 min-[701px]:grid-cols-2">
                            <div>
                                <label className={label} htmlFor="a-cat">Category *</label>
                                <input id="a-cat" className={input} maxLength={40} value={form.tagName} onChange={set('tagName')} placeholder="e.g. Case Law" />
                            </div>
                            <div>
                                <label className={label} htmlFor="a-date">Date *</label>
                                <input id="a-date" type="date" className={input} value={form.date} onChange={set('date')} />
                            </div>
                        </div>

                        {/* Cover */}
                        <div>
                            <span className={label}>Cover image (16:9, optional)</span>
                            <p className="mb-2 text-xs text-muted">If left empty, the card shows the category name instead.</p>
                            <div className="mb-3 flex gap-6 text-sm">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="radio" checked={coverMode === 'upload'} onChange={() => setCoverMode('upload')} /> Upload
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="radio" checked={coverMode === 'url'} onChange={() => setCoverMode('url')} /> Image URL
                                </label>
                            </div>
                            {coverMode === 'upload' ? (
                                <div>
                                    <input type="file" accept="image/*" onChange={onCoverFile} className="text-sm" />
                                    {coverThumb && <img src={coverThumb} alt="Cover preview" className="mt-3 aspect-video w-64 border border-line object-cover" />}
                                </div>
                            ) : (
                                <input className={input} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://example.com/cover.jpg" />
                            )}
                            {isEdit && existingImage && !coverThumb && !coverUrl && (
                                <div className="mt-3">
                                    <p className="mb-1 text-xs text-muted">Current cover (choose a new one above to replace it):</p>
                                    <img src={existingImage} alt="Current cover" className="aspect-video w-64 border border-line object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className={label} htmlFor="a-excerpt">Excerpt *</label>
                            <textarea id="a-excerpt" rows={3} className={input} maxLength={MAX_EXCERPT} value={form.excerpt} onChange={set('excerpt')} placeholder="Short summary shown on the article card" />
                            <p className="mt-1 text-xs text-muted">{form.excerpt.length}/{MAX_EXCERPT}</p>
                        </div>

                        {/* Body */}
                        <div>
                            <label className={label}>Article body *</label>
                            <RichTextEditor
                                value={form.bodyHtml}
                                onChange={(html) => setForm((f) => ({ ...f, bodyHtml: html }))}
                                maxLength={MAX_CHARS}
                                maxImageSizeInMB={MAX_IMAGES_MB}
                            />
                        </div>

                        {message && (
                            <p role="alert" className={`text-sm font-semibold ${message.type === 'error' ? 'text-[#a4453a]' : 'text-green-700'}`}>{message.text}</p>
                        )}

                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={saving} className="bg-navy px-8 py-3 font-semibold text-white transition-colors hover:text-gold disabled:opacity-50">
                                {saving ? 'Saving…' : isEdit ? 'Update article' : 'Publish article'}
                            </button>
                            <Link to="/article/" className="text-sm font-semibold text-muted hover:text-gold">Cancel</Link>
                        </div>
                    </form>
                </div>
            </section>

            <CropperModal
                open={cropOpen}
                image={coverPreview}
                onClose={() => setCropOpen(false)}
                onCropComplete={onCropped}
                aspect={16 / 9}
            />
        </>
    );
}