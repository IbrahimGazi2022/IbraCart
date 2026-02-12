import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        {
            icon: DollarSign,
            label: 'Total Revenue',
            value: '$45,230',
            change: '+12.5%',
            trending: 'up',
            bgColor: 'bg-blue-500',
        },
        {
            icon: ShoppingCart,
            label: 'Total Orders',
            value: '1,253',
            change: '+8.2%',
            trending: 'up',
            bgColor: 'bg-green-500',
        },
        {
            icon: Package,
            label: 'Total Products',
            value: '342',
            change: '+5.1%',
            trending: 'up',
            bgColor: 'bg-purple-500',
        },
        {
            icon: Users,
            label: 'Total Customers',
            value: '892',
            change: '-2.3%',
            trending: 'down',
            bgColor: 'bg-orange-500',
        },
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'John Doe', product: 'Fresh Apple', amount: '$24.99', status: 'Completed' },
        { id: '#ORD-002', customer: 'Jane Smith', product: 'Banana Pack', amount: '$18.50', status: 'Pending' },
        { id: '#ORD-003', customer: 'Mike Johnson', product: 'Organic Tomatoes', amount: '$32.00', status: 'Processing' },
        { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Orange Juice', amount: '$15.99', status: 'Completed' },
        { id: '#ORD-005', customer: 'Tom Brown', product: 'Green Grapes', amount: '$28.75', status: 'Pending' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="space-y-6">

            {/* --- PAGE HEADER --- */}
            <div>
                <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
            </div>

            {/* --- STATS GRID --- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    {stat.trending === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                    <span className={`text-sm font-semibold ${stat.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className={`${stat.bgColor} w-14 h-14 rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* --- RECENT ORDERS TABLE --- */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

        </div>
    );
};

export default Dashboard;