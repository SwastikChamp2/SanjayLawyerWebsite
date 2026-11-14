// cloudinaryLogic.js
//
// Everything that talks to Cloudinary lives here. No other file in the app
// should know about Cloudinary's REST API shape, folders, or presets.

import { getConfigValue, getCachedConfigValue } from "../services/configService";

/**
 * Fetches Cloudinary credentials from Firestore 'config' collection.
 */
export const getCloudinaryConfig = async () => {
    const cloudName = await getConfigValue("VITE_CLOUDINARY_CLOUD_NAME");
    const uploadPreset = await getConfigValue("VITE_CLOUDINARY_UPLOAD_PRESET");
    const apiKey = await getConfigValue("VITE_CLOUDINARY_API_KEY");
    const apiSecret = await getConfigValue("VITE_CLOUDINARY_API_SECRET");
    return { cloudName, uploadPreset, apiKey, apiSecret };
};

/**
 * Uploads a single File/Blob to Cloudinary.
 * @param {File} file
 * @param {string} [folder] e.g. "vacationmela/covers" or "vacationmela/gallery"
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadImageToCloudinary = async (file, folder = "vacationmela") => {
    const { cloudName, uploadPreset } = await getCloudinaryConfig();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    if (folder) formData.append("folder", folder);

    const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.error?.message || "Image upload failed. Please try again.");
    }

    const data = await res.json();
    return { url: data.secure_url, publicId: data.public_id };
};

/**
 * Uploads several files in parallel and reports progress.
 * @param {File[]} files
 * @param {string} [folder]
 * @param {(done: number, total: number) => void} [onProgress]
 * @returns {Promise<{ url: string, publicId: string }[]>} results in the same order as `files`
 */
export const uploadMultipleImagesToCloudinary = async (
    files,
    folder = "vacationmela",
    onProgress
) => {
    if (!files?.length) return [];
    let done = 0;
    const total = files.length;

    return Promise.all(
        files.map((file) =>
            uploadImageToCloudinary(file, folder).then((result) => {
                done += 1;
                onProgress?.(done, total);
                return result;
            })
        )
    );
};

/**
 * Builds a transformed Cloudinary delivery URL from a public_id — useful for
 * thumbnails without re-uploading a smaller version.
 */
export const getCloudinaryTransformedUrl = (
    publicId,
    { width = 400, height = 400, crop = "fill", cloudName } = {}
) => {
    const cn = cloudName || getCachedConfigValue("VITE_CLOUDINARY_CLOUD_NAME");
    return `https://res.cloudinary.com/${cn}/image/upload/w_${width},h_${height},c_${crop},q_auto,f_auto/${publicId}`;
};

/**
 * Extracts a Cloudinary public_id from a string URL, object, or public_id string.
 * @param {string | object} input
 * @returns {string | null}
 */
export const extractCloudinaryPublicId = (input) => {
    if (!input) return null;

    let str = "";
    if (typeof input === "object") {
        if (input.publicId) return input.publicId;
        if (input.public_id) return input.public_id;
        str = input.url || input.src || "";
    } else if (typeof input === "string") {
        str = input;
    }

    if (!str || typeof str !== "string") return null;
    str = str.trim();

    // If it doesn't look like a URL, check if it's already a public_id string
    if (!str.startsWith("http://") && !str.startsWith("https://")) {
        if (
            str.startsWith("data:") ||
            str.includes("/assets/") ||
            str.endsWith(".png") ||
            str.endsWith(".jpg") ||
            str.endsWith(".svg")
        ) {
            return null;
        }
        return str;
    }

    if (!str.includes("cloudinary.com")) return null;

    try {
        const urlWithoutQuery = str.split("?")[0];
        const uploadIndex = urlWithoutQuery.indexOf("/image/upload/");
        if (uploadIndex === -1) return null;

        const pathAfterUpload = urlWithoutQuery.substring(uploadIndex + "/image/upload/".length);
        const segments = pathAfterUpload.split("/").filter(Boolean);

        // Filter out transformation segments (e.g. w_400, h_400, c_fill, q_auto) and version segments (v123456)
        const pathSegments = [];
        for (const seg of segments) {
            if (/^v\d+$/.test(seg)) continue;
            if (seg.includes(",") || /^(c|w|h|q|f|e|b|r|o|l|u|a|d|fl|pg|dn)_/.test(seg)) continue;
            pathSegments.push(seg);
        }

        if (!pathSegments.length) return null;

        let fullPath = pathSegments.join("/");
        const lastDot = fullPath.lastIndexOf(".");
        if (lastDot > 0) {
            fullPath = fullPath.substring(0, lastDot);
        }

        return fullPath || null;
    } catch {
        return null;
    }
};

