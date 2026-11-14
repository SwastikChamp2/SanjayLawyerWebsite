import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Module-level cache so listing -> detail navigation doesn't refetch
let cache = null;
export const invalidateArticles = () => { cache = null; };

const toPost = (d) => {
    const x = d.data();
    return {
        slug: d.id,
        title: x.title || '',
        excerpt: x.excerpt || '',
        image: x.image || '',
        tag: x.tag || '',
        tagName: x.tagName || '',
        date: x.date || '',
        bodyHtml: x.bodyHtml || '',
        remote: true,
        createdAtMs: x.createdAt?.toMillis?.() || 0,
    };
};

const byNewest = (a, b) => b.date.localeCompare(a.date) || (b.createdAtMs || 0) - (a.createdAtMs || 0);

// Articles stored in the Firestore 'articles' collection
export function useArticles() {
    const [remote, setRemote] = useState(cache || []);
    const [loading, setLoading] = useState(!cache);

    useEffect(() => {
        if (cache) return;
        let alive = true;
        (async () => {
            try {
                const snap = await getDocs(query(collection(db, 'articles'), where('isActive', '==', true)));
                cache = snap.docs.map(toPost);
                if (alive) setRemote(cache);
            } catch (err) {
                console.error('Failed to load articles:', err);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    const posts = useMemo(() => [...remote].sort(byNewest), [remote]);
    return { posts, loading };
}