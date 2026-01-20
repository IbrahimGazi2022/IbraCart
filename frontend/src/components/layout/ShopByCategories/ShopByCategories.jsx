import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Plus, Minus } from 'lucide-react';

// --- ALL CONSTANTS HERE ---
const Categories = [
    {
        name: "Biscuits & Snacks",
        src: "../img/newProducts/1.png"
    },
    {
        name: "Beverages",
        src: "../img/newProducts/2.png"
    },
    {
        name: "Dairy Products",
        src: "../img/newProducts/3.png"
    },
    {
        name: "Frozen Foods",
        src: "../img/newProducts/4.png"
    },
    {
        name: "Bakery Items",
        src: "../img/newProducts/5.png"
    },
    {
        name: "Breakfast Cereals",
        src: "../img/newProducts/6.png"
    },
    {
        name: "Chocolates",
        src: "../img/newProducts/7.png"
    },
    {
        name: "Cooking",
        src: "../img/newProducts/8.png"
    },
    {
        name: "Spices & Masala",
        src: "../img/newProducts/9.png"
    },
    {
        name: "Instant Foods",
        src: "../img/newProducts/10.png"
    },
    {
        name: "Sauces",
        src: "../img/newProducts/11.png"
    },
    {
        name: "Dry Fruits & Nuts",
        src: "../img/newProducts/12.png"
    },
    {
        name: "Baby Food",
        src: "../img/newProducts/13.png"
    },
    {
        name: "Health",
        src: "../img/newProducts/14.png"
    },
    {
        name: "Organic Products",
        src: "../img/newProducts/15.png"
    },
    {
        name: "Household Items",
        src: "../img/newProducts/1.png"
    }
];

// --- ALL PRODUCTS HERE ---
const products = [
    {
        img: '../img/newProducts/1.png',
        name: 'Fresh Organic Apple',
        category: 'Organic Products',
        rating: 4,
        originalPrice: '$6.99',
        price: '$4.99',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/2.png',
        name: 'Fresh Banana Pack',
        category: 'Organic Products',
        rating: 5,
        originalPrice: '$4.99',
        price: '$3.49',
        discount: '30%',
        inStock: true
    },
    {
        img: '../img/newProducts/3.png',
        name: 'Organic Tomatoes',
        category: 'Organic Products',
        rating: 3,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/4.png',
        name: 'Fresh Milk 1L',
        category: 'Dairy Products',
        rating: 4,
        originalPrice: '$7.99',
        price: '$5.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/5.png',
        name: 'Whole Wheat Bread',
        category: 'Bakery Items',
        rating: 5,
        originalPrice: '$5.49',
        price: '$3.99',
        discount: '27%',
        inStock: true
    },
    {
        img: '../img/newProducts/6.png',
        name: 'Fresh Orange Juice',
        category: 'Beverages',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/7.png',
        name: 'Organic Carrots',
        category: 'Organic Products',
        rating: 4,
        originalPrice: '$3.49',
        price: '$2.49',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/8.png',
        name: 'Fresh Green Grapes',
        category: 'Organic Products',
        rating: 5,
        originalPrice: '$6.49',
        price: '$4.79',
        discount: '26%',
        inStock: true
    },
    {
        img: '../img/newProducts/9.png',
        name: 'Organic Spinach',
        category: 'Organic Products',
        rating: 4,
        originalPrice: '$2.99',
        price: '$1.99',
        discount: '33%',
        inStock: true
    },
    {
        img: '../img/newProducts/10.png',
        name: 'Chicken Breast',
        category: 'Frozen Foods',
        rating: 5,
        originalPrice: '$12.99',
        price: '$9.99',
        discount: '23%',
        inStock: true
    },
    {
        img: '../img/newProducts/11.png',
        name: 'Brown Eggs Pack',
        category: 'Dairy Products',
        rating: 4,
        originalPrice: '$5.99',
        price: '$4.29',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/12.png',
        name: 'Organic Potatoes',
        category: 'Organic Products',
        rating: 3,
        originalPrice: '$4.49',
        price: '$3.19',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/13.png',
        name: 'Fresh Strawberries',
        category: 'Organic Products',
        rating: 5,
        originalPrice: '$7.49',
        price: '$5.49',
        discount: '27%',
        inStock: true
    },
    {
        img: '../img/newProducts/14.png',
        name: 'Almond Milk 1L',
        category: 'Beverages',
        rating: 4,
        originalPrice: '$6.99',
        price: '$5.19',
        discount: '26%',
        inStock: true
    },
    {
        img: '../img/newProducts/15.png',
        name: 'Organic Honey',
        category: 'Health',
        rating: 5,
        originalPrice: '$9.99',
        price: '$7.49',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/17.png',
        name: 'Organic Cucumber',
        category: 'Organic Products',
        rating: 3,
        originalPrice: '$2.49',
        price: '$1.79',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/18.png',
        name: 'Fresh Yogurt Cup',
        category: 'Dairy Products',
        rating: 5,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    }
];

// --- ANIMATION ---
const cardVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
};

// --- SUB-COMPONENTS ---
const CategoryItem = ({ category, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex flex-col items-center group cursor-pointer min-w-30 ${isSelected ? 'opacity-100' : 'opacity-60'}`}
    >
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-colors border ${isSelected ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-transparent group-hover:bg-green-50 group-hover:border-green-100'}`}>
            <img src={category.src} alt={category.name} className='w-12 h-12 object-contain group-hover:scale-110 transition-transform' />
        </div>
        <p className={`text-sm font-semibold text-center leading-tight ${isSelected ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'}`}>
            {category.name}
        </p>
    </div>
);

const ProductCard = ({ product }) => (
    <motion.div
        variants={cardVariants}
        whileHover="hover"
        className='bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all relative'
    >
        {/* Discount Badge */}
        <div className='absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10'>
            {product.discount} OFF
        </div>

        {/* Stock Status */}
        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
            {product.inStock ? '● In Stock' : '● Out of Stock'}
        </div>

        <div className='h-24 flex items-center justify-center mb-4'>
            <img src={product.img} alt={product.name} className='max-h-20 object-contain' />
        </div>

        <h3 className='text-sm font-bold text-gray-800 line-clamp-1 mb-1'>{product.name}</h3>

        <div className='flex gap-0.5 mb-2'>
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
        </div>

        <div className='flex items-baseline gap-2 mb-4'>
            <span className='text-lg font-bold text-green-600'>{product.price}</span>
            <span className='text-xs text-gray-400 line-through'>{product.originalPrice}</span>
        </div>

        <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden h-9'>
                <button className='px-2 hover:bg-gray-100 text-gray-500'><Minus size={14} /></button>
                <span className='px-2 text-sm font-semibold'>0</span>
                <button className='px-2 hover:bg-gray-100 text-gray-500'><Plus size={14} /></button>
            </div>
            <button className='flex-1 bg-green-600 hover:bg-green-700 text-white h-9 rounded-lg flex items-center justify-center transition-colors'>
                <ShoppingCart size={18} />
            </button>
        </div>
    </motion.div>
);

// --- MAIN COMPONENT ---
const ShopByCategories = () => {
    const scrollRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 300;
        current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    return (
        <section className='bg-gray-50/50 py-6'>
            <div className='max-w-7xl mx-auto px-4 lg:px-0'>

                {/* Header Section */}
                <div className='flex justify-between items-end mb-6'>
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='h-1 w-10 bg-green-600 rounded-full' />
                            <span className='text-green-600 font-bold text-sm uppercase tracking-widest'>Categories</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>Shop By Categories</h2>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => scroll('left')} className='p-2 rounded-full border border-gray-200 bg-white hover:bg-green-600 hover:text-white transition-all shadow-sm'>
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scroll('right')} className='p-2 rounded-full border border-gray-200 bg-white hover:bg-green-600 hover:text-white transition-all shadow-sm'>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>


                {/* --- CATEGORIES --- */}
                <div
                    ref={scrollRef}
                    className='flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* All Button */}
                    <div
                        onClick={() => setSelectedCategory('All')}
                        className={`flex flex-col items-center group cursor-pointer min-w-30 ${selectedCategory === 'All' ? 'opacity-100' : 'opacity-60'}`}
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-colors border ${selectedCategory === 'All' ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-transparent group-hover:bg-green-50 group-hover:border-green-100'}`}>
                            <span className='text-2xl'>🛒</span>
                        </div>
                        <p className={`text-sm font-semibold text-center leading-tight ${selectedCategory === 'All' ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'}`}>
                            All Items
                        </p>
                    </div>

                    {Categories.map((cat, i) => (
                        <CategoryItem
                            key={i}
                            category={cat}
                            isSelected={selectedCategory === cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                        />
                    ))}
                </div>

                {/* Products Grid */}
                <div className='mt-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
                        {filteredProducts.slice(0, 12).map((prod, i) => (
                            <ProductCard key={i} product={prod} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategories;