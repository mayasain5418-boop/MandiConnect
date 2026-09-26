import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

export default function CaptchaChallenge({ onVerifyChange }) {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setNum1(n1);
        setNum2(n2);
        setUserAnswer('');
        setIsVerified(false);
        setError(false);
        if (onVerifyChange) onVerifyChange(false);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setUserAnswer(val);
        const expected = num1 + num2;

        if (parseInt(val, 10) === expected) {
            setIsVerified(true);
            setError(false);
            if (onVerifyChange) onVerifyChange(true);
        } else {
            setIsVerified(false);
            if (val.length > 0) setError(true);
            if (onVerifyChange) onVerifyChange(false);
        }
    };

    return (
        <div className="bg-[#F8FAF7] border border-gray-200 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D2818] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#164E33]" /> Human Security Verification
                </span>
                <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-1 text-gray-400 hover:text-[#164E33] transition-colors rounded-full"
                    title="Refresh Security Code"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 bg-gradient-to-r from-[#0D2818] to-[#164E33] text-amber-300 font-mono font-black text-sm rounded-xl tracking-wider select-none shadow-xs border border-emerald-900">
                    {num1} + {num2} = ?
                </div>

                <div className="relative flex-1">
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={handleInputChange}
                        placeholder="Answer"
                        required
                        className={`w-full p-2.5 text-xs font-bold bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            isVerified
                                ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-800'
                                : error
                                ? 'border-rose-300 focus:ring-rose-400'
                                : 'border-gray-200 focus:ring-[#164E33]'
                        }`}
                    />
                    {isVerified && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-2.5 top-3" />
                    )}
                    {error && !isVerified && (
                        <AlertCircle className="w-4 h-4 text-rose-500 absolute right-2.5 top-3" />
                    )}
                </div>
            </div>
        </div>
    );
}
