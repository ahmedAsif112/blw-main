'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Download, Heart, Gift, Crown, Mail, Baby, Sparkles } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

export default function SuccessPage() {
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [referrer, setReferrer] = useState<string | null>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const hasSent = useRef(false);

    // Generate floating particles for background animation
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

    useEffect(() => {
        setIsVisible(true);

        // Only run in the browser
        if (typeof window !== 'undefined') {
            const savedRef = localStorage.getItem('referrer');
            setReferrer(savedRef);

            const email = localStorage.getItem('userEmail');

            if (!email || hasSent.current) return;

            hasSent.current = true;

            fetch('/api/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, referrer: savedRef }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Email sent:', data);
                    setEmailSent(true);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Email send failed:', err);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full opacity-20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            animation: 'float infinite ease-in-out'
                        }}
                    />
                ))}

                {/* Animated Gradients */}
                <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-20 sm:bottom-40 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-full opacity-40 blur-lg animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500/25 to-pink-500/25 rounded-full opacity-50 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-cyan-400/20 to-emerald-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto flex justify-center items-center">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="relative">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-pink-500/30">
                                    <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl sm:rounded-2xl animate-ping opacity-20"></div>
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    LITTLE BITES
                                </h1>
                                <p className="text-xs text-gray-400 -mt-1">Nutrition Guide</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex items-center justify-center px-4 py-4 sm:py-8 min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)]">
                    {loading ? (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full max-w-sm sm:max-w-lg`}>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center animate-spin shadow-lg shadow-pink-500/30">
                                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Preparing Your Guide...</h2>
                                <p className="text-sm sm:text-base text-gray-300">Sending your personalized baby nutrition guide to your email</p>
                                <div className="mt-4 sm:mt-6 flex justify-center">
                                    <div className="flex space-x-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : emailSent ? (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-sm sm:max-w-2xl`}>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl">
                                {/* Success Icon */}
                                <div className="relative mb-6 sm:mb-8">
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full mx-auto flex items-center justify-center animate-bounce shadow-xl shadow-emerald-500/30">
                                        <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-pink-500/30">
                                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>

                                    {/* Celebration particles */}
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full"
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                                animationDelay: `${i * 0.15}s`,
                                                animationDuration: '3s',
                                                animationName: 'celebration-burst',
                                                animationTimingFunction: 'ease-out',
                                                animationIterationCount: 'infinite',
                                                transform: `rotate(${i * 45}deg) translateY(-30px)`,
                                                '--rotation': `${i * 45}deg`
                                            } as React.CSSProperties}
                                        />
                                    ))}
                                </div>

                                {/* Main Heading */}
                                <div className="mb-6 sm:mb-8">
                                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 animate-pulse">
                                        THANK YOU!
                                    </h1>
                                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-emerald-900/40 to-green-900/40 text-emerald-400 font-semibold border border-emerald-800/50 backdrop-blur-sm mb-4 sm:mb-6 text-sm sm:text-base shadow-lg shadow-emerald-500/20">
                                        <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                        Your Free Guide Is Ready!
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 sm:space-y-6 text-left">
                                    <div className="bg-gradient-to-r from-pink-900/20 to-violet-900/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-pink-800/30 backdrop-blur-sm">
                                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                            Your <strong className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">30 Day Baby Nutrition Meal Plan With 6+ Free Bonus Cookbooks</strong> is on its way to your email.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-violet-900/20 to-cyan-900/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-violet-800/30 backdrop-blur-sm">
                                        <p className="text-base sm:text-lg text-gray-300 mb-4">
                                            But you can also download it directly from the link below:
                                        </p>

                                        <a
                                            href="https://drive.google.com/drive/folders/1A_97bElAj7rubdg06UYPl-Y3jYjibFsn?usp=sharing"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:animate-bounce flex-shrink-0 relative z-10" />
                                            <span className="text-center relative z-10">Click Here to Access Your Download Instantly</span>
                                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:animate-spin flex-shrink-0 relative z-10" />
                                        </a>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center">
                                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                            We've also sent this link to your email for easy access later.
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom decoration */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                                    <div className="flex justify-center items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse flex-shrink-0" />
                                        <span className="text-center bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-medium">Welcome to your baby's nutrition journey</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full max-w-sm sm:max-w-lg`}>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg shadow-red-500/30">
                                    <span className="text-xl sm:text-3xl">❌</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-3 sm:mb-4">
                                    Email Send Failed
                                </h2>
                                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                                    We encountered an issue sending your guide. Please contact our support team for assistance.
                                </p>
                                <div className="bg-gradient-to-r from-red-900/40 to-rose-900/40 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-800/30 backdrop-blur-sm">
                                    <p className="text-red-300 text-xs sm:text-sm break-all">
                                        Support: support@littlebites.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    75% { transform: translateY(-10px) rotate(270deg); }
                }
                
                @keyframes celebration-burst {
                    0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-15px) scale(0); }
                    50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-80px) scale(1); }
                    100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-150px) scale(0); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-25%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }
                
                .animate-spin {
                    animation: spin 2s linear infinite;
                }

                /* Mobile-specific adjustments */
                @media (max-width: 640px) {
                    @keyframes celebration-burst {
                        0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-10px) scale(0); }
                        50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-50px) scale(1); }
                        100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-100px) scale(0); }
                    }
                }
            `}</style>
        </div>
    );
}