import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, MessageSquare, ArrowRight, Users, Star, Award } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Browse Societies',
    description: 'Discover and join student societies that match your interests and passions.',
    icon: Book,
    link: '/societies',
  },
  {
    title: 'Upcoming Events',
    description: 'Stay up to date with events happening on campus from various societies.',
    icon: Calendar,
    link: '/events',
  },
  {
    title: 'Share Feedback',
    description: 'Submit your feedback to help societies improve their activities and events.',
    icon: MessageSquare,
    link: '/feedback',
  },
];

const testimonials = [
  {
    quote: "Campus Sphere helped me find my community at university. Now I'm part of three amazing societies!",
    name: "Alex Johnson",
    role: "Computer Science, Year 2"
  },
  {
    quote: "The events calendar is a lifesaver! I never miss important society meetings anymore.",
    name: "Sarah Williams",
    role: "Business, Year 3"
  },
  {
    quote: "As a society leader, the feedback feature helps us improve our events and activities.",
    name: "Michael Chen",
    role: "Engineering, Year 4"
  }
];

const popularSocieties = [
  {
    name: "Tech Innovators",
    members: 356,
    category: "Technology"
  },
  {
    name: "Drama Club",
    members: 289,
    category: "Arts"
  },
  {
    name: "Environmental Action",
    members: 412,
    category: "Activism"
  },
  {
    name: "International Students",
    members: 531,
    category: "Cultural"
  }
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section with dynamic background */}
      <div className="relative overflow-hidden rounded-2xl mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Campus background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 py-24 md:py-32 px-4 text-center">
          <div className="animate-fade-in max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
              Discover Your <span className="bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text">Campus Community</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 drop-shadow">
              Your central hub for connecting with student societies, discovering events, and engaging with campus life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-600 transition-all">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50 transition-all">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl mb-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-5xl font-bold text-primary-600 mb-2">150+</p>
              <p className="text-lg text-gray-600">Active Societies</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-primary-600 mb-2">5,000+</p>
              <p className="text-lg text-gray-600">Student Members</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-primary-600 mb-2">200+</p>
              <p className="text-lg text-gray-600">Monthly Events</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore Campus Sphere</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 text-lg">
            Discover the many ways to engage with university life and make the most of your time on campus.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-all hover:shadow-lg hover:-translate-y-1 duration-300 border-t-4 border-t-primary-500 overflow-hidden group">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <feature.icon size={28} />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={feature.link} className="w-full">
                    <Button variant="outline" className="w-full flex justify-between group">
                      <span>Explore</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Popular Societies */}
      <div className="mb-16 bg-gradient-to-br from-primary-50 to-blue-50 py-12 px-4 rounded-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Societies</h2>
            <Link to="/societies">
              <Button variant="outline" className="flex items-center gap-2">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSocieties.map((society) => (
              <Card key={society.name} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <CardTitle className="group-hover:text-primary-600 transition-colors">{society.name}</CardTitle>
                  <CardDescription>{society.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span>{society.members} members</span>
                  </div>
                  <div>
                    <Star size={16} className="text-yellow-500 inline" />
                    <Star size={16} className="text-yellow-500 inline" />
                    <Star size={16} className="text-yellow-500 inline" />
                    <Star size={16} className="text-yellow-500 inline" />
                    <Star size={16} className="text-yellow-500 inline opacity-50" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Connect with Campus Life Section */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Connect with Campus Life</h2>
              <p className="text-gray-600 mb-8">
                Campus Sphere helps you discover the vibrant student community at your university. Join societies, attend events, and make the most of your student experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-1">
                    <Award size={14} />
                  </div>
                  <div>
                    <h4 className="font-medium">Find Your Community</h4>
                    <p className="text-gray-600 text-sm">
                      Discover societies that match your interests and connect with like-minded peers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-1">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <h4 className="font-medium">Never Miss an Event</h4>
                    <p className="text-gray-600 text-sm">
                      Stay informed about upcoming events from societies you're interested in.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-1">
                    <MessageSquare size={14} />
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Voice</h4>
                    <p className="text-gray-600 text-sm">
                      Provide feedback to help improve the student experience on campus.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/register">
                  <Button className="px-8">Join Today</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Students in campus library"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-primary-600 text-white py-16 px-4 rounded-xl mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Students Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-primary-700/50 backdrop-blur-sm p-6 rounded-xl">
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-primary-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="text-center mb-16 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Campus Sphere?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create your account today and start connecting with societies, events and fellow students.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="px-8">Create Account</Button>
          </Link>
          <Link to="/societies">
            <Button size="lg" variant="outline" className="px-8">Browse Societies</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index; 