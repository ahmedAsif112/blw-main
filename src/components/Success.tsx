'use client';
import { useEffect, useRef, useState } from 'react';
import { Crown, Heart, Sparkles, Star, Download, Mail, CheckCircle } from 'lucide-react';

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
    const [particles, setParticles] = useState<Particle[]>([]);
    const hasSent = useRef(false); // ✅ flag to prevent double send

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            delay: Math.random() * 4,
            duration: Math.random() * 10 + 15,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email || hasSent.current) return;
        hasSent.current = true; // ✅ mark as sent once

        fetch('/api/sendemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('✅ Email sent:', data);
                setEmailSent(true);
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Email send failed:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
                <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-pink-400/20 to-violet-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-cyan-400/20 to-emerald-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="text-center animate-fadeIn">
                        <div className="relative mb-8 sm:mb-12">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/50 relative">
                                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-spin opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-ping opacity-30"></div>
                            </div>

                            {/* Loading particles */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        animationDelay: `${i * 0.2}s`,
                                        animationDuration: '2s',
                                        animationName: 'loading-orbit',
                                        animationTimingFunction: 'ease-in-out',
                                        animationIterationCount: 'infinite',
                                        transform: `rotate(${i * 45}deg) translateY(-60px)`,
                                        '--rotation': `${i * 45}deg`
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse">
                            Sending your PDF...
                        </h2>
                        <p className="text-base sm:text-lg text-white/80">
                            Please wait while we prepare your personalized nutrition guide
                        </p>
                    </div>
                ) : emailSent ? (
                    <div className="text-center py-12 sm:py-16 animate-fadeIn px-4 max-w-4xl mx-auto">
                        <div className="relative mb-8 sm:mb-12">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/50 relative">
                                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full animate-ping opacity-30"></div>
                            </div>

                            {/* Success celebration particles */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '3s',
                                        animationName: 'celebration-burst',
                                        animationTimingFunction: 'ease-out',
                                        animationIterationCount: 'infinite',
                                        transform: `rotate(${i * 30}deg) translateY(-40px)`,
                                        '--rotation': `${i * 30}deg`
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>

                        {/* Brand Header */}
                        <div className="flex items-center justify-center mb-8 sm:mb-12">
                            <div className="relative">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/30 mr-3 sm:mr-4">
                                    <span className="text-lg sm:text-2xl">🍼</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                                Little Bites
                            </h1>
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-4 sm:mb-6">
                            THANK YOU! 🎉
                        </h2>

                        {/* Success Message Card */}
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-emerald-500/10 rounded-2xl sm:rounded-3xl"></div>

                            <div className="relative z-10 space-y-4 sm:space-y-6">
                                <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
                                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                                    <span className="text-lg sm:text-xl font-semibold text-white">
                                        Your nutrition guide is ready!
                                    </span>
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                                </div>

                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                    Your <strong className="text-white">Baby-Led Weaning Meal Plan + 6 Premium BLW Books</strong> is on its way to your email.
                                </p>

                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                    Also you can also download it directly from the link below:
                                </p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="mb-8 sm:mb-12">
                            <a
                                href="https://drive.google.com/drive/folders/1A_97bElAj7rubdg06UYPl-Y3jYjibFsn?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center space-x-2 sm:space-x-3 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Download className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:animate-bounce" />
                                <span className="relative z-10">Download Your Guide Instantly</span>
                                <Star className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:animate-spin" />
                            </a>
                        </div>

                        {/* Footer Note */}
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-500/5 rounded-xl sm:rounded-2xl"></div>

                            <div className="relative z-10 flex items-center space-x-3">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                                <p className="text-sm sm:text-base text-gray-400">
                                    We’ve also sent this link to your email for easy access later.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-fadeIn px-4">
                        <div className="relative mb-8 sm:mb-12">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/50 relative">
                                <span className="text-4xl sm:text-5xl">❌</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full animate-pulse opacity-30"></div>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent mb-4">
                            Oops! Something went wrong
                        </h2>
                        <p className="text-lg sm:text-xl text-white/80 mb-8">
                            Failed to send email. Please contact support.
                        </p>

                        <button className="group relative inline-flex items-center space-x-2 sm:space-x-3 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                            <span className="relative z-10">Contact Support</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    75% { transform: translateY(-10px) rotate(270deg); }
                }
                
                @keyframes celebration-burst {
                    0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-20px) scale(0); }
                    50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-100px) scale(1); }
                    100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-200px) scale(0); }
                }

                @keyframes loading-orbit {
                    0% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-40px) scale(0.5); }
                    50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-80px) scale(1); }
                    100% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-40px) scale(0.5); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }

                /* Mobile-specific adjustments */
                @media (max-width: 640px) {
                    @keyframes celebration-burst {
                        0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-15px) scale(0); }
                        50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-60px) scale(1); }
                        100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-120px) scale(0); }
                    }

                    @keyframes loading-orbit {
                        0% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-30px) scale(0.5); }
                        50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-50px) scale(1); }
                        100% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-30px) scale(0.5); }
                    }
                }
            `}</style>
        </div>
    );
}