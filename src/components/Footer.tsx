import React from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
                    {/* Logo and Branding */}
                    <div className="flex items-center space-x-2">
                        <UtensilsCrossed size={28} className="text-white" />
                        <span className="text-xl font-bold text-white">RecipeShare</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <Link to="/recipes" className="hover:text-white">Recipes</Link>
                        <Link to="/about" className="hover:text-white">About Us</Link>
                        <Link to="/contact" className="hover:text-white">Contact</Link>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                    {/* Contact Information */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <div className="flex items-center mt-2 space-x-2">
                            <Mail size={18} />
                            <span>74099350viukashautam@gmial.com</span>
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                            <Phone size={18} />
                            <span>+91 7409935075</span>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-6 mt-6 md:mt-0">
                        <a href="https://facebook.com" className="hover:text-white">
                            <Facebook size={24} />
                        </a>
                        <a href="https://twitter.com" className="hover:text-white">
                            <Twitter size={24} />
                        </a>
                        <a href="https://instagram.com" className="hover:text-white">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
                    <p>&copy; {new Date().getFullYear()} RecipeShare. All rights reserved.</p>
                    <p>
                        <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link> | 
                        <Link to="/terms" className="hover:text-white"> Terms & Conditions</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
