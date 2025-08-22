'use client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Row, Col, Space, Avatar, Rate, Timeline, Carousel, Divider } from 'antd';
import {
  HeartFilled,
  SafetyCertificateFilled,
  BookFilled,
  StarFilled,
  PlayCircleFilled,
  CheckCircleFilled,
  SmileFilled,
  RocketFilled,
  MenuOutlined,
  DownloadOutlined,
  AppleOutlined,
  AndroidOutlined,
  GiftOutlined,
  ThunderboltFilled,
  TrophyFilled,
  BulbFilled,
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import mother from "@/assets/Mother.png"
import steps from "@/assets/Steps.png"
import Image from 'next/image';
const { Title, Paragraph, Text } = Typography;

const LittleBitesLanding = () => {
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
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
  ];

  const testimonials = [
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
  ];

  const recipes = [
    { name: "Pumpkin Pie Toast", image: "https://images.unsplash.com/photo-1571167177587-9e99e5e6daa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "10 min", age: "6+ months" },
    { name: "Minty Peas", image: "https://images.unsplash.com/photo-1581947419624-7b39a55b78e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "8 min", age: "6+ months" },
    { name: "Cheesy Egg Triangles", image: "https://images.unsplash.com/photo-1525755662312-1d1f3c201195?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "15 min", age: "8+ months" },
    { name: "Baby's First Chickpea Curry", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "20 min", age: "10+ months" },
    { name: "Baked Apple Wedges", image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Easy", time: "25 min", age: "6+ months" },
    { name: "Easy Chicken Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", difficulty: "Medium", time: "30 min", age: "12+ months" }
  ];

  const stats = [
    { number: "50K+", label: "Happy Families", icon: <SmileFilled /> },
    { number: "200+", label: "Tested Recipes", icon: <BookFilled /> },
    { number: "98%", label: "Success Rate", icon: <TrophyFilled /> },
    { number: "24/7", label: "Expert Support", icon: <HeartFilled /> }
  ];

  // Custom carousel navigation
  const CarouselArrow = ({ direction, onClick, disabled }: any) => (
    <Button
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg border-0 
                 ${direction === 'prev' ? 'left-4' : 'right-4'}
                 ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-pink-500 hover:bg-pink-50 hover:text-pink-600 hover:scale-110'}
                 transition-all duration-300`}
      icon={direction === 'prev' ? <LeftOutlined /> : <RightOutlined />}
      onClick={onClick}
      disabled={disabled}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-20 blur-xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 blur-lg"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full opacity-15 blur-2xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-pink-100 shadow-lg transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">🍼</span>
              </div>
              <Text className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Little Bites
              </Text>
            </div>

            {/* Desktop Menu */}
            <Space className="hidden lg:flex" size="large">
              {['Home', 'About', 'Guides', 'Recipes', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-700 hover:text-pink-500 transition-all duration-300 font-medium group px-2 py-1"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </Space>

            <div className="flex items-center space-x-4">
              <Button
                type="primary"
                size="large"
                className="hidden sm:flex bg-gradient-to-r from-pink-500 to-rose-500 border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
                icon={<RocketFilled />}
              >
                Get Started
              </Button>
              <Button
                className="lg:hidden"
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-pink-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {['Home', 'About', 'Guides', 'Recipes', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-pink-500 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button
                type="primary"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 border-none shadow-lg rounded-full"
                icon={<RocketFilled />}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 48]} align="middle">
            <Col lg={12} md={24} xs={24}>
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <div className="mb-6 animate-pulse">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 font-semibold text-sm">
                    🎉 Trusted by 50,000+ Parents
                  </span>
                </div>

                <Title
                  level={1}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, #1f2937, #374151)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animationDelay: '0.2s'
                  }}
                >
                  We Provide{' '}
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent animate-pulse">
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
                    alt='mother'
                    className="w-full h-96 sm:h-[500px] object-cover  transform group-hover:scale-105 transition-all duration-500"
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
      <section className="py-20 bg-white relative z-10">
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
                  alt="Baby Led Weaning - Family Mealtime"
                  className=" w-full h-80 sm:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
                {/* Overlay text if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Recipe Gallery */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 relative z-10">
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

      {/* Enhanced Testimonials Slider */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="testimonials-header">
            <Title level={2} className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              What <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Parents</span> Are Saying
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy families who have transformed their baby’s nutrition journey
            </Paragraph>
          </div>

          <div className="relative testimonial-carousel-container">
            <Carousel
              autoplay
              autoplaySpeed={4000}
              dots={true}
              infinite={true}
              speed={800}
              slidesToShow={3}
              slidesToScroll={1}
              pauseOnHover={true}
              afterChange={(current) => setCurrentSlide(current)}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
              className="testimonial-carousel"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-4">
                  <Card className="text-center border-0 shadow-xl h-full bg-gradient-to-br from-white to-pink-50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group mx-2">
                    <div className="relative">

                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                        <StarFilled className="text-white text-xs" />
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -top-4 -left-4 text-6xl text-pink-200 opacity-50 font-serif"></div>
                      <Paragraph className="text-base sm:text-lg text-gray-600 italic leading-relaxed relative z-10 px-4">
                        {testimonial.text}
                      </Paragraph>
                      <div className="absolute -bottom-4 -right-4 text-6xl text-pink-200 opacity-50 font-serif rotate-180"></div>
                    </div>

                    <div className="space-y-3">
                      <Title level={4} className="text-gray-800 mb-1 text-lg font-semibold">{testimonial.name}</Title>
                      <Text className="text-gray-500 text-sm mb-3 block">{testimonial.location}</Text>
                      <Rate
                        disabled
                        defaultValue={testimonial.rating}
                        className="text-pink-400 transform group-hover:scale-110 transition-all duration-300"
                      />
                    </div>

                    {/* Animated background elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-4 group-hover:translate-x-0"></div>
                  </Card>
                </div>
              ))}
            </Carousel>

            {/* Custom progress indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentSlide / 3) === index
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-pink-300'
                    }`}
                />
              ))}
            </div>

            {/* Floating testimonial count */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              <HeartFilled className="mr-1" />
              Happy Parents
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-animate id="cta-content">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm backdrop-blur-sm">
                🎁 Limited Time Offer - 50% OFF
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
      <footer className="bg-gray-900 text-white py-16 relative z-10">
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
                    {['Home', 'About', 'Guides', 'Recipes', 'Contact'].map((link) => (
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

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes wiggle {
          0%, 7%, 14%, 21% { transform: translateX(0); }
          3.5%, 10.5%, 17.5% { transform: translateX(-2px); }
        }

        @keyframes slideInFromBottom {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes rotateIn {
          from { transform: rotate(-180deg) scale(0.5); opacity: 0; }
          to { transform: rotate(0deg) scale(1); opacity: 1; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
        
        /* Responsive animations */
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 1s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.8s ease-out;
        }

        .animate-rotate-in {
          animation: rotateIn 1s ease-out;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
        }
        
        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(-45deg, #ec4899, #f472b6, #f9a8d4, #fbbf24);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
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
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 4s;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }
        
        /* Enhanced Testimonial carousel styles */
        .testimonial-carousel .ant-carousel .slick-dots {
          bottom: -80px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        .testimonial-carousel .ant-carousel .slick-dots li {
          width: 16px !important;
          height: 16px !important;
          margin: 0 8px !important;
        }
        
        .testimonial-carousel .ant-carousel .slick-dots li button {
          width: 16px !important;
          height: 16px !important;
          border-radius: 50% !important;
          background: linear-gradient(135deg, #ec4899, #f472b6) !important;
          border: none !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          opacity: 0.4 !important;
          transform: scale(0.8) !important;
        }
        
        .testimonial-carousel .ant-carousel .slick-dots li.slick-active button {
          opacity: 1 !important;
          transform: scale(1.3) !important;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4) !important;
        }

        .testimonial-carousel .ant-carousel .slick-dots li:hover button {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
        }

        /* Enhanced card animations for testimonials */
        .testimonial-carousel .ant-card {
          border-radius: 24px !important;
          overflow: hidden !important;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 2px solid transparent !important;
          background: linear-gradient(145deg, #ffffff, #fdf2f8) !important;
          position: relative !important;
        }

        .testimonial-carousel .ant-card:hover {
          border-color: rgba(236, 72, 153, 0.2) !important;
          box-shadow: 0 25px 50px rgba(236, 72, 153, 0.15) !important;
        }

        .testimonial-carousel .ant-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ec4899, #f472b6, #f9a8d4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .testimonial-carousel .ant-card:hover::before {
          opacity: 1;
        }

        /* Slide transition effects */
        .testimonial-carousel .slick-slide {
          transition: all 0.5s ease !important;
          opacity: 0.7 !important;
          transform: scale(0.95) !important;
        }

        .testimonial-carousel .slick-slide.slick-active {
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        .testimonial-carousel .slick-slide.slick-center {
          transform: scale(1.05) !important;
        }

        /* Progress indicator enhancements */
        .testimonial-carousel-container .progress-indicator {
          position: absolute;
          bottom: -120px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Floating elements animation */
        @keyframes floatTestimonial {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(2px); }
          50% { transform: translateY(-4px) translateX(0px); }
          75% { transform: translateY(-12px) translateX(-2px); }
        }

        .testimonial-carousel .ant-card .floating-element {
          animation: floatTestimonial 8s ease-in-out infinite;
        }

        /* Quote marks styling */
        .testimonial-quote {
          position: relative;
          padding: 0 20px;
        }

        .testimonial-quote::before,
        .testimonial-quote::after {
          font-family: Georgia, serif;
          font-size: 60px;
          line-height: 1;
          position: absolute;
          color: rgba(236, 72, 153, 0.1);
          transition: all 0.3s ease;
        }

        .testimonial-quote::before {
          content: '"';
          top: -20px;
          left: -10px;
        }

        .testimonial-quote::after {
          content: '"';
          bottom: -40px;
          right: -10px;
          transform: rotate(180deg);
        }

        .testimonial-carousel .ant-card:hover .testimonial-quote::before,
        .testimonial-carousel .ant-card:hover .testimonial-quote::after {
          color: rgba(236, 72, 153, 0.2);
          transform: scale(1.1);
        }
        
        /* Rate component styling */
        .ant-rate-star {
          margin-right: 4px;
        }
        
        /* Enhanced mobile menu */
        @media (max-width: 1024px) {
          .mobile-menu-enter {
            opacity: 0;
            transform: translateY(-20px);
          }
          
          .mobile-menu-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.3s ease;
          }

          .testimonial-carousel .ant-carousel .slick-dots {
            bottom: -60px !important;
          }
        }

        /* Auto-play pause indicator */
        .testimonial-carousel .slick-paused::after {
          content: '⏸️';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          opacity: 0.7;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default LittleBitesLanding;