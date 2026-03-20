import { useRef, useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setProducts, setLoading, setError } from '../../../store/productSlice';
import { setCategories } from '../../../store/categorySlice';
import { API_URL } from '../../../config/apiConfig';

// --- TYPE ---
interface Category {
    name: string;
    imageUrl: string;
}

interface CategoryItemProps {
    category: Category;
    isSelected: boolean;
    onClick: () => void;
}

interface ProductCardProps {
    product: any;
}

// --- ANIMATION VARIANTS ---

// Header Section Animations
const headerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const headerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const decorativeLineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
        }
    }
};

const navButtonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "backOut"
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.95
    }
};

// Category Animations
const categoryContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const categoryItemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const categoryIconVariants: Variants = {
    hover: {
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        transition: {
            duration: 0.3
        }
    },
    tap: {
        scale: 0.95
    }
};

const selectedCategoryVariants: Variants = {
    initial: { scale: 1 },
    selected: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 0.4,
            ease: "easeInOut"
        }
    }
};

// Product Card Animations
const productGridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const productCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.3
        }
    },
    hover: {
        y: -8,
        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.15)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

const badgeVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
        }
    },
    hover: {
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: {
            duration: 0.3
        }
    }
};

const imageVariants: Variants = {
    hover: {
        scale: 1.1,
        rotate: [0, -2, 2, 0],
        transition: {
            duration: 0.4
        }
    }
};

const starVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: i * 0.05,
            type: "spring",
            stiffness: 300,
            damping: 15
        }
    })
};

const priceVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            delay: 0.2
        }
    }
};

const buttonVariants: Variants = {
    hover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    tap: {
        scale: 0.95
    }
};

const quantityButtonVariants: Variants = {
    tap: {
        scale: 0.9,
        rotate: [0, -10, 10, 0],
        transition: {
            duration: 0.2
        }
    }
};

// --- SUB-COMPONENTS ---
const CategoryItem = ({ category, isSelected, onClick }: CategoryItemProps) => (
    <motion.div
        variants={categoryItemVariants}
        onClick={onClick}
        className={`flex flex-col items-center group cursor-pointer min-w-30 ${isSelected ? 'opacity-100' : 'opacity-60'}`}
    >
        <motion.div
            variants={selectedCategoryVariants}
            initial="initial"
            animate={isSelected ? "selected" : "initial"}
            className={`w-[clamp(4.5rem,10vw,5rem)] h-[clamp(4.5rem,10vw,5rem)] rounded-full flex items-center justify-center mb-[clamp(0.5rem,1vw,0.75rem)] transition-colors border ${isSelected ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-transparent group-hover:bg-green-50 group-hover:border-green-100'}`}
        >
            <motion.img
                variants={categoryIconVariants}
                whileHover="hover"
                whileTap="tap"
                src={category.imageUrl}
                alt={category.name}
                className='w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] object-contain'
            />
        </motion.div>
        <p className={`text-[clamp(0.813rem,1.5vw,0.875rem)] font-semibold text-center leading-tight ${isSelected ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'}`}>
            {category.name}
        </p>
    </motion.div>
);

