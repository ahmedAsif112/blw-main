'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Baby, ShieldCheck, BookOpen, Star, Users, TrendingUp, Award, Target, CheckCircle, User, Mail, Gift, Phone, Menu, X, Sparkles } from 'lucide-react';
import Mother from "@/assets/Mother.png"
import collage from "@/assets/collagehero.png"
import steps from "@/assets/Steps.png"
import Image from 'next/image';
import { useRouter } from "next/navigation";

const LittleBitesFunnelPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: '', email: '' });
  const [animatedCards, setAnimatedCards] = useState([false, false, false, false]);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    // Animate cards
    const delays = [500, 700, 900, 1100];
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAnimatedCards((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      result: "Transformed Mealtime",
      text: "This guide completely transformed how I approach feeding my baby. The recipes are simple yet nutritious!",
      rating: 5,
      location: "New York, USA"
    },
    {
      name: "Emily Chen",
      result: "Stress-Free Weaning",
      text: "Baby-led weaning seemed scary until I found this comprehensive guide. Now it's enjoyable for both of us!",
      rating: 5,
      location: "Toronto, Canada"
    },
    {
      name: "Maria Rodriguez",
      result: "Perfect Introduction",
      text: "The step-by-step approach made introducing solids stress-free. Highly recommended!",
      rating: 5,
      location: "Madrid, Spain"
    }
  ];

  // Form validation
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value || value.trim().length === 0) {
        error = 'Please enter your full name!';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters long!';
      } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
        error = 'Name should only contain letters and spaces!';
      }
    }

    if (name === 'email') {
      if (!value || value.trim().length === 0) {
        error = 'Please enter your email address!';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address!';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, trimmedValue);
    setFormErrors(prev => ({ ...prev, [name]: error }));

    const updatedFormData = { ...formData, [name]: value };
    const nameError = name === 'name' ? error : validateField('name', updatedFormData.name);
    const emailError = name === 'email' ? error : validateField('email', updatedFormData.email);

    const hasErrors = nameError || emailError;
    const hasAllFields = updatedFormData.name.trim() && updatedFormData.email.trim();

    setIsFormValid(hasAllFields && !hasErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);

    if (nameError || emailError) {
      setFormErrors({ name: nameError, email: emailError });
      return;
    }

    try {
      // Store in localStorage
      localStorage.setItem('name', formData.name.trim());
      localStorage.setItem('userEmail', formData.email.trim());

      setFormSubmitted(true);
      console.log("Form submitted and saved to localStorage:", {
        name: formData.name.trim(),
        email: formData.email.trim()
      });
    } catch (error) {
      console.log("Form submission failed:", error);
    }
  };

  const handleContinueToSurvey = () => {
    router.push("/funnel ")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-200/40 to-rose-200/40 rounded-full opacity-60 blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-rose-200/50 to-pink-200/50 rounded-full opacity-40 blur-lg animate-bounce" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl border border-pink-300/30">
                <span className="text-white font-bold text-xl">🍼</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Little Bites
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Nourishing little ones</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>50,000+ Happy Families</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-7 items-center">
              {/* Content */}
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 font-semibold text-sm border border-pink-200/50 backdrop-blur-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Welcome to Your Baby's Nutrition Journey
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-gray-800">We Provide</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                    Best Nutrition
                  </span>
                  <br />
                  <span className="text-gray-800">For Your Baby</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                  Keeping track of proper nutrition at each stage of your baby's development is overwhelming.
                  We're here to take the guesswork out of feeding with natural, organic, and irresistible recipes
                  trusted by over 50,000 parents worldwide.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Pediatrician Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No Allergens</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 backdrop-blur-sm border border-pink-200/50">
                  {/* Main Visual */}
                  <div className="relative mb-8">
                    <Image
                      src={Mother}
                      alt="Premium ribeye steak"
                      className="w-full h-64 sm:h-80 object-contain rounded-2xl shadow-2xl bg-white"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 to-transparent rounded-2xl" />

                    {/* Floating Quality Badges */}
                    <div className="absolute -top-3 -right-3 bg-white/95 p-3 rounded-xl shadow-lg animate-pulse border border-pink-300/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-pink-500">A+</div>
                        <div className="text-xs text-gray-500">Quality</div>
                      </div>
                    </div>

                    <div className="absolute -bottom-3 -left-3 bg-white/95 p-3 rounded-xl shadow-lg animate-bounce border border-pink-300/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-rose-500">300+</div>
                        <div className="text-xs text-gray-500">Recipes</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-6">
                    <div className="flex justify-center items-center space-x-4 mb-4">
                      <Gift className="text-3xl text-pink-500 animate-bounce" />
                      <h2 className="text-pink-600 text-2xl font-bold">FREE BONUS!</h2>
                      <Gift className="text-3xl text-pink-500 animate-bounce" style={{ animationDelay: "0.5s" }} />
                    </div>

                    <p className="text-rose-600 text-base font-light">
                      Complete our quick survey and get
                    </p>

                    <h1 className="text-pink-600 text-3xl lg:text-4xl font-bold animate-pulse">
                      6+ FREE BABY NUTRITION GUIDES
                    </h1>

                    {/* Green Ribbon Behind Text */}
                    <div className="flex justify-center">
                      <div className="relative inline-block">
                        <div className="bg-green-600 text-white font-bold px-6 py-2 rounded-sm relative z-10">
                          Worth $197 - Yours absolutely free!
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-3 h-0 border-t-[20px] border-b-[20px] border-r-[12px] border-r-green-700 border-t-transparent border-b-transparent"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-3 h-0 border-t-[20px] border-b-[20px] border-l-[12px] border-l-green-700 border-t-transparent border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce" />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
              {!formSubmitted ? (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-800 text-xl font-medium mb-2">
                      Get Your FREE Guides Now!
                    </h3>
                    <p className="text-gray-600 font-light">
                      Enter your details to start your baby's nutrition journey
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-pink-300'
                            }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-pink-300'
                            }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                    >
                      ✨ Get My FREE Guides & Start Journey! →
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm font-light">
                      🔒 100% secure • No spam
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-green-600 text-xl font-medium mb-4">
                    Welcome {formData.name}! 🎉
                  </h3>
                  <p className="text-gray-600 mb-6 font-light">
                    Your free guides are waiting… ⏳ Answer a few quick questions
                  </p>
                  <button
                    onClick={handleContinueToSurvey}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continue to Survey →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "50,000+", label: "Happy Families", icon: <Users className="w-6 h-6" /> },
                { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
                { number: "300+", label: "Tested Recipes", icon: <BookOpen className="w-6 h-6" /> },
                { number: "24/7", label: "Expert Support", icon: <Award className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-2xl text-pink-500 mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                    <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                    Why Choose <span className="text-pink-500">Little Bites</span>
                    <br />
                    <span className="text-rose-500">For Your Baby</span>
                  </h2>
                </div>

                {/* Feature Points */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-2xl border border-pink-200/50 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Age-Appropriate Guidance</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Each section includes developmental changes and nutritional tips for every
                          stage of your child's growth journey.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-2xl border border-pink-200/50 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Safety First</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Learn to distinguish between choking and gagging, with smart kitchen habits
                          to keep your baby safe during meals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-white p-6 rounded-2xl border border-pink-200/50 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">300+ Organic Recipes</h3>
                        <p className="text-gray-600 leading-relaxed">
                          From single-ingredient purees to full meals, discover natural and irresistible
                          recipes for every stage of development.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-3xl p-8 border border-pink-200/50 backdrop-blur-sm">
                  {/* Main image placeholder */}
                  <div className="relative mb-8">
                    <div className="w-full h-80 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl shadow-2xl flex items-center justify-center">
                      <Image
                        src={steps}
                        alt="Premium ribeye steak"
                        className="w-full h-64 sm:h-80 object-contain rounded-2xl shadow-2xl bg-white"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-200/40 to-transparent rounded-2xl" />

                    {/* Floating badges */}
                    <div className="absolute -top-4 -right-4 bg-white/95 p-4 rounded-xl shadow-xl border border-pink-300/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-500">98%</div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-100/60 to-white/80 p-4 rounded-xl border border-pink-200/50 text-center">
                      <div className="text-pink-500 mb-2 flex justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">50,000+</div>
                      <div className="text-xs text-gray-600">Happy Families</div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100/60 to-white/80 p-4 rounded-xl border border-rose-200/50 text-center">
                      <div className="text-rose-500 mb-2 flex justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">24/7</div>
                      <div className="text-xs text-gray-600">Expert Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Baby-Led Weaning Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-7 bg-white">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/50 shadow-xl overflow-hidden rounded-2xl">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-gray-800 text-3xl font-bold mb-4">
                    What is Baby-Led Weaning? 👶
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed font-light">
                    Baby-led weaning is a revolutionary approach to introducing solid foods that allows
                    your baby to self-feed from the very beginning. By offering age-appropriate finger foods
                    and letting your baby explore textures and tastes at their own pace, you support healthy
                    eating habits that last a lifetime.
                  </p>

                  {/* What You Can Feed Section */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <h4 className="text-green-700 mb-3 text-lg font-semibold">
                      What You Can Feed 📝
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-2">
                        <p className="text-gray-700 font-medium">• Soft Cooked Vegetables</p>
                        <p className="text-gray-700 font-medium">• Fresh Fruits (ripe)</p>
                        <p className="text-gray-700 font-medium">• Cooked Meats & Fish</p>
                        <p className="text-gray-700 font-medium">• Eggs (well-cooked)</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-700 font-medium">• Whole Grain Toast</p>
                        <p className="text-gray-700 font-medium">• Pasta & Rice</p>
                        <p className="text-gray-700 font-medium">• Dairy Products</p>
                        <p className="text-gray-700 font-medium">• Legumes & Beans</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Natural Development", desc: "Supports motor skills and hand-eye coordination", icon: "🌱" },
                      { title: "Healthy Relationship", desc: "Builds positive associations with food", icon: "❤️" },
                      { title: "Reduced Fussiness", desc: "Encourages adventurous eating habits", icon: "✨" },
                      { title: "Family Meals", desc: "Baby joins family mealtimes from the start", icon: "👨‍👩‍👧" },
                      { title: "Better Nutrition", desc: "Exposure to variety of whole foods", icon: "🥦" },
                      { title: "Independence", desc: "Builds confidence and self-feeding skills", icon: "⭐" }
                    ].map((benefit, index) => (
                      <div
                        key={benefit.title}
                        className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100 hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-xl">{benefit.icon}</span>
                          <div>
                            <h5 className="text-gray-800 mb-1 text-base font-medium">
                              {benefit.title}
                            </h5>
                            <p className="text-gray-600 text-sm font-light">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* How It Works */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-blue-700 mb-3 text-lg font-semibold">
                      How Does It Work? 🔬
                    </h4>
                    <p className="text-gray-600 font-light mb-3">
                      Starting around 6 months, when your baby shows signs of readiness, you offer soft,
                      safe finger foods that they can pick up and feed themselves. This method respects
                      your baby's natural hunger cues and allows them to explore food at their own pace.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• <strong>6-8 months:</strong> Introduction phase with soft foods</p>
                      <p>• <strong>8-10 months:</strong> Expanding textures and varieties</p>
                      <p>• <strong>10-12 months:</strong> More complex foods and flavors</p>
                    </div>
                  </div>

                  {/* Perfect for Beginners */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border-l-4 border-pink-500">
                    <h4 className="text-pink-700 mb-2 text-lg font-semibold">
                      Perfect for Beginners! 🌟
                    </h4>
                    <p className="text-gray-600 font-light mb-3">
                      Our comprehensive guides make it easy to start baby-led weaning, even if you're
                      completely new to this approach.
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>✅ Step-by-step meal plans for each age</p>
                      <p>✅ 300+ tested organic recipes</p>
                      <p>✅ Safety guidelines and choking prevention</p>
                      <p>✅ Expert support and community access</p>
                    </div>
                  </div>
                </div>

                {/* Image/Visual */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 h-full">
                    {/* Main Image */}
                    <div className="relative mb-6">
                      <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={Mother}
                          alt="Mother holding baby"
                          className="w-full h-full object-contain bg-white rounded-2xl p-4"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl pointer-events-none" />
                    </div>


                    {/* Key Stats */}
                    <div className="space-y-4">
                      <h4 className="text-gray-800 text-xl font-bold text-center mb-4">
                        Why Baby-Led Weaning Works
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/80 p-4 rounded-xl text-center border border-pink-200 hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-pink-600">6+</div>
                          <div className="text-sm text-gray-600">Months Start</div>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl text-center border border-pink-200 hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-blue-600">100%</div>
                          <div className="text-sm text-gray-600">Natural</div>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl text-center border border-pink-200 hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-green-600">300+</div>
                          <div className="text-sm text-gray-600">Recipes</div>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl text-center border border-pink-200 hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-purple-600">Zero</div>
                          <div className="text-sm text-gray-600">Stress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Form Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce" />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
              {!formSubmitted ? (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-800 text-xl font-medium mb-2">
                      Get Your FREE Guides Now!
                    </h3>
                    <p className="text-gray-600 font-light">
                      Enter your details to start your baby's nutrition journey
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-pink-300'
                            }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-pink-300'
                            }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                    >
                      ✨ Get My FREE Guides & Start Journey! →
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm font-light">
                      🔒 100% secure • No spam
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-green-600 text-xl font-medium mb-4">
                    Welcome {formData.name}! 🎉
                  </h3>
                  <p className="text-gray-600 mb-6 font-light">
                    Your free guides are waiting… ⏳ Answer a few quick questions
                  </p>
                  <button
                    onClick={handleContinueToSurvey}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continue to Survey →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonial Carousel */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Real Parents, <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Real Results</span>
              </h2>
              <p className="text-gray-600 text-lg">Join thousands who have already transformed mealtime</p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100/50 to-rose-100/50 border border-pink-200/50 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-sm">
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full inline-block border border-pink-300/50 mb-4">
                    <span className="text-pink-600 font-semibold text-sm">{testimonials[currentTestimonial].result}</span>
                  </div>
                </div>

                <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div>
                  <h4 className="text-gray-800 font-bold text-lg mb-1">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-500 text-sm mb-4">{testimonials[currentTestimonial].location}</p>
                  <div className="flex justify-center text-pink-400 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-pink-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-pink-950 to-rose-900 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-20 left-10 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-rose-500/5 rounded-full blur-xl" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl border border-pink-300/30">
                    <span className="text-white font-bold text-xl">🍼</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                      Little Bites
                    </h1>
                    <p className="text-xs text-gray-400 -mt-1">Nourishing little ones</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed max-w-md">
                  Your trusted companion for baby nutrition and healthy eating habits that last a lifetime.
                  We believe every baby deserves the best start in life with natural, organic, and
                  irresistible nutrition.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>50,000+ Happy Families</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span>98% Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-pink-400" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li><a href="#home" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">Home</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">About</a></li>
                  <li><a href="#recipes" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">Recipes</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">Success Stories</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">Contact</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-pink-400" />
                  Support
                </h3>
                <ul className="space-y-3">
                  <li><a href="#community" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm">Community</a></li>
                  <li className="flex items-center space-x-2 text-sm text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span>24/7 Expert Support</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span>communityblw@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-pink-800/30">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span>© 2024 Little Bites. All rights reserved. Made with ❤️ for healthy babies.</span>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <a href="#privacy" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">Privacy Policy</a>
                  <a href="#terms" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
                @keyframes blinkJump {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                }
                .animate-blinkJump {
                    animation: blinkJump 1.5s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
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
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }
            `}</style>
    </div>
  );
};

export default LittleBitesFunnelPage;