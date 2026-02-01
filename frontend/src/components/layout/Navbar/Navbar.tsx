import { motion, Variants, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronRight, CircleStar } from 'lucide-react';
import MainMenu from './MainMenu';

// --- TYPES ---
interface MenuItem {
    name: string;
    src: string;
    subItems: string[];
}

interface WaveMotion {
    animate: { x: number[] };
    transition: { duration: number; repeat: number; delay: number };
}

// --- CONSTANTS --- 
const MenuItems: MenuItem[] = [
    {
        name: "Biscuits & Snacks",
        src: "/img/svg/biscuit.svg",
        subItems: ["Biscuits", "Chips", "Cookies", "Namkeen"]
    },
    {
        name: "Vegetables & Fruits",
        src: "/img/svg/vegetable.svg",
        subItems: ["Fresh Vegetables", "Fresh Fruits", "Leafy Greens", "Organic"]
    },
    {
        name: "Beverages",
        src: "/img/svg/cup.svg",
        subItems: ["Soft Drinks", "Juice", "Tea & Coffee", "Energy Drinks"]
    },
    {
        name: "Frozen Foods",
        src: "/img/svg/frozen.svg",
        subItems: ["Frozen Vegetables", "Frozen Snacks", "Ice Cream", "Ready Meals"]
    },
    {
        name: "Grocery & Staples",
        src: "/img/svg/grocery.svg",
        subItems: ["Rice", "Dal & Pulses", "Oil & Ghee", "Spices"]
    },
    {
        name: "Meat & Fish",
        src: "/img/svg/meats.svg",
        subItems: ["Chicken", "Beef", "Mutton", "Fish", "Seafood"]
    }
];

// --- ANIMATION VARIANTS ---

// Navbar Container
const navbarContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const navbarItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Wave Motions
const waveMotion1: WaveMotion = {
    animate: { x: [0, 4, 0] },
    transition: { duration: 2, repeat: Infinity, delay: 0 }
};

const waveMotion2: WaveMotion = {
    animate: { x: [0, -4, 0] },
    transition: { duration: 2, repeat: Infinity, delay: 0.1 }
};

const waveMotion3: WaveMotion = {
    animate: { x: [0, 4, 0] },
    transition: { duration: 2, repeat: Infinity, delay: 0.0 }
};

const waveMotion4: WaveMotion = {
    animate: { x: [0, -4, 0] },
    transition: { duration: 2, repeat: Infinity, delay: 0.1 }
};

