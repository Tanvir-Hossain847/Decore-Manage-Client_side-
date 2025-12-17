import React from 'react';
import Logo from '../Components/Logo';
import { Link, Outlet } from 'react-router';
import { LucideBook, LucideHome, LucideIdCard, LucideSettings, LucideUser, SprayCan } from 'lucide-react';

const DashBoardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4">Member Dashboard</div>
                    </nav>

                    <div className="p-4"><Outlet></Outlet></div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow space-y-3">
                            {/* List item */}
                            <div className="p-5 is-drawer-close:hidden">
                                <Logo></Logo>
                            </div>
                            <li>
                                <Link to={'/'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Homepage">
                                    <LucideHome className='text-secondary'></LucideHome>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/myprofile'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Profile">
                                    <LucideUser className='text-secondary'></LucideUser>
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </button></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/mybookings'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="My Booking">
                                    <LucideBook className='text-secondary'></LucideBook>
                                    <span className="is-drawer-close:hidden">My Bookings</span>
                                </button></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/paymentHistory'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Payment History">
                                    <LucideIdCard className='text-secondary'></LucideIdCard>
                                    <span className="is-drawer-close:hidden">Payment History</span>
                                </button></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/approve_decorator'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Approve Decorator">
                                    <SprayCan className='text-secondary'></SprayCan>
                                    <span className="is-drawer-close:hidden">Approve Decorator</span>
                                </button></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/users'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Users">
                                    <LucideUser className='text-secondary'></LucideUser>
                                    <span className="is-drawer-close:hidden">Users</span>
                                </button></Link>
                            </li>

                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <LucideSettings className='text-secondary'></LucideSettings>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;