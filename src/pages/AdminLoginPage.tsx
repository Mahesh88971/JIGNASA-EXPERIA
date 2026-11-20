import React, { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

interface AdminLoginPageProps {
  onLogin: (token: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error('Invalid admin password');
      const data = await response.json();
      sessionStorage.setItem('je_admin_token', data.token);
      onLogin(data.token);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#211915] flex items-center justify-center p-4">
      <form onSubmit={login} className="w-full max-w-md bg-[#FFF8EA] rounded-3xl p-8 shadow-2xl border border-[#966000]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#A52B23] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#F0B323]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A52B23] font-bold">Private Portal</p>
            <h1 className="font-serif text-2xl font-bold">Admin Sign In</h1>
          </div>
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="admin-password">Admin password</label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-[#766452]" />
          <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-[#CFB48C] rounded-xl py-2.5 pl-10 pr-3 bg-white" required />
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-5 w-full py-3 rounded-xl bg-[#A52B23] text-white font-bold disabled:opacity-60">
          {loading ? 'Signing in…' : 'Open Operations Console'}
        </button>
      </form>
    </div>
  );
};
