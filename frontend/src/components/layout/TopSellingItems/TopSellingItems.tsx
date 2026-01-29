import { motion, Variants } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Product {
    img: string;
    name: string;
    rating: number;
    originalPrice: string;
    price: string;
    discount: string;
    inStock: boolean;
}

// --- ALL CONSTANTS HERE ---
const products: Product[] = [
    {
        img: '/img/newProducts/1.png',
        name: 'Fresh Organic Apple',
        rating: 4,
        originalPrice: '$6.99',
        price: '$4.99',
        discount: '29%',
        inStock: true
    },
    {
        img: '/img/newProducts/2.png',
        name: 'Fresh Banana Pack',
        rating: 5,
        originalPrice: '$4.99',
        price: '$3.49',
        discount: '30%',
        inStock: true
    },
    {
        img: '/img/newProducts/3.png',
        name: 'Organic Tomatoes',
        rating: 3,
        originalPrice: '$3.99',
        price: '$2.99',
        discount: '25%',
        inStock: true
    },
    {
        img: '/img/newProducts/6.png',
        name: 'Fresh Orange Juice',
        rating: 3,
        originalPrice: '$8.99',
        price: '$6.49',
        discount: '28%',
        inStock: true
    },
    {
        img: '/img/newProducts/7.png',
        name: 'Organic Carrots',
        rating: 4,
        originalPrice: '$3.49',
        price: '$2.49',
        discount: '29%',
        inStock: true
    },
    {
        img: '/img/newProducts/8.png',
        name: 'Fresh Green Grapes',
        rating: 5,
        originalPrice: '$6.49',
        price: '$4.79',
        discount: '26%',
        inStock: true
    },
    {
        img: '/img/newProducts/9.png',
        name: 'Organic Spinach',
        rating: 4,
        originalPrice: '$2.99',
        price: '$1.99',
        discount: '33%',
        inStock: true
    },
    {
        img: '/img/newProducts/10.png',
        name: 'Chicken Breast',
        rating: 5,
        originalPrice: '$12.99',
        price: '$9.99',
        discount: '23%',
        inStock: true
    }
];

// --- ANIMATION VARIANTS ---
const cardVariants: Variants = {
    initial: {
        scale: 1,
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.02), 0 0 0 1px rgba(27,31,35,0.15)"
    },
    hover: {
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
    }
};


const TopSellingItems = () => {
    return (
        <section className='w-full py-[clamp(1rem,3vw,1.5rem)] bg-white'>
            <div className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]'>

                {/* --- TOP SELLING ITEMS HEADER --- */}
                <div className='flex flex-col md:flex-row items-start md:items-end justify-between mb-[clamp(1rem,3vw,2rem)] gap-[clamp(1rem,2vw,1.5rem)]'>
                    <div>
                        <div className='flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(0.5rem,1vw,0.75rem)]'>
                            <div className='h-[clamp(0.25rem,0.5vw,0.375rem)] w-[clamp(2rem,5vw,2.5rem)] bg-primary rounded-full' />
                            <span className='text-primary font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] uppercase tracking-widest'>Best Sellers</span>
                        </div>
                        <h2 className='text-[clamp(1.5rem,4vw,2.5rem)] font-black text-gray-900 tracking-tight leading-tight'>Top Selling Items</h2>
                    </div>
                    <button className='text-primary font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] hover:underline flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] group'>
                        View All Items
                        <ArrowRight className='w-[clamp(1rem,2vw,1.125rem)] h-[clamp(1rem,2vw,1.125rem)] group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>

                <div className='flex flex-col lg:flex-row gap-[clamp(1rem,3vw,1.5rem)]'>

                    {/* --- LEFT SIDE: PRODUCT GRID --- */}
                    <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1.25rem)]'>
                        {products.map((product: Product, index: number) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover="hover"
                                className='group bg-white rounded-[clamp(0.75rem,2vw,1rem)] p-[clamp(0.75rem,2vw,1rem)] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative flex flex-col'
                            >
                                {/* --- DISCOUNT TAG --- */}
                                <div className='absolute top-[clamp(0.75rem,2vw,1rem)] right-[clamp(0.75rem,2vw,1rem)] z-10'>
                                    <span className='bg-red-500 text-white text-[clamp(0.625rem,1.2vw,0.75rem)] font-bold px-[clamp(0.375rem,1vw,0.5rem)] py-[clamp(0.25rem,0.8vw,0.375rem)] rounded-[clamp(0.375rem,1vw,0.5rem)] shadow-sm'>
                                        {product.discount} OFF
                                    </span>
                                </div>

                                {/* --- PRODUCT STATUS --- */}
                                <div className='mb-[clamp(0.5rem,1.5vw,0.75rem)]'>
                                    <span className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-bold uppercase tracking-widest ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.inStock ? '● In Stock' : '● Out of Stock'}
                                    </span>
                                </div>

                                {/* --- PRODUCT IMAGE --- */}
                                <div className='h-[clamp(8rem,20vw,12rem)] w-full overflow-hidden flex items-center justify-center rounded-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(0.75rem,2vw,1rem)] bg-gray-50/50'>
                                    <img
                                        src={product.img}
                                        className='w-[clamp(6rem,15vw,9rem)] h-[clamp(6rem,15vw,9rem)] object-contain group-hover:scale-110 transition-transform duration-500'
                                        alt={product.name}
                                    />
                                </div>

                                {/* --- PRODUCT CONTENT --- */}
                                <div className='flex flex-col grow'>
                                    {/* Star Rating */}
                                    <div className='flex gap-[clamp(0.125rem,0.3vw,0.25rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>
                                        {[...Array(5)].map((_, i: number) => (
                                            <Star
                                                key={i}
                                                className={`${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} w-[clamp(0.625rem,1.5vw,0.875rem)] h-[clamp(0.625rem,1.5vw,0.875rem)]`}
                                            />
                                        ))}
                                    </div>

                                    {/* Product Name */}
                                    <h3 className='text-[clamp(0.75rem,1.8vw,0.875rem)] font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-2 mb-[clamp(0.375rem,1vw,0.5rem)]'>
                                        {product.name}
                                    </h3>

                                    {/* Price & Cart Button */}
                                    <div className='mt-auto flex items-center justify-between'>
                                        <div>
                                            <p className='text-[clamp(0.875rem,2.2vw,1.125rem)] font-bold text-gray-900 leading-none'>{product.price}</p>
                                            <p className='text-[clamp(0.625rem,1.2vw,0.75rem)] text-gray-400 line-through mt-[clamp(0.125rem,0.5vw,0.25rem)]'>{product.originalPrice}</p>
                                        </div>
                                        <button className='p-[clamp(0.375rem,1vw,0.5rem)] bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-[clamp(0.5rem,1.5vw,0.75rem)] transition-all'>
                                            <ShoppingBag className='w-[clamp(0.875rem,2vw,1.125rem)] h-[clamp(0.875rem,2vw,1.125rem)]' />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- RIGHT SIDE: FEATURED BANNER --- */}
                    <div className='w-full lg:w-[clamp(18rem,25vw,20rem)] relative rounded-[clamp(1rem,3vw,1.5rem)] overflow-hidden group min-h-[clamp(20rem,50vh,28rem)]'>
                        <img
                            src="/img/topSell/11.jpg"
                            className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                            alt="Fresh Banner"
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:bg-none'></div>

                        <div className='relative h-full p-[clamp(1.5rem,4vw,2rem)] flex flex-col justify-start z-10'>
                            <span className='text-primary font-bold tracking-widest uppercase text-[clamp(0.75rem,1.5vw,0.875rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>Fresh & Natural</span>
                            <h4 className='text-[clamp(1.5rem,4vw,2rem)] font-black text-gray-800 leading-tight uppercase'>
                                Organic <br />
                                <span className='text-primary'>Vegetables</span>
                            </h4>
                            <p className='text-gray-600 mt-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium'>Get up to 30% Off on your first order</p>

                            <button className='mt-auto lg:mt-[clamp(1.5rem,3vw,2rem)] flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)] bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] px-[clamp(1rem,3vw,1.5rem)] rounded-[clamp(0.75rem,2vw,1rem)] font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all group/btn'>
                                Shop Now
                                <ArrowRight className='w-[clamp(0.875rem,2vw,1.125rem)] h-[clamp(0.875rem,2vw,1.125rem)] group-hover/btn:translate-x-1 transition-transform' />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TopSellingItems;