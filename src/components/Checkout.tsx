'use client';
import { useEffect, useState } from 'react';
import { Crown, Sparkles, Heart, Book, Star, CheckCircle, Clock, Zap } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

const plans = [
    {
        id: '4w',
        title: 'Baby Led Weaning Complete Bundle',
        subtitle: 'Everything you need for successful BLW journey',
        newPrice: '$34.99',
        features: [
            '6 Premium BLW Recipe Books',
            'Age-appropriate meal plans',
            'Safety guidelines & tips',
            'Nutritional guidance',
            'Finger food recipes',
            'Allergen introduction guide'
        ]
    },
];

export default function PlanPage() {
    const [selectedPlan, setSelectedPlan] = useState('4w');
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            delay: Math.random() * 4,
            duration: Math.random() * 8 + 12,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedEmail = localStorage?.getItem('userEmail');
        const storedGender = localStorage?.getItem('gender');
        if (storedEmail) setEmail(storedEmail);
        if (storedGender === 'Male' || storedGender === 'Female') setGender(storedGender);
    }, []);

    const formatTime = () => {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const genderLabel = gender === 'Female' ? 'moms' : 'parents';

    const handleCheckout = async () => {
        setIsLoading(true);

        // Simulate API call with animation
        setTimeout(async () => {
            try {
                const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ planId: selectedPlan }),
                });

                if (!res.ok) {
                    alert('Failed to create payment session');
                    setIsLoading(false);
                    return;
                }

                let data;
                try {
                    data = await res.json();
                } catch (err) {
                    alert('Invalid server response. Please try again.');
                    setIsLoading(false);
                    return;
                }

                if (data?.url) {
                    window.location.href = data.url;
                } else {
                    alert('Payment session creation failed.');
                    setIsLoading(false);
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
                setIsLoading(false);
            }
        }, 1000);
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

                {/* Animated Gradients */}
                <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-violet-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-emerald-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Timer Header */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-pink-500/90 via-violet-500/90 to-cyan-500/90 backdrop-blur-md border-b border-white/10 text-white text-center py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-2xl">
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="text-xs sm:text-sm">Limited Time Offer expires in: </span>
                    <span className="font-bold bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm text-xs sm:text-sm">
                        {formatTime()}
                    </span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce text-yellow-300" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-8 pb-16 sm:pb-24">

                {/* Header with Brand */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/30 mr-3 sm:mr-4">
                                <span className="text-lg sm:text-2xl">🍼</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Little Bites
                        </h1>
                    </div>
                </div>

                {/* Personalization Card */}
                <div className="bg-gradient-to-br from-purple-500/90 via-violet-500/90 to-purple-700/90 backdrop-blur-md border border-white/10 text-white rounded-3xl p-6 text-center mb-8 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20 animate-pulse"></div>

                    <div className="relative z-10">
                        <div className="bg-purple-800/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-4 text-sm border border-white/20">
                            <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 animate-pulse text-pink-300" />
                                <span>{email || 'Welcome Parent!'}</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center space-x-2">
                            <Crown className="w-6 h-6 text-yellow-300" />
                            <span>Your Personalized BLW Plan is Ready</span>
                            <Sparkles className="w-6 h-6 text-cyan-300 animate-spin" />
                        </h2>

                        <div className="grid grid-cols-1 gap-2 text-sm text-left max-w-md mx-auto">
                            {[
                                `Perfect for ${genderLabel} starting BLW journey`,
                                'Age-appropriate nutrition guidance',
                                'Safe finger food introduction',
                                'Allergen management support'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 opacity-90" style={{ animationDelay: `${index * 200}ms` }}>
                                    <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0 animate-pulse" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bundle Showcase */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8 transform hover:bg-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-violet-500/5 animate-pulse"></div>

                    <div className="relative z-10 text-center">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-gradient-to-br from-pink-400/20 to-violet-400/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transform hover:scale-105 transition-all duration-500 hover:shadow-lg" style={{ animationDelay: `${i * 100}ms` }}>
                                    <Book className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                                    <p className="text-white text-xs font-medium">BLW Guide {i + 1}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                                <Star className="w-6 h-6 text-yellow-300 animate-bounce" />
                                <span>Bundle of Six BLW Books</span>
                                <Star className="w-6 h-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
                            </h3>
                            <p className="text-white/80 text-lg">Complete Baby Led Weaning Resource Collection</p>
                        </div>
                    </div>
                </div>

                {/* Plan Selection */}
                <h3 className="text-xl font-bold mb-6 text-center text-white">Get visible results with our complete plan</h3>

                <div className="space-y-4 mb-8">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`group block cursor-pointer transform transition-all duration-500 hover:scale-105 ${selectedPlan === plan.id ? 'scale-105' : ''
                                }`}
                        >
                            <div className={`relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border transition-all duration-500 p-6 ${selectedPlan === plan.id
                                ? 'border-pink-500/50 bg-white/10 shadow-2xl shadow-pink-500/20'
                                : 'border-white/10 hover:border-white/20 hover:bg-white/8'
                                }`}>
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selectedPlan === plan.id ? 'opacity-100' : ''
                                    }`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="radio"
                                            name="plan"
                                            checked={selectedPlan === plan.id}
                                            onChange={() => setSelectedPlan(plan.id)}
                                            className="mt-2 w-5 h-5 accent-pink-500 cursor-pointer"
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-white text-lg">{plan.title}</h4>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                                                        {plan.newPrice}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-white/70 text-sm mb-4">{plan.subtitle}</p>

                                            <div className="grid grid-cols-1 gap-2">
                                                {plan.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2 text-sm text-white/80">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="group relative w-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 hover:from-pink-600 hover:via-violet-600 hover:to-cyan-600 text-white font-bold py-4 rounded-full transition-all duration-500 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex items-center justify-center space-x-3">
                        {isLoading ? (
                            <>
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Crown className="w-6 h-6 group-hover:animate-bounce" />
                                <span>Get My BLW Bundle Now</span>
                                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                            </>
                        )}
                    </div>
                </button>

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                        <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Instant Access</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Expert Approved</span>
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
            `}</style>
        </div>
    );
}