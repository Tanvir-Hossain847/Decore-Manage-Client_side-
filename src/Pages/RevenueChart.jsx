import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import Loder from '../Components/Loder';

const RevenueChart = () => {
    const [transactions, setTransaction] = useState()
    const axiosSecure = useAxiosSecure() 
    const { user } = use(AuthContext)
    useEffect(() => {
        if(!user){
            return
        }
        axiosSecure.get('/payments')
        .then(res => {
            setTransaction(res.data)
        })
    }, [axiosSecure, user])
    
    const [revenueData] = useState({
        totalRevenue: 125000,
        monthlyRevenue: [
            { month: 'Jan', revenue: 8500 },
            { month: 'Feb', revenue: 12000 },
            { month: 'Mar', revenue: 9800 },
            { month: 'Apr', revenue: 15200 },
            { month: 'May', revenue: 18500 },
            { month: 'Jun', revenue: 22000 },
            { month: 'Jul', revenue: 19800 },
            { month: 'Aug', revenue: 25000 },
            { month: 'Sep', revenue: 21500 },
            { month: 'Oct', revenue: 28000 },
            { month: 'Nov', revenue: 32000 },
            { month: 'Dec', revenue: 35000 }
        ]
    });


    if(!transactions){
        return <Loder></Loder>
    }
    console.log(transactions);

    // DYNAMIC CALCULATIONS FROM ACTUAL TRANSACTION DATA
    const calculateDynamicRevenue = () => {
        if (!transactions || transactions.length === 0) {
            return {
                totalRevenue: 0,
                thisMonthRevenue: 0,
                averageMonthly: 0,
                growthRate: 0,
                monthlyData: []
            };
        }

        // Calculate total revenue from all paid transactions
        const totalRevenue = transactions
            .filter(t => t.PaymentStatus === 'paid')
            .reduce((sum, t) => sum + (t.amountTotal ? t.amountTotal / 100 : 0), 0);

        // Get current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Calculate this month's revenue
        const thisMonthRevenue = transactions
            .filter(t => {
                if (t.PaymentStatus !== 'paid' || !t.paidAt) return false;
                const transactionDate = new Date(t.paidAt);
                return transactionDate.getMonth() === currentMonth && 
                       transactionDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + (t.amountTotal ? t.amountTotal / 100 : 0), 0);

        // Calculate monthly data for the last 12 months
        const monthlyData = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        for (let i = 11; i >= 0; i--) {
            const targetDate = new Date(currentYear, currentMonth - i, 1);
            const targetMonth = targetDate.getMonth();
            const targetYear = targetDate.getFullYear();
            
            const monthRevenue = transactions
                .filter(t => {
                    if (t.PaymentStatus !== 'paid' || !t.paidAt) return false;
                    const transactionDate = new Date(t.paidAt);
                    return transactionDate.getMonth() === targetMonth && 
                           transactionDate.getFullYear() === targetYear;
                })
                .reduce((sum, t) => sum + (t.amountTotal ? t.amountTotal / 100 : 0), 0);
            
            monthlyData.push({
                month: monthNames[targetMonth],
                revenue: monthRevenue
            });
        }

        // Calculate average monthly revenue
        const averageMonthly = monthlyData.length > 0 ? 
            monthlyData.reduce((sum, m) => sum + m.revenue, 0) / monthlyData.length : 0;

        // Calculate growth rate (compare last 6 months vs previous 6 months)
        const lastSixMonths = monthlyData.slice(-6).reduce((sum, m) => sum + m.revenue, 0);
        const previousSixMonths = monthlyData.slice(-12, -6).reduce((sum, m) => sum + m.revenue, 0);
        const growthRate = previousSixMonths > 0 ? 
            ((lastSixMonths - previousSixMonths) / previousSixMonths * 100) : 0;

        return {
            totalRevenue,
            thisMonthRevenue,
            averageMonthly,
            growthRate,
            monthlyData
        };
    };

    const dynamicRevenue = calculateDynamicRevenue();
    
    // Calculate max value for chart scaling
    const maxRevenue = dynamicRevenue.monthlyData.length > 0 ? 
        Math.max(...dynamicRevenue.monthlyData.map(item => item.revenue)) : 
        Math.max(...revenueData.monthlyRevenue.map(item => item.revenue));

    return (
        <div className="space-y-6">
            {/* DYNAMIC REVENUE OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#628141' }}>
                    <div className="stat-title text-gray-600">Total Revenue</div>
                    <div className="stat-value" style={{ color: '#628141' }}>
                        ৳{dynamicRevenue.totalRevenue.toLocaleString()}
                    </div>
                    <div className="stat-desc text-gray-500">All time</div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#1B211A' }}>
                    <div className="stat-title text-gray-600">This Month</div>
                    <div className="stat-value" style={{ color: '#1B211A' }}>
                        ৳{dynamicRevenue.thisMonthRevenue.toLocaleString()}
                    </div>
                    <div className="stat-desc text-gray-500">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#EBD5AB' }}>
                    <div className="stat-title text-gray-600">Average/Month</div>
                    <div className="stat-value" style={{ color: '#628141' }}>
                        ৳{Math.round(dynamicRevenue.averageMonthly).toLocaleString()}
                    </div>
                    <div className="stat-desc text-gray-500">Last 12 months</div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#628141' }}>
                    <div className="stat-title text-gray-600">Growth</div>
                    <div className="stat-value" style={{ 
                        color: dynamicRevenue.growthRate >= 0 ? '#628141' : '#dc2626' 
                    }}>
                        {dynamicRevenue.growthRate >= 0 ? '+' : ''}{Math.round(dynamicRevenue.growthRate)}%
                    </div>
                    <div className="stat-desc text-gray-500">vs previous 6 months</div>
                </div>
            </div>

            {/* MAIN REVENUE CHART */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-6">Monthly Revenue Trend</h2>
                    
                    {/* CHART CONTAINER */}
                    <div className="w-full h-80 relative">
                        {/* Y-AXIS LABELS */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                            <span>৳{maxRevenue.toLocaleString()}</span>
                            <span>৳{Math.round(maxRevenue * 0.75).toLocaleString()}</span>
                            <span>৳{Math.round(maxRevenue * 0.5).toLocaleString()}</span>
                            <span>৳{Math.round(maxRevenue * 0.25).toLocaleString()}</span>
                            <span>৳0</span>
                        </div>

                        {/* CHART AREA */}
                        <div className="ml-12 h-full relative">
                            {/* GRID LINES */}
                            <div className="absolute inset-0 flex flex-col justify-between">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <div key={i} className="border-t border-gray-200 w-full"></div>
                                ))}
                            </div>

                            {/* BAR CHART - Use dynamic data if available, fallback to static */}
                            <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-2">
                                {(dynamicRevenue.monthlyData.length > 0 ? dynamicRevenue.monthlyData : revenueData.monthlyRevenue).map((item, index) => {
                                    const barHeight = (item.revenue / maxRevenue) * 100;
                                    
                                    // Debug: Log values for first bar
                                    if (index === 0) {
                                        console.log('Revenue data:', item);
                                        console.log('Max revenue:', maxRevenue);
                                        console.log('Bar height %:', barHeight);
                                    }
                                    
                                    return (
                                        <div key={index} className="flex flex-col items-center group">
                                            {/* BAR */}
                                            <div 
                                                className="rounded-t-md w-8 transition-all duration-300 cursor-pointer relative group-hover:opacity-80 border border-gray-300"
                                                style={{ 
                                                    height: `${barHeight}%`,
                                                    minHeight: item.revenue > 0 ? '10px' : '0px',
                                                    background: 'linear-gradient(to top, #628141, #628141cc)'
                                                }}
                                            >
                                                {/* TOOLTIP */}
                                                <div 
                                                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                                    style={{ backgroundColor: '#1B211A' }}
                                                >
                                                    ৳{item.revenue.toLocaleString()}
                                                </div>
                                            </div>
                                            {/* MONTH LABEL */}
                                            <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RECENT TRANSACTIONS TABLE */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Recent Transactions</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions && transactions.length > 0 ? transactions.map((transaction, index) => (
                                    <tr key={transaction._id || transaction.id || index}>
                                        <td className="font-medium">{transaction.serviceName || 'N/A'}</td>
                                        <td className="font-bold" style={{ color: '#628141' }}>
                                            ৳{transaction.amountTotal ? transaction.amountTotal/100 : '0'}
                                        </td>
                                        <td>{transaction.paidAt || 'N/A'}</td>
                                        <td>
                                            <span className={`badge ${
                                                transaction.PaymentStatus === 'paid' ? 'badge-success text-white' : 'badge-neutral'
                                            }`}>
                                                {transaction.PaymentStatus || 'pending'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;