import React from "react";
import Logo from "../Components/Logo";
import { Link, Outlet } from "react-router";
import {
  CircleDollarSign,
  LucideBook,
  LucideChartBar,
  LucideHome,
  LucideIdCard,
  LucideMonitorCheck,
  LucideSettings,
  LucideSticker,
  LucideUser,
  Package,
  SprayCan,
  Target,
  UserStar,
} from "lucide-react";
import useRole from "../Hooks/useRole";
import ScrollToTop from "../Components/ScrollToTop";

const DashBoardLayout = () => {
  const {role} = useRole()
  console.log("in dashboard the role is", role);
  

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-white shadow-sm border-b border-gray-200">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-gray-600 hover:bg-gray-100 hover:text-[#628141] transition-all duration-300"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 text-[#1B211A] font-bold text-xl">Dashboard</div>
          </nav>

          <div className="p-6 bg-gray-50 min-h-screen">
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className=""
          ></label>
          <div className="flex min-h-full flex-col items-start bg-white shadow-xl border-r border-gray-200 is-drawer-close:w-21 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow space-y-1 p-4">
              {/* Logo Section */}
              <div className="p-3 mb-4 is-drawer-close:hidden">
                <Logo></Logo>
              </div>
              
              {/* Navigation Items */}
              <li>
                <Link to={"/"}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                    data-tip="Homepage"
                  >
                    <LucideHome className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideHome>
                    <span className="is-drawer-close:hidden font-medium">Homepage</span>
                  </button>
                </Link>
              </li>
              
              <li>
                <Link to={"/dashboard/myprofile"}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                    data-tip="Profile"
                  >
                    <LucideUser className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideUser>
                    <span className="is-drawer-close:hidden font-medium">My Profile</span>
                  </button>
                </Link>
              </li>
              
              <li>
                <Link to={"/dashboard/mybookings"}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                    data-tip="My Booking"
                  >
                    <LucideBook className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideBook>
                    <span className="is-drawer-close:hidden font-medium">My Bookings</span>
                  </button>
                </Link>
              </li>
              
              <li>
                <Link to={"/dashboard/paymentHistory"}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                    data-tip="Payment History"
                  >
                    <LucideIdCard className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideIdCard>
                    <span className="is-drawer-close:hidden font-medium">Payment History</span>
                  </button>
                </Link>
              </li>
              
              {/* Decorator Section */}
              {
                role === "Decorator" && <>
                  {/* Section Divider */}
                  <div className="is-drawer-close:hidden">
                    <div className="flex items-center gap-2 px-3 py-4 mt-4 mb-2">
                      <div className="h-px bg-gray-300 flex-1"></div>
                      <span className="text-xs font-semibold text-[#628141] uppercase tracking-wider bg-white px-2">Decorator</span>
                      <div className="h-px bg-gray-300 flex-1"></div>
                    </div>
                  </div>
                  
                  <li>
                    <Link to={"/dashboard/assignedpackage"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Manage Package"
                      >
                        <Package className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></Package>
                        <span className="is-drawer-close:hidden font-medium">Manage Package</span>
                      </button>
                    </Link>
                  </li> 
                  
                  <li>
                    <Link to={"/dashboard/completedtask"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Completed Tasks"
                      >
                        <Target className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></Target>
                        <span className="is-drawer-close:hidden font-medium">Completed Tasks</span>
                      </button>
                    </Link>
                  </li> 
                  
                  <li>
                    <Link to={"/dashboard/totalpayment"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Total Payment"
                      >
                        <CircleDollarSign className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></CircleDollarSign>
                        <span className="is-drawer-close:hidden font-medium">Total Payment</span>
                      </button>
                    </Link>
                  </li> 
                </>
              }
              
              {/* Admin Section */}
              {
                role === "Admin" && <>
                  {/* Section Divider */}
                  <div className="is-drawer-close:hidden">
                    <div className="flex items-center gap-2 px-3 py-4 mt-4 mb-2">
                      <div className="h-px bg-gray-300 flex-1"></div>
                      <span className="text-xs font-semibold text-[#628141] uppercase tracking-wider bg-white px-2">Admin Panel</span>
                      <div className="h-px bg-gray-300 flex-1"></div>
                    </div>
                  </div>
                  
                  <li>
                    <Link to={"/dashboard/approve_decorator"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Approve Decorator"
                      >
                        <SprayCan className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></SprayCan>
                        <span className="is-drawer-close:hidden font-medium">Approve Decorator</span>
                      </button>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/dashboard/users"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Users"
                      >
                        <LucideUser className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideUser>
                        <span className="is-drawer-close:hidden font-medium">Users</span>
                      </button>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/dashboard/assigndecorator"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Assign Decorator"
                      >
                        <UserStar className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></UserStar>
                        <span className="is-drawer-close:hidden font-medium">Assign Decorator</span>
                      </button>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/dashboard/create_service"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Create Service"
                      >
                        <LucideSticker className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideSticker>
                        <span className="is-drawer-close:hidden font-medium">Create Service</span>
                      </button>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/dashboard/revenue"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Revenue Chart"
                      >
                        <LucideMonitorCheck className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideMonitorCheck>
                        <span className="is-drawer-close:hidden font-medium">Revenue Chart</span>
                      </button>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/dashboard/service_demand"}>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full p-3 rounded-lg text-gray-700  hover:text-[#628141] transition-all duration-200 group"
                        data-tip="Service Demand Chart"
                      >
                        <LucideChartBar className="text-gray-500 group-hover:text-[#628141] w-5 h-5"></LucideChartBar>
                        <span className="is-drawer-close:hidden font-medium">Service Demand Chart</span>
                      </button>
                    </Link>
                  </li>
                </>
              }              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;