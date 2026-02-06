import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductsList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const products = [
        { id: 1, name: 'Fresh Organic Apple', category: 'Fruits', price: '$4.99', stock: 45, image: '/img/newProducts/1.png', status: 'In Stock' },
        { id: 2, name: 'Fresh Banana Pack', category: 'Fruits', price: '$3.49', stock: 67, image: '/img/newProducts/2.png', status: 'In Stock' },
        { id: 3, name: 'Organic Tomatoes', category: 'Vegetables', price: '$2.99', stock: 12, image: '/img/newProducts/3.png', status: 'Low Stock' },
        { id: 4, name: 'Fresh Orange Juice', category: 'Beverages', price: '$6.49', stock: 0, image: '/img/newProducts/6.png', status: 'Out of Stock' },
        { id: 5, name: 'Organic Carrots', category: 'Vegetables', price: '$2.49', stock: 89, image: '/img/newProducts/7.png', status: 'In Stock' },
        { id: 6, name: 'Fresh Green Grapes', category: 'Fruits', price: '$4.79', stock: 34, image: '/img/newProducts/8.png', status: 'In Stock' },
        { id: 7, name: 'Organic Spinach', category: 'Vegetables', price: '$1.99', stock: 23, image: '/img/newProducts/9.png', status: 'In Stock' },
        { id: 8, name: 'Chicken Breast', category: 'Meat', price: '$9.99', stock: 15, image: '/img/newProducts/10.png', status: 'Low Stock' },
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            console.log('Delete product:', id);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="space-y-6">

            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your product inventory</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin/products/add')}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">
                    <Plus className="w-5 h-5" />
                    Add New Product
                </motion.button>
            </div>

            {/* --- SEARCH & FILTER BAR --- */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 w-full"
                    />
                </div>
            </div>

            {/* --- PRODUCTS TABLE --- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <motion.tr
                                    key={product.id}
                                    variants={itemVariants}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-1" />
                                            <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{product.stock} units</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'In Stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                                title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No products found</p>
                    </div>
                )}
            </motion.div>

        </div>
    );
};

export default ProductsList;