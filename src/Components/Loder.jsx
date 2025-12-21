import React from 'react';

const Loder = () => {
    return (
        <div className='grid place-content-center min-h-screen bg-gradient-to-br from-gray-50 to-[#EBD5AB]/20'>
            {/* Main Loader Container */}
            <div className="flex flex-col items-center justify-center space-y-8">
                {/* Animated Logo/Brand Section */}
                <div className="relative">
                    {/* Outer Ring Animation */}
                    <div className="w-24 h-24 border-4 border-[#628141]/20 rounded-full animate-spin">
                        <div className="w-full h-full border-4 border-transparent border-t-[#628141] rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
                    </div>
                    
                    {/* Inner Decoration Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#628141] to-[#1B211A] rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Animated Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#628141] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-3 h-3 bg-[#628141] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-3 h-3 bg-[#628141] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>

                {/* Loading Text with Typewriter Effect */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1B211A] mb-2 animate-pulse">Loading</h2>
                    <p className="text-gray-600 animate-pulse">Preparing your decoration experience...</p>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#628141] to-[#1B211A] rounded-full animate-pulse" style={{
                        width: '100%',
                        animation: 'loading-bar 2s ease-in-out infinite'
                    }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Decoration Elements */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#EBD5AB] rounded-full opacity-60 animate-float" style={{animationDelay: '0s'}}></div>
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#628141] rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-[#EBD5AB] rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-[#628141] rounded-full opacity-70 animate-float" style={{animationDelay: '1.5s'}}></div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(120deg); }
                    66% { transform: translateY(-10px) rotate(240deg); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
            `}</style>
        </div>
    );
};

export default Loder;