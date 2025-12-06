import { Sparkles } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to='/' className="flex items-center space-x-2 group">
                <div className="bg-[#628141] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#1B211A]">
                    DecorHub
                </span>
            </Link>
        </div>
    );
};

export default Logo;