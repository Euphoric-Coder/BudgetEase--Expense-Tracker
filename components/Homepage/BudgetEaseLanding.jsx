import React from 'react';
import { Plus, DollarSign, TrendingUp, ArrowRight, CheckCircle, Star, Bot, Shield, PieChart, Bell, Target, BarChart3, FileText, Zap, Calendar, CreditCard } from 'lucide-react';
import { features, testimonials, pricingPlans, budgetBenefits, categories, stats, platformFeatures } from '@/lib/budgetData';

const BudgetEaseLanding = ({ onGetStarted, onSignIn, onBookDemo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BudgetEase</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">Reviews</a>
              <button
                onClick={onSignIn}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm font-medium">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial freedom made simple
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Take control of your <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">money, effortlessly</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-md leading-relaxed">
                  Smart budgeting with AI-powered insights. Track expenses, set goals, and achieve financial freedom with our intuitive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 justify-center"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onBookDemo}
                    className="border border-slate-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800 transition-all duration-300"
                  >
                    Book Demo
                  </button>
                </div>
              </div>
              
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-800/20 rounded-2xl p-8 border border-slate-700/50 h-full">
                  <img
                    src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Financial planning and budgeting"
                    className="w-full h-full object-cover rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm font-medium mb-4">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful Financial Features
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Everything you need to manage your money like a pro
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-900/20 hover:border-blue-800/40 transition-all duration-300 rounded-xl p-6 group"
                >
                  <div className="bg-blue-900/20 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-900/30 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features by User Type */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built for Every Financial Need
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                BudgetEase adapts to your lifestyle, whether you're an individual, family, business, or investor.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {platformFeatures.map((platform, index) => (
                <div key={index} className={`bg-gradient-to-r ${platform.color} backdrop-blur-sm border border-blue-900/20 rounded-2xl p-8`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{platform.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{platform.title}</h3>
                      <p className="text-slate-400">{platform.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {platform.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm font-medium mb-4">
                Affordable Pricing
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Plan
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Start free and upgrade as your financial needs grow
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border p-8 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/25 scale-105' 
                    : 'border-slate-700/50 hover:border-blue-700/50'
                }`}>
                  {plan.popular && (
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium text-center mb-6">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold text-blue-400">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                    <p className="text-slate-400">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={onGetStarted}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-blue-900/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Why Choose BudgetEase?</h3>
                <p className="text-slate-400">Everything you need for complete financial control</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgetBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-blue-900/20 p-1 rounded-full mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <p
                      className="text-slate-400 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: benefit }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Financial Categories
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Organize your finances across different categories with specialized tools for each area.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-700/50 transition-all duration-300 group">
                  <div className="text-4xl mb-6">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{category.name}</h3>
                  <p className="text-slate-400 mb-4">{category.description}</p>
                  <div className="flex items-center gap-4 text-sm text-blue-400 mb-4">
                    <span>{category.users.toLocaleString()} Users</span>
                    <span>•</span>
                    <span>{category.features.length} Features</span>
                  </div>
                  <div className="space-y-1">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-slate-500">
                        • {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Hear from people who've transformed their financial lives with BudgetEase.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-900/20 hover:border-blue-800/40 transition-all duration-300 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center mr-4">
                      <span className="text-blue-400 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-blue-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-400">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-950/20 border border-blue-800/20 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to achieve financial freedom?
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Join thousands of users who have taken control of their finances with our AI-powered platform. Start your journey today and see the difference smart budgeting makes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 justify-center"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onBookDemo}
                    className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    Schedule Demo
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-blue-800/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-purple-700/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">BudgetEase</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Smart budgeting platform with AI-powered insights. Take control of your finances and achieve your financial goals.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>© 2024 BudgetEase</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
                <li><button onClick={onBookDemo} className="hover:text-white transition-colors">Demo</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BudgetEaseLanding;