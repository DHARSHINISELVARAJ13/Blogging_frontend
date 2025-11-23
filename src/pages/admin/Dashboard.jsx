import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalBlogs: 0,
        publishedBlogs: 0,
        pendingBlogs: 0,
        totalComments: 0,
        totalLikes: 0,
        pendingComments: 0,
        totalUsers: 0,
        recentBlogs: []
    })
    const [analytics, setAnalytics] = useState({
        mostLikedBlogs: [],
        mostViewedBlogs: [],
        mostCommentedBlogs: []
    })
    const [loading, setLoading] = useState(true)
    const [analyticsLoading, setAnalyticsLoading] = useState(true)
    const [trafficToday, setTrafficToday] = useState(0)

    const { axios, navigate } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch dashboard data')
        } finally {
            setLoading(false)
        }
    }

    const fetchAnalytics = async () => {
        try {
            const { data } = await axios.get('/api/admin/analytics')
            if (data.success) {
                setAnalytics(data.analytics)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch analytics data')
        } finally {
            setAnalyticsLoading(false)
        }
    }

    const fetchTrafficToday = async () => {
        try {
            const { data } = await axios.get('/api/admin/traffic-today')
            if (data.success) {
                setTrafficToday(data.trafficToday)
            }
        } catch (error) {
            console.error('Failed to fetch traffic data:', error)
        }
    }

    useEffect(() => {
        fetchDashboard()
        fetchAnalytics()
        fetchTrafficToday()
        
        // Refresh dashboard data every 30 seconds
        const interval = setInterval(() => {
            fetchDashboard()
            fetchAnalytics()
            fetchTrafficToday()
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className='flex-1 p-4 md:p-10 bg-blue-50/50 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Total Blogs</p>
                            <p className='text-2xl font-bold text-gray-900'>{dashboardData.totalBlogs}</p>
                        </div>
                        <div className='p-3 bg-blue-100 rounded-full'>
                            <img src={assets.dashboard_icon_1} alt="" className='w-6 h-6'/>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Pending Blogs</p>
                            <p className='text-2xl font-bold text-orange-600'>{dashboardData.pendingBlogs}</p>
                        </div>
                        <div className='p-3 bg-orange-100 rounded-full'>
                            <img src={assets.dashboard_icon_3} alt="" className='w-6 h-6'/>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Pending Comments</p>
                            <p className='text-2xl font-bold text-red-600'>{dashboardData.pendingComments}</p>
                        </div>
                        <div className='p-3 bg-red-100 rounded-full'>
                            <img src={assets.dashboard_icon_2} alt="" className='w-6 h-6'/>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Total Likes</p>
                            <p className='text-2xl font-bold text-purple-600'>{dashboardData.totalLikes}</p>
                        </div>
                        <div className='p-3 bg-purple-100 rounded-full'>
                            <svg className='w-6 h-6 text-purple-600' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-600'>Total Users</p>
                            <p className='text-2xl font-bold text-green-600'>{dashboardData.totalUsers}</p>
                        </div>
                        <div className='p-3 bg-green-100 rounded-full'>
                            <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Traffic & contributors summary (simple, derived from available data) */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                {/* Traffic Today (simple sum of top viewed blogs as an approximation) */}
                <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white'>
                    <h3 className='font-semibold mb-2'>Traffic Today</h3>
                    <p className='text-blue-100 text-sm mb-4'>Views from last 24 hours</p>
                    <div className='text-3xl font-bold'>
                        {trafficToday}
                    </div>
                    <div className='mt-4'>
                        <button
                            onClick={() => window.location.href = '/admin/analytics'}
                            className='bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded text-sm transition-colors'
                        >
                            View Analytics
                        </button>
                    </div>
                </div>

                {/* Pending Approvals (unchanged) */}
                <div className='bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white'>
                    <h3 className='font-semibold mb-2'>Pending Approvals</h3>
                    <p className='text-orange-100 text-sm mb-4'>
                        {dashboardData.pendingBlogs + dashboardData.pendingComments} items need attention
                    </p>
                    <button
                        onClick={() => window.location.href = '/admin/listBlog'}
                        className='bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded text-sm transition-colors'
                    >
                        Review Now
                    </button>
                </div>

                {/* Top Contributors (derived from recentBlogs) */}
                <div className='bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white'>
                    <h3 className='font-semibold mb-2'>Top Contributors</h3>
                    <p className='text-green-100 text-sm mb-4'>Most active authors (recent)</p>
                    <div className='space-y-2'>
                        {
                            (() => {
                                const map = {};
                                (dashboardData.recentBlogs || []).forEach(b => {
                                    const name = b.authorName || b.author || b.authorUsername || 'Unknown';
                                    map[name] = (map[name] || 0) + 1;
                                });
                                const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3);
                                if (sorted.length === 0) return <div className='text-sm'>No recent contributors</div>;
                                return sorted.map(([name, count]) => (
                                    <div key={name} className='flex items-center justify-between'>
                                        <div className='text-sm font-medium'>{name}</div>
                                        <div className='text-sm font-semibold'>{count}</div>
                                    </div>
                                ));
                            })()
                        }
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                {/* Most Liked Blogs */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-200'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-red-100 rounded-full'>
                                <svg className='w-5 h-5 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Most Liked Blogs</h3>
                        </div>
                    </div>
                    <div className='p-6'>
                        {analyticsLoading ? (
                            <div className='text-center py-4'>
                                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto'></div>
                            </div>
                        ) : analytics.mostLikedBlogs.length > 0 ? (
                            <div className='space-y-3'>
                                {analytics.mostLikedBlogs.slice(0, 5).map((blog, index) => (
                                    <div key={blog._id} className='flex items-center justify-between py-2'>
                                        <a href={`/blog/${blog._id}`} className='flex-1 hover:underline cursor-pointer'>
                                            <p className='text-sm font-medium text-gray-900 truncate'>{blog.title}</p>
                                            <p className='text-xs text-gray-500'>
                                                {blog.authorName || blog.author}
                                                {blog.authorUsername ? ` (${blog.authorUsername})` : ''}
                                            </p>
                                        </a>
                                        <div className='flex items-center gap-1 text-red-600'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                            </svg>
                                            <span className='text-sm font-semibold'>{blog.likeCount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-gray-500 text-sm text-center py-4'>No liked blogs yet</p>
                        )}
                    </div>
                </div>

                {/* Most Viewed Blogs */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-200'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-blue-100 rounded-full'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Most Viewed Blogs</h3>
                        </div>
                    </div>
                    <div className='p-6'>
                        {analyticsLoading ? (
                            <div className='text-center py-4'>
                                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                            </div>
                        ) : analytics.mostViewedBlogs.length > 0 ? (
                            <div className='space-y-3'>
                                {analytics.mostViewedBlogs.slice(0, 5).map((blog, index) => (
                                    <div key={blog._id} className='flex items-center justify-between py-2'>
                                        <a 
                                            onClick={() => navigate(`/blog/${blog._id}`)}
                                            className='flex-1 hover:underline cursor-pointer'
                                        >
                                            <p className='text-sm font-medium text-gray-900 truncate'>{blog.title}</p>
                                            <p className='text-xs text-gray-500'>
                                                {blog.authorName || blog.author}
                                                {blog.authorUsername ? ` (${blog.authorUsername})` : ''}
                                            </p>
                                        </a>
                                        <div className='flex items-center gap-1 text-blue-600'>
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            <span className='text-sm font-semibold'>{blog.viewCount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-gray-500 text-sm text-center py-4'>No viewed blogs yet</p>
                        )}
                    </div>
                </div>

                {/* Most Commented Blogs */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                    <div className='p-6 border-b border-gray-200'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-green-100 rounded-full'>
                                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Most Commented Blogs</h3>
                        </div>
                    </div>
                    <div className='p-6'>
                        {analyticsLoading ? (
                            <div className='text-center py-4'>
                                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto'></div>
                            </div>
                        ) : analytics.mostCommentedBlogs.length > 0 ? (
                            <div className='space-y-3'>
                                {analytics.mostCommentedBlogs.slice(0, 5).map((blog, index) => (
                                    <div key={blog._id} className='flex items-center justify-between py-2'>
                                        <a 
                                            onClick={() => navigate(`/blog/${blog._id}`)}
                                            className='flex-1 hover:underline cursor-pointer'
                                        >
                                            <p className='text-sm font-medium text-gray-900 truncate'>{blog.title}</p>
                                            <p className='text-xs text-gray-500'>
                                                {blog.authorName || blog.author}
                                                {blog.authorUsername ? ` (${blog.authorUsername})` : ''}
                                            </p>
                                        </a>
                                        <div className='flex items-center gap-1 text-green-600'>
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                            </svg>
                                            <span className='text-sm font-semibold'>{blog.commentCount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-gray-500 text-sm text-center py-4'>No commented blogs yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Blogs Table */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                    <div className='flex items-center gap-3'>
                        <img src={assets.dashboard_icon_4} alt="" className='w-6 h-6'/>
                        <h2 className='text-lg font-semibold text-gray-800'>Recent Blogs</h2>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/admin/listBlog'}
                        className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'
                    >
                        View All
                    </button>
                </div>
                
                {dashboardData.recentBlogs.length > 0 ? (
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='text-left py-3 px-6 font-medium text-gray-700'>#</th>
                                    <th className='text-left py-3 px-6 font-medium text-gray-700'>Blog Title</th>
                                    <th className='text-left py-3 px-6 font-medium text-gray-700 hidden md:table-cell'>Date</th>
                                    <th className='text-left py-3 px-6 font-medium text-gray-700 hidden sm:table-cell'>Status</th>
                                    <th className='text-left py-3 px-6 font-medium text-gray-700'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {dashboardData.recentBlogs.map((blog, index) => (
                                    <BlogTableItem 
                                        key={blog._id} 
                                        blog={blog}
                                        fetchBlogs={fetchDashboard} 
                                        index={index + 1}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='text-center py-8 text-gray-500'>
                        <p>No recent blogs found</p>
                        <button 
                            onClick={() => window.location.href = '/admin/addBlog'}
                            className='mt-2 text-indigo-600 hover:text-indigo-800 font-medium'
                        >
                            Create your first blog
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Dashboard
