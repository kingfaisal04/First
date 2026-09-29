import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { UserPlus, LogIn, Loader2, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // redirecting to login.
  const handleSignup = async (formData) => {
  await registerUser(formData);

  setFormData({
    username:'',

    email: formData.email,

    password: ''
  });

  setIsLogin(true);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem('user', JSON.stringify(res));
        navigate('/dashboard');
      } else {
        await handleSignup(formData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="p-8 text-center bg-indigo-600 dark:bg-indigo-900 text-white">
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-indigo-200">
            {isLogin ? 'Log in to manage your students' : 'Sign up to get started'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent dark:text-white transition-colors outline-none"
                  placeholder="Enter your username"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent dark:text-white transition-colors outline-none"
                placeholder="you@example.com"
              />
            </div>
            
          <div className="relative">
           <input
             type={showPassword ? "text" : "password"}
             name="password"
             required
             value={formData.password}
             onChange={handleChange}
             className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent dark:text-white transition-colors outline-none"
             placeholder="••••••••"
           />

         <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
           aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
         <EyeOff className="w-5 h-5" />
          ) : (
          <Eye className="w-5 h-5" />
        )}
  </button>
</div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />)}
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
               type="button"
                onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setShowPassword(false);
               }}
               className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
               >
               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
