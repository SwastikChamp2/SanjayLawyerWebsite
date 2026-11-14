// src/services/configService.js
//
// Reads values from the Firestore 'config' collection.
// Each document id is the key (e.g. "VITE_CLOUDINARY_CLOUD_NAME") and the
// value lives in the document's `value` field.

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const cache = new Map();      // key -> string value
const inflight = new Map();   // key -> pending promise (avoids duplicate reads)

/**
 * Returns the config value for `key`, or "" if the document is missing.
 * Results are cached for the lifetime of the page.
 */
export const getConfigValue = async (key) => {
    if (cache.has(key)) return cache.get(key);
    if (inflight.has(key)) return inflight.get(key);

    const pending = (async () => {
        try {
            const snap = await getDoc(doc(db, "config", key));
            const value = snap.exists() ? String(snap.data().value ?? "").trim() : "";
            cache.set(key, value);
            return value;
        } catch (err) {
            console.error(`[configService] Failed to read config "${key}":`, err);
            return ""; // not cached, so a later call can retry
        } finally {
            inflight.delete(key);
        }
    })();

    inflight.set(key, pending);
    return pending;
};

/**
 * Synchronous read of an already-fetched value ("" if not loaded yet).
 */
export const getCachedConfigValue = (key) => cache.get(key) ?? "";