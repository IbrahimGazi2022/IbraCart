import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../../config/apiConfig';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../store/productSlice';

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        stock: '',
        description: '',
        weight: '',
        inStock: true,
        imageUrl: ""
    });

    const categories = ['Fruits', 'Vegetables', 'Beverages', 'Meat', 'Dairy', 'Bakery'];

    // Simulate progress while waiting for backend response
    const startProgress = () => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 85) {
                    clearInterval(interval);
                    return 85; // hold at 85% until actual response
                }
                return prev + 5;
            });
        }, 150);
        return interval;
    };

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

    const removeImage = () => {
        setImagePreview(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const interval = startProgress();

        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            clearInterval(interval);

            if (data.success) {
                setProgress(100);
                dispatch(setProducts([]));
                setTimeout(() => {
                    alert('Product added successfully!');
                    navigate('/admin/products');
                }, 400);
            }
        } catch (error) {
            clearInterval(interval);
            setProgress(0);
            setIsSubmitting(false);
            console.error('Add product error:', error);
        }
    };

    return (
        <div className="space-y-6">

            {/* --- PAGE HEADER --- */}
            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin/products')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <ArrowLeft className="w-5 h-5" />
                </motion.button>
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Add New Product</h1>
                    <p className="text-gray-500 mt-1">Fill in the details below</p>
                </div>
            </div>

            {/* --- PRODUCT FORM --- */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm p-6 space-y-6">

                {/* --- IMAGE UPLOAD --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Image
                    </label>
                    <div className="flex items-start gap-4">
                        {imagePreview ? (
                            <div className="relative">
                                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-contain rounded-lg bg-gray-50 p-2" />
                                <button
                                    type="button"
                                    onClick={removeImage}
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

                {/* --- PRODUCT NAME --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Fresh Organic Apple"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    />
                </div>

                {/* --- CATEGORY --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* --- PRICE & ORIGINAL PRICE --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="$4.99"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price</label>
                        <input
                            type="text"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleInputChange}
                            placeholder="$6.99"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        />
                    </div>
                </div>

                {/* --- STOCK & WEIGHT --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                            placeholder="50"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder="1 kg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        />
                    </div>
                </div>

                {/* --- DESCRIPTION --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Product description..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                    />
                </div>

                {/* --- STOCK STATUS --- */}
                <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.inStock}
                            onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm font-semibold text-gray-700">Product is in stock</span>
                    </label>
                </div>

                {/* --- PROGRESS BAR --- */}
                <AnimatePresence>
                    {isSubmitting && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-500 font-medium">
                                <span>
                                    {progress < 100 ? 'Saving product...' : 'Done!'}
                                </span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: 'easeOut', duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- ACTION BUTTONS --- */}
                <div className="flex gap-4 pt-4">
                    <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Adding...' : 'Add Product'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed">
                        Cancel
                    </motion.button>
                </div>

            </motion.form>
        </div>
    );
};

export default AddProduct;