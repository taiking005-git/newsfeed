
import React, { useState } from 'react';
import { EmailIcon, LockIcon, GoogleIcon, AppleIcon, ArrowLeftIcon } from './Icons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    console.log('Logging in with:', { email, password });
    onLoginSuccess();
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 animate-fade-in-slide-up relative">
      {onBack && (
        <button onClick={onBack} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      )}
      <div className="w-full max-w-sm">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold font-display mb-2">FlashFeed</h1>
          <p className="text-gray-400">Sign in to continue</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <EmailIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <LockIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-cyan-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white font-bold py-3 px-10 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <div className="space-y-4">
            <button className="w-full flex items-center justify-center bg-gray-800 border-2 border-gray-700 rounded-lg py-3 px-4 font-semibold hover:bg-gray-700 transition-colors">
                <GoogleIcon className="w-6 h-6 mr-3" />
                Continue with Google
            </button>
            <button className="w-full flex items-center justify-center bg-gray-800 border-2 border-gray-700 rounded-lg py-3 px-4 font-semibold hover:bg-gray-700 transition-colors">
                <AppleIcon className="w-6 h-6 mr-3" fill="white" />
                Continue with Apple
            </button>
        </div>
        
        <footer className="text-center mt-10">
          <p className="text-gray-400">
            Don't have an account? <a href="#" className="font-semibold text-cyan-400 hover:underline">Sign Up</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginScreen;