/**
 * Extracts all valid Cloudinary public_ids from a Venue or Event document.
 * @param {object} entity
 * @returns {string[]} unique array of public_ids
 */
export const extractAllImagePublicIds = (entity) => {
    if (!entity || typeof entity !== "object") return [];

    const rawTargets = [
        entity.coverImage,
        entity.image,
        entity.heroImage,
        entity.cover,
        entity.imagePublicId,
    ];

    if (Array.isArray(entity.gallery)) {
        rawTargets.push(...entity.gallery);
    }
    if (Array.isArray(entity.images)) {
        rawTargets.push(...entity.images);
    }

    const publicIds = new Set();
    for (const item of rawTargets) {
        const pid = extractCloudinaryPublicId(item);
        if (pid) {
            publicIds.add(pid);
        }
    }

    return Array.from(publicIds);
};

/**
 * Deletes a single image from Cloudinary by public_id or URL.
 * Requires VITE_CLOUDINARY_API_KEY and VITE_CLOUDINARY_API_SECRET to be configured in .env for signed requests.
 * @param {string | object} publicIdOrUrl
 * @returns {Promise<{ success: boolean, publicId: string | null, error?: string }>}
 */
export const deleteImageFromCloudinary = async (publicIdOrUrl) => {
    const publicId = extractCloudinaryPublicId(publicIdOrUrl);
    if (!publicId) {
        return { success: false, publicId: null, error: "No valid Cloudinary publicId found." };
    }

    const { cloudName, apiKey, apiSecret } = await getCloudinaryConfig();

    if (!apiKey || !apiSecret) {
        console.warn(
            `[Cloudinary Delete] Skipping Cloudinary API deletion for "${publicId}": VITE_CLOUDINARY_API_KEY or VITE_CLOUDINARY_API_SECRET missing in Firebase config.`
        );
        return { success: false, publicId, error: "API Key or Secret missing." };
    }

    try {
        const destroyUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
        const timestamp = Math.floor(Date.now() / 1000);
        const toSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

        const encoder = new TextEncoder();
        const data = encoder.encode(toSign);
        const hashBuffer = await crypto.subtle.digest("SHA-1", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        const formData = new FormData();
        formData.append("public_id", publicId);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);

        const res = await fetch(destroyUrl, {
            method: "POST",
            body: formData,
        });

        const dataRes = await res.json().catch(() => ({}));
        if (!res.ok || dataRes.result !== "ok") {
            console.error(`[Cloudinary Delete] Failed to delete image "${publicId}":`, dataRes);
            return { success: false, publicId, error: dataRes?.error?.message || dataRes?.result };
        }

        console.log(`[Cloudinary Delete] Successfully deleted image "${publicId}" from Cloudinary.`);
        return { success: true, publicId };
    } catch (err) {
        console.error(`[Cloudinary Delete] Exception while deleting "${publicId}":`, err);
        return { success: false, publicId, error: err.message };
    }
};

/**
 * Deletes multiple images from Cloudinary in parallel.
 * @param {(string | object)[]} items
 * @returns {Promise<{ success: boolean, publicId: string | null }[]>}
 */
export const deleteMultipleImagesFromCloudinary = async (items) => {
    if (!Array.isArray(items) || !items.length) return [];
    return Promise.all(items.map((item) => deleteImageFromCloudinary(item)));
};



/**
 * Finds every Cloudinary image URL inside an HTML string (blog body).
 * @param {string} html
 * @returns {string[]}
 */
export const extractCloudinaryUrlsFromHtml = (html) => {
    if (!html || typeof html !== "string") return [];
    const dom = new DOMParser().parseFromString(html, "text/html");
    return [...dom.querySelectorAll("img")]
        .map((img) => img.getAttribute("src"))
        .filter((src) => src && src.includes("res.cloudinary.com"));
};

/**
 * Deletes every Cloudinary image embedded in an HTML string, all at once.
 * @param {string} html
 * @returns {Promise<{ success: boolean, publicId: string | null }[]>}
 */
export const deleteImagesInHtmlFromCloudinary = async (html) => {
    const publicIds = [
        ...new Set(extractCloudinaryUrlsFromHtml(html).map(extractCloudinaryPublicId).filter(Boolean)),
    ];
    return deleteMultipleImagesFromCloudinary(publicIds);
};