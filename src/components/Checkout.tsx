'use client';
import React, { useEffect, useState } from 'react';
import { Crown, Timer, CheckCircle, BookOpen, Star } from 'lucide-react';

export default function BLWPlanPage() {
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    const handlePaypalCheckout = async () => {
        const res = await fetch("/api/paypal", { method: "POST" });
        if (!res.ok) {
            alert("Failed to create PayPal order");
            return;
        }
        const data = await res.json();
        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert("PayPal order creation failed");
        }
    };

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
        if (storedGender) setGender(storedGender);
    }, []);

    const formatTime = () => {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const genderLabel = gender === 'Female' ? 'moms' : 'parents';

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ planId: '4w', email }),
        });

        if (!res.ok) {
            alert('Failed to create payment session');
            return;
        }

        let data;
        try {
            data = await res.json();
        } catch (err) {
            alert('Invalid server response. Please try again.');
            return;
        }

        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert('Payment session creation failed.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Timer Bar */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white text-center py-3 shadow-lg">
                <div className="flex items-center justify-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm font-medium">Limited Time Offer expires in:</span>
                    <span className="font-bold bg-white/20 px-3 py-1 rounded-full">
                        {formatTime()}
                    </span>
                    <span className="text-yellow-300">⚡</span>
                </div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 pt-8 pb-16">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center space-x-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-2xl">🍼</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Little Bites</h1>
                    </div>
                </div>

                {/* Email Card */}
                <div className="bg-gradient-to-br from-purple-500/90 to-purple-600/90 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-2xl">
                    <div className="text-center">
                        <div className="inline-flex items-center bg-purple-600/50 px-4 py-2 rounded-full mb-4">
                            <span className="text-white text-sm">💌 {email || 'ahmeddeveloper112@gmail.com'}</span>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                            <Crown className="w-5 h-5 text-yellow-300" />
                            <span>Your Personalized BLW Plan is Ready</span>
                            <span className="text-lg">🎊</span>
                        </h2>

                        <div className="space-y-2 text-left max-w-md mx-auto">
                            <div className="flex items-center space-x-2 text-white text-sm">
                                <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span>Perfect for {genderLabel} starting BLW journey</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white text-sm">
                                <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span>Age-appropriate nutrition guidance</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white text-sm">
                                <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span>Safe finger food introduction</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white text-sm">
                                <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span>Allergen management support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6 Guide Boxes */}
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div key={num} className="bg-gradient-to-br from-purple-500/60 to-pink-500/60 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <BookOpen className="w-10 h-10 text-white mx-auto mb-2" />
                                <p className="text-white font-medium text-sm">BLW Guide {num}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bundle Box */}
                    <div className="bg-gradient-to-br from-pink-300/30 to-rose-300/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-300/30">
                        <h3 className="text-white font-bold text-lg flex items-center justify-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span>Bundle of Six BLW Books</span>
                            <Star className="w-5 h-5 text-yellow-300" />
                        </h3>
                        <p className="text-white/90 text-sm mt-1">Complete Baby Led Weaning Resource Collection</p>
                    </div>
                </div>

                {/* Special Offer Title */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <span className="text-3xl">🔥</span>
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                            Special Checkout Offer
                        </h2>
                        <span className="text-3xl">🔥</span>
                    </div>
                    <p className="text-white text-lg mb-2">
                        Get your <span className="font-semibold">4-Week Baby Led Weaning Bundle</span> for just
                    </p>
                    <div className="text-5xl font-bold">
                        <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">$18.99</span>
                        <span className="text-gray-400 line-through text-2xl ml-2">($197)</span>
                        <span className="text-green-400 text-2xl ml-2">— an insane 90.26% OFF!</span>
                    </div>
                </div>

                {/* Offer Box */}
                <div className="relative border border-purple-500/40 rounded-3xl p-8 bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-800/60 backdrop-blur-md shadow-2xl mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-purple-500/10 blur-xl"></div>

                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <CheckCircle className="w-6 h-6 text-green-400 animate-ping absolute opacity-75" />
                                <CheckCircle className="w-6 h-6 text-green-400 relative" />
                            </div>
                            <span className="text-gray-200 text-base leading-snug">
                                <span className="font-bold text-white">Only $18.99</span> for your 4-week customized BLW plan
                            </span>
                        </li>

                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <span className="text-2xl">🎁</span>
                            </div>
                            <span className="text-gray-200 text-base leading-snug">
                                After purchase, you'll unlock <span className="font-bold text-white">6+ Premium BLW eBooks</span> — <span className="text-yellow-300 font-extrabold">FREE Bonus!</span>
                            </span>
                        </li>
                    </ul>

                    <div className="text-center mt-6 relative z-10">
                        <p className="text-base font-medium bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                            🍼 Don't miss out — start your baby's nutrition journey the right way!
                        </p>
                    </div>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 text-white font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl mb-4 flex items-center justify-center space-x-2"
                >
                    <Crown className="w-5 h-5" />
                    <span>Get My BLW Bundle Now</span>
                    <span>🎁</span>
                </button>



                {/* Trust Indicators */}
                <div className="mt-6 flex items-center justify-center space-x-6 text-white/70 text-sm">
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

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
}