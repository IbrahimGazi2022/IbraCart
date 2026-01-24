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
        <section className='w-full bg-white py-4'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-0'>

                {/* Section Header */}
                <div className='flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4'>
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='h-1 w-10 bg-primary rounded-full' />
                            <span className='text-primary font-bold text-sm uppercase tracking-widest'>Best Sellers</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>Top Selling Items</h2>
                    </div>
                    <button className='text-primary font-bold text-sm hover:underline flex items-center gap-1 group'>
                        View All Items
                        <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>

                    {/* --- LEFT SIDE: PRODUCT GRID --- */}
                    <div className='flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {products.map((product: Product, index: number) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover="hover"
                                className='group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative flex flex-col'
                            >
                                {/* Discount Tag */}
                                <div className='absolute top-3 right-3 z-10'>
                                    <span className='bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm'>
                                        {product.discount} OFF
                                    </span>
                                </div>

                                {/* Stock Status */}
                                <div className='mb-2'>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.inStock ? '● In Stock' : '● Out of Stock'}
                                    </span>
                                </div>

                                {/* Product Image */}
                                <div className='h-40 w-full overflow-hidden flex items-center justify-center rounded-xl mb-4 bg-gray-50/50'>
                                    <img
                                        src={product.img}
                                        className='w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500'
                                        alt={product.name}
                                    />
                                </div>

                                {/* Content */}
                                <div className='flex flex-col grow'>
                                    <div className='flex gap-0.5 mb-2'>
                                        {[...Array(5)].map((_, i: number) => (
                                            <Star key={i} size={12} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                                        ))}
                                    </div>

                                    <h3 className='text-sm font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-2 mb-2'>
                                        {product.name}
                                    </h3>

                                    <div className='mt-auto flex items-center justify-between'>
                                        <div>
                                            <p className='text-lg font-bold text-gray-900 leading-none'>{product.price}</p>
                                            <p className='text-xs text-gray-400 line-through mt-1'>{product.originalPrice}</p>
                                        </div>
                                        <button className='p-2 bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-xl transition-all'>
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- RIGHT SIDE: FEATURED BANNER --- */}
                    <div className='w-full lg:w-72 relative rounded-3xl overflow-hidden group min-h-400px'>
                        <img
                            src="/img/topSell/11.jpg"
                            className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                            alt="Fresh Banner"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:bg-none'></div>

                        <div className='relative h-full p-8 flex flex-col justify-start z-10'>
                            <span className='text-primary font-bold tracking-widest uppercase text-sm mb-2'>Fresh & Natural</span>
                            <h4 className='text-3xl font-black text-gray-800 leading-tight uppercase'>
                                Organic <br />
                                <span className='text-primary'>Vegetables</span>
                            </h4>
                            <p className='text-gray-600 mt-4 text-sm font-medium'>Get up to 30% Off on your first order</p>

                            <button className='mt-auto lg:mt-8 flex items-center justify-center gap-2 bg-primary text-white py-4 px-6 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all group/btn'>
                                Shop Now
                                <ArrowRight className='w-5 h-5 group-hover/btn:translate-x-1 transition-transform' />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TopSellingItems;