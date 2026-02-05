import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const allProducts = [
    {
        id: 1,
        img: '/img/newProducts/1.png',
        name: 'Fresh Organic Apple',
        rating: 4,
        originalPrice: '$6.99',
        price: '$4.99',
        discount: '29%',
        inStock: true,
        description: 'Fresh organic apples grown without pesticides. Rich in vitamins and perfect for a healthy snack.',
        category: 'Fruits',
        weight: '1 kg'
    },
    {
        id: 2,
        img: '/img/newProducts/2.png',
        name: 'Fresh Banana Pack',
        rating: 5,
        originalPrice: '$4.99',
        price: '$3.49',
        discount: '30%',
        inStock: true,
        description: 'Premium quality bananas packed with natural energy and essential nutrients.',
        category: 'Fruits',
        weight: '1 kg'
    },
    {
        id: 3,
        img: '/img/newProducts/3.png',
        name: 'Organic Tomatoes',
        rating: 3,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true,
        description: 'Fresh organic tomatoes perfect for salads and cooking.',
        category: 'Vegetables',
        weight: '500g'
    },
    {
        id: 4,
        img: '/img/newProducts/6.png',
        name: 'Fresh Orange Juice',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true,
        description: 'Freshly squeezed orange juice with no added sugar.',
        category: 'Beverages',
        weight: '1 L'
    },
    {
        id: 5,
        img: '/img/newProducts/7.png',
        name: 'Organic Carrots',
        rating: 4,
        originalPrice: '$3.49',
        price: '$2.49',
        discount: '29%',
        inStock: true,
        description: 'Crunchy organic carrots full of beta-carotene.',
        category: 'Vegetables',
        weight: '500g'
    },
    {
        id: 6,
        img: '/img/newProducts/8.png',
        name: 'Fresh Green Grapes',
        rating: 5,
        originalPrice: '$6.49',
        price: '$4.79',
        discount: '26%',
        inStock: true,
        description: 'Sweet and juicy green grapes.',
        category: 'Fruits',
        weight: '500g'
    },
    {
        id: 7,
        img: '/img/newProducts/9.png',
        name: 'Organic Spinach',
        rating: 4,
        originalPrice: '$2.99',
        price: '$1.99',
        discount: '33%',
        inStock: true,
        description: 'Fresh organic spinach packed with iron.',
        category: 'Vegetables',
        weight: '250g'
    },
    {
        id: 8,
        img: '/img/newProducts/10.png',
        name: 'Chicken Breast',
        rating: 5,
        originalPrice: '$12.99',
        price: '$9.99',
        discount: '23%',
        inStock: true,
        description: 'Premium quality chicken breast.',
        category: 'Meat',
        weight: '1 kg'
    }
];

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const product = allProducts.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <section className="w-full py-[clamp(2rem,5vw,4rem)] bg-gray-50">
            <div className="w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]">

                {/* Back Button */}
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

                    {/* Left: Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                        <div className="relative">
                            {/* Discount Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                    {product.discount} OFF
                                </span>
                            </div>

                            {/* Product Image */}
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={product.img}
                                alt={product.name}
                                className="w-full h-100 object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Category */}
                        <div>
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-4xl font-black text-gray-900">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} w-5 h-5`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">
                                ({product.rating}.0 Rating)
                            </span>
                        </div>

                        {/* Stock Status */}
                        <div>
                            <span className={`font-bold text-sm uppercase ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-gray-900">
                                {product.price}
                            </span>
                            <span className="text-2xl text-gray-400 line-through">
                                {product.originalPrice}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Weight */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">Weight:</span>
                            <span className="text-gray-600">{product.weight}</span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-semibold">Quantity:</span>
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                                <button
                                    onClick={() => handleQuantityChange('decrease')}
                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange('increase')}
                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-primary text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-xl hover:border-primary hover:text-primary transition"
                            >
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