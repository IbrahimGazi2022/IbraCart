import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setCategories, setLoading, setError } from '../../../store/categorySlice';
import { API_URL } from '../../../config/apiConfig';
import { setProducts } from '../../../store/productSlice';
import Modal from '../../reusableComp/Modal';

const Categories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);
    const { products } = useSelector((state: RootState) => state.products);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', imageUrl: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/api/categories/getAllCategory`);
            const data = await response.json();
            dispatch(setCategories(data.data));
        } catch (error) {
            dispatch(setError('Failed to fetch categories'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/api/products/getAllProduct`);
            const data = await response.json();
            dispatch(setProducts(data.data));
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Get product error:', error);
            dispatch(setError('Failed to fetch products' || error));
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: data }
        );
        const json = await res.json();
        setFormData(prev => ({ ...prev, imageUrl: json.secure_url }));
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setFormData({ name: '', imageUrl: '' });
        setImagePreview(null);
        setShowModal(true);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/categories/addCategory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                fetchCategories();
                setShowModal(false);
                setFormData({ name: '', imageUrl: '' });
                setImagePreview(null);
            }
        } catch (error) {
            console.error('Add category error:', error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-500 text-lg">Loading categories...</p></div>;
    if (error) return <div className="flex items-center justify-center h-64"><p className="text-red-500 text-lg">{error}</p></div>;

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
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                            {/* --- IMAGE --- */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                {category.imageUrl
                                    ? <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                                    : <div className="w-full h-full flex items-center justify-center text-gray-400"><Package className="w-8 h-8" /></div>
                                }
                            </div>

                            {/* --- INFO --- */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate">{category.name}</h3>
                                <div className="flex items-center gap-1 text-gray-500 mt-1">
                                    <Package className="w-3.5 h-3.5" />
                                    <span className="text-sm">{products.filter(p => p.category === category.name).length || 0} Products</span>
                                </div>
                            </div>

                            {/* --- ACTIONS --- */}
                            <div className="flex gap-1 shrink-0">
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                    <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
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

                            {/* --- IMAGE UPLOAD --- */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
                                <div className="flex items-start gap-4">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg bg-gray-50" />
                                            <button
                                                type="button"
                                                onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, imageUrl: '' })); }}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-xs text-gray-500">Upload Image</span>
                                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* --- CATEGORY NAME --- */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="e.g., Fruits"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
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
            {/* --- MODAL --- */}
            <Modal
                isOpen={isModalOpen}
                message="Admin only feature"
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Categories;