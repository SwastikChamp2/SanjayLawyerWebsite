// Hardcoded admin credentials for the article admin pages.
// NOTE: this is client-side only - anyone who opens the built JS can read it.
// It keeps casual visitors out of the form; it is NOT real security.
// Change these before deploying.
const ADMINS = [
    { id: 'admin1', password: 'adminpass1' },
    { id: 'admin2', password: 'adminpass2' },
    { id: 'admin3', password: 'adminpass3' },
    { id: 'admin4', password: 'adminpass4' },
    { id: 'admin5', password: 'adminpass5' },
];

const SESSION_KEY = 'articleAdminSession';

export function verifyAdmin(id, password) {
    return ADMINS.some((a) => a.id === id.trim() && a.password === password);
}

export function loginAdmin() {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
}

export function logoutAdmin() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}

export function isAdmin() {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
}