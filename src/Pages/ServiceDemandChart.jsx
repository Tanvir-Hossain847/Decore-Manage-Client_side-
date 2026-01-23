import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loder from '../Components/Loder';

const ServiceDemandChart = () => {
    const axiosSecure = useAxiosSecure()
    const [bookings, setBookings] = useState()
    const [services, setServices] = useState()
    
    useEffect(() =>{
        // Fetch bookings data
        axiosSecure.get('/booking')
        .then(res =>{
            setBookings(res.data)
        })
        
        // Fetch services data
        axiosSecure.get('/services')
        .then(res =>{
            setServices(res.data)
        })
    },[axiosSecure])

    if(!bookings || !services){
        return <Loder></Loder>
    }
    
    console.log('Bookings:', bookings);
    console.log('Serv;ppices:', services);

    const calculateDynamicDemand = () => {
        if (!bookings || bookings.length === 0) {
            console.log('No bookings data available');
            return {
                totalBookings: 0,
                thisMonthBookings: 0,
                mostPopularCategory: 'No Data',
                mostPopularCount: 0,
                growthRate: 0,
                serviceCategories: [],
                monthlyDemand: [],
                topServices: []
            };
        }

        const totalBookings = bookings.length;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const thisMonthBookings = bookings.filter(booking => {
            if (!booking.createdAt) return false;
            const bookingDate = new Date(booking.createdAt);
            return bookingDate.getMonth() === currentMonth && 
                   bookingDate.getFullYear() === currentYear;
        }).length;

        const categoryColors = {
            'wedding': '#628141',
            'birthday': '#1B211A', 
            'corporate': '#EBD5AB',
            'home': '#628141b3',
            'seminar': '#1B211Ab3',
            'office': '#EBD5AB',
            'meeting': '#1B211Ab3'
        };

        const categoryCounts = {};
        bookings.forEach(booking => {
            let category = 'other';
            
            if (booking.category) {
                category = booking.category.toLowerCase();
            } else if (services && services.length > 0) {
                const matchingService = services.find(service => {
                    const bookingServiceName = booking.serviceName || booking.packageTitle || '';
                    return bookingServiceName.toLowerCase().includes(service.service_name?.toLowerCase() || '') ||
                           service.service_name?.toLowerCase().includes(bookingServiceName.toLowerCase()) ||
                           booking.serviceId === service._id;
                });
                
                if (matchingService && matchingService.category) {
                    category = matchingService.category.toLowerCase();
                }
            }
            
            // Fallback: try to guess from service name
            if (category === 'other') {
                const serviceName = (booking.serviceName || booking.packageTitle || '').toLowerCase();
                if (serviceName.includes('wedding')) category = 'wedding';
                else if (serviceName.includes('birthday')) category = 'birthday';
                else if (serviceName.includes('corporate') || serviceName.includes('office')) category = 'corporate';
                else if (serviceName.includes('home')) category = 'home';
                else if (serviceName.includes('seminar') || serviceName.includes('meeting')) category = 'seminar';
            }
            
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        const serviceCategories = Object.entries(categoryCounts)
            .map(([category, count]) => ({
                category: category.charAt(0).toUpperCase() + category.slice(1),
                bookings: count,
                percentage: Math.round((count / totalBookings) * 100),
                color: categoryColors[category] || '#628141'
            }))
            .sort((a, b) => b.bookings - a.bookings);

        // Find most popular category
        const mostPopular = serviceCategories[0] || { category: 'N/A', bookings: 0 };
        
        // Debug logging
        console.log('Category counts:', categoryCounts);
        console.log('Service categories:', serviceCategories);
        console.log('Most popular:', mostPopular);

        // Calculate monthly demand for last 12 months
        const monthlyDemand = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        for (let i = 11; i >= 0; i--) {
            const targetDate = new Date(currentYear, currentMonth - i, 1);
            const targetMonth = targetDate.getMonth();
            const targetYear = targetDate.getFullYear();
            
            const monthBookings = bookings.filter(booking => {
                if (!booking.createdAt) return false;
                const bookingDate = new Date(booking.createdAt);
                return bookingDate.getMonth() === targetMonth && 
                       bookingDate.getFullYear() === targetYear;
            });

            // Enhanced monthly data calculation with service data
            const getServiceCategory = (booking) => {
                // First try booking category
                if (booking.category) {
                    return booking.category.toLowerCase();
                }
                
                // If no booking category, try to match with service data
                if (services && services.length > 0) {
                    const matchingService = services.find(service => {
                        const bookingServiceName = booking.serviceName || booking.packageTitle || '';
                        return bookingServiceName.toLowerCase().includes(service.service_name?.toLowerCase() || '') ||
                               service.service_name?.toLowerCase().includes(bookingServiceName.toLowerCase()) ||
                               booking.serviceId === service._id;
                    });
                    
                    if (matchingService && matchingService.category) {
                        return matchingService.category.toLowerCase();
                    }
                }
                
                // Fallback: try to guess from service name
                const serviceName = (booking.serviceName || booking.packageTitle || '').toLowerCase();
                if (serviceName.includes('wedding')) return 'wedding';
                if (serviceName.includes('birthday')) return 'birthday';
                if (serviceName.includes('corporate') || serviceName.includes('office')) return 'corporate';
                if (serviceName.includes('home')) return 'home';
                if (serviceName.includes('seminar') || serviceName.includes('meeting')) return 'seminar';
                
                return 'other';
            };

            const monthData = {
                month: monthNames[targetMonth],
                wedding: monthBookings.filter(b => getServiceCategory(b) === 'wedding').length,
                birthday: monthBookings.filter(b => getServiceCategory(b) === 'birthday').length,
                corporate: monthBookings.filter(b => ['corporate', 'office'].includes(getServiceCategory(b))).length,
                home: monthBookings.filter(b => getServiceCategory(b) === 'home').length,
                seminar: monthBookings.filter(b => ['seminar', 'meeting'].includes(getServiceCategory(b))).length
            };
            
            monthlyDemand.push(monthData);
        }

        // Calculate top services using both booking and service data
        const calculateTopServices = () => {
            if (!services || services.length === 0) {
                // Fallback to booking data only
                const serviceCounts = {};
                bookings.forEach(booking => {
                    const serviceName = booking.serviceName || booking.packageTitle || 'Unknown Service';
                    serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
                });

                return Object.entries(serviceCounts)
                    .map(([name, count]) => ({
                        name,
                        bookings: count,
                        trend: '+0%',
                        category: 'Unknown',
                        price: 'N/A'
                    }))
                    .sort((a, b) => b.bookings - a.bookings)
                    .slice(0, 5);
            }

            // Enhanced calculation with service data
            const serviceStats = services.map(service => {
                // Count bookings for this service
                const serviceBookings = bookings.filter(booking => {
                    const bookingServiceName = booking.serviceName || booking.packageTitle || '';
                    return bookingServiceName.toLowerCase().includes(service.service_name?.toLowerCase() || '') ||
                           service.service_name?.toLowerCase().includes(bookingServiceName.toLowerCase()) ||
                           booking.serviceId === service._id;
                }).length;

                // Calculate trend (last 6 months vs previous 6 months)
                const lastSixMonths = bookings.filter(booking => {
                    if (!booking.createdAt) return false;
                    const bookingDate = new Date(booking.createdAt);
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    
                    const bookingServiceName = booking.serviceName || booking.packageTitle || '';
                    const isMatchingService = bookingServiceName.toLowerCase().includes(service.service_name?.toLowerCase() || '') ||
                                            service.service_name?.toLowerCase().includes(bookingServiceName.toLowerCase()) ||
                                            booking.serviceId === service._id;
                    
                    return isMatchingService && bookingDate >= sixMonthsAgo;
                }).length;

                const previousSixMonths = bookings.filter(booking => {
                    if (!booking.createdAt) return false;
                    const bookingDate = new Date(booking.createdAt);
                    const twelveMonthsAgo = new Date();
                    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    
                    const bookingServiceName = booking.serviceName || booking.packageTitle || '';
                    const isMatchingService = bookingServiceName.toLowerCase().includes(service.service_name?.toLowerCase() || '') ||
                                            service.service_name?.toLowerCase().includes(bookingServiceName.toLowerCase()) ||
                                            booking.serviceId === service._id;
                    
                    return isMatchingService && bookingDate >= twelveMonthsAgo && bookingDate < sixMonthsAgo;
                }).length;

                const trendPercentage = previousSixMonths > 0 ? 
                    Math.round(((lastSixMonths - previousSixMonths) / previousSixMonths) * 100) : 
                    (lastSixMonths > 0 ? 100 : 0);

                return {
                    name: service.service_name || 'Unknown Service',
                    bookings: serviceBookings,
                    trend: `${trendPercentage >= 0 ? '+' : ''}${trendPercentage}%`,
                    category: service.category || 'Unknown',
                    price: service.cost ? `৳${service.cost.toLocaleString()}` : 'N/A',
                    rating: service.rating || 0,
                    isActive: service.isActive
                };
            });

            return serviceStats
                .filter(service => service.isActive !== false) // Only include active services
                .sort((a, b) => {
                    // Primary sort: Rating (higher is better)
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating;
                    }
                    // Secondary sort: Bookings (higher is better)
                    if (b.bookings !== a.bookings) {
                        return b.bookings - a.bookings;
                    }
                    // Tertiary sort: Alphabetical by name
                    return a.name.localeCompare(b.name);
                })
                .slice(0, 5);
        };

        const topServices = calculateTopServices();

        // Calculate growth rate (compare last 6 months vs previous 6 months)
        const lastSixMonthsTotal = monthlyDemand.slice(-6).reduce((sum, m) => 
            sum + m.wedding + m.birthday + m.corporate + m.home + m.seminar, 0);
        const previousSixMonthsTotal = monthlyDemand.slice(-12, -6).reduce((sum, m) => 
            sum + m.wedding + m.birthday + m.corporate + m.home + m.seminar, 0);
        const growthRate = previousSixMonthsTotal > 0 ? 
            Math.round(((lastSixMonthsTotal - previousSixMonthsTotal) / previousSixMonthsTotal) * 100) : 0;

        return {
            totalBookings,
            thisMonthBookings,
            mostPopularCategory: mostPopular.category,
            mostPopularCount: mostPopular.bookings,
            growthRate,
            serviceCategories,
            monthlyDemand,
            topServices
        };
    };

    // Only calculate when data is loaded
    const dynamicDemand = (bookings && services) ? calculateDynamicDemand() : {
        totalBookings: 0,
        thisMonthBookings: 0,
        mostPopularCategory: 'Loading...',
        mostPopularCount: 0,
        growthRate: 0,
        serviceCategories: [],
        monthlyDemand: [],
        topServices: []
    };
    
    // Calculate max value for histogram scaling
    const maxBookings = dynamicDemand.monthlyDemand.length > 0 ? 
        Math.max(...dynamicDemand.monthlyDemand.map(month => 
            month.wedding + month.birthday + month.corporate + month.home + month.seminar
        )) : 100;
    
    // Debug: Log the calculated values
    console.log('Dynamic demand data:', dynamicDemand);
    console.log('Max bookings:', maxBookings);

    return (
        <div className="space-y-6">
            {/* DYNAMIC SERVICE DEMAND OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#628141' }}>
                    <div className="stat-title text-gray-600">Total Bookings</div>
                    <div className="stat-value" style={{ color: '#628141' }}>
                        {dynamicDemand.totalBookings.toLocaleString()}
                    </div>
                    <div className="stat-desc text-gray-500">All time</div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#1B211A' }}>
                    <div className="stat-title text-gray-600">Most Popular</div>
                    <div className="stat-value text-lg" style={{ color: '#1B211A' }}>
                        {dynamicDemand.mostPopularCategory}
                    </div>
                    <div className="stat-desc text-gray-500">
                        {dynamicDemand.mostPopularCount} bookings
                    </div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#EBD5AB' }}>
                    <div className="stat-title text-gray-600">This Month</div>
                    <div className="stat-value" style={{ color: '#628141' }}>
                        {dynamicDemand.thisMonthBookings}
                    </div>
                    <div className="stat-desc text-gray-500">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                </div>
                <div className="stat bg-white shadow-xl rounded-lg border-l-4" style={{ borderLeftColor: '#628141' }}>
                    <div className="stat-title text-gray-600">Growth Rate</div>
                    <div className="stat-value" style={{ 
                        color: dynamicDemand.growthRate >= 0 ? '#628141' : '#dc2626' 
                    }}>
                        {dynamicDemand.growthRate >= 0 ? '+' : ''}{dynamicDemand.growthRate}%
                    </div>
                    <div className="stat-desc text-gray-500">vs previous 6 months</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SERVICE CATEGORY BREAKDOWN - PIE CHART STYLE */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Service Category Distribution</h2>
                        
                        {/* DYNAMIC CIRCULAR PROGRESS INDICATORS */}
                        <div className="space-y-4">
                            {dynamicDemand.serviceCategories.map((service, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: service.color }}></div>
                                        <span className="font-medium">{service.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="font-bold">{service.bookings}</div>
                                            <div className="text-xs text-gray-500">{service.percentage}%</div>
                                        </div>
                                        {/* PROGRESS BAR */}
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="h-2 rounded-full"
                                                style={{ 
                                                    width: `${service.percentage}%`,
                                                    backgroundColor: service.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* VISUAL PIE REPRESENTATION */}
                        <div className="mt-6 flex justify-center">
                            <div className="relative w-32 h-32">
                                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="transparent"
                                        stroke="#e5e7eb"
                                        strokeWidth="2"
                                    />
                                    {/* DYNAMIC PIE SLICES */}
                                    {dynamicDemand.serviceCategories.map((service, index) => {
                                        const offset = dynamicDemand.serviceCategories
                                            .slice(0, index)
                                            .reduce((sum, s) => sum + s.percentage, 0);
                                        return (
                                            <circle
                                                key={index}
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="transparent"
                                                stroke={service.color}
                                                strokeWidth="2"
                                                strokeDasharray={`${service.percentage} ${100 - service.percentage}`}
                                                strokeDashoffset={-offset}
                                                className="transition-all duration-300"
                                            />
                                        );
                                    })}
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-lg font-bold">{dynamicDemand.totalBookings}</div>
                                        <div className="text-xs text-gray-500">Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOP SERVICES LIST */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-6">Top Rated Services</h2>
                        
                        <div className="space-y-4">
                            {dynamicDemand.topServices.length > 0 ? dynamicDemand.topServices.map((service, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#628141' }}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{service.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {service.bookings} bookings • {service.category}
                                                {service.price !== 'N/A' && ` • ${service.price}`}
                                                {service.rating > 0 && (
                                                    <span className="ml-2">
                                                        ⭐ {service.rating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span 
                                            className="badge text-white" 
                                            style={{ 
                                                backgroundColor: service.trend.startsWith('+') ? '#628141' : '#dc2626', 
                                                borderColor: service.trend.startsWith('+') ? '#628141' : '#dc2626' 
                                            }}
                                        >
                                            {service.trend}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>No service data available</p>
                                    <p className="text-sm">Services will appear here once booking data is linked to service records</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MONTHLY DEMAND HISTOGRAM */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-6">Monthly Service Demand (Histogram)</h2>
                    
                    {/* LEGEND */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#628141' }}></div>
                            <span className="text-sm">Wedding</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#1B211A' }}></div>
                            <span className="text-sm">Birthday</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EBD5AB' }}></div>
                            <span className="text-sm">Corporate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#628141b3' }}></div>
                            <span className="text-sm">Home</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#1B211Ab3' }}></div>
                            <span className="text-sm">Seminar</span>
                        </div>
                    </div>

                    {/* HISTOGRAM CHART */}
                    <div className="w-full h-80 relative bg-gray-50 border border-gray-200 rounded-lg">
                        {/* Y-AXIS LABELS */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2 w-12">
                            <span>{maxBookings}</span>
                            <span>{Math.round(maxBookings * 0.75)}</span>
                            <span>{Math.round(maxBookings * 0.5)}</span>
                            <span>{Math.round(maxBookings * 0.25)}</span>
                            <span>0</span>
                        </div>

                        {/* CHART AREA */}
                        <div className="ml-12 h-full relative">
                            {/* GRID LINES */}
                            <div className="absolute inset-0 flex flex-col justify-between">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <div key={i} className="border-t border-gray-200 w-full"></div>
                                ))}
                            </div>

                            {/* DYNAMIC STACKED BAR CHART */}
                            <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-1">
                                {dynamicDemand.monthlyDemand.map((month, index) => {
                                    const total = month.wedding + month.birthday + month.corporate + month.home + month.seminar;
                                    const barHeight = (total / maxBookings) * 100;
                                    
                                    // Debug: Log values for first month
                                    if (index === 0) {
                                        console.log('Month data:', month);
                                        console.log('Total:', total);
                                        console.log('Bar height %:', barHeight);
                                    }
                                    
                                    return (
                                        <div key={index} className="flex flex-col items-center group">
                                            {/* STACKED BARS */}
                                            <div 
                                                className="w-6 flex flex-col-reverse rounded-t-md overflow-hidden border border-gray-300"
                                                style={{ 
                                                    height: `${barHeight}%`,
                                                    minHeight: total > 0 ? '10px' : '0px'
                                                }}
                                            >
                                                <div 
                                                    style={{ 
                                                        height: `${(month.wedding / total) * 100}%`,
                                                        backgroundColor: '#628141',
                                                        minHeight: month.wedding > 0 ? '2px' : '0px'
                                                    }}
                                                ></div>
                                                <div 
                                                    style={{ 
                                                        height: `${(month.birthday / total) * 100}%`,
                                                        backgroundColor: '#1B211A',
                                                        minHeight: month.birthday > 0 ? '2px' : '0px'
                                                    }}
                                                ></div>
                                                <div 
                                                    style={{ 
                                                        height: `${(month.corporate / total) * 100}%`,
                                                        backgroundColor: '#EBD5AB',
                                                        minHeight: month.corporate > 0 ? '2px' : '0px'
                                                    }}
                                                ></div>
                                                <div 
                                                    style={{ 
                                                        height: `${(month.home / total) * 100}%`,
                                                        backgroundColor: '#628141b3',
                                                        minHeight: month.home > 0 ? '2px' : '0px'
                                                    }}
                                                ></div>
                                                <div 
                                                    style={{ 
                                                        height: `${(month.seminar / total) * 100}%`,
                                                        backgroundColor: '#1B211Ab3',
                                                        minHeight: month.seminar > 0 ? '2px' : '0px'
                                                    }}
                                                ></div>
                                            </div>
                                            
                                            {/* TOOLTIP */}
                                            <div 
                                                className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                                                style={{ backgroundColor: '#1B211A' }}
                                            >
                                                <div>Total: {total}</div>
                                                <div>Wedding: {month.wedding}</div>
                                                <div>Birthday: {month.birthday}</div>
                                                <div>Corporate: {month.corporate}</div>
                                            </div>
                                            
                                            {/* MONTH LABEL */}
                                            <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDemandChart;