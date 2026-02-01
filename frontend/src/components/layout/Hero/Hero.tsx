import { ArrowRight } from 'lucide-react';
import { motion, Variants, useInView } from 'framer-motion';
import { useRef } from 'react';

// --- ALL CONSTANTS HERE ---
const Image = {
    img1: '../img/hero/1.jpg',
    img2: '../img/hero/2.jpg',
    img3: '../img/hero/3.jpg',
};

// --- ANIMATION VARIANTS ---

// Main Hero Container
const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

// Left Side Card
const leftCardVariants: Variants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

// Right Side Cards
const rightCardVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: (custom: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: custom * 0.2
        }
    })
};

// Content Animation
const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const textItemVariants: Variants = {
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

// Badge Animation
const badgeVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
        }
    }
};

// Heading Animation
const headingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const headingLineVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Button Animation
const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6
        }
    },
    hover: {
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)",
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

// Discount Text Animation
const discountVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3
        }
    }
};

// Image Overlay Animation
const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8
        }
    }
};

// --- LEFT SIDE IMAGE --- 
const LeftSideImage = () => {
    return (
        <motion.div
            variants={leftCardVariants}
            className='relative h-full flex items-center overflow-hidden rounded-md'
        >
            <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={Image.img1}
                alt="Hero Image"
                className='w-full h-full object-cover absolute rounded-md'
            />
            <motion.div
                variants={overlayVariants}
                className='absolute inset-0 bg-black/10'
            />

            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className='relative z-10 px-[clamp(1.5rem,4vw,3rem)]'
            >
                <motion.p
                    variants={textItemVariants}
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-600 tracking-wider'
                >
                    Exclusive Offer
                    <motion.span
                        variants={badgeVariants}
                        className='bg-secondary text-white px-[clamp(0.25rem,1.5vw,0.625rem)] py-[clamp(0.25rem,1vw,0.375rem)] font-bold rounded-full text-[clamp(0.75rem,1.2vw,0.875rem)]'
                    >
                        30% Off
                    </motion.span>
                </motion.p>
                <motion.h1
                    variants={headingVariants}
                    className='text-[clamp(1.125rem,5vw,3rem)] font-semibold uppercase mt-[clamp(0.75rem,2vw,1rem)] tracking-wide leading-tight'
                >
                    <motion.span variants={headingLineVariants} className='block'>Stay home</motion.span>
                    <motion.span variants={headingLineVariants} className='block'>delivered your</motion.span>
                    <motion.span variants={headingLineVariants} className='block text-primary font-extrabold'>Daily Needs</motion.span>
                </motion.h1>
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] bg-secondary text-white py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(0.5rem,3vw,1.25rem)] rounded-xl transition-colors cursor-pointer text-[clamp(0.875rem,1.5vw,1rem)]'
                >
                    Shop Now
                    <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowRight className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                    </motion.div>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

// --- RIGHT SIDE IMAGE ONE --- 
const RightSideImage1 = () => {
    return (
        <motion.div
            custom={0}
            variants={rightCardVariants}
            className='relative flex items-center h-full overflow-hidden rounded-md group'
        >
            <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={Image.img2}
                alt="Hero Image"
                className='w-full h-full absolute object-cover rounded-md'
            />
            <motion.div
                variants={overlayVariants}
                className='absolute inset-0 bg-black/10'
            />

            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className='relative z-10 px-[clamp(1.5rem,3vw,2rem)]'
            >
                <motion.p
                    variants={discountVariants}
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-secondary font-semibold text-[clamp(1.875rem,5vw,3rem)]'
                >
                    45%
                    <motion.span
                        variants={textItemVariants}
                        className='text-gray-500 text-[clamp(1.125rem,2vw,1.25rem)] mt-[clamp(0.75rem,2vw,1rem)] uppercase'
                    >
                        Off
                    </motion.span>
                </motion.p>
                <motion.p
                    variants={textItemVariants}
                    className='mt-[clamp(0.375rem,1vw,0.5rem)] capitalize text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-primary'
                >
                    Nut Collection
                </motion.p>
                <motion.span
                    variants={textItemVariants}
                    className='block text-gray-500 mt-[clamp(0.375rem,1vw,0.5rem)] tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'
                >
                    We deliver organic products
                </motion.span>
                <motion.span
                    variants={textItemVariants}
                    className='block text-gray-500 tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'
                >
                    vegetables & fruits
                </motion.span>

                <motion.button
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] text-black hover:text-primary transition-colors text-[clamp(0.875rem,1.5vw,1rem)] font-medium'
                >
                    Shop Now
                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowRight className='w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]' />
                    </motion.div>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

// --- RIGHT SIDE IMAGE TWO --- 
const RightSideImage2 = () => {
    return (
        <motion.div
            custom={1}
            variants={rightCardVariants}
            className='relative flex items-center h-full overflow-hidden rounded-md group'
        >
            <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={Image.img3}
                alt="Hero Image"
                className='w-full h-full absolute object-cover rounded-md'
            />
            <motion.div
                variants={overlayVariants}
                className='absolute inset-0 bg-black/10'
            />

            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className='relative z-10 px-[clamp(1.5rem,3vw,2rem)]'
            >
                <motion.p
                    variants={discountVariants}
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-secondary font-semibold text-[clamp(2rem,5vw,3rem)]'
                >
                    25%
                    <motion.span
                        variants={textItemVariants}
                        className='text-gray-500 text-[clamp(1.125rem,2vw,1.25rem)] mt-[clamp(0.75rem,2vw,1rem)] uppercase'
                    >
                        Off
                    </motion.span>
                </motion.p>
                <motion.p
                    variants={textItemVariants}
                    className='mt-[clamp(0.375rem,1vw,0.5rem)] capitalize text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-primary'
                >
                    Fresh Fruits
                </motion.p>
                <motion.span
                    variants={textItemVariants}
                    className='block text-gray-500 mt-[clamp(0.375rem,1vw,0.5rem)] tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'
                >
                    100% Natural & Organic
                </motion.span>
                <motion.span
                    variants={textItemVariants}
                    className='block text-gray-500 tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'
                >
                    Fresh from farm
                </motion.span>

                <motion.button
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] text-black hover:text-primary transition-colors text-[clamp(0.875rem,1.5vw,1rem)] font-medium'
                >
                    Shop Now
                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowRight className='w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]' />
                    </motion.div>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const Hero = () => {
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: true, amount: 0.2 });

    return (
        <div className='w-full'>
            <div className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto py-[clamp(0.25rem,1vw,0.5rem)]'>
                <motion.div
                    ref={heroRef}
                    variants={heroContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className='grid grid-cols-1 px-[clamp(1rem,3vw,1.5rem)] md:grid-cols-1 lg:grid-cols-3 gap-[clamp(0.75rem,2vw,1rem)]'
                >
                    <div className='lg:col-span-2 h-[30vh] md:h-[50vh] lg:h-[65vh]'>
                        <LeftSideImage />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-[clamp(0.75rem,2vw,1rem)] h-[30vh] md:h-[45vh] lg:h-[65vh]'>
                        <div className='h-full'>
                            <RightSideImage1 />
                        </div>

                        <div className='h-full'>
                            <RightSideImage2 />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;