import React from 'react';
import { Link } from 'react-router';
import { Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1B211A] text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to='/' className="flex items-center space-x-3 group">
                            <div className="bg-linear-to-br from-[#628141] to-[#EBD5AB] p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-[#EBD5AB]">
                                DecorHub
                            </span>
                        </Link>
                        <p className="text-gray-300 leading-relaxed text-base">
                            Transform your special moments with our professional decoration services. 
                            Creating memorable experiences since 2020.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-11 h-11 bg-[#628141] hover:bg-[#EBD5AB] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-[#628141] hover:bg-[#EBD5AB] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-[#628141] hover:bg-[#EBD5AB] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 bg-[#628141] hover:bg-[#EBD5AB] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#EBD5AB]">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-[#EBD5AB] transition-colors duration-300 text-base">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/service" className="text-gray-300 hover:text-[#EBD5AB] transition-colors duration-300 text-base">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-[#EBD5AB] transition-colors duration-300 text-base">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="text-gray-300 hover:text-[#EBD5AB] transition-colors duration-300 text-base">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-[#EBD5AB] transition-colors duration-300 text-base">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#EBD5AB]">Our Services</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-300 text-base">Wedding Decoration</li>
                            <li className="text-gray-300 text-base">Corporate Events</li>
                            <li className="text-gray-300 text-base">Birthday Parties</li>
                            <li className="text-gray-300 text-base">Home Decor</li>
                            <li className="text-gray-300 text-base">Special Ceremonies</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-[#EBD5AB]">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[#628141] mt-1 shrink-0" />
                                <span className="text-gray-300 text-base">
                                    123 Decoration Street, Dhaka 1000, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-[#628141] shrink-0" />
                                <span className="text-gray-300 text-base">+880 1234-567890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-[#628141] shrink-0" />
                                <span className="text-gray-300 text-base">info@decorhub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} DecorHub. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="text-gray-400 hover:text-[#EBD5AB] transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-[#EBD5AB] transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-[#EBD5AB] transition-colors text-sm">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
