import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen, setCurrentUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isRegisterModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      id: `user-${Date.now()}`,
      name: name || 'New User',
      email: email || 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      favorites: []
    });
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-modal-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="text-base font-extrabold text-neutral-800">Sign up</div>
          <div className="w-8" />
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Welcome to Airbnb</h2>
            <p className="text-neutral-500 text-sm mt-1">Create an account to book your next trip</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="border border-neutral-300 rounded-xl overflow-hidden">
              <div className="p-3 border-b border-neutral-300">
                <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full text-sm font-semibold outline-none bg-transparent"
                  required
                />
              </div>
              <div className="p-3 border-b border-neutral-300">
                <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm font-semibold outline-none bg-transparent"
                  required
                />
              </div>
              <div className="p-3">
                <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm font-semibold outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-airbnb-primary hover:bg-rose-600 text-white font-bold rounded-xl shadow-md transition cursor-pointer text-sm"
            >
              Continue
            </button>
          </form>

          <div className="text-center text-xs text-neutral-500 font-medium mt-2">
            Already have an account?{' '}
            <span
              onClick={() => {
                setIsRegisterModalOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="text-neutral-900 font-bold underline cursor-pointer"
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
