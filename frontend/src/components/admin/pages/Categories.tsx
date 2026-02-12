import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useState } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Fruits', icon: '🍎', products: 24, color: 'bg-red-500' },
        { id: 2, name: 'Vegetables', icon: '🥬', products: 32, color: 'bg-green-500' },
        { id: 3, name: 'Beverages', icon: '🥤', products: 18, color: 'bg-blue-500' },
        { id: 4, name: 'Meat', icon: '🍖', products: 12, color: 'bg-orange-500' },
        { id: 5, name: 'Dairy', icon: '🥛', products: 15, color: 'bg-yellow-500' },
        { id: 6, name: 'Bakery', icon: '🍞', products: 20, color: 'bg-purple-500' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', icon: '' });

    const handleAddNew = () => {
        setEditingCategory(null);
        setFormData({ name: '', icon: '' });
        setShowModal(true);
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setFormData({ name: category.name, icon: category.icon });
        setShowModal(true);
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}" category?`)) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id
                    ? { ...cat, name: formData.name, icon: formData.icon }
                    : cat
            ));
        }
        else {
            const newCategory = {
                id: Math.max(...categories.map(c => c.id)) + 1,
                name: formData.name,
                icon: formData.icon,
                products: 0,
                color: 'bg-gray-500'
            };
            setCategories([...categories, newCategory]);
        }
        setShowModal(false);
        setFormData({ name: '', icon: '' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="space-y-6">

            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Categories</h1>
                    <p className="text-gray-500 mt-1">Manage product categories</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">
                    <Plus className="w-5 h-5" />
                    Add New Category
                </motion.button>
            </div>

            {/* --- CATEGORIES GRID --- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl`}>
                                {category.icon}
                            </div>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                    <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Package className="w-4 h-4" />
                            <span className="text-sm">{category.products} Products</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* --- ADD/EDIT MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* --- CATEGORY NAME --- */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="e.g., Fruits"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                />
                            </div>

                            {/* --- ICON --- */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Icon (Emoji) *
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    required
                                    placeholder="🍎"
                                    maxLength={2}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-2xl text-center"
                                />
                            </div>

                            {/* --- ACTION BUTTONS --- */}
                            <div className="flex gap-3 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">
                                    {editingCategory ? 'Update' : 'Add'} Category
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                                    Cancel
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default Categories;