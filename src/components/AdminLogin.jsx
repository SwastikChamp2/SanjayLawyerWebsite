import { useState } from 'react';
import { verifyAdmin, loginAdmin } from '../admin/adminAuth';

const input = 'w-full border border-line bg-white p-3 text-[16px] outline-none focus:border-gold';

export default function AdminLogin({ onSuccess }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (verifyAdmin(id, password)) {
            loginAdmin();
            onSuccess();
        } else {
            setError('Invalid admin ID or password.');
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto w-full max-w-md border border-line bg-white p-8 shadow-sm">
            <h2 className="text-[28px] text-navy">Admin sign in</h2>
            <p className="mt-2 mb-6 text-[15px] text-muted">Enter your admin ID and password to manage articles.</p>

            <label className="mb-1 block text-sm font-semibold text-navy" htmlFor="admin-id">Admin ID</label>
            <input id="admin-id" className={`${input} mb-4`} value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" autoFocus />

            <label className="mb-1 block text-sm font-semibold text-navy" htmlFor="admin-pass">Password</label>
            <input id="admin-pass" type="password" className={`${input} mb-4`} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

            {error && <p role="alert" className="mb-4 text-sm font-semibold text-[#a4453a]">{error}</p>}

            <button type="submit" disabled={!id || !password} className="w-full bg-navy py-3 font-semibold text-white transition-colors hover:text-gold disabled:opacity-50">
                Sign in
            </button>
        </form>
    );
}