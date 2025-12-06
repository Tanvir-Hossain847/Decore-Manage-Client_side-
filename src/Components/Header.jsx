import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
    const {user, signOutUser} = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const handleSignout = () => {
        signOutUser()
        .then()
        .catch()
    }

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/coverage', label: 'Coverage' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to='/' className="flex items-center space-x-2 group">
                        <div className="bg-[#628141] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-[#1B211A]">
                            DecorHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'text-[#628141] bg-[#EBD5AB]/20'
                                            : 'text-gray-700 hover:text-[#628141] hover:bg-[#EBD5AB]/20'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side - Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {user ? (
                            <>
                                <Link to='/profile' className="group relative">
                                    <img 
                                        src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.displayName} 
                                        alt={user?.displayName}
                                        className='w-11 h-11 rounded-full border-2 border-[#EBD5AB] group-hover:border-[#628141] transition-all duration-300 object-cover' 
                                        title={user.displayName} 
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#628141] rounded-full border-2 border-white"></div>
                                </Link>
                                <button 
                                    onClick={handleSignout} 
                                    className='px-5 py-2.5 bg-[#628141] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 hover:bg-[#1B211A] transition-all duration-300'
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    to='/login'
                                    className='px-5 py-2.5 text-gray-700 font-medium hover:text-[#628141] transition-colors duration-300'
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to='/register'
                                    className='px-5 py-2.5 bg-[#628141] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 hover:bg-[#1B211A] transition-all duration-300'
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                                            isActive
                                                ? 'text-[#628141] bg-[#EBD5AB]/20'
                                                : 'text-gray-700 hover:text-[#628141] hover:bg-[#EBD5AB]/20'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            
                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                {user ? (
                                    <>
                                        <Link 
                                            to='/profile' 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50"
                                        >
                                            <img 
                                                src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.displayName} 
                                                alt={user?.displayName}
                                                className='w-10 h-10 rounded-full border-2 border-[#EBD5AB] object-cover' 
                                            />
                                            <span className="font-medium text-gray-700">{user?.displayName}</span>
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                handleSignout();
                                                setIsMenuOpen(false);
                                            }} 
                                            className='w-full px-4 py-3 bg-[#628141] text-white rounded-lg font-medium hover:bg-[#1B211A] transition-colors'
                                        >
                                            Log Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink 
                                            to='/login'
                                            onClick={() => setIsMenuOpen(false)}
                                            className='block w-full px-4 py-3 text-center text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50'
                                        >
                                            Login
                                        </NavLink>
                                        <NavLink 
                                            to='/register'
                                            onClick={() => setIsMenuOpen(false)}
                                            className='block w-full px-4 py-3 text-center bg-[#628141] text-white rounded-lg font-medium hover:bg-[#1B211A] transition-colors'
                                        >
                                            Register
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;