"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, RefreshCw, Shield, Zap, Crown, Rocket, Sparkles, Heart, Star, Lock, Eye, Globe } from 'lucide-react';
import { useRouter } from "next/navigation";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

interface TermsSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    gradient: string;
    content: React.ReactNode;
}

const TermsConditionsPage = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [activeSection, setActiveSection] = useState<string>('');
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();

    const handleSelect = () => {
        router.push("/funnel");
    }

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 3,
            delay: Math.random() * 4,
            duration: Math.random() * 20 + 15,
        }));
        setParticles(newParticles);
    }, []);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('[data-section]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const sections: TermsSection[] = [
        {
            id: 'acceptance',
            title: 'Acceptance of Terms',
            icon: <Scale className="w-6 h-6" />,
            gradient: 'from-blue-500 via-cyan-500 to-blue-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 border border-blue-400/20 backdrop-blur-lg hover:border-blue-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <FileText className="w-6 h-6 text-white group-hover:animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Welcome to Little Bites</h3>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                By accessing or using our baby nutrition app, you agree to be bound by these Terms and Conditions. These terms govern your relationship with Little Bites and outline your rights and responsibilities as a user.
                            </p>
                            <p className="text-blue-300 font-semibold">
                                If you do not agree with any part of these terms, please do not use our service.
                            </p>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-cyan-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            )
        },
        {
            id: 'service-description',
            title: 'Service Description',
            icon: <Heart className="w-6 h-6" />,
            gradient: 'from-pink-500 via-rose-500 to-pink-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 border border-pink-400/20 backdrop-blur-lg hover:border-pink-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                                            <Star className="w-4 h-4 text-white animate-pulse" />
                                        </div>
                                        <span className="text-white font-semibold">Personalized meal plans</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
                                        </div>
                                        <span className="text-white font-semibold">Age-appropriate recipes</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-white animate-pulse" style={{ animationDelay: '1s' }} />
                                        </div>
                                        <span className="text-white font-semibold">Nutrition guidance</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                                            <Crown className="w-4 h-4 text-white animate-pulse" style={{ animationDelay: '1.5s' }} />
                                        </div>
                                        <span className="text-white font-semibold">Expert recommendations</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Little Bites provides educational content and meal planning tools for baby nutrition. Our service is designed to support parents in creating healthy eating habits for their children.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                </div>
            )
        },
        {
            id: 'user-responsibilities',
            title: 'User Responsibilities',
            icon: <Shield className="w-6 h-6" />,
            gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 border border-emerald-400/20 backdrop-blur-lg hover:border-emerald-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20 transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 text-white animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Medical Consultation</h4>
                                    <p className="text-gray-300">Always consult with your pediatrician before introducing new foods or making dietary changes for your baby.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20 transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Lock className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Account Security</h4>
                                    <p className="text-gray-300">You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20 transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '1s' }} />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Appropriate Use</h4>
                                    <p className="text-gray-300">Use our service only for its intended purpose and in compliance with all applicable laws and regulations.</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                </div>
            )
        },
        {
            id: 'refund-policy',
            title: 'Refund Policy',
            icon: <RefreshCw className="w-6 h-6" />,
            gradient: 'from-red-500 via-orange-500 to-red-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 border border-red-400/20 backdrop-blur-lg hover:border-red-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/30 group-hover:scale-110 transition-transform duration-500">
                                    <AlertTriangle className="w-10 h-10 text-white group-hover:animate-pulse" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">No Refunds Policy</h3>
                            </div>

                            <div className="space-y-6 text-center">
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    All purchases made through Little Bites are <span className="text-red-300 font-semibold">final and non-refundable</span>. This includes but is not limited to:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20">
                                        <p className="text-white font-semibold mb-2">Premium Subscriptions</p>
                                        <p className="text-gray-300 text-sm">Monthly or annual plans</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20">
                                        <p className="text-white font-semibold mb-2">In-App Purchases</p>
                                        <p className="text-gray-300 text-sm">Additional content and features</p>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 rounded-2xl bg-orange-500/10 border border-orange-400/20">
                                    <p className="text-orange-300 font-semibold text-lg">
                                        By completing any purchase, you acknowledge and agree to this no-refund policy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-400/20 rounded-full blur-2xl animate-ping"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>
            )
        },
        {
            id: 'disclaimers',
            title: 'Medical Disclaimers',
            icon: <AlertTriangle className="w-6 h-6" />,
            gradient: 'from-amber-500 via-yellow-500 to-amber-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 border border-amber-400/20 backdrop-blur-lg hover:border-amber-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/30">
                                    <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Important Medical Information</h3>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-6">
                                <p className="text-gray-300 text-lg leading-relaxed text-center">
                                    Little Bites provides <span className="text-amber-300 font-semibold">educational content only</span> and is not a substitute for professional medical advice, diagnosis, or treatment.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                                    <span className="text-gray-300">Always consult your pediatrician for medical concerns</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <span className="text-gray-300">We do not provide medical diagnoses or treatment</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                    <span className="text-gray-300">Individual results and needs may vary</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                </div>
            )
        },
        {
            id: 'termination',
            title: 'Termination',
            icon: <Zap className="w-6 h-6" />,
            gradient: 'from-purple-500 via-violet-500 to-purple-600',
            content: (
                <div className="space-y-6">
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 border border-purple-400/20 backdrop-blur-lg hover:border-purple-400/40 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                                    <Zap className="w-8 h-8 text-white group-hover:animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Account Termination</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 transition-all duration-300">
                                    <h4 className="text-white font-semibold mb-3">You may terminate your account at any time</h4>
                                    <p className="text-gray-300">Simply contact our support team or use the account deletion feature in your settings.</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 transition-all duration-300">
                                    <h4 className="text-white font-semibold mb-3">We may suspend or terminate accounts for:</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        <li>• Violation of these terms</li>
                                        <li>• Fraudulent or abusive behavior</li>
                                        <li>• Legal requirements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute bg-gradient-to-r from-pink-400 to-violet-400 rounded-full opacity-20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            animation: 'float infinite ease-in-out'
                        }}
                    />
                ))}

                {/* Animated Gradients */}
                <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-violet-600/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-br from-cyan-400/15 to-emerald-600/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/15 to-pink-600/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Header */}
            <div className="relative z-10 pt-8 pb-12">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">🍼</span>
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                Little Bites
                            </h1>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/50 relative">
                                <Scale className="w-12 h-12 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-pulse opacity-30"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                            Terms & <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Conditions</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                            Clear guidelines for using Little Bites. By using our app, you agree to these terms and conditions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
                {/* Terms Sections */}
                <div className="space-y-16">
                    {sections.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            data-section
                            className={`transform transition-all duration-1000 ${isVisible[section.id] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${section.gradient} rounded-full shadow-2xl mb-6 relative hover:scale-110 transition-transform duration-500`}>
                                    <div className="text-white text-2xl">
                                        {section.icon}
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-full animate-ping opacity-20`}></div>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                    {section.title}
                                </h2>
                            </div>

                            {/* Section Content */}
                            <div className="text-white">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="text-center mt-20 py-16 bg-gradient-to-r from-pink-500/10 to-violet-500/10 backdrop-blur-md border border-white/10 rounded-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-violet-500/5 opacity-50"></div>
                    <div className="relative z-10">
                        <div className="mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/30 relative">
                                <Rocket className="w-8 h-8 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-spin opacity-20"></div>
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                            Ready to Begin?
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            By continuing, you agree to these terms and are ready to start your personalized baby nutrition journey.
                        </p>

                        <button
                            onClick={() => router.push("/funnel")}
                            className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white text-lg font-semibold rounded-full shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Sparkles className="w-6 h-6 relative z-10 group-hover:animate-pulse" />
                            <span className="relative z-10">I Agree - Start My Journey</span>
                            <Rocket className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
                        </button>
                    </div>

                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-400/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-violet-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-15px) rotate(90deg); }
                    50% { transform: translateY(-25px) rotate(180deg); }
                    75% { transform: translateY(-15px) rotate(270deg); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.6; }
                }

                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-8px); }
                    70% { transform: translateY(-4px); }
                    90% { transform: translateY(-2px); }
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #ec4899, #8b5cf6);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #db2777, #7c3aed);
                }

                /* Mobile optimizations */
                @media (max-width: 640px) {
                    .sticky {
                        position: relative;
                    }
                }

                /* Enhanced hover effects */
                .group:hover .animate-pulse {
                    animation-duration: 0.5s;
                }

                .group:hover .animate-ping {
                    animation-duration: 1s;
                }
            `}</style>
        </div>
    );
};

export default TermsConditionsPage;