import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, Lock, ArrowRight, ShieldCheck, KeyRound, RefreshCw, MailCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import CaptchaChallenge from '../components/common/CaptchaChallenge';

export default function Register() {
    const { registerCustomer, verifyOtp, resendOtp, sendOtp } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    // Form inputs
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Verification states
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [step, setStep] = useState('form'); // 'form' | 'otp'
    const [otpCode, setOtpCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);

    // Live password strength criteria
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isPasswordStrong = hasMinLength && hasUpper && hasLower && hasNumber;
    const isPasswordMatch = password.length > 0 && password === confirmPassword;
    const isPhoneValid = /^[6-9]\d{9}$/.test(phone);

    // Resend timer countdown
    useEffect(() => {
        let timer;
        if (step === 'otp' && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, resendTimer]);

    const handleGenerateOtpDirectly = async () => {
        if (!email) {
            showToast('Please enter your email address first.', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await sendOtp(email);
            if (res.success) {
                setOtpCode('');
                setStep('otp');
                setResendTimer(30);
                showToast(res.message || '6-digit OTP code sent to your Gmail inbox!', 'success');
            }
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to send OTP email. Please check your email address.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRegistration = async (e) => {
        e.preventDefault();

        if (!isPasswordStrong) {
            showToast('Please fulfill all password strength requirements.', 'error');
            return;
        }

        if (!isPasswordMatch) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        if (phone && !isPhoneValid) {
            showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
            return;
        }

        if (!isCaptchaVerified) {
            showToast('Please complete the security captcha challenge.', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await registerCustomer({
                full_name: fullName,
                email,
                phone,
                password
            });

            if (res.success) {
                setOtpCode('');
                setStep('otp');
                showToast(res.message || 'OTP code sent to your Gmail inbox!', 'success');
            }
        } catch (error) {
            showToast(error.response?.data?.message || 'Registration failed.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otpCode || otpCode.length < 6) {
            showToast('Please enter the 6-digit OTP code sent to your Gmail.', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await verifyOtp(email, otpCode);
            if (res.success) {
                showToast('Account verified & created successfully! Welcome to MandiConnect.', 'success');
                navigate('/');
            }
        } catch (error) {
            setOtpCode('');
            showToast(error.response?.data?.message || 'Invalid OTP verification code. Please check your Gmail.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtpCode = async () => {
        if (resendTimer > 0) return;
        try {
            setLoading(true);
            const res = await resendOtp(email);
            if (res.success) {
                setOtpCode('');
                setResendTimer(30);
                showToast(`Fresh 6-digit OTP code sent to ${email}`, 'success');
            }
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to resend OTP email.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F8FAF7]">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 card-hover-elevation">
                
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D2818] via-[#164E33] to-[#248A68] text-white flex items-center justify-center mx-auto shadow-md">
                        <Leaf className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h1 className="text-2xl font-black font-serif text-[#0D2818]">
                        {step === 'form' ? 'Create Mandi Account' : 'Verify Email OTP'}
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                        {step === 'form'
                            ? 'Register for wholesale farm-direct rates & GST invoices'
                            : `Check your Gmail inbox for ${email}`}
                    </p>
                </div>

                {step === 'form' ? (
                    <form onSubmit={handleSubmitRegistration} className="space-y-4 text-xs">
                        {/* Full Name */}
                        <div>
                            <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="e.g. Rajesh Kumar"
                                    required
                                    className="w-full p-3 pl-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                                />
                                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="font-bold text-gray-700 block mb-1">Gmail / Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@gmail.com"
                                    required
                                    className="w-full p-3 pl-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                                />
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="font-bold text-gray-700">Mobile Phone Number</label>
                                {phone && (
                                    <span className={`text-[10px] font-bold ${isPhoneValid ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        {isPhoneValid ? '✓ Valid Indian Mobile' : 'Must be 10-digit number'}
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="9876543210"
                                    maxLength={10}
                                    required
                                    className="w-full p-3 pl-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                                />
                                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="font-bold text-gray-700 block mb-1">Create Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    required
                                    className="w-full p-3 pl-10 pr-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                                />
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Password Strength Checklist */}
                            {password.length > 0 && (
                                <div className="mt-2 p-2.5 bg-[#F0F4EE] rounded-xl border border-emerald-100 space-y-1 text-[11px]">
                                    <div className="flex items-center justify-between font-bold mb-1">
                                        <span className="text-gray-700">Password Strength:</span>
                                        <span className={isPasswordStrong ? 'text-emerald-700' : 'text-amber-600'}>
                                            {isPasswordStrong ? 'Strong Security ✓' : 'Requirements Pending'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                                        <span className={hasMinLength ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                                            {hasMinLength ? '✓ 8+ Characters' : '○ Min 8 Chars'}
                                        </span>
                                        <span className={hasUpper ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                                            {hasUpper ? '✓ Uppercase (A-Z)' : '○ Uppercase'}
                                        </span>
                                        <span className={hasLower ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                                            {hasLower ? '✓ Lowercase (a-z)' : '○ Lowercase'}
                                        </span>
                                        <span className={hasNumber ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                                            {hasNumber ? '✓ Number (0-9)' : '○ Number'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="font-bold text-gray-700">Confirm Password</label>
                                {confirmPassword.length > 0 && (
                                    <span className={`text-[10px] font-bold ${isPasswordMatch ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        {isPasswordMatch ? '✓ Passwords Match' : 'Passwords Do Not Match'}
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    required
                                    className="w-full p-3 pl-10 pr-10 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33] font-semibold"
                                />
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Captcha Challenge Verification */}
                        <CaptchaChallenge onVerifyChange={setIsCaptchaVerified} />

                        {/* Actions */}
                        <div className="pt-2 space-y-2">
                            <button
                                type="button"
                                onClick={handleGenerateOtpDirectly}
                                className="w-full py-2.5 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#C0392B] border border-amber-300 font-black text-xs rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <MailCheck className="w-4 h-4 text-[#E67E22]" /> Send OTP to Gmail
                            </button>

                            <button
                                type="submit"
                                disabled={loading || !isCaptchaVerified}
                                className={`w-full py-3.5 text-white font-extrabold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 ${
                                    isCaptchaVerified
                                        ? 'bg-[#164E33] hover:bg-[#0D2818] cursor-pointer'
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                {loading ? 'Sending Email OTP...' : 'Register Account & Send Gmail OTP'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                ) : (
                    /* OTP Verification Screen */
                    <form onSubmit={handleVerifyOtp} className="space-y-6 text-xs">
                        {/* Notice Banner */}
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 shadow-xs">
                            <MailCheck className="w-8 h-8 text-[#164E33] shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-[#0D2818]">OTP Code Dispatched to Gmail</p>
                                <p className="text-[11px] text-emerald-800">
                                    We have sent a 6-digit OTP code to <strong className="font-semibold">{email}</strong>. Please check your inbox & spam folder.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="font-bold text-gray-700 block mb-2 text-center">
                                Enter 6-Digit Verification OTP Code
                            </label>
                            <div className="relative max-w-xs mx-auto">
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="• • • • • •"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                    required
                                    className="w-full text-center text-2xl font-black font-mono py-3 tracking-widest bg-[#F8FAF7] border-2 border-[#164E33] rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 text-[#0D2818]"
                                />
                                <KeyRound className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otpCode.length < 6}
                            className="w-full py-4 bg-[#164E33] hover:bg-[#0D2818] text-white font-black text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? 'Verifying Email OTP...' : 'Verify OTP & Log In'} <ShieldCheck className="w-5 h-5 text-emerald-300" />
                        </button>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => {
                                    setOtpCode('');
                                    setStep('form');
                                }}
                                className="text-gray-500 hover:text-[#0D2818] font-bold"
                            >
                                ← Edit Email Form
                            </button>

                            <button
                                type="button"
                                onClick={handleResendOtpCode}
                                disabled={resendTimer > 0 || loading}
                                className={`font-bold flex items-center gap-1 ${
                                    resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#E67E22] hover:underline'
                                }`}
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Email OTP'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                    Already registered?{' '}
                    <Link to="/login" className="font-bold text-[#164E33] hover:underline">
                        Log In to Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
