import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, User, ShieldAlert, ArrowLeft, ArrowRight, X, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export const AdminLogin = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const { t, isRtl } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      setLoading(false);

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || t.login.errorMsg);
      }
    } catch (err) {
      setLoading(false);
      setError(t.login.errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-500/10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-emerald-400 mb-3 shadow-lg shadow-cyan-500/20">
            <img src={logoImg} alt="TECVEXA" className="w-full h-full object-cover rounded-[14px]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t.login.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            {t.login.subtitle}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              {t.login.usernameLabel}
            </label>
            <div className="relative">
              <User className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Asmael"
                className={`w-full py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${
                  isRtl ? 'pr-10' : 'pl-10'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              {t.login.passwordLabel}
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${
                  isRtl ? 'pr-10' : 'pl-10'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-2"
          >
            <Lock className="w-4 h-4 text-slate-950" />
            <span>{t.login.submitBtn}</span>
          </button>
        </form>

        {/* Footer info notice */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {t.login.secureNotice}
          </p>
        </div>

      </div>
    </div>
  );
};