const ProductCard = ({ product }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <motion.div
            variants={productCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            layout
            className='bg-white rounded-xl p-[clamp(0.75rem,2vw,1rem)] border border-gray-100 shadow-sm hover:shadow-md transition-all relative'
        >
            {/* Discount Badge */}
            <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className='absolute top-[clamp(0.5rem,1vw,0.75rem)] right-[clamp(0.5rem,1vw,0.75rem)] bg-red-500 text-white text-[clamp(0.625rem,1.2vw,0.625rem)] font-bold px-[clamp(0.375rem,1vw,0.5rem)] py-[clamp(0.25rem,0.5vw,0.25rem)] rounded-full z-10'
            >
                {product.discount}% OFF
            </motion.div>

            {/* Stock Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-[clamp(0.625rem,1.2vw,0.625rem)] font-bold uppercase tracking-wider mb-[clamp(0.375rem,1vw,0.5rem)] ${product.inStock ? 'text-green-500' : 'text-red-500'}`}
            >
                {product.inStock ? '● In Stock' : '● Out of Stock'}
            </motion.div>

            <motion.div
                variants={imageVariants}
                className='h-[clamp(5rem,15vw,6rem)] flex items-center justify-center mb-[clamp(0.75rem,2vw,1rem)]'
            >
                <img src={product.imageUrl} alt={product.name} className='max-h-[clamp(4.5rem,13vw,5rem)] object-contain' />
            </motion.div>

            <h3 className='text-[clamp(0.813rem,1.5vw,0.875rem)] font-bold text-gray-800 line-clamp-1 mb-[clamp(0.25rem,0.5vw,0.25rem)]'>{product.name}</h3>

            <div className='flex gap-[clamp(0.125rem,0.5vw,0.125rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={starVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Star size={12} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                variants={priceVariants}
                className='flex items-baseline gap-[clamp(0.375rem,1vw,0.5rem)] mb-[clamp(0.75rem,2vw,1rem)]'
            >
                <span className='text-[clamp(1rem,2vw,1.125rem)] font-bold text-green-600'>${product.price}</span>
                <span className='text-[clamp(0.75rem,1.2vw,0.75rem)] text-gray-400 line-through'>${product.originalPrice}</span>
            </motion.div>

            <div className='flex items-center justify-between gap-[clamp(0.375rem,1vw,0.5rem)]'>
                <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden h-[clamp(2rem,5vw,2.25rem)]'>
                    <motion.button
                        variants={quantityButtonVariants}
                        whileTap="tap"
                        onClick={() => setQuantity(Math.max(0, quantity - 1))}
                        className='px-[clamp(0.375rem,1vw,0.5rem)] hover:bg-gray-100 text-gray-500'
                    >
                        <Minus size={14} />
                    </motion.button>
                    <span className='px-[clamp(0.375rem,1vw,0.5rem)] text-[clamp(0.813rem,1.5vw,0.875rem)] font-semibold'>{quantity}</span>
                    <motion.button
                        variants={quantityButtonVariants}
                        whileTap="tap"
                        onClick={() => setQuantity(quantity + 1)}
                        className='px-[clamp(0.375rem,1vw,0.5rem)] hover:bg-gray-100 text-gray-500'
                    >
                        <Plus size={14} />
                    </motion.button>
                </div>
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className='flex-1 bg-green-600 hover:bg-green-700 text-white h-[clamp(2rem,5vw,2.25rem)] rounded-lg flex items-center justify-center transition-colors'
                >
                    <ShoppingCart size={18} />
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
const ShopByCategories = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef(null);
    const categoriesRef = useRef(null);
    const productsRef = useRef(null);

    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
    const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
    const isProductsInView = useInView(productsRef, { once: true, amount: 0.1 });
    const { categories } = useSelector((state: RootState) => state.categories);


    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.products);

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/api/products/getAllProduct`);
            const data = await response.json();
            dispatch(setProducts(data.data));
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Get product error:', error);
            dispatch(setError('Failed to fetch products'));
            dispatch(setLoading(false));
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories/getAllCategory`);
            const data = await response.json();
            dispatch(setCategories(data.data));
        } catch (error) {
            console.error('Get categories error:', error);
        }
    };

    useEffect(() => {
        if (categories.length === 0) fetchCategories();
    }, []);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    };

    return (
        <section className='bg-gray-50/50 py-[clamp(1rem,3vw,1.5rem)]'>
            <div className='w-full max-w-[min(calc(100%-2rem),83rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]'>

                {/* Header Section */}
                <motion.div
                    ref={headerRef}
                    variants={headerContainerVariants}
                    initial="hidden"
                    animate={isHeaderInView ? "visible" : "hidden"}
                    className='flex justify-between items-end mb-[clamp(1rem,3vw,1.5rem)]'
                >
                    <motion.div variants={headerItemVariants}>
                        <div className='flex items-center gap-[clamp(0.375rem,1vw,0.5rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>
                            <motion.div
                                variants={decorativeLineVariants}
                                className='h-[clamp(3px,0.5vw,4px)] w-[clamp(2rem,5vw,2.5rem)] bg-green-600 rounded-full'
                                style={{ transformOrigin: 'left' }}
                            />
                            <span className='text-green-600 font-bold text-[clamp(0.75rem,1.2vw,0.875rem)] uppercase tracking-widest'>Categories</span>
                        </div>
                        <h2 className='text-[clamp(1.875rem,4vw,2.25rem)] font-black text-gray-900 tracking-tight'>Shop By Categories</h2>
                    </motion.div>
                    <motion.div
                        variants={headerItemVariants}
                        className='flex gap-[clamp(0.375rem,1vw,0.5rem)]'
                    >
                        <motion.button
                            variants={navButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => scroll('left')}
                            className='p-[clamp(0.375rem,1vw,0.5rem)] rounded-full border border-gray-200 bg-white hover:bg-green-600 hover:text-white transition-all shadow-sm'
                        >
                            <ChevronLeft className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                        </motion.button>
                        <motion.button
                            variants={navButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => scroll('right')}
                            className='p-[clamp(0.375rem,1vw,0.5rem)] rounded-full border border-gray-200 bg-white hover:bg-green-600 hover:text-white transition-all shadow-sm'
                        >
                            <ChevronRight className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* --- CATEGORIES --- */}
                <div
                    ref={scrollRef}
                    className='flex gap-[clamp(1rem,3vw,1.5rem)] overflow-x-auto pb-[clamp(1rem,3vw,1.5rem)] no-scrollbar scroll-smooth'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <motion.div
                        ref={categoriesRef}
                        variants={categoryContainerVariants}
                        initial="hidden"
                        animate={isCategoriesInView ? "visible" : "hidden"}
                        className='flex gap-[clamp(1rem,3vw,1.5rem)]'
                    >
                        {/* All Button */}
                        <motion.div
                            variants={categoryItemVariants}
                            onClick={() => setSelectedCategory('All')}
                            className={`flex flex-col items-center group cursor-pointer min-w-30 ${selectedCategory === 'All' ? 'opacity-100' : 'opacity-60'}`}
                        >
                            <motion.div
                                variants={selectedCategoryVariants}
                                initial="initial"
                                animate={selectedCategory === 'All' ? "selected" : "initial"}
                                className={`w-[clamp(4.5rem,10vw,5rem)] h-[clamp(4.5rem,10vw,5rem)] rounded-full flex items-center justify-center mb-[clamp(0.5rem,1vw,0.75rem)] transition-colors border ${selectedCategory === 'All' ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-transparent group-hover:bg-green-50 group-hover:border-green-100'}`}
                            >
                                <motion.span
                                    variants={categoryIconVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className='text-[clamp(1.5rem,3vw,2rem)]'
                                >
                                    🛒
                                </motion.span>
                            </motion.div>
                            <p className={`text-[clamp(0.813rem,1.5vw,0.875rem)] font-semibold text-center leading-tight ${selectedCategory === 'All' ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'}`}>
                                All Items
                            </p>
                        </motion.div>

                        {categories.map((cat, i) => (
                            <CategoryItem
                                key={i}
                                category={cat}
                                isSelected={selectedCategory === cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Products Grid */}
                <motion.div
                    ref={productsRef}
                    className='mt-[clamp(0.75rem,2vw,1rem)]'
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            variants={productGridVariants}
                            initial="hidden"
                            animate={isProductsInView ? "visible" : "hidden"}
                            exit="exit"
                            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[clamp(0.75rem,2vw,1.25rem)]'
                        >
                            {filteredProducts.slice(0, 12).map((prod, i) => (
                                <ProductCard key={`${selectedCategory}-${i}`} product={prod} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopByCategories;