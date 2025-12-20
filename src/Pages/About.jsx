import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Heart, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    const stats = [
        { number: '500+', label: 'Happy Clients' },
        { number: '50+', label: 'Expert Decorators' },
        { number: '1000+', label: 'Events Completed' },
        { number: '4.9/5', label: 'Average Rating' },
    ];

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: 'Passion for Excellence',
            description: 'We pour our heart into every project, ensuring each detail reflects our commitment to perfection.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Client-Centered Approach',
            description: 'Your vision is our mission. We listen, understand, and bring your dreams to life.'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Quality Craftsmanship',
            description: 'Premium materials and expert execution in every decoration we create.'
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Attention to Detail',
            description: 'Every element is carefully curated to create a cohesive and stunning atmosphere.'
        },
    ];

    const team = [
        { name: 'Sarah Johnson', role: 'Founder & Creative Director', image: 'https://i.pravatar.cc/300?img=1' },
        { name: 'Michael Chen', role: 'Lead Designer', image: 'https://i.pravatar.cc/300?img=2' },
        { name: 'Emily Rodriguez', role: 'Event Coordinator', image: 'https://i.pravatar.cc/300?img=3' },
        { name: 'David Kumar', role: 'Operations Manager', image: 'https://i.pravatar.cc/300?img=4' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-accent/20 via-white to-secondary/10 py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-block mb-6">
                            <span className="px-5 py-2.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold inline-flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                About DecorHub
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Creating Memorable Moments
                            <span className="block text-secondary mt-2">Since 2020</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We are a passionate team of decoration experts dedicated to transforming your special occasions 
                            into unforgettable experiences. With creativity, precision, and care, we bring your vision to life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold text-secondary mb-2">{stat.number}</h3>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-accent/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    DecorHub was born from a simple belief: every celebration deserves to be extraordinary. 
                                    Founded in 2020, we started with a small team of passionate decorators who shared a 
                                    vision of making professional decoration services accessible to everyone.
                                </p>
                                <p>
                                    What began as a local service has grown into a trusted name in event decoration. 
                                    We've had the privilege of being part of hundreds of weddings, corporate events, 
                                    birthdays, and celebrations, each one unique and special.
                                </p>
                                <p>
                                    Today, our team of expert decorators continues to push creative boundaries while 
                                    maintaining the personal touch that made us who we are. We don't just decorate spaces; 
                                    we create experiences that last a lifetime.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800" 
                                alt="Our Story" 
                                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-sm">5+ Years</p>
                                        <p className="text-xs text-gray-600">Of Excellence</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Our Values</h2>
                            <p className="text-gray-600 text-base">The principles that guide everything we do</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-accent/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-2">{value.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Work With Us?
                        </h2>
                        <p className="text-lg text-gray-300 mb-8">
                            Let's create something beautiful together. Get in touch and let's start planning your perfect event.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={'/services'} className="px-8 py-3.5 bg-secondary text-white rounded-xl font-semibold hover:bg-accent hover:text-primary transition-all duration-300">
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
