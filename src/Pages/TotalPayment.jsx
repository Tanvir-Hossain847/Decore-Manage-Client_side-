import { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';
import { Calendar, DollarSign, TrendingUp, Award, MapPin, Clock } from 'lucide-react';

const TotalPayment = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = use(AuthContext)
    
    const {
        data: tasks = [],
        isLoading,
    } = useQuery({
        queryKey: ["booking", user.email, "Decorator_Assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/complete?decoratorEmail=${user.email}&workStatus=Completed`);
            return res.data;
        },
    });

    console.log('Completed tasks:', tasks);

    // Calculate earnings (60% of package cost)
    const calculateEarnings = () => {
        if (!tasks || tasks.length === 0) {
            return {
                totalEarnings: 0,
                totalRevenue: 0,
                completedJobs: 0,
                averageEarning: 0,
                thisMonthEarnings: 0,
                commissionRate: 60
            };
        }

        const totalRevenue = tasks.reduce((sum, task) => {
            const packageCost = task.packagePrice || task.packageCost || task.cost || task.price || 0;
            return sum + packageCost;
        }, 0);

        const totalEarnings = totalRevenue * 0.6; // 60% commission
        const completedJobs = tasks.length;
        const averageEarning = completedJobs > 0 ? totalEarnings / completedJobs : 0;

        // Calculate this month's earnings
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const thisMonthTasks = tasks.filter(task => {
            if (!task.completedAt && !task.createdAt) return false;
            const taskDate = new Date(task.completedAt || task.createdAt);
            return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
        });

        const thisMonthRevenue = thisMonthTasks.reduce((sum, task) => {
            const packageCost = task.packagePrice || task.packageCost || task.cost || task.price || 0;
            return sum + packageCost;
        }, 0);

        const thisMonthEarnings = thisMonthRevenue * 0.6;

        return {
            totalEarnings,
            totalRevenue,
            completedJobs,
            averageEarning,
            thisMonthEarnings,
            commissionRate: 60
        };
    };

    const earnings = calculateEarnings();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#628141]">
                            <img 
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=628141&color=fff`}
                                alt={user?.displayName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#1B211A]">Earnings Dashboard</h1>
                            <p className="text-lg text-gray-600">Welcome back, {user?.displayName}</p>
                        </div>
                    </div>
                </div>

                {/* Earnings Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Earnings */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#628141]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
                                <p className="text-3xl font-bold text-[#628141]">
                                    ৳{earnings.totalEarnings.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {earnings.commissionRate}% of ৳{earnings.totalRevenue.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-[#628141]/10 rounded-full flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-[#628141]" />
                            </div>
                        </div>
                    </div>

                    {/* Completed Jobs */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#1B211A]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Completed Jobs</p>
                                <p className="text-3xl font-bold text-[#1B211A]">
                                    {earnings.completedJobs}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Total projects</p>
                            </div>
                            <div className="w-12 h-12 bg-[#1B211A]/10 rounded-full flex items-center justify-center">
                                <Award className="w-6 h-6 text-[#1B211A]" />
                            </div>
                        </div>
                    </div>

                    {/* Average Earning */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#EBD5AB]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Average per Job</p>
                                <p className="text-3xl font-bold text-[#628141]">
                                    ৳{Math.round(earnings.averageEarning).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Per project</p>
                            </div>
                            <div className="w-12 h-12 bg-[#EBD5AB]/20 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-[#628141]" />
                            </div>
                        </div>
                    </div>

                    {/* This Month */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#628141]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">This Month</p>
                                <p className="text-3xl font-bold text-[#628141]">
                                    ৳{earnings.thisMonthEarnings.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-[#628141]/10 rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-[#628141]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Commission Info Banner */}
                <div className="bg-gradient-to-r from-[#628141]/10 to-[#EBD5AB]/20 rounded-2xl p-6 mb-8 border border-[#628141]/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#628141] rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1B211A]">Commission Structure</h3>
                            <p className="text-gray-600">
                                You earn <span className="font-bold text-[#628141]">60%</span> of each completed project's value. 
                                Keep up the excellent work!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Completed Tasks Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-[#1B211A]">Completed Projects</h2>
                        <p className="text-gray-600 mt-1">Your successful project history</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left font-semibold text-gray-700">Project Details</th>
                                    <th className="text-left font-semibold text-gray-700">Client & Location</th>
                                    <th className="text-left font-semibold text-gray-700">Date & Duration</th>
                                    <th className="text-left font-semibold text-gray-700">Package Value</th>
                                    <th className="text-left font-semibold text-gray-700">Your Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks && tasks.length > 0 ? tasks.map((task, index) => {
                                    const packageCost = task.packagePrice || task.packageCost || task.cost || task.price || 0;
                                    const earning = packageCost * 0.6;
                                    
                                    return (
                                        <tr key={task._id || index} className="hover:bg-gray-50 border-b border-gray-100">
                                            {/* Project Details */}
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-[#628141]/10 rounded-lg flex items-center justify-center">
                                                        <Award className="w-6 h-6 text-[#628141]" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#1B211A]">
                                                            {task.packageTitle || task.serviceName || 'Decoration Service'}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {task.category || 'General'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Client & Location */}
                                            <td className="py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {task.clientName || task.userName || 'Client'}
                                                    </div>
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {task.location || 'Location not specified'}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date & Duration */}
                                            <td className="py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900 flex items-center gap-1">
                                                        <Calendar className="w-4 h-4 text-[#628141]" />
                                                        {task.bookingDate || task.eventDate || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Completed: {task.completedAt ? 
                                                            new Date(task.completedAt).toLocaleDateString() : 
                                                            'Recently'
                                                        }
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Package Value */}
                                            <td className="py-4">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        ৳{packageCost.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Package value</div>
                                                </div>
                                            </td>

                                            {/* Your Earnings */}
                                            <td className="py-4">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-[#628141]">
                                                        ৳{earning.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">60% commission</div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-12">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Award className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-700">No completed projects yet</h3>
                                                    <p className="text-gray-500">Your completed projects will appear here</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="mt-8 bg-gradient-to-r from-[#628141] to-[#1B211A] rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Keep up the great work!</h3>
                            <p className="text-white/80">You've earned ৳{earnings.totalEarnings.toLocaleString()} from {earnings.completedJobs} completed projects</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">৳{earnings.totalEarnings.toLocaleString()}</div>
                            <div className="text-white/80 text-sm">Total Earnings</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalPayment;