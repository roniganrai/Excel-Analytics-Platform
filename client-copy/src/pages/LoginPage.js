// client/src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import MovingNetwork from '../components/MovingNetwork';
import { Eye, EyeOff, BarChart3, Github, Mail, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // First visit animation
    const timer = setTimeout(() => setIsFirstVisit(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Moving Network Background */}
      <div className="absolute inset-0 z-0">
        <MovingNetwork />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header with entrance animation */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${
              isFirstVisit ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="relative inline-flex items-center justify-center mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-4 shadow-xl border border-slate-700 transform group-hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent mb-3 hover:scale-105 transition-transform duration-300">
              Excel Analytics Platform
            </h1>
          </div>

          {/* Interactive Login Card */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isFirstVisit ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
            }`}
          >
            <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-500 group">
              {/* Interactive header line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="space-y-1 pb-6 pt-8">
                <CardTitle className="text-3xl font-bold text-center text-white group-hover:text-blue-100 transition-colors duration-300">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-slate-400 text-base">
                  Access your analytics dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                {/* Interactive Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="h-12 bg-slate-700/50 hover:bg-slate-600 border-slate-600 hover:border-blue-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:text-blue-400 transition-colors" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                    className="h-12 bg-slate-700/50 hover:bg-slate-600 border-slate-600 hover:border-purple-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 group"
                  >
                    <Github className="w-4 h-4 mr-2 group-hover:text-purple-400 transition-colors" />
                    GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-800 px-4 text-slate-400">Or continue with email</span>
                  </div>
                </div>

                {/* Interactive Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                      Email address
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500 ${
                          errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.email && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                      Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pr-12 hover:border-slate-500 ${
                          errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.password && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 group">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 hover:scale-110 transition-transform"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-0 relative overflow-hidden group"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    {"Don't have an account? "}
                    <Link
                      to="/signup"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105 inline-block"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div
            className={`text-center mt-8 transition-all duration-1000 delay-500 ${
              isFirstVisit ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="text-xs text-slate-500">
              Enterprise-grade analytics platform •{' '}
              <Link
                to="/terms"
                className="text-blue-400 hover:text-blue-300 transition-colors hover:scale-105 inline-block"
              >
                Terms
              </Link>{' '}
              •{' '}
              <Link
                to="/privacy"
                className="text-blue-400 hover:text-blue-300 transition-colors hover:scale-105 inline-block"
              >
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;