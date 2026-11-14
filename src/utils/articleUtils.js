import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
    uploadImageToCloudinary,
    deleteImageFromCloudinary,
    extractCloudinaryUrlsFromHtml,
} from './cloudinaryLogic';

/* ---------- Slugs ---------- */

// Sanitized title, max 50 chars
export const sanitizeTitle = (title) =>
    (title || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50)
        .replace(/-+$/, '') || 'article';

const ALNUM = 'abcdefghijklmnopqrstuvwxyz0123456789';
const randomSuffix = () =>
    Array.from({ length: 6 }, () => ALNUM[Math.floor(Math.random() * ALNUM.length)]).join('');

const slugTaken = async (slug) => {
    const snap = await getDoc(doc(db, 'articles', slug));
    return snap.exists();
};

// Plain slug first; random 6-char suffix only if it is already taken
export async function generateUniqueSlug(title) {
    const base = sanitizeTitle(title);
    if (!(await slugTaken(base))) return base;
    for (let i = 0; i < 10; i++) {
        const candidate = `${base}-${randomSuffix()}`;
        if (!(await slugTaken(candidate))) return candidate;
    }
    throw new Error('Could not generate a unique slug');
}

/* ---------- Cloudinary (uses the app's existing cloudinaryLogic.js) ---------- */

export async function uploadImage(blob, folder) {
    const type = blob.type || 'image/jpeg';
    const ext = { 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[type] || 'jpg';
    const file = blob instanceof File ? blob : new File([blob], `image.${ext}`, { type });
    const { url } = await uploadImageToCloudinary(file, folder);
    return url;
}

// All Cloudinary image URLs used by an article (cover + images inside the body)
export function collectCloudinaryUrls({ image, bodyHtml }) {
    const urls = new Set(extractCloudinaryUrlsFromHtml(bodyHtml));
    if (image && image.includes('res.cloudinary.com')) urls.add(image);
    return [...urls];
}

// Deletes all images in parallel. Never throws: returns the URLs that failed.
export async function deleteCloudinaryImages(urls) {
    const results = await Promise.all(urls.map((u) => deleteImageFromCloudinary(u)));
    return urls.filter((_, i) => !results[i].success);
}

// Firestore docs are capped at 1 MB, so base64 images inside the HTML must be
// uploaded to Cloudinary and replaced with their URLs before saving.
export async function processRichTextImages(html) {
    if (!html) return '';
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    const imgs = [...parsed.querySelectorAll('img[src^="data:image"]')];
    for (const img of imgs) {
        const blob = await (await fetch(img.getAttribute('src'))).blob();
        img.setAttribute('src', await uploadImage(blob, 'articles/body'));
    }
    return parsed.body.innerHTML;
}

/* ---------- Misc ---------- */

export const textLength = (html) =>
    (new DOMParser().parseFromString(html || '', 'text/html').body.textContent || '').trim().length;

export const byteSize = (str) => new Blob([str]).size;

export const todayISO = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/* ---------- Canvas crop ---------- */

const loadImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });

export async function getCroppedImg(src, px) {
    const img = await loadImage(src);
    const canvas = document.createElement('canvas');
    canvas.width = px.width;
    canvas.height = px.height;
    canvas.getContext('2d').drawImage(img, px.x, px.y, px.width, px.height, 0, 0, px.width, px.height);
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
}