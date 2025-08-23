'use client';
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Button, Card, Typography, Row, Col, Space, Rate, Timeline, Divider } from 'antd';
import {
  HeartFilled,
  SafetyCertificateFilled,
  BookFilled,
  StarFilled,
  PlayCircleFilled,
  CheckCircleFilled,
  SmileFilled,
  RocketFilled,
  DownloadOutlined,
  AppleOutlined,
  AndroidOutlined,
  ShoppingCartOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { Menu, X, Sparkles, Heart, Star } from 'lucide-react';
import mother from "@/assets/Mother.png"
import steps from "@/assets/Steps.png"
import Image from 'next/image';

const { Title, Paragraph, Text } = Typography;

const LittleBitesLanding = () => {
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const router = useRouter();

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (Math.abs(y - scrollY) > 5) { // Only update if significant change
      setScrollY(y);
      setScrolled(y > 20);
    }
  }, [scrollY]);

  useEffect(() => {
    // Debounce scroll events
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    setIsLoaded(true);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  const handleSelect = useCallback(() => {
    router.push("/funnel");
  }, [router]);

  // Optimize intersection observer
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const updates: { [key: string]: boolean } = {}; // ✅ type here

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updates[entry.target.id] = true;
          }
        });

        if (Object.keys(updates).length > 0) {
          setIsVisible((prev) => ({ ...prev, ...updates }));
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // preload elements slightly before they come into view
      }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoaded]);


  // Memoize static data
  const features = useMemo(() => [
    {
      icon: <HeartFilled className="text-4xl text-pink-500" />,
      title: "Age-Appropriate Guidance",
      description: "Each section includes developmental changes and nutritional tips for every stage of your child's growth.",
      color: "from-pink-400 to-rose-400"
    },
    {
      icon: <SafetyCertificateFilled className="text-4xl text-emerald-500" />,
      title: "Safety First",
      description: "Learn to distinguish between choking and gagging, with smart kitchen habits to keep your baby safe.",
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: <BookFilled className="text-4xl text-purple-500" />,
      title: "150+ Organic Recipes",
      description: "From purees to finger foods, discover natural and irresistible recipes for every stage.",
      color: "from-purple-400 to-indigo-400"
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      text: "This guide transformed how I approach feeding my baby. The recipes are simple yet nutritious!",
      rating: 5,
      location: "New York, USA"
    },
    {
      name: "Emily Chen",
      text: "Baby-led weaning seemed scary until I found this comprehensive guide. Now it's enjoyable for both of us!",
      rating: 5,
      location: "Toronto, Canada"
    },
    {
      name: "Maria Rodriguez",
      text: "The step-by-step approach made introducing solids stress-free. Highly recommended!",
      rating: 5,
      location: "Madrid, Spain"
    },
    {
      name: "Jessica Williams",
      text: "My picky eater now loves vegetables! These recipes are magical and easy to follow.",
      rating: 5,
      location: "London, UK"
    },
    {
      name: "Amanda Thompson",
      text: "The safety guidelines gave me confidence. My baby is thriving with these nutritious meals!",
      rating: 5,
      location: "Sydney, Australia"
    },
    {
      name: "Lisa Parker",
      text: "Best investment for my baby's health! The whole family enjoys these delicious recipes.",
      rating: 5,
      location: "Vancouver, Canada"
    }
  ], []);

  const recipes = useMemo(() => [
    { name: "Pumpkin Pie Toast", image: "https://images.unsplash.com/photo-1571167177587-9e99e5e6daa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "10 min", age: "6+ months" },
    { name: "Minty Peas", image: "https://images.unsplash.com/photo-1581947419624-7b39a55b78e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "8 min", age: "6+ months" },
    { name: "Cheesy Egg Triangles", image: "https://images.unsplash.com/photo-1525755662312-1d1f3c201195?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "15 min", age: "8+ months" },
    { name: "Baby's First Chickpea Curry", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "20 min", age: "10+ months" },
    { name: "Baked Apple Wedges", image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "25 min", age: "6+ months" },
    { name: "Easy Chicken Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "30 min", age: "12+ months" }
  ], []);

  const stats = useMemo(() => [
    { number: "50K+", label: "Happy Families", icon: <SmileFilled /> },
    { number: "200+", label: "Tested Recipes", icon: <BookFilled /> },
    { number: "98%", label: "Success Rate", icon: <TrophyOutlined /> },
    { number: "24/7", label: "Expert Support", icon: <HeartFilled /> }
  ], []);

  // Memoize expensive transforms
  const backgroundTransforms = useMemo(() => ({
    first: { transform: `translateY(${scrollY * 0.1}px)` },
    second: { transform: `translateY(${scrollY * 0.15}px)` },
    third: { transform: `translateY(${scrollY * -0.1}px)` }
  }), [scrollY]);

  const menuItems = ['Home', 'About', 'Recipes', 'Contact'];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
            <span className="text-white font-bold text-2xl">🍼</span>
          </div>
          <Text className="text-xl font-semibold text-gray-600">Loading Little Bites...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
      {/* Optimized Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-20 blur-xl will-change-transform"
          style={backgroundTransforms.first}
        />
        <div
          className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 blur-lg will-change-transform"
          style={backgroundTransforms.second}
        />
        <div
          className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full opacity-15 blur-2xl will-change-transform"
          style={backgroundTransforms.third}
        />
      </div>

      {/* Enhanced Navigation Header */}
      <>
        {/* Magical Background Elements */}
        <div className="fixed top-0 left-0 w-full h-32 overflow-hidden pointer-events-none z-40">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-5 right-1/4 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute top-0 right-10 w-24 h-24 bg-purple-200/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-2xl shadow-pink-500/10 border-b border-pink-200/50'
          : 'bg-white/80 backdrop-blur-xl border-b border-pink-100/30'
          }`}>

          {/* Animated top border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-rose-400 via-purple-400 to-pink-400 bg-size-200 animate-gradient"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Logo Section with Enhanced Animation */}
              <div className="flex items-center space-x-4 group cursor-pointer relative">
                {/* Magical sparkles around logo */}
                <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <Star className="w-3 h-3 text-rose-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>

                <div className="relative">
                  {/* Animated ring behind logo */}
                  <div className="absolute inset-0 w-14 h-14 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 scale-75 group-hover:scale-110 transition-all duration-500 blur-sm"></div>

                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/40 group-hover:shadow-3xl group-hover:shadow-pink-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white font-bold text-xl relative z-10">🍼</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-rose-600 group-hover:to-purple-700 transition-all duration-500">
                    Little Bites
                  </h1>
                  <p className="text-xs text-gray-500 group-hover:text-pink-500 transition-colors duration-300 -mt-1">Nourishing little ones</p>
                </div>
              </div>

              {/* Desktop Menu with Enhanced Animations */}
              <div className="hidden lg:flex items-center space-x-8">
                {menuItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative text-gray-700 hover:text-pink-600 transition-all duration-400 font-medium group px-3 py-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10">{item}</span>

                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-400 group-hover:w-full rounded-full"></span>

                    {/* Hover background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>

                    {/* Floating hearts on hover */}
                    <Heart className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500" />
                  </a>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelect}
                  className="hidden sm:flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold rounded-full shadow-2xl shadow-pink-500/40 hover:shadow-3xl hover:shadow-pink-500/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <Sparkles className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Get Started</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 transition-all duration-300 hover:scale-110"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-pink-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-pink-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="bg-white/95 backdrop-blur-xl border-t border-pink-200/50 shadow-inner">
              <div className="px-6 py-6 space-y-4">
                {menuItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:scale-105 transform"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: mobileMenuOpen ? 'slideInUp 0.5s ease-out forwards' : ''
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  </a>
                ))}

                <button
                  onClick={handleSelect}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Get Started</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 48]} align="middle">
            <Col lg={12} md={24} xs={24}>
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 font-semibold text-sm animate-pulse">
                    🎉 Trusted by 50,000+ Parents
                  </span>
                </div>

                <Title
                  level={1}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, #1f2937, #374151)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  We Provide{' '}
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Best Nutrition
                  </span>{' '}
                  For Your Baby
                </Title>

                <Paragraph className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl lg:max-w-none">
                  Keeping track of proper nutrition at each stage of your baby’s development is overwhelming.
                  We’re here to take the guesswork out of feeding with natural, organic, and irresistible recipes.
                </Paragraph>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button
                    onClick={handleSelect}
                    type="primary"
                    size="large"
                    className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 border-none shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
                    icon={<PlayCircleFilled />}
                  >
                    Start Your Journey
                  </Button>
                  <Button
                    size="large"
                    className="h-14 px-8 text-lg font-semibold border-2 border-pink-300 text-pink-600 hover:bg-pink-50 transform hover:scale-105 transition-all duration-300 rounded-full"
                    icon={<DownloadOutlined />}
                  >
                    Download Guide
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircleFilled className="text-green-500" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleFilled className="text-green-500" />
                    <span>Pediatrician Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleFilled className="text-green-500" />
                    <span>No Allergens</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={12} md={24} xs={24}>
              <div className="relative max-w-lg mx-auto">
                {/* Main Hero Image */}
                <div className="relative group">
                  <Image
                    src={mother}
                    alt='Mother with baby - Little Bites nutrition guide'
                    className="w-full h-96 sm:h-[500px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                    priority
                    placeholder="blur"
                  />

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce border-2 border-pink-100" style={{ animationDelay: '0.5s' }}>
                    <Text className="text-3xl">🍎</Text>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce border-2 border-pink-100" style={{ animationDelay: '1s' }}>
                    <Text className="text-3xl">🥕</Text>
                  </div>
                  <div className="absolute top-1/2 -left-6 bg-white p-3 rounded-xl shadow-lg animate-pulse border-2 border-pink-100" style={{ animationDelay: '1.5s' }}>
                    <Text className="text-2xl">🥄</Text>
                  </div>
                  <div className="absolute top-20 -right-8 bg-white p-3 rounded-xl shadow-lg animate-pulse border-2 border-pink-100" style={{ animationDelay: '2s' }}>
                    <Text className="text-2xl">🍌</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col lg={6} md={12} sm={12} xs={12} key={index}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-white to-pink-50">
                  <div className="text-3xl text-pink-500 mb-2">{stat.icon}</div>
                  <Title level={2} className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</Title>
                  <Text className="text-gray-600 font-medium">{stat.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="features-header">
            <Title level={2} className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Little Bites</span>
            </Title>
            <Paragraph className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From single-ingredient purees to full meals, we’re your one-stop solution for complete childhood nutrition
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col lg={8} md={12} xs={24} key={index}>
                <Card
                  className="h-full text-center border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group"
                  style={{ background: 'linear-gradient(145deg, #ffffff, #fdf2f8)' }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <Title level={3} className="text-gray-800 mb-4 text-xl sm:text-2xl">{feature.title}</Title>
                  <Paragraph className="text-gray-600 text-base sm:text-lg leading-relaxed">{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]} align="middle">
            <Col lg={12} md={24} xs={24} order={2} className="lg:order-1">
              <div data-animate id="about-content">
                <Title level={2} className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                  The Importance of Proper <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Baby Nutrition</span>
                </Title>

                <Timeline
                  className='pt-11'
                  items={[
                    {
                      dot: <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <CheckCircleFilled className="text-white text-xs" />
                      </div>,
                      children: (
                        <div className="ml-4">
                          <Title level={4} className="text-gray-800 mb-2">Guidance for Every Age</Title>
                          <Paragraph className="text-gray-600 leading-relaxed">
                            Each section includes developmental changes and convenient nutritional tips for every stage.
                          </Paragraph>
                        </div>
                      ),
                    },
                    {
                      dot: <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <CheckCircleFilled className="text-white text-xs" />
                      </div>,
                      children: (
                        <div className="ml-4">
                          <Title level={4} className="text-gray-800 mb-2">Simple Transition to Solids</Title>
                          <Paragraph className="text-gray-600 leading-relaxed">
                            Begin with 150+ recipes for purees, smoothies, and finger foods that help the transition.
                          </Paragraph>
                        </div>
                      ),
                    },
                    {
                      dot: <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                        <CheckCircleFilled className="text-white text-xs" />
                      </div>,
                      children: (
                        <div className="ml-4">
                          <Title level={4} className="text-gray-800 mb-2">Beyond Baby Food</Title>
                          <Paragraph className="text-gray-600 leading-relaxed">
                            70+ delicious recipes that the whole family can enjoy together.
                          </Paragraph>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </Col>

            <Col lg={12} md={24} xs={24} order={1} className="lg:order-2">
              <div className="relative" data-animate id="about-image">
                <Image
                  src={steps}
                  alt="Baby Led Weaning - Family Mealtime Steps"
                  className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
                {/* Overlay text if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Recipe Gallery */}
      <section id="recipes" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="recipes-header">
            <Title level={2} className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Recipe <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Gallery</span>
            </Title>
            <Paragraph className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover delicious and nutritious recipes your baby will love
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {recipes.map((recipe, index) => (
              <Col lg={8} md={12} xs={24} key={index}>
                <Card
                  className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
                  cover={
                    <div className="relative overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                  }
                >
                  <div className="p-4">
                    <Title level={4} className="text-gray-800 mb-3 text-lg sm:text-xl">{recipe.name}</Title>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">
                        {recipe.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                        {recipe.time}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        {recipe.age}
                      </span>
                    </div>
                    <Rate disabled defaultValue={5} className="text-pink-400 text-sm" />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Lazy-loaded Testimonials */}
      <Suspense fallback={<div className="py-20 bg-white text-center">Loading testimonials...</div>}>
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Title level={2} className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                What <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Parents</span> Are Saying
              </Title>
            </div>

            <Row gutter={[24, 24]}>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Col lg={8} md={12} xs={24} key={index}>
                  <Card className="text-center border-0 shadow-xl h-full bg-gradient-to-br from-white to-pink-50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <Paragraph className="text-base sm:text-lg text-gray-600 italic leading-relaxed mb-6">
                      {testimonial.text}
                    </Paragraph>
                    <Title level={4} className="text-gray-800 mb-1 text-lg font-semibold">{testimonial.name}</Title>
                    <Text className="text-gray-500 text-sm mb-3 block">{testimonial.location}</Text>
                    <Rate disabled defaultValue={testimonial.rating} className="text-pink-400" />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </Suspense>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-animate id="cta-content">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm backdrop-blur-sm">
                Limited Time Offer - 50% OFF
              </span>
            </div>

            <Title level={2} className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Start Your Baby’s Nutrition Journey?
            </Title>
            <Paragraph className="text-lg sm:text-xl text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of parents who have transformed mealtime into a joyful, stress-free experience
            </Paragraph>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="large"
                className="h-14 px-8 text-lg font-semibold bg-white text-pink-500 border-none shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full"
                icon={<ShoppingCartOutlined />}
              >
                Get Your Guide Now - $33.99
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-pink-100">
              <div className="flex items-center space-x-2">
                <CheckCircleFilled />
                <span>Bundle of 6 Best Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleFilled />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleFilled />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]}>
            <Col lg={8} md={24} xs={24}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🍼</span>
                </div>
                <Text className="text-3xl font-bold text-white">Little Bites</Text>
              </div>
              <Paragraph className="text-gray-400 leading-relaxed mb-6">
                Your trusted companion for baby nutrition and healthy eating habits that last a lifetime.
                We believe every baby deserves the best start in life.
              </Paragraph>
              <Space size="large">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  className="bg-pink-500 border-pink-500 hover:bg-pink-600"
                  icon={<AppleOutlined />}
                />
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  className="bg-green-500 border-green-500 hover:bg-green-600"
                  icon={<AndroidOutlined />}
                />
              </Space>
            </Col>

            <Col lg={16} md={24} xs={24}>
              <Row gutter={[32, 32]}>
                <Col md={8} sm={12} xs={24}>
                  <Title level={4} className="text-white mb-4 text-lg">Quick Links</Title>
                  <div className="space-y-3">
                    {['Home', 'About', 'Recipes', 'Contact'].map((link) => (
                      <div key={link}>
                        <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-pink-400 transition-colors duration-300 block">
                          {link}
                        </a>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col md={8} sm={12} xs={24}>
                  <Title level={4} className="text-white mb-4 text-lg">Resources</Title>
                  <div className="space-y-3">
                    {['Baby-Led Weaning', 'Nutrition Tips', 'Safety Guidelines', 'Recipe Book', 'FAQ'].map((resource) => (
                      <div key={resource}>
                        <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 block">
                          {resource}
                        </a>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col md={8} sm={24} xs={24}>
                  <Title level={4} className="text-white mb-4 text-lg">Get In Touch</Title>
                  <div className="space-y-3">
                    <div className="text-gray-400">
                      <strong className="text-white">Email:</strong><br />
                      support@littlebites.com
                    </div>
                    <div className="text-gray-400">
                      <strong className="text-white">Phone:</strong><br />
                      1-800-BABY-FOOD
                    </div>
                    <div className="text-gray-400">
                      <strong className="text-white">Hours:</strong><br />
                      Mon-Fri 9AM-6PM EST
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider className="border-gray-800 my-12" />

          <Row gutter={[32, 16]} align="middle">
            <Col lg={12} md={24} xs={24} className="text-center lg:text-left">
              <Paragraph className="text-gray-400 mb-0 text-sm sm:text-base">
                © 2024 Little Bites. All rights reserved. Made with ❤️ for healthy babies.
              </Paragraph>
            </Col>
            <Col lg={12} md={24} xs={24} className="text-center lg:text-right">
              <Space className="flex-wrap justify-center lg:justify-end" size="large">
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">Cookie Policy</a>
              </Space>
            </Col>
          </Row>
        </div>
      </footer>

      {/* Enhanced CSS with new animations */}
      <style jsx>{`
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Enhanced animations */
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ec4899, #f472b6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #db2777, #ec4899);
        }

        /* Optimized hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
        }

        /* Loading animation */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LittleBitesLanding;