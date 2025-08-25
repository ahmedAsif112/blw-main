"use client";
import React, { useState, useEffect } from "react";
import { Mail, Shield, Check, X, Loader2, Sparkles, Heart, Baby } from "lucide-react";
import { useRouter } from "next/navigation";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isAnimatingSuccess, setIsAnimatingSuccess] = useState(false);
    const router = useRouter();

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 4,
            duration: Math.random() * 8 + 12,
        }));
        setParticles(newParticles);
    }, []);

    const validateEmailFormat = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    // Common invalid/disposable email domains
    const disposableDomains = [
        '10minutemail.com', 'guerrillamail.com', 'tempmail.org',
        'throwaway.email', 'temp-mail.org', 'mailinator.com'
    ];

    const checkDisposableEmail = (email: string) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return disposableDomains.includes(domain);
    };

    // Real-time validation as user types
    useEffect(() => {
        if (!email) {
            setValidationStatus('idle');
            setError("");
            return;
        }

        const timeoutId = setTimeout(async () => {
            setIsValidating(true);

            if (!validateEmailFormat(email)) {
                setError("Please enter a valid email format");
                setValidationStatus('invalid');
                setIsValidating(false);
                return;
            }

            if (checkDisposableEmail(email)) {
                setError("Disposable email addresses are not allowed");
                setValidationStatus('invalid');
                setIsValidating(false);
                return;
            }

            // Call your API or validation service here
            try {
                const response = await fetch('/api/verify-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.isValid) {
                    setValidationStatus('valid');
                    setError("");
                    setIsAnimatingSuccess(true);
                    setTimeout(() => setIsAnimatingSuccess(false), 2000);
                } else {
                    setValidationStatus('invalid');
                    setError("This email address appears to be invalid or unreachable");
                }
            } catch (error: any) {
                // If API fails, just validate format
                setValidationStatus('valid');
                setError("");
                setIsAnimatingSuccess(true);
                setTimeout(() => setIsAnimatingSuccess(false), 2000);
                console.log(error)
            }

            setIsValidating(false);
        }, 800); // Debounce for 800ms

        return () => clearTimeout(timeoutId);
    }, [email]);

    const handleContinue = () => {
        if (validationStatus !== 'valid') {
            setError("Please enter a valid email address");
            return;
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", email);
        }

        // In a real app, this would use router.push("/checkout");
        router.push("/checkout");
    };

    const getInputBorderClass = () => {
        if (validationStatus === 'valid') return 'border-emerald-400 focus:ring-emerald-500 shadow-emerald-500/20';
        if (validationStatus === 'invalid') return 'border-red-400 focus:ring-red-500 shadow-red-500/20';
        return 'border-white/20 focus:ring-violet-500 hover:border-white/30';
    };

    const getValidationIcon = () => {
        if (isValidating) return (
            <div className="relative">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 animate-spin" />
                <div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-20"></div>
            </div>
        );
        if (validationStatus === 'valid') return (
            <div className="relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                {isAnimatingSuccess && (
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                )}
            </div>
        );
        if (validationStatus === 'invalid') return (
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
        );
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full opacity-30"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            animation: 'float infinite ease-in-out'
                        }}
                    />
                ))}

                {/* Animated Gradients - Smaller on mobile */}
                <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-pink-400/20 to-violet-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-cyan-400/20 to-emerald-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
                {/* Header with animated branding */}
                <div className="text-center mb-8 sm:mb-12 transform transition-all duration-700 ease-out">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                        <div className="relative">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/30 mr-3 sm:mr-4">
                                <Baby className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Little Bites
                        </h1>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white opacity-90 animate-fadeIn leading-tight">
                            Almost there! 🎉
                        </h2>
                        <p className="text-base sm:text-lg text-gray-300 opacity-80 animate-fadeIn px-4 sm:px-0" style={{ animationDelay: '0.2s' }}>
                            Enter your email to get your personalized nutrition guide
                        </p>
                    </div>
                </div>

                {/* Email Input Card */}
                <div className="w-full max-w-sm sm:max-w-md transform transition-all duration-700 ease-out animate-fadeIn px-4 sm:px-0" style={{ animationDelay: '0.4s' }}>
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 group">
                        {/* Card glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>

                        <div className="relative z-10">
                            {/* Email Icon */}
                            <div className="flex items-center justify-center mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110">
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="relative mb-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full bg-white/5 border-2 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-500 backdrop-blur-sm ${getInputBorderClass()}`}
                                />
                                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 transition-all duration-300">
                                    {getValidationIcon()}
                                </div>

                                {/* Input glow effect */}
                                {validationStatus === 'valid' && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl sm:rounded-2xl opacity-0 animate-pulse"></div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm transform transition-all duration-500 animate-fadeIn">
                                    <p className="text-xs sm:text-sm text-red-300 flex items-start sm:items-center gap-2">
                                        <span className="text-red-400 text-sm sm:text-base mt-0.5 sm:mt-0">⚠️</span>
                                        <span className="leading-tight">{error}</span>
                                    </p>
                                </div>
                            )}

                            {/* Success Message */}
                            {validationStatus === 'valid' && (
                                <div className="mb-4 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm transform transition-all duration-500 animate-fadeIn">
                                    <p className="text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
                                        <span className="text-emerald-400">✅</span>
                                        Perfect! Your email looks great
                                    </p>
                                </div>
                            )}

                            {/* Continue Button */}
                            <button
                                onClick={handleContinue}
                                disabled={validationStatus !== 'valid' || isValidating}
                                className={`w-full relative overflow-hidden rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-semibold transition-all duration-500 transform ${validationStatus === 'valid' && !isValidating
                                    ? "bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95"
                                    : "bg-white/5 text-gray-400 cursor-not-allowed border border-white/10"
                                    }`}
                            >
                                {validationStatus === 'valid' && !isValidating && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-white/30 opacity-0 hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
                                    </>
                                )}
                                <div className="relative z-10 flex items-center justify-center space-x-2">
                                    {isValidating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                            <span>Validating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Continue with email</span>
                                            {validationStatus === 'valid' && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />}
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Privacy Notice */}
                <div className="mt-6 sm:mt-8 text-center transform transition-all duration-700 ease-out animate-fadeIn px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs sm:text-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span>Protected by our</span>
                        <a onClick={() => router.push("/privacy")} className="underline text-gray-300 hover:text-white transition-colors duration-300">
                            Privacy Policy
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center justify-center space-x-1 flex-wrap">
                        <Heart className="w-3 h-3 text-pink-400" />
                        <span>We respect your data and never spam</span>
                        <Heart className="w-3 h-3 text-pink-400" />
                    </p>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    75% { transform: translateY(-10px) rotate(270deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                    opacity: 0;
                }

                /* Gradient animation for rainbow effect */
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .bg-rainbow {
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: rainbow 4s ease infinite;
                }
            `}</style>
        </div>
    );
}