// Button Hover
const buttonHoverVariants: Variants = {
    hover: {
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(13, 164, 135, 0.2)",
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

// Dropdown Animations
const dropdownAnimation: Variants = {
    initial: { y: -20, opacity: 0, scale: 0.95 },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        y: -10,
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Menu Item Hover
const menuItemHoverVariants: Variants = {
    hover: {
        x: 5,
        backgroundColor: "rgba(13, 164, 135, 0.05)",
        transition: {
            duration: 0.2
        }
    }
};

// Icon Animations
const iconHoverVariants: Variants = {
    hover: {
        scale: 1.2,
        rotate: [0, -10, 10, 0],
        transition: {
            duration: 0.4
        }
    }
};

const chevronHoverVariants: Variants = {
    hover: {
        x: 3,
        transition: {
            duration: 0.2
        }
    }
};

// SubMenu Animation
const subMenuVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: {
            duration: 0.2
        }
    }
};

const subItemVariants: Variants = {
    hover: {
        x: 5,
        color: "#0DA487",
        transition: {
            duration: 0.2
        }
    }
};

// Deal Button Animation
const dealButtonVariants: Variants = {
    hover: {
        scale: 1.05,
        backgroundColor: "rgba(13, 164, 135, 0.15)",
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

const starIconVariants: Variants = {
    animate: {
        rotate: [0, 360],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// --- ALL CATEGORIES BUTTON ---
const LeftSideButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent, itemName: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            setHoveredItem(itemName);
        }
    };

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false);
                setHoveredItem(null);
            }}
            className='relative flex items-center cursor-pointer'
        >
            <motion.h1
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                className='pl-[clamp(1rem,3vw,1.5rem)] pr-[clamp(2rem,5vw,3rem)] py-[clamp(0.5rem,2vw,0.75rem)] bg-primary text-white font-bold tracking-wider rounded-md flex items-center gap-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.875rem,1.5vw,1rem)] whitespace-nowrap shadow-md'
            >
                <div className='flex flex-col gap-[clamp(0.2rem,0.5vw,0.25rem)]'>
                    <motion.div
                        animate={waveMotion1.animate}
                        transition={waveMotion1.transition}
                        className='w-[clamp(20px,4vw,24px)] h-0.5 bg-white rounded-full'
                    />
                    <motion.div
                        animate={waveMotion2.animate}
                        transition={waveMotion2.transition}
                        className='w-[clamp(16px,3vw,20px)] h-0.5 bg-white rounded-full'
                    />
                    <motion.div
                        animate={waveMotion3.animate}
                        transition={waveMotion3.transition}
                        className='w-[clamp(20px,4vw,24px)] h-0.5 bg-white rounded-full'
                    />
                    <motion.div
                        animate={waveMotion4.animate}
                        transition={waveMotion4.transition}
                        className='w-[clamp(18px,3.5vw,22px)] h-0.5 bg-white rounded-full'
                    />
                </div>
                All Categories
            </motion.h1>
            {isOpen && (
                <motion.div
                    variants={dropdownAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-[clamp(2.5rem,8vw,3rem)] left-0 z-50 shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='w-[clamp(16rem,40vw,18rem)] p-[clamp(0.75rem,2vw,1rem)] bg-white rounded-xl relative'
                    >
                        {MenuItems.map((item) => (
                            <motion.div variants={itemVariants} key={item.name}>
                                <motion.h2
                                    role="button"
                                    tabIndex={0}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                                    variants={menuItemHoverVariants}
                                    whileHover="hover"
                                    className="flex items-center justify-between gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-wider mb-[clamp(0.75rem,2vw,1rem)] cursor-pointer p-[clamp(0.375rem,1vw,0.5rem)] rounded-md"
                                >
                                    <motion.div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                                        <motion.img
                                            variants={iconHoverVariants}
                                            whileHover="hover"
                                            src={item.src}
                                            alt={item.name}
                                            className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]'
                                        />
                                        <span className='whitespace-nowrap'>{item.name}</span>
                                    </motion.div>
                                    <motion.span variants={chevronHoverVariants} whileHover="hover">
                                        <ChevronRight className="w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]" />
                                    </motion.span>
                                </motion.h2>
                            </motion.div>
                        ))}

                        {hoveredItem && (
                            <motion.div
                                onMouseEnter={() => setHoveredItem(hoveredItem)}
                                onMouseLeave={() => setHoveredItem(null)}
                                variants={subMenuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute left-[clamp(16rem,40vw,18rem)] top-0 p-[clamp(0.75rem,2vw,1rem)] w-[clamp(12rem,30vw,13rem)] bg-white text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-wider shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-md"
                            >
                                <ul>
                                    {MenuItems.find(item => item.name === hoveredItem)?.subItems.map((subItem, index) => (
                                        <motion.li
                                            key={subItem}
                                            variants={subItemVariants}
                                            whileHover="hover"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                transition: {
                                                    delay: index * 0.05,
                                                    duration: 0.3
                                                }
                                            }}
                                            className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mb-[clamp(0.375rem,1vw,0.5rem)] cursor-pointer transition-colors whitespace-nowrap p-[clamp(0.25rem,0.5vw,0.375rem)] rounded"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.1
                                                }}
                                                className="w-[clamp(5px,1vw,6px)] h-[clamp(5px,1vw,6px)] bg-gray-500 rounded-full shrink-0"
                                            />
                                            {subItem}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

const DealNowButton = () => {
    return (
        <motion.a
            href="/#deals"
            variants={dealButtonVariants}
            whileHover="hover"
            whileTap="tap"
            className='flex gap-[clamp(0.25rem,1vw,0.5rem)] bg-[#E7F5F3] py-[clamp(0.5rem,1.5vw,0.875rem)] px-[clamp(1rem,3vw,1.5rem)] rounded-lg text-primary text-[clamp(0.875rem,1.5vw,1rem)] font-bold transition-colors tracking-wider whitespace-nowrap shadow-sm'
        >
            <motion.div variants={starIconVariants} animate="animate">
                <CircleStar className='w-[clamp(18px,4vw,24px)] h-[clamp(18px,4vw,24px)]' color='#0DA487' />
            </motion.div>
            Todays Best Deals
        </motion.a>
    );
};

// --- MAIN COMPONENT ---
const Navbar = () => {
    const navRef = useRef(null);
    const isInView = useInView(navRef, { once: true, amount: 0.5 });

    return (
        <motion.nav
            ref={navRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className='w-full bg-white mt-2 '
        >
            <motion.div
                variants={navbarContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto py-0 md:py-[clamp(0.75rem,2vw,1rem)] px-[clamp(1rem,3vw,1.5rem)]'
            >
                <div className='flex items-center gap-[clamp(0.5rem,2vw,1.5rem)]'>
                    <motion.div variants={navbarItemVariants} className='hidden md:block shrink-0'>
                        <LeftSideButton />
                    </motion.div>

                    <motion.div variants={navbarItemVariants} className='flex-1 flex justify-center'>
                        <div className='hidden lg:block'>
                            <MainMenu />
                        </div>
                    </motion.div>

                    <motion.div variants={navbarItemVariants} className='hidden md:block shrink-0'>
                        <DealNowButton />
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;