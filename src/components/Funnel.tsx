"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, Car, Calendar, Book, Shield, Crown, Rocket, Sparkles, Star } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

interface Option {
    value: string;
    label: string;
    emoji: string;
    description: string;
    gradient: string;
    glow: string;
}

interface Question {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string;
    options: Option[];
}

interface SelectedAnswers {
    [questionId: string]: Option;
}

const BabyNutritionFunnel = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [celebrationMode, setCelebrationMode] = useState<boolean>(false);

    // Define questions array at the top
    const questions: Question[] = [
        {
            id: 'baby_age',
            title: "What's your baby's age?",
            subtitle: "This helps us provide age-appropriate nutrition guidance",
            icon: <Car className="w-5 h-5 sm:w-8 sm:h-8" />,
            gradient: "from-pink-500 via-rose-500 to-pink-600",
            options: [
                {
                    value: '0-4months',
                    label: 'Newborn - 4 months',
                    emoji: '👶',
                    description: 'Exclusively breastfeeding/formula',
                    gradient: 'from-pink-400 via-rose-400 to-pink-500',
                    glow: 'shadow-pink-500/30'
                },
                {
                    value: '4-6months',
                    label: '4-6 months',
                    emoji: '🍼',
                    description: 'Ready to start solids',
                    gradient: 'from-purple-400 via-violet-400 to-purple-500',
                    glow: 'shadow-purple-500/30'
                },
                {
                    value: '6-12months',
                    label: '6-12 months',
                    emoji: '🥄',
                    description: 'Exploring first foods',
                    gradient: 'from-emerald-400 via-teal-400 to-emerald-500',
                    glow: 'shadow-emerald-500/30'
                },
                {
                    value: '12+months',
                    label: '12+ months',
                    emoji: '🍽️',
                    description: 'Eating family meals',
                    gradient: 'from-amber-400 via-orange-400 to-amber-500',
                    glow: 'shadow-amber-500/30'
                }
            ]
        },
        {
            id: 'experience',
            title: "How familiar are you with baby nutrition?",
            subtitle: "We'll tailor our guidance to your experience level",
            icon: <Book className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-purple-500 via-violet-500 to-purple-600",
            options: [
                {
                    value: 'beginner',
                    label: 'Complete beginner',
                    emoji: '🌱',
                    description: 'I need guidance on everything',
                    gradient: 'from-green-400 via-emerald-400 to-green-500',
                    glow: 'shadow-green-500/30'
                },
                {
                    value: 'some_knowledge',
                    label: 'Some basic knowledge',
                    emoji: '📚',
                    description: 'I know the basics but want to learn more',
                    gradient: 'from-blue-400 via-cyan-400 to-blue-500',
                    glow: 'shadow-blue-500/30'
                },
                {
                    value: 'experienced',
                    label: 'Quite experienced',
                    emoji: '👩‍🍳',
                    description: 'Looking for advanced tips and recipes',
                    gradient: 'from-violet-400 via-purple-400 to-violet-500',
                    glow: 'shadow-violet-500/30'
                }
            ]
        },
        {
            id: 'feeding_approach',
            title: "What's your preferred feeding approach?",
            subtitle: "Every family is different - we support all approaches",
            icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-emerald-500 via-teal-500 to-emerald-600",
            options: [
                {
                    value: 'traditional',
                    label: 'Traditional weaning (purees)',
                    emoji: '🍯',
                    description: 'Starting with smooth purees',
                    gradient: 'from-yellow-400 via-amber-400 to-yellow-500',
                    glow: 'shadow-yellow-500/30'
                },
                {
                    value: 'baby_led',
                    label: 'Baby-led weaning',
                    emoji: '🥕',
                    description: 'Baby self-feeds from the start',
                    gradient: 'from-orange-400 via-red-400 to-orange-500',
                    glow: 'shadow-orange-500/30'
                },
                {
                    value: 'combination',
                    label: 'Combination approach',
                    emoji: '⭐',
                    description: 'Mix of purees and finger foods',
                    gradient: 'from-pink-400 via-rose-400 to-pink-500',
                    glow: 'shadow-pink-500/30'
                },
                {
                    value: 'unsure',
                    label: 'Not sure yet',
                    emoji: '🤔',
                    description: 'Help me decide whats best',
                    gradient: 'from-gray-400 via-slate-400 to-gray-500',
                    glow: 'shadow-gray-500/30'
                }
            ]
        },
        {
            id: 'main_concerns',
            title: "What are your main concerns?",
            subtitle: "We'll address your specific worries with expert guidance",
            icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-red-500 via-rose-500 to-red-600",
            options: [
                {
                    value: 'choking',
                    label: 'Safety & choking prevention',
                    emoji: '🛡️',
                    description: 'Learning safe feeding practices',
                    gradient: 'from-red-400 via-pink-400 to-red-500',
                    glow: 'shadow-red-500/30'
                },
                {
                    value: 'nutrition',
                    label: 'Balanced nutrition',
                    emoji: '⚖️',
                    description: 'Ensuring proper nutrients',
                    gradient: 'from-green-400 via-teal-400 to-green-500',
                    glow: 'shadow-green-500/30'
                },
                {
                    value: 'picky_eating',
                    label: 'Picky eating habits',
                    emoji: '😤',
                    description: 'Encouraging food exploration',
                    gradient: 'from-orange-400 via-amber-400 to-orange-500',
                    glow: 'shadow-orange-500/30'
                },
                {
                    value: 'allergies',
                    label: 'Food allergies',
                    emoji: '⚠️',
                    description: 'Safe introduction of allergens',
                    gradient: 'from-purple-400 via-indigo-400 to-purple-500',
                    glow: 'shadow-purple-500/30'
                }
            ]
        },
        {
            id: 'time_commitment',
            title: "How much time can you dedicate to meal prep?",
            subtitle: "We'll suggest recipes that fit your schedule",
            icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-blue-500 via-cyan-500 to-blue-600",
            options: [
                {
                    value: 'minimal',
                    label: 'Minimal time (5-10 mins)',
                    emoji: '⚡',
                    description: 'Quick and easy recipes',
                    gradient: 'from-yellow-400 via-orange-400 to-yellow-500',
                    glow: 'shadow-yellow-500/30'
                },
                {
                    value: 'moderate',
                    label: 'Some time (15-30 mins)',
                    emoji: '⏰',
                    description: 'Simple cooking with prep',
                    gradient: 'from-blue-400 via-cyan-400 to-blue-500',
                    glow: 'shadow-blue-500/30'
                },
                {
                    value: 'plenty',
                    label: 'Love cooking (30+ mins)',
                    emoji: '👨‍🍳',
                    description: 'Elaborate meals and batch cooking',
                    gradient: 'from-violet-400 via-purple-400 to-violet-500',
                    glow: 'shadow-violet-500/30'
                }
            ]
        },
        {
            id: 'dietary_preferences',
            title: "Any dietary preferences or restrictions?",
            subtitle: "We'll customize recommendations for your family's needs",
            icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-indigo-500 via-blue-500 to-indigo-600",
            options: [
                {
                    value: 'none',
                    label: 'No restrictions',
                    emoji: '🌈',
                    description: 'We eat everything',
                    gradient: 'from-rainbow-400 via-pink-400 to-rainbow-500',
                    glow: 'shadow-pink-500/30'
                },
                {
                    value: 'vegetarian',
                    label: 'Vegetarian',
                    emoji: '🥬',
                    description: 'Plant-based with dairy & eggs',
                    gradient: 'from-green-400 via-lime-400 to-green-500',
                    glow: 'shadow-green-500/30'
                },
                {
                    value: 'vegan',
                    label: 'Vegan',
                    emoji: '🌱',
                    description: 'Completely plant-based',
                    gradient: 'from-emerald-400 via-green-400 to-emerald-500',
                    glow: 'shadow-emerald-500/30'
                },
                {
                    value: 'other',
                    label: 'Other restrictions',
                    emoji: '🔍',
                    description: 'Gluten-free, dairy-free, etc.',
                    gradient: 'from-orange-400 via-yellow-400 to-orange-500',
                    glow: 'shadow-orange-500/30'
                }
            ]
        },
        {
            id: 'budget_range',
            title: "What's your weekly food budget?",
            subtitle: "We'll suggest cost-effective nutrition solutions",
            icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-amber-500 via-yellow-500 to-amber-600",
            options: [
                {
                    value: 'budget',
                    label: 'Budget-friendly ($20-50)',
                    emoji: '💰',
                    description: 'Affordable, nutritious options',
                    gradient: 'from-green-400 via-teal-400 to-green-500',
                    glow: 'shadow-green-500/30'
                },
                {
                    value: 'moderate',
                    label: 'Moderate ($50-100)',
                    emoji: '💳',
                    description: 'Balance of quality and cost',
                    gradient: 'from-blue-400 via-indigo-400 to-blue-500',
                    glow: 'shadow-blue-500/30'
                },
                {
                    value: 'flexible',
                    label: 'Flexible ($100+)',
                    emoji: '✨',
                    description: 'Premium ingredients welcome',
                    gradient: 'from-purple-400 via-pink-400 to-purple-500',
                    glow: 'shadow-purple-500/30'
                },
                {
                    value: 'no_concern',
                    label: 'Budget not a concern',
                    emoji: '👑',
                    description: 'Focus on best nutrition',
                    gradient: 'from-yellow-400 via-orange-400 to-yellow-500',
                    glow: 'shadow-yellow-500/30'
                }
            ]
        },
        {
            id: 'cooking_confidence',
            title: "How confident are you in the kitchen?",
            subtitle: "We'll match recipes to your comfort level",
            icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-rose-500 via-pink-500 to-rose-600",
            options: [
                {
                    value: 'nervous',
                    label: 'Still learning',
                    emoji: '🤗',
                    description: 'Simple step-by-step guidance needed',
                    gradient: 'from-yellow-400 via-amber-400 to-yellow-500',
                    glow: 'shadow-yellow-500/30'
                },
                {
                    value: 'comfortable',
                    label: 'Pretty comfortable',
                    emoji: '😊',
                    description: 'Can follow most recipes',
                    gradient: 'from-green-400 via-emerald-400 to-green-500',
                    glow: 'shadow-green-500/30'
                },
                {
                    value: 'confident',
                    label: 'Very confident',
                    emoji: '👩‍🍳',
                    description: 'Love experimenting with recipes',
                    gradient: 'from-blue-400 via-cyan-400 to-blue-500',
                    glow: 'shadow-blue-500/30'
                }
            ]
        },
        {
            id: 'support_level',
            title: "What kind of support would help you most?",
            subtitle: "We'll provide the guidance that matters to you",
            icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
            gradient: "from-violet-500 via-purple-500 to-violet-600",
            options: [
                {
                    value: 'meal_plans',
                    label: 'Weekly meal plans',
                    emoji: '📋',
                    description: 'Organized schedules & shopping lists',
                    gradient: 'from-indigo-400 via-blue-400 to-indigo-500',
                    glow: 'shadow-indigo-500/30'
                },
                {
                    value: 'recipes',
                    label: 'Recipe collections',
                    emoji: '📚',
                    description: 'Diverse, age-appropriate recipes',
                    gradient: 'from-emerald-400 via-teal-400 to-emerald-500',
                    glow: 'shadow-emerald-500/30'
                },
                {
                    value: 'education',
                    label: 'Nutrition education',
                    emoji: '🎓',
                    description: 'Understanding the why behind feeding',
                    gradient: 'from-purple-400 via-violet-400 to-purple-500',
                    glow: 'shadow-purple-500/30'
                },
                {
                    value: 'community',
                    label: 'Community support',
                    emoji: '🤝',
                    description: 'Connect with other parents',
                    gradient: 'from-pink-400 via-rose-400 to-pink-500',
                    glow: 'shadow-pink-500/30'
                }
            ]
        }
    ];

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

    // Handle browser back button
    useEffect(() => {
        // Get initial step from URL
        const urlParams = new URLSearchParams(window.location.search);
        const stepFromUrl = urlParams.get('step');
        if (stepFromUrl === 'complete') {
            setCelebrationMode(true);
            setCurrentStep(questions.length - 1);
        } else if (stepFromUrl) {
            const stepNumber = parseInt(stepFromUrl, 10);
            if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber < questions.length) {
                setCurrentStep(stepNumber);
            }
        }

        // Handle browser back/forward buttons
        const handlePopState = (event: PopStateEvent) => {
            const step = event.state?.step;
            if (step === 'complete') {
                setCelebrationMode(true);
                setCurrentStep(questions.length - 1);
            } else if (typeof step === 'number' && step >= 0 && step < questions.length) {
                setCelebrationMode(false);
                setCurrentStep(step);
            } else {
                // If no step in state or invalid step, go to first question
                setCelebrationMode(false);
                setCurrentStep(0);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [questions.length]);

    // Update URL when currentStep changes (only when moving forward)
    useEffect(() => {
        const updateURL = (step: number, replace: boolean = false) => {
            const url = new URL(window.location.href);
            if (step === 0) {
                url.searchParams.delete('step');
            } else {
                url.searchParams.set('step', step.toString());
            }

            if (replace) {
                window.history.replaceState({ step }, '', url.toString());
            } else {
                window.history.pushState({ step }, '', url.toString());
            }
        };

        // Only push to history when moving forward, not when initializing
        const urlParams = new URLSearchParams(window.location.search);
        const currentUrlStep = urlParams.get('step');
        const expectedStep = currentStep === 0 ? null : currentStep.toString();

        // Only update URL if it's different from current URL
        if (currentUrlStep !== expectedStep) {
            updateURL(currentStep);
        }
    }, [currentStep]);

    const handleAnswerSelect = (questionId: string, answer: Option) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));

        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                setCelebrationMode(true);
                // Update URL for celebration mode
                const url = new URL(window.location.href);
                url.searchParams.set('step', 'complete');
                window.history.pushState({ step: 'complete' }, '', url.toString());
            }
            setIsAnimating(false);
        }, 1000);
    };

    const goBack = () => {
        if (currentStep > 0 && !isAnimating) {
            window.history.back(); // Use browser's back button functionality
        }
    };

    const currentQuestion = questions[currentStep];
    const progressPercentage = ((currentStep + 1) / questions.length) * 100;

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
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-screen flex flex-col justify-center">
                {/* Header with Enhanced Progress */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
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

                    <h2 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 opacity-90 px-2">
                        Lets Personalize Your Journey
                    </h2>
                    <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 opacity-80 px-2">
                        Answer a few quick questions to get personalized nutrition recommendations
                    </p>

                    {/* Enhanced Progress Bar */}
                    <div className="max-w-xs sm:max-w-md mx-auto mb-3 sm:mb-4 px-4">
                        <div className="h-2 sm:h-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                <div className="absolute right-0 top-0 h-full w-6 sm:w-8 bg-gradient-to-l from-white/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                        Question {currentStep + 1} of {questions.length}
                    </p>
                </div>

                {/* Question Container */}
                {!celebrationMode && (
                    <div
                        key={currentStep}
                        className="max-w-3xl mx-auto transform transition-all duration-700 ease-out"
                        style={{
                            opacity: isAnimating ? 0.3 : 1,
                            transform: isAnimating ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)'
                        }}
                    >
                        {/* Question Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r ${currentQuestion.gradient} rounded-full shadow-2xl ${currentQuestion.options[0]?.glow} mb-6 sm:mb-8 relative`}>
                                <div className="text-white">
                                    {currentQuestion.icon}
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-r ${currentQuestion.gradient} rounded-full animate-ping opacity-20`}></div>
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 px-2">
                                {currentQuestion.title}
                            </h3>
                            <p className="text-base sm:text-xl text-gray-300 opacity-80 px-2">
                                {currentQuestion.subtitle}
                            </p>
                        </div>

                        {/* Answer Options Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={option.value}
                                    className={`group cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 ${selectedAnswers[currentQuestion.id]?.value === option.value
                                        ? 'scale-105 -translate-y-1 sm:-translate-y-2'
                                        : ''
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                                >
                                    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 ${selectedAnswers[currentQuestion.id]?.value === option.value
                                        ? 'bg-white/10 border-white/30'
                                        : ''
                                        }`}>
                                        {/* Card glow effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>

                                        <div className="relative z-10">
                                            <div className="flex items-start space-x-3 sm:space-x-4">
                                                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${option.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg ${option.glow} transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110 flex-shrink-0`}>
                                                    <span className="text-lg sm:text-2xl">{option.emoji}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                                                        {option.label}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                                                        {option.description}
                                                    </p>
                                                </div>
                                                <div className={`text-white/50 group-hover:text-white transition-all duration-500 flex-shrink-0 ${selectedAnswers[currentQuestion.id]?.value === option.value
                                                    ? 'text-white scale-125'
                                                    : ''
                                                    }`}>
                                                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center px-2">
                            <button
                                onClick={goBack}
                                disabled={currentStep === 0}
                                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20"
                            >
                                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Back</span>
                            </button>

                            <div className="text-center flex-1 px-4">
                                <p className="text-xs sm:text-sm text-gray-400">
                                    {currentStep === questions.length - 1 ? 'Almost done! ✨' : 'Select an option to continue'}
                                </p>
                            </div>

                            <div className="w-16 sm:w-24"></div>
                        </div>
                    </div>
                )}

                {/* Celebration Mode */}
                {celebrationMode && (
                    <div className="text-center py-12 sm:py-16 animate-fadeIn px-4">
                        <div className="relative mb-8 sm:mb-12">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/50 relative">
                                <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-spin opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full animate-ping opacity-30"></div>
                            </div>

                            {/* Celebration particles */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '2s',
                                        animationName: 'celebration-burst',
                                        animationTimingFunction: 'ease-out',
                                        animationIterationCount: 'infinite',
                                        transform: `rotate(${i * 30}deg) translateY(-40px)`,
                                        '--rotation': `${i * 30}deg`
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse">
                            Perfect! 🎉
                        </h2>
                        <p className="text-lg sm:text-2xl text-white/80 mb-8 sm:mb-12">
                            We’re preparing your personalized nutrition guide...
                        </p>

                        <button className="group relative inline-flex items-center space-x-2 sm:space-x-3 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:animate-bounce" />
                            <span className="relative z-10">Get My Personalized Guide</span>
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:animate-spin" />
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
                }
            `}</style>
        </div>
    );
};

export default BabyNutritionFunnel;