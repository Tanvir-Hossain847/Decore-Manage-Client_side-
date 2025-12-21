import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router";
import useRole from "../Hooks/useRole";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    React.useState(false);

  const handleSignout = () => {
    signOutUser().then().catch();
    setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/coverage", label: "Coverage" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const {role} = useRole()

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-[#628141] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1B211A]">StyleDecor</span>
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
                      ? "text-[#628141] bg-[#EBD5AB]/20"
                      : "text-gray-700 hover:text-[#628141] hover:bg-[#EBD5AB]/20"
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
                <div className="flex gap-5 items-center">
                <div className="">
                  {role === "Admin" ? (<Link to={'/dashboard/service_demand'}><button className="btn btn-secondary">DashBoard</button></Link>) : 
                  role === "Decorator" ? (<Link to={'/dashboard/assignedpackage'}><button className="btn btn-secondary">Tasks</button></Link>) :
                  (<Link to={'/decorater'}><button className="btn btn-secondary">Be A Decorator</button></Link>)
                  }
                  </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="group relative focus:outline-none"
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://ui-avatars.com/api/?name=" + user?.displayName
                    }
                    alt={user?.displayName}
                    className="w-11 h-11 rounded-full border-2 border-[#EBD5AB] group-hover:border-[#628141] transition-all duration-300 object-cover"
                    title={user.displayName}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#628141] rounded-full border-2 border-white"></div>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    ></div>

                    {/* Dropdown Content */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-[#1B211A]">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <Link
                        to={role === "Admin" ? ("/dashboard/service_demand") : role === "Decorator" ? ("/dashboard/totalpayment") : ("/dashboard/myprofile")}
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#EBD5AB]/20 hover:text-[#628141] transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        Dashboard
                      </Link>

                      <button
                        onClick={handleSignout}
                        className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/auth/login"
                  className="px-5 py-2.5 text-gray-700 font-medium hover:text-[#628141] transition-colors duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="px-5 py-2.5 bg-[#628141] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 hover:bg-[#1B211A] transition-all duration-300"
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
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                        ? "text-[#628141] bg-[#EBD5AB]/20"
                        : "text-gray-700 hover:text-[#628141] hover:bg-[#EBD5AB]/20"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                  <div className="">
                  <div className="mb-5">
                    <Link to={'/decorater'}><button className="btn btn-secondary">Be A Decorater</button></Link>
                  </div>
                    <div className="px-4 py-3 bg-[#EBD5AB]/20 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={
                            user?.photoURL ||
                            "https://ui-avatars.com/api/?name=" +
                              user?.displayName
                          }
                          alt={user?.displayName}
                          className="w-10 h-10 rounded-full border-2 border-[#EBD5AB] object-cover"
                        />
                        <div>
                          <p className="font-semibold text-[#1B211A] text-sm">
                            {user?.displayName}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                    <Link
                      to={role === "Admin" ? ("/dashboard/service_demand") : role === "Decorator" ? ("/dashboard/totalpayment") : ("/dashboard/myprofile")}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#EBD5AB]/20 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/auth/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-[#628141] text-white rounded-lg font-medium hover:bg-[#1B211A] transition-colors"
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
