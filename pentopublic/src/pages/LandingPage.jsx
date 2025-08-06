import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, PenTool, Star, ArrowRight, Check } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const currentUserId = 1; // Replace with actual user ID from auth context or Redux

  const handlePlanSelect = (planType) => {
    navigate("/subscription", {
      state: {
        selectedPlan: planType,
        userId: currentUserId,
        fromRegister: false,
      }
    });
  };

  const features = [
    {
      icon: BookOpen,
      title: "Discover Amazing Stories",
      description: "Explore thousands of books from talented authors worldwide"
    },
    {
      icon: PenTool,
      title: "Publish Your Work",
      description: "Share your stories with readers who appreciate great literature"
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with fellow readers and authors in our vibrant community"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Published Author",
      content: "PenToPublic gave me the platform to reach thousands of readers. It's been an incredible journey!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Avid Reader",
      content: "I've discovered so many amazing stories here. The quality of content is outstanding!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "New Author",
      content: "The community support and feedback helped me improve my writing tremendously.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Reader",
      price: "Free",
      planType: "reader",
      features: [
        "Access to free books",
        "Basic community features",
        "Reading progress tracking",
        "Book recommendations"
      ]
    },
    {
      name: "Premium Reader",
      price: "$9.99/month",
      planType: "monthly",
      features: [
        "Access to all premium content",
        "Early access to new releases",
        "Ad-free reading experience",
        "Exclusive author interviews",
        "Advanced reading analytics"
      ],
      popular: true
    },
    {
      name: "Author",
      price: "Free",
      planType: "author",
      features: [
        "Publish unlimited books",
        "Author analytics dashboard",
        "Reader engagement tools",
        "Community access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                PenToPublic ✍️
              </h1>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8">
            From{" "}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Pen to Public
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform where authors share their stories and readers discover their next favorite book.
            Join thousands of writers and readers in our vibrant literary community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-semibold rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-semibold rounded-2xl hover:bg-white transition-all duration-200 shadow-xl hover:shadow-2xl border border-white/50"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              PenToPublic?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            What Our{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Community Says
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-amber-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-4 ring-amber-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-amber-600 mb-2">{plan.price}</div>
                  {plan.price !== "Free" && <p className="text-gray-600">per month</p>}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (plan.planType === "monthly") {
                      handlePlanSelect("monthly");
                    } else {
                      alert("You’re already on this free plan!");
                    }
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.planType === "monthly" ? "Change Plan" : "My Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Ready to{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Begin Your Story?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join thousands of authors and readers who have already discovered the magic of PenToPublic.
            Your next great adventure in literature starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-semibold rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Join Now - It's Free!
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-semibold rounded-2xl hover:bg-white transition-all duration-200 shadow-xl hover:shadow-2xl border border-white/50"
            >
              Already a Member?
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">PenToPublic ✍️</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Connecting authors and readers through the power of storytelling.
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 PenToPublic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
