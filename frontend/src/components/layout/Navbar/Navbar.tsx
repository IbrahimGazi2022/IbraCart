import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, CircleStar } from 'lucide-react';
import MainMenu from './MainMenu';
import HamburgerMenu from './HamburgerMenu';

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

// --- ANIMATION ---
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

const dropdownAnimation = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.1 }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.10
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
            className='relative flex items-center cursor-pointer'>
            <h1 className='pl-6 pr-12 py-3 bg-primary text-white font-bold tracking-wider rounded-md flex items-center gap-6'>
                <div className='flex flex-col gap-1'>
                    <motion.div
                        animate={waveMotion1.animate}
                        transition={waveMotion1.transition}
                        className='w-6 h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion2.animate}
                        transition={waveMotion2.transition}
                        className='w-4 h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion3.animate}
                        transition={waveMotion3.transition}
                        className='w-6 h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion4.animate}
                        transition={waveMotion4.transition}
                        className='w-5 h-0.5 bg-white'
                    />
                </div>
                All Categories
            </h1>
            {isOpen && (
                <motion.div
                    initial={dropdownAnimation.initial}
                    animate={dropdownAnimation.animate}
                    transition={dropdownAnimation.transition}
                    className="absolute top-12 left-0 z-50 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='w-72 p-4 bg-white rounded-xl relative'>
                        {MenuItems.map((item) => (
                            <motion.div variants={itemVariants} key={item.name}>
                                <h2
                                    role="button"
                                    tabIndex={0}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                                    className="flex items-center justify-between gap-2 text-lg tracking-wider mb-4 cursor-pointer">
                                    <motion.div className="flex items-center gap-2">
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            className='w-6 h-6'
                                        />
                                        {item.name}
                                    </motion.div>
                                    <span><ChevronRight className="w-5 h-5" /></span>
                                </h2>
                            </motion.div>
                        ))}

                        {hoveredItem && (
                            <motion.div
                                onMouseEnter={() => setHoveredItem(hoveredItem)}
                                onMouseLeave={() => setHoveredItem(null)}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="absolute left-72 top-0 p-4 w-52 bg-white text-lg tracking-wider shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-md">
                                <ul>
                                    {MenuItems.find(item => item.name === hoveredItem)?.subItems.map((subItem) => (
                                        <li key={subItem} className="flex items-center gap-2 mb-2 hover:text-primary cursor-pointer transition-colors">
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                            {subItem}
                                        </li>
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
        <a
            href="/#deals"
            className='flex gap-2 bg-[#E7F5F3] py-2 px-4 sm:py-3.5 sm:px-6 rounded-lg text-primary text-sm sm:text-base font-bold hover:text-primary transition-colors tracking-wider'>
            <CircleStar className='w-5 h-5 sm:w-6 sm:h-6' color='#0DA487' />
            Todays Best Deals
        </a>
    );
};

// --- MAIN COMPONENT ---
const Navbar = () => {
    return (
        <nav className='w-full'>
            <div className='max-w-7xl mx-auto py-0 md:py-3 px-4 md:px-6 lg:px-0'>
                <div className='flex items-center gap-4'>
                    <div className='hidden md:block'>
                        <LeftSideButton />
                    </div>

                    <div className='flex-1 flex justify-center'>
                        <div className='hidden lg:block'>
                            <MainMenu />
                        </div>
                    </div>

                    <div className='hidden md:block'>
                        <DealNowButton />
                    </div>

                    <div className='hidden md:block lg:hidden'>
                        <HamburgerMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;