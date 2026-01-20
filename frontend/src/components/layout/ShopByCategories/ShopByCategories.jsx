import React, { useRef } from 'react';
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


const products = [
    {
        img: '../img/newProducts/1.png',
        name: 'Fresh Organic Apple',
        rating: 4,
        originalPrice: '$6.99',
        price: '$4.99',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/2.png',
        name: 'Fresh Banana Pack',
        rating: 5,
        originalPrice: '$4.99',
        price: '$3.49',
        discount: '30%',
        inStock: true
    },
    {
        img: '../img/newProducts/3.png',
        name: 'Organic Tomatoes',
        rating: 3,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/4.png',
        name: 'Fresh Milk 1L',
        rating: 4,
        originalPrice: '$7.99',
        price: '$5.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/5.png',
        name: 'Whole Wheat Bread',
        rating: 5,
        originalPrice: '$5.49',
        price: '$3.99',
        discount: '27%',
        inStock: true
    },
    {
        img: '../img/newProducts/6.png',
        name: 'Fresh Orange Juice',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/7.png',
        name: 'Organic Carrots',
        rating: 4,
        originalPrice: '$3.49',
        price: '$2.49',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/8.png',
        name: 'Fresh Green Grapes',
        rating: 5,
        originalPrice: '$6.49',
        price: '$4.79',
        discount: '26%',
        inStock: true
    },
    {
        img: '../img/newProducts/9.png',
        name: 'Organic Spinach',
        rating: 4,
        originalPrice: '$2.99',
        price: '$1.99',
        discount: '33%',
        inStock: true
    },
    {
        img: '../img/newProducts/10.png',
        name: 'Chicken Breast',
        rating: 5,
        originalPrice: '$12.99',
        price: '$9.99',
        discount: '23%',
        inStock: true
    },
    {
        img: '../img/newProducts/11.png',
        name: 'Brown Eggs Pack',
        rating: 4,
        originalPrice: '$5.99',
        price: '$4.29',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/12.png',
        name: 'Organic Potatoes',
        rating: 3,
        originalPrice: '$4.49',
        price: '$3.19',
        discount: '29%',
        inStock: true
    },
    {
        img: '../img/newProducts/13.png',
        name: 'Fresh Strawberries',
        rating: 5,
        originalPrice: '$7.49',
        price: '$5.49',
        discount: '27%',
        inStock: true
    },
    {
        img: '../img/newProducts/14.png',
        name: 'Almond Milk 1L',
        rating: 4,
        originalPrice: '$6.99',
        price: '$5.19',
        discount: '26%',
        inStock: true
    },
    {
        img: '../img/newProducts/15.png',
        name: 'Organic Honey',
        rating: 5,
        originalPrice: '$9.99',
        price: '$7.49',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/17.png',
        name: 'Organic Cucumber',
        rating: 3,
        originalPrice: '$2.49',
        price: '$1.79',
        discount: '28%',
        inStock: true
    },
    {
        img: '../img/newProducts/18.png',
        name: 'Fresh Yogurt Cup',
        rating: 5,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '../img/newProducts/6.png',
        name: 'Fresh Orange Juice',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true
    },
];


// --- ANIMATION ---
const cardVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
};

// --- SUB-COMPONENTS ---
const CategoryItem = ({ category }) => (
    <div className='flex flex-col items-center group cursor-pointer min-w-30'>
        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-50 transition-colors border border-transparent group-hover:border-green-100'>
            <img src={category.src} alt={category.name} className='w-12 h-12 object-contain group-hover:scale-110 transition-transform' />
        </div>
        <p className='text-sm font-semibold text-gray-600 text-center leading-tight group-hover:text-green-600'>{category.name}</p>
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

        <div className='h-32 flex items-center justify-center mb-4'>
            <img src={product.img} alt={product.name} className='max-h-full object-contain' />
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

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 300;
        current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    return (
        <section className='bg-gray-50/50 py-12'>
            <div className='max-w-7xl mx-auto px-4'>

                {/* Header Section */}
                <div className='flex justify-between items-end mb-8'>
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

                {/* Categories Slider */}
                <div
                    ref={scrollRef}
                    className='flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {Categories.map((cat, i) => <CategoryItem key={i} category={cat} />)}
                </div>

                {/* Products Grid */}
                <div className='mt-12'>
                    <div className='flex items-center justify-between mb-6'>
                        <h3 className='text-xl font-bold text-gray-800'>Featured Products</h3>
                        <button className='text-green-600 font-semibold text-sm hover:underline'>View All</button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
                        {products.slice(0, 12).map((prod, i) => (
                            <ProductCard key={i} product={prod} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ShopByCategories;