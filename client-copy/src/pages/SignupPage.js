// client/src/pages/SignupPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import MovingNetwork from '../components/MovingNetwork';
import { Eye, EyeOff, BarChart3, Github, Mail, Loader2, User, Building } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // First visit animation
    const timer = setTimeout(() => setIsFirstVisit(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: '',
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleSocialSignup = async (provider) => {
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

          {/* Interactive Signup Card */}
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
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-slate-400 text-base">
                  Start your analytics journey today
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                {/* Interactive Social Signup Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignup('google')}
                    disabled={isLoading}
                    className="h-12 bg-slate-700/50 hover:bg-slate-600 border-slate-600 hover:border-blue-400 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:text-blue-400 transition-colors" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignup('github')}
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
                    <span className="bg-slate-800 px-4 text-slate-400">Or create with email</span>
                  </div>
                </div>

                {/* Interactive Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-300">
                      Full Name
                    </Label>
                    <div className="relative group">
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500 pl-10 ${
                          errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.fullName && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500 pl-10 ${
                          errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.email && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-slate-300">
                      Company Name
                    </Label>
                    <div className="relative group">
                      <Input
                        id="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500 pl-10 ${
                          errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.company && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.company}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                      Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.password && <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pr-12 hover:border-slate-500 ${
                          errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2 group">
                      <input
                        id="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 hover:scale-110 transition-transform mt-0.5"
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors cursor-pointer leading-relaxed"
                      >
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-400 mt-1 animate-pulse">{errors.agreeToTerms}</p>
                    )}
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
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105 inline-block"
                    >
                      Sign in
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
              Join thousands of companies using our platform •{' '}
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

export default SignupPage;