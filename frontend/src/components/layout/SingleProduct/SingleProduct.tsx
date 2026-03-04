import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { RootState } from '../../../store/store';
import { setProducts, setLoading, setError } from '../../../store/productSlice';
import { API_URL } from '../../../config/apiConfig';

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.products);
    const product = products.find(p => p.id === Number(id));

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/api/products/getAllProduct`);
            const data = await response.json();
            dispatch(setProducts(data.data));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError('Failed to fetch products'));
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (products.length === 0) fetchProducts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            quantity: quantity
        }));
    };

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase') setQuantity(prev => prev + 1);
        else if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                    <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full py-[clamp(2rem,5vw,4rem)] bg-gray-50">
            <div className="w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,5vw,4rem)]">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="relative">
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                    {product.discount}% OFF
                                </span>
                            </div>
                            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src={product.imageUrl} alt={product.name} className="w-full h-100 object-contain" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-6">
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">{product.category}</span>
                        <h1 className="text-4xl font-black text-gray-900">{product.name}</h1>

                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} w-5 h-5`} />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">({product.rating} Rating)</span>
                        </div>

                        <span className={`font-bold text-sm uppercase ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </span>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-gray-900">${product.price}</span>
                            <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">Weight:</span>
                            <span className="text-gray-600">{product.weight}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-semibold">Quantity:</span>
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                                <button onClick={() => handleQuantityChange('decrease')} className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityChange('increase')} className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="flex-1 bg-primary text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition">
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-xl hover:border-primary hover:text-primary transition">
                                <Heart className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;