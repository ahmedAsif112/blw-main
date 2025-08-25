'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, X, RefreshCw, Sparkles } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

export default function CancelPage() {
    const router = useRouter();
    const [particles, setParticles] = useState<Particle[]>([]);

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            delay: Math.random() * 4,
            duration: Math.random() * 10 + 15,
        }));
        setParticles(newParticles);
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
                <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-400/20 to-red-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
                <div className="text-center py-12 sm:py-16 animate-fadeIn px-4 max-w-4xl mx-auto">

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

                    {/* Cancel Icon with Animation */}
                    <div className="relative mb-8 sm:mb-12">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/50 relative">
                            <X className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 rounded-full animate-pulse opacity-30"></div>
                        </div>

                        {/* Gentle floating particles around cancel icon */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-60"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: '4s',
                                    animationName: 'gentle-float',
                                    animationTimingFunction: 'ease-in-out',
                                    animationIterationCount: 'infinite',
                                    transform: `rotate(${i * 45}deg) translateY(-60px)`,
                                    '--rotation': `${i * 45}deg`
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>

                    {/* Main Message */}
                    <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent mb-6 sm:mb-8">
                        Payment Canceled
                    </h2>

                    {/* Message Card */}
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-rose-400/10 to-red-500/10 rounded-2xl sm:rounded-3xl"></div>

                        <div className="relative z-10 space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                                <span className="text-lg sm:text-xl font-semibold text-white">
                                    No worries at all!
                                </span>
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                            </div>

                            <p className="text-lg sm:text-2xl text-red-300 font-semibold leading-relaxed">
                                ❌ Payment canceled. Try again when you’re ready.
                            </p>

                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                Your personalized nutrition guide is still waiting for you. Take your time, and when you’re ready to transform your baby’s eating journey, we’ll be here!
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Primary Action - Go Back to Checkout */}
                        <div>
                            <button
                                onClick={() => router.push('/checkout')}
                                className="group relative inline-flex items-center space-x-2 sm:space-x-3 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:animate-spin" />
                                <span className="relative z-10">Go Back to Checkout</span>
                            </button>
                        </div>

                        {/* Secondary Action - Alternative options */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => router.push('/')}
                                className="group relative inline-flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20"
                            >
                                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Back to Home</span>
                            </button>
                        </div>
                    </div>

                    {/* Reassurance Message */}
                    <div className="mt-8 sm:mt-12">
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-500/5 rounded-xl sm:rounded-2xl"></div>

                            <div className="relative z-10">
                                <p className="text-sm sm:text-base text-gray-400 text-center">
                                    💝 Your personalized recommendations are safe and will be available whenever you’re ready to continue your journey.
                                </p>
                            </div>
                        </div>
                    </div>
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
                
                @keyframes gentle-float {
                    0% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-40px) scale(0.8); }
                    50% { opacity: 0.8; transform: rotate(var(--rotation, 0deg)) translateY(-80px) scale(1.2); }
                    100% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-40px) scale(0.8); }
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
                    @keyframes gentle-float {
                        0% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-30px) scale(0.8); }
                        50% { opacity: 0.8; transform: rotate(var(--rotation, 0deg)) translateY(-50px) scale(1.1); }
                        100% { opacity: 0.3; transform: rotate(var(--rotation, 0deg)) translateY(-30px) scale(0.8); }
                    }
                }
            `}</style>
        </div>
    );
}