import { motion, Variants, useInView } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';

// --- TYPE DEFINITIONS ---
interface Product {
    id: number;
    img: string;
    name: string;
    rating: number;
    originalPrice: string;
    price: string;
    discount: string;
    inStock: boolean;
    imageUrl: string;
}



// --- ANIMATION VARIANTS ---

// Header Animations
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
            duration: 0.6,
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

const viewAllButtonVariants: Variants = {
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

// Product Grid Animations
const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    hover: {
        y: -8,
        scale: 1.03,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
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
            delay: 0.3
        }
    },
    hover: {
        scale: 1.15,
        rotate: [0, -10, 10, 0],
        transition: {
            duration: 0.4
        }
    }
};

const imageVariants: Variants = {
    hover: {
        scale: 1.15,
        rotate: [0, -3, 3, 0],
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const starVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.4 + (i * 0.05),
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
            duration: 0.4,
            delay: 0.5
        }
    }
};

const cartButtonVariants: Variants = {
    hover: {
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    tap: {
        scale: 0.9
    }
};

// Banner Animations
const bannerContainerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const bannerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const bannerButtonVariants: Variants = {
    hover: {
        y: -4,
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(13, 164, 135, 0.4)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    tap: {
        scale: 0.95,
        y: 0
    }
};

const TopSellingItems = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const bannerRef = useRef(null);

    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
    const isBannerInView = useInView(bannerRef, { once: true, amount: 0.3 });

    const navigate = useNavigate();
    const { products } = useSelector((state: RootState) => state.products);
    const featuredProducts = products.filter(p => p.isFeatured);



    return (
        <section className='w-full py-[clamp(1rem,3vw,1.5rem)] bg-white'>
            <div className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]'>

                {/* --- TOP SELLING ITEMS HEADER --- */}
                <motion.div
                    ref={headerRef}
                    variants={headerContainerVariants}
                    initial="hidden"
                    animate={isHeaderInView ? "visible" : "hidden"}
                    className='flex flex-col md:flex-row items-start md:items-end justify-between mb-[clamp(1rem,3vw,2rem)] gap-[clamp(1rem,2vw,1.5rem)]'
                >
                    <motion.div variants={headerItemVariants}>
                        <div className='flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(0.5rem,1vw,0.75rem)]'>
                            <motion.div
                                variants={decorativeLineVariants}
                                className='h-[clamp(0.25rem,0.5vw,0.375rem)] w-[clamp(2rem,5vw,2.5rem)] bg-primary rounded-full'
                                style={{ transformOrigin: 'left' }}
                            />
                            <span className='text-primary font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] uppercase tracking-widest'>Best Sellers</span>
                        </div>
                        <h2 className='text-[clamp(1.5rem,4vw,2.5rem)] font-black text-gray-900 tracking-tight leading-tight'>Top Selling Items</h2>
                    </motion.div>
                    <motion.button
                        variants={viewAllButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className='text-primary font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] hover:underline flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] group'
                    >
                        View All Items
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className='w-[clamp(1rem,2vw,1.125rem)] h-[clamp(1rem,2vw,1.125rem)]' />
                        </motion.div>
                    </motion.button>
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-[clamp(1rem,3vw,1.5rem)]'>

                    {/* --- LEFT SIDE: PRODUCT GRID --- */}
                    <motion.div
                        ref={gridRef}
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate={isGridInView ? "visible" : "hidden"}
                        className='flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[clamp(0.75rem,2vw,1.25rem)]'
                    >
                        {featuredProducts.map((product: Product, index: number) => (
                            <motion.div
                                key={index}
                                onClick={() => {
                                    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
                                    navigate(`/product/${product.id}`);
                                }}
                                variants={cardVariants}
                                whileHover="hover"
                                className='group bg-white rounded-[clamp(0.75rem,2vw,1rem)] p-[clamp(0.75rem,2vw,1rem)] border border-gray-100 shadow-sm transition-all relative flex flex-col cursor-pointer'
                            >
                                {/* --- DISCOUNT TAG --- */}
                                <motion.div
                                    variants={badgeVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    className='absolute top-[clamp(0.75rem,2vw,1rem)] right-[clamp(0.75rem,2vw,1rem)] z-10'
                                >
                                    <span className='bg-red-500 text-white text-[clamp(0.625rem,1.2vw,0.75rem)] font-bold px-[clamp(0.375rem,1vw,0.5rem)] py-[clamp(0.25rem,0.8vw,0.375rem)] rounded-[clamp(0.375rem,1vw,0.5rem)] shadow-sm block'>
                                        {product.discount} OFF
                                    </span>
                                </motion.div>

                                {/* --- PRODUCT STATUS --- */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='mb-[clamp(0.5rem,1.5vw,0.75rem)]'
                                >
                                    <span className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-bold uppercase tracking-widest ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.inStock ? '● In Stock' : '● Out of Stock'}
                                    </span>
                                </motion.div>

                                {/* --- PRODUCT IMAGE --- */}
                                <motion.div
                                    variants={imageVariants}
                                    className='h-[clamp(8rem,20vw,12rem)] w-full overflow-hidden flex items-center justify-center rounded-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(0.75rem,2vw,1rem)] bg-gray-50/50'
                                >
                                    <img
                                        src={product.imageUrl}
                                        className='w-[clamp(6rem,15vw,9rem)] h-[clamp(6rem,15vw,9rem)] object-contain'
                                        alt={product.name}
                                    />
                                </motion.div>

                                {/* --- PRODUCT CONTENT --- */}
                                <div className='flex flex-col grow'>
                                    {/* Star Rating */}
                                    <div className='flex gap-[clamp(0.125rem,0.3vw,0.25rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>
                                        {[...Array(5)].map((_, i: number) => (
                                            <motion.div
                                                key={i}
                                                custom={i}
                                                variants={starVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <Star
                                                    className={`${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} w-[clamp(0.625rem,1.5vw,0.875rem)] h-[clamp(0.625rem,1.5vw,0.875rem)]`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Product Name */}
                                    <h3 className='text-[clamp(0.75rem,1.8vw,0.875rem)] font-bold text-gray-700 group-hover:text-primary transition-colors line-clamp-2 mb-[clamp(0.375rem,1vw,0.5rem)]'>
                                        {product.name}
                                    </h3>

                                    {/* Price & Cart Button */}
                                    <div className='mt-auto flex items-center justify-between'>
                                        <motion.div variants={priceVariants}>
                                            <p className='text-[clamp(0.875rem,2.2vw,1.125rem)] font-bold text-gray-900 leading-none'>{product.price}</p>
                                            <p className='text-[clamp(0.625rem,1.2vw,0.75rem)] text-gray-400 line-through mt-[clamp(0.125rem,0.5vw,0.25rem)]'>{product.originalPrice}</p>
                                        </motion.div>
                                        <motion.button
                                            variants={cartButtonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className='p-[clamp(0.375rem,1vw,0.5rem)] bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-[clamp(0.5rem,1.5vw,0.75rem)] transition-all'
                                        >
                                            <ShoppingBag className='w-[clamp(0.875rem,2vw,1.125rem)] h-[clamp(0.875rem,2vw,1.125rem)]' />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* --- RIGHT SIDE: FEATURED BANNER --- */}
                    <motion.div
                        ref={bannerRef}
                        variants={bannerContainerVariants}
                        initial="hidden"
                        animate={isBannerInView ? "visible" : "hidden"}
                        className='w-full lg:w-[clamp(18rem,25vw,20rem)] relative rounded-[clamp(1rem,3vw,1.5rem)] overflow-hidden group min-h-[clamp(20rem,50vh,28rem)]'
                    >
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            src="/img/topSell/11.jpg"
                            className='absolute inset-0 w-full h-full object-cover'
                            alt="Fresh Banner"
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:bg-none'></div>

                        <div className='relative h-full p-[clamp(1.5rem,4vw,2rem)] flex flex-col justify-start z-10'>
                            <motion.span
                                variants={bannerItemVariants}
                                className='text-primary font-bold tracking-widest uppercase text-[clamp(0.75rem,1.5vw,0.875rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'
                            >
                                Fresh & Natural
                            </motion.span>
                            <motion.h4
                                variants={bannerItemVariants}
                                className='text-[clamp(1.5rem,4vw,2rem)] font-black text-gray-800 leading-tight uppercase'
                            >
                                Organic <br />
                                <span className='text-primary'>Vegetables</span>
                            </motion.h4>
                            <motion.p
                                variants={bannerItemVariants}
                                className='text-gray-600 mt-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium'
                            >
                                Get up to 30% Off on your first order
                            </motion.p>

                            <motion.button
                                variants={bannerButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className='mt-auto lg:mt-[clamp(1.5rem,3vw,2rem)] flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)] bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] px-[clamp(1rem,3vw,1.5rem)] rounded-[clamp(0.75rem,2vw,1rem)] font-bold text-[clamp(0.75rem,1.5vw,0.875rem)] shadow-lg shadow-primary/30'
                            >
                                Shop Now
                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className='w-[clamp(0.875rem,2vw,1.125rem)] h-[clamp(0.875rem,2vw,1.125rem)]' />
                                </motion.div>
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TopSellingItems;