import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add form submission logic
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'Phone',
            details: ['+880 1234-567890', '+880 1234-567891'],
            link: 'tel:+8801234567890'
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email',
            details: ['info@decorhub.com', 'support@decorhub.com'],
            link: 'mailto:info@decorhub.com'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Address',
            details: ['123 Decoration Street', 'Dhaka 1000, Bangladesh'],
            link: '#'
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'Working Hours',
            details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
            link: '#'
        },
    ];

    const eventTypes = [
        'Wedding',
        'Corporate Event',
        'Birthday Party',
        'Anniversary',
        'Home Decor',
        'Other'
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
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-block mb-6">
                            <span className="px-5 py-2.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold inline-flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Get In Touch
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Let's Create Something
                            <span className="block text-secondary mt-2">Beautiful Together</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Have a question or ready to book? We'd love to hear from you. 
                            Fill out the form below or reach out through any of our contact channels.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-accent/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-3">{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                                ))}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 bg-accent/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-primary mb-3">Send Us a Message</h2>
                                <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                            placeholder="+880 1234-567890"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Event Type *
                                        </label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                        >
                                            <option value="">Select event type</option>
                                            {eventTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Event Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us about your event and decoration needs..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            {/* Why Contact Us */}
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary">Why Contact Us?</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Free Consultation</h4>
                                            <p className="text-sm text-gray-600">Get expert advice on your decoration needs at no cost</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Quick Response</h4>
                                            <p className="text-sm text-gray-600">We respond to all inquiries within 24 hours</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Custom Quotes</h4>
                                            <p className="text-sm text-gray-600">Receive personalized pricing based on your needs</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">Flexible Scheduling</h4>
                                            <p className="text-sm text-gray-600">Book a time that works best for you</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl h-80">
                                <img 
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800" 
                                    alt="Contact Us" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <h3 className="text-2xl font-bold mb-2">Let's Talk!</h3>
                                        <p className="text-gray-200">We're here to help make your event perfect</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
                            <p className="text-gray-600 text-base">Quick answers to common questions</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    q: 'How far in advance should I book?',
                                    a: 'We recommend booking at least 2-3 months in advance for major events like weddings. However, we can accommodate shorter timelines based on availability.'
                                },
                                {
                                    q: 'Do you provide decoration materials?',
                                    a: 'Yes, we provide all decoration materials and equipment. We use premium quality materials to ensure your event looks stunning.'
                                },
                                {
                                    q: 'Can I customize the decoration package?',
                                    a: 'Absolutely! All our packages are fully customizable. We work with you to create a decoration plan that matches your vision and budget.'
                                },
                                {
                                    q: 'What is your cancellation policy?',
                                    a: 'Cancellations made 30+ days before the event receive a full refund. 15-30 days: 50% refund. Less than 15 days: no refund, but you can reschedule.'
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-accent/10 rounded-2xl p-6"
                                >
                                    <h3 className="text-lg font-bold text-primary mb-2">{faq.q}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
