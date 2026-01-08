import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

// --- ALL CONSTANTS HERE ---
const products = [
    {
        img: '../img/products/1.jpg',
        name: 'Fresh Organic Apple',
        rating: 4,
        originalPrice: '$6.99',
        price: '$4.99',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/products/2.jpg',
        name: 'Fresh Banana Pack',
        rating: 5,
        originalPrice: '$4.99',
        price: '$3.49',
        discount: '30%',
        inStock: true
    },
    {
        img: '../img/products/3.jpg',
        name: 'Organic Tomatoes',
        rating: 3,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/products/4.jpg',
        name: 'Fresh Milk 1L',
        rating: 4,
        originalPrice: '$7.99',
        price: '$5.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/products/5.jpg',
        name: 'Whole Wheat Bread',
        rating: 5,
        originalPrice: '$5.49',
        price: '$3.99',
        discount: '27%',
        inStock: true
    },
    {
        img: '../img/products/6.jpg',
        name: 'Fresh Orange Juice',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/products/7.jpg',
        name: 'Organic Carrots',
        rating: 4,
        originalPrice: '$3.49',
        price: '$2.49',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/products/8.jpg',
        name: 'Fresh Green Grapes',
        rating: 5,
        originalPrice: '$6.49',
        price: '$4.79',
        discount: '26%',
        inStock: true
    }
];

// --- ANIMATION VARIANTS ---
const cardVariants = {
    initial: {
        scale: 1,
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.02), 0 0 0 1px rgba(27,31,35,0.15)"
    },
    hover: {
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
    }
};

const badgeVariants = {
    initial: {
        scale: 0.8
    },
    animate: {
        scale: [0.8, 0.9, 0.8],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const TopSellingItems = () => {
    return (
        <div className='w-full'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-0'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-semibold mt-2 mb-2 tracking-wider'>
                        Top Selling Items
                    </h1>
                </div>

                {/* Main container with products on left and banner on right */}
                <div className='flex flex-col lg:flex-row gap-4 mb-8 pt-4'>

                    {/* Products Grid - Left Side */}
                    <div className='flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                className='h-80 bg-white rounded-lg p-4 flex flex-col relative shadow-sm'
                                variants={cardVariants}
                                initial="initial"
                                whileHover="hover"
                                transition={{ duration: 0.3 }}
                            >

                                {/* --- DISCOUNT TAG --- */}
                                <motion.div
                                    variants={badgeVariants}
                                    initial="initial"
                                    animate="animate"
                                    className='absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10'
                                >
                                    {product.discount} OFF
                                </motion.div>

                                {/* --- STOCK TAG --- */}
                                <div className='absolute top-2 left-2 z-10'>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${product.inStock
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* --- PRODUCT IMAGE --- */}
                                <div className='flex-1 flex items-center justify-center rounded-lg mb-3 mt-6'>
                                    <img
                                        src={product.img}
                                        className='w-full h-full object-contain'
                                        alt={product.name}
                                        loading='lazy'
                                    />
                                </div>

                                {/* --- PRODUCT RATINGS --- */}
                                <div className='flex gap-1 mb-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < product.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-300 text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* --- PRODUCT NAME --- */}
                                <h3 className='text-sm font-medium text-gray-700 tracking-wider mb-1'>{product.name}</h3>

                                {/* --- PRODUCT PRICE --- */}
                                <div className='flex items-center gap-2 mt-auto'>
                                    <p className='text-xl font-bold text-primary'>{product.price}</p>
                                    <p className='text-sm text-gray-400 line-through'>{product.originalPrice}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- RIGHT SIDE BANNER IMAGE --- */}
                    <div className='w-full lg:w-64 h-64 lg:h-auto bg-gray-100 relative rounded-lg overflow-hidden'>
                        <img
                            src="../img/topSell/1.jpg"
                            className='w-full h-full object-cover'
                            alt="Fresh Products Banner"
                            loading='lazy'
                        />
                        <div className='absolute inset-0 bg-linear-to-br from-black/10 to-transparent'></div>
                        <div className='absolute top-8 left-6 z-10'>
                            <p className='mt-2 uppercase text-2xl font-semibold text-gray-700'>fresh</p>
                            <p className='uppercase text-3xl font-bold text-primary'>products</p>
                            <button className='flex items-center gap-2 mt-6 bg-secondary text-white py-2.5 px-4 rounded-xl hover:bg-secondary/90 transition-all duration-300 hover:gap-3'>
                                Shop Now
                                <ArrowRight className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSellingItems;