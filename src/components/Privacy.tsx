"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, Database, Mail, Globe, Smartphone, AlertCircle, CheckCircle, Heart, Star, Sparkles, Crown, Rocket } from 'lucide-react';
import { useRouter } from "next/navigation";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

interface PolicySection {
    id: string;
    title: string;
    icon: React.ReactNode;
    gradient: string;
    content: React.ReactNode;
}

const PrivacyPolicyPage = () => {
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
        const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 4,
            duration: Math.random() * 15 + 10,
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
            { threshold: 0.3 }
        );

        const elements = document.querySelectorAll('[data-section]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const sections: PolicySection[] = [
        {
            id: 'information-collection',
            title: 'Information We Collect',
            icon: <Database className="w-6 h-6" />,
            gradient: 'from-blue-500 via-cyan-500 to-blue-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <Eye className="w-5 h-5 text-blue-400 mr-2 group-hover:animate-pulse" />
                                Personal Information
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span> email address when you create an account</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>Baby’s age and dietary preferences for personalization</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>Cooking experience and time preferences</span>
                                </li>
                            </ul>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400/30 rounded-full blur-lg animate-pulse"></div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <Smartphone className="w-5 h-5 text-purple-400 mr-2 group-hover:animate-pulse" />
                                Technical Information
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>Device type and operating system</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>IP address and general location</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>Usage patterns and feature preferences</span>
                                </li>
                            </ul>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-400/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                </div>
            )
        },
        {
            id: 'how-we-use',
            title: 'How We Use Your Information',
            icon: <Heart className="w-6 h-6" />,
            gradient: 'from-pink-500 via-rose-500 to-pink-600',
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-pink-500/20 hover:shadow-pink-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Personalization</h4>
                                <p className="text-gray-300">Create customized meal plans and recipe recommendations based on your baby’s age, dietary needs, and your preferences.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Shield className="w-6 h-6 text-white group-hover:animate-pulse" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Safety & Support</h4>
                                <p className="text-gray-300">Provide age-appropriate safety guidelines and respond to your questions about baby nutrition and feeding.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-violet-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Mail className="w-6 h-6 text-white group-hover:animate-pulse" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Communication</h4>
                                <p className="text-gray-300">Send you important updates, new recipes, and helpful tips for your baby’s developmental stage.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <Star className="w-6 h-6 text-white group-hover:animate-pulse" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Improvement</h4>
                                <p className="text-gray-300">Analyze usage patterns to improve our app features and develop new content that better serves families.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'data-sharing',
            title: 'Information Sharing',
            icon: <Users className="w-6 h-6" />,
            gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-red-400/40 shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center mb-4">
                                <AlertCircle className="w-6 h-6 text-red-400 mr-3 group-hover:animate-pulse" />
                                <h4 className="text-xl font-bold text-white">We Never Sell Your Data</h4>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Your personal information and your baby’s details are never sold, rented, or shared for marketing purposes. Your trust is our priority.
                            </p>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400/30 rounded-full blur-lg animate-ping"></div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white mb-4">Limited Sharing Scenarios:</h4>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-2">🔒 Service Providers</h5>
                                <p className="text-gray-300">Trusted partners who help us deliver our service (like email delivery or payment processing) under strict confidentiality agreements.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/30 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-2">⚖️ Legal Requirements</h5>
                                <p className="text-gray-300">Only when required by law or to protect the safety of our users and the public.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-2">📊 Anonymous Analytics</h5>
                                <p className="text-gray-300">Aggregated, non-identifiable data to understand usage patterns and improve our service.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'data-security',
            title: 'Data Security',
            icon: <Lock className="w-6 h-6" />,
            gradient: 'from-purple-500 via-violet-500 to-purple-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-8 rounded-3xl border border-purple-200/50">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/30">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">Enterprise-Grade Security</h4>
                            <p className="text-gray-600">Your family’s data deserves the highest level of protection</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                            <Lock className="w-4 h-4 text-white" />
                                        </div>
                                        <h5 className="font-semibold text-white">SSL Encryption</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm">All data transmitted between your device and our servers is encrypted using industry-standard SSL technology.</p>
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400/20 rounded-full blur-lg animate-pulse"></div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                            <Database className="w-4 h-4 text-white" />
                                        </div>
                                        <h5 className="font-semibold text-white">Secure Storage</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm">Your data is stored on secure, regularly backed-up servers with restricted access and monitoring.</p>
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                            <Eye className="w-4 h-4 text-white" />
                                        </div>
                                        <h5 className="font-semibold text-white">Access Controls</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm">Only authorized personnel with legitimate need can access your information, with all access logged and monitored.</p>
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                        <h5 className="font-semibold text-white">Regular Audits</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm">We conduct regular security assessments and updates to maintain the highest protection standards.</p>
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'your-rights',
            title: 'Your Rights & Choices',
            icon: <Crown className="w-6 h-6" />,
            gradient: 'from-amber-500 via-yellow-500 to-amber-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200/50">
                        <div className="flex items-center mb-4">
                            <Crown className="w-8 h-8 text-amber-500 mr-3" />
                            <h4 className="text-xl font-bold text-gray-800">You’re in Control</h4>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            You have complete control over your personal information and how it’s used in our app.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                    <h5 className="font-semibold text-white text-lg">Access & View</h5>
                                </div>
                                <p className="text-gray-300">Request a copy of all personal information we have about you and your baby at any time.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <h5 className="font-semibold text-white text-lg">Update & Correct</h5>
                                </div>
                                <p className="text-gray-300">Easily update your information through your account settings or by contacting our support team.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        <AlertCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <h5 className="font-semibold text-white text-lg">Delete Account</h5>
                                </div>
                                <p className="text-gray-300">Request complete deletion of your account and all associated data whenever you choose.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-violet-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <h5 className="font-semibold text-white text-lg">Communication Control</h5>
                                </div>
                                <p className="text-gray-300">Choose what emails you receive and unsubscribe from marketing communications at any time.</p>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'children-privacy',
            title: 'Children\'s Privacy',
            icon: <Heart className="w-6 h-6" />,
            gradient: 'from-pink-500 via-rose-500 to-pink-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-3xl border border-pink-200/50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-pink-500/30">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-4">Protecting Little Ones</h4>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                                We are committed to protecting children’s privacy and comply with all applicable children’s privacy laws, including COPPA in the United States.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-3 flex items-center">
                                    <Shield className="w-5 h-5 text-pink-400 mr-2 group-hover:animate-pulse" />
                                    No Direct Collection from Children
                                </h5>
                                <p className="text-gray-300">We do not knowingly collect personal information directly from children under 13. All information is collected from parents and caregivers.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400/20 rounded-full blur-lg animate-pulse"></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-3 flex items-center">
                                    <Lock className="w-5 h-5 text-pink-400 mr-2 group-hover:animate-pulse" />
                                    Parental Control
                                </h5>
                                <p className="text-gray-300">Parents have complete control over what information is shared about their children and can request deletion at any time.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h5 className="font-semibold text-white mb-3 flex items-center">
                                    <CheckCircle className="w-5 h-5 text-pink-400 mr-2 group-hover:animate-pulse" />
                                    Limited Use
                                </h5>
                                <p className="text-gray-300">Any information about children is used solely to provide age-appropriate nutrition guidance and safety recommendations.</p>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'contact',
            title: 'Contact Us',
            icon: <Mail className="w-6 h-6" />,
            gradient: 'from-violet-500 via-purple-500 to-violet-600',
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-8 rounded-3xl border border-violet-200/50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-violet-500/30">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-4">Questions About Privacy?</h4>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We’re here to help! Contact us anytime with questions about your privacy or how we handle your data.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-center">
                                <h5 className="text-xl font-semibold text-white mb-4">Get in Touch</h5>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center space-x-3">
                                        <Mail className="w-5 h-5 text-violet-400 group-hover:animate-pulse" />
                                        <a href="mailto:communityblw@gmail.com" className="text-violet-400 hover:text-violet-300 font-semibold text-lg transition-colors duration-300">
                                            communityblw@gmail.com
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center space-x-3">
                                        <Globe className="w-5 h-5 text-violet-400 group-hover:animate-pulse" />
                                        <span className="text-gray-300">Response within 24 hours</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mt-6">
                                    Last updated: August 24, 2025
                                </p>
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-400/30 rounded-full blur-lg animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-400/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
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

            {/* Header */}
            <div className="relative z-10 pt-8 pb-12">
                <div className="max-w-4xl mx-auto px-6">
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
                                <Shield className="w-12 h-12 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-pulse opacity-30"></div>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                            Privacy <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Policy</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Your familys privacy is our top priority. Learn how we protect and safeguard your personal information.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
                {/* Privacy Policy Sections */}
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
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
                                {/* Section Header */}
                                <div className="text-center mb-12">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${section.gradient} rounded-full shadow-2xl mb-6 relative group-hover:scale-110 transition-transform duration-500`}>
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
                            </div>
                        </section>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="text-center mt-20 py-16 bg-gradient-to-r from-pink-500/10 to-violet-500/10 backdrop-blur-md border border-white/10 rounded-3xl">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/30 relative">
                            <Rocket className="w-8 h-8 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-spin opacity-20"></div>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Now that you understand how we protect your privacy, join thousands of families creating healthy eating habits.
                    </p>

                    <button
                        onClick={() => {

                            handleSelect();
                        }} className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white text-lg font-semibold rounded-full shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Sparkles className="w-6 h-6 relative z-10 group-hover:animate-pulse" />
                        <span className="relative z-10">Begin Personalized Journey</span>
                        <Rocket className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
                    </button>
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

                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
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
            `}</style>
        </div>
    );
};

export default PrivacyPolicyPage;