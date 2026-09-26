import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import CaptchaChallenge from '../components/common/CaptchaChallenge';

export default function Login() {
    const { loginCustomer } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isCaptchaVerified) {
            showToast('Please complete the security captcha challenge.', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await loginCustomer(email, password);
            if (res.success) {
                showToast('Welcome back to MandiConnect!', 'success');
                navigate(from, { replace: true });
            }
        } catch (error) {
            showToast(error.response?.data?.message || 'Invalid email or password.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F8FAF7]">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 card-hover-elevation">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D2818] via-[#164E33] to-[#248A68] text-white flex items-center justify-center mx-auto shadow-md">
                        <Leaf className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h1 className="text-2xl font-black font-serif text-[#0D2818]">Customer Login</h1>
                    <p className="text-xs text-gray-500 font-medium">Sign in to your verified MandiConnect wholesale account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {/* Email Input */}
                    <div>
                        <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="name@business.com"
                                required
                                className="w-full p-3 pl-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                            />
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="font-bold text-gray-700">Password</label>
                            <Link to="/forgot-password" className="text-[11px] text-[#164E33] hover:underline font-bold">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full p-3 pl-10 pr-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                            />
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Human Security Captcha Verification */}
                    <CaptchaChallenge onVerifyChange={setIsCaptchaVerified} />

                    <button
                        type="submit"
                        disabled={loading || !isCaptchaVerified}
                        className={`w-full py-3.5 text-white font-extrabold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 ${
                            isCaptchaVerified
                                ? 'bg-[#164E33] hover:bg-[#0D2818] cursor-pointer shadow-lg'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Authenticating Account...' : 'Secure Sign In'} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-[#164E33] hover:underline">
                        Register Account with OTP
                    </Link>
                </div>
            </div>
        </div>
    );
}
