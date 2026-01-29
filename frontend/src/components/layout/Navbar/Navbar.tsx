import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
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
            <h1 className='pl-[clamp(1rem,3vw,1.5rem)] pr-[clamp(2rem,5vw,3rem)] py-[clamp(0.5rem,2vw,0.75rem)] bg-primary text-white font-bold tracking-wider rounded-md flex items-center gap-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.875rem,1.5vw,1rem)] whitespace-nowrap'>
                <div className='flex flex-col gap-[clamp(0.2rem,0.5vw,0.25rem)]'>
                    <motion.div
                        animate={waveMotion1.animate}
                        transition={waveMotion1.transition}
                        className='w-[clamp(20px,4vw,24px)] h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion2.animate}
                        transition={waveMotion2.transition}
                        className='w-[clamp(16px,3vw,20px)] h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion3.animate}
                        transition={waveMotion3.transition}
                        className='w-[clamp(20px,4vw,24px)] h-0.5 bg-white'
                    />
                    <motion.div
                        animate={waveMotion4.animate}
                        transition={waveMotion4.transition}
                        className='w-[clamp(18px,3.5vw,22px)] h-0.5 bg-white'
                    />
                </div>
                All Categories
            </h1>
            {isOpen && (
                <motion.div
                    initial={dropdownAnimation.initial}
                    animate={dropdownAnimation.animate}
                    transition={dropdownAnimation.transition}
                    className="absolute top-[clamp(2.5rem,8vw,3rem)] left-0 z-50 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='w-[clamp(16rem,40vw,18rem)] p-[clamp(0.75rem,2vw,1rem)] bg-white rounded-xl relative'>
                        {MenuItems.map((item) => (
                            <motion.div variants={itemVariants} key={item.name}>
                                <h2
                                    role="button"
                                    tabIndex={0}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                                    className="flex items-center justify-between gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-wider mb-[clamp(0.75rem,2vw,1rem)] cursor-pointer">
                                    <motion.div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]'
                                        />
                                        <span className='whitespace-nowrap'>{item.name}</span>
                                    </motion.div>
                                    <span><ChevronRight className="w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]" /></span>
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
                                className="absolute left-[clamp(16rem,40vw,18rem)] top-0 p-[clamp(0.75rem,2vw,1rem)] w-[clamp(12rem,30vw,13rem)] bg-white text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-wider shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-md">
                                <ul>
                                    {MenuItems.find(item => item.name === hoveredItem)?.subItems.map((subItem) => (
                                        <li key={subItem} className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mb-[clamp(0.375rem,1vw,0.5rem)] hover:text-primary cursor-pointer transition-colors whitespace-nowrap">
                                            <div className="w-[clamp(5px,1vw,6px)] h-[clamp(5px,1vw,6px)] bg-gray-500 rounded-full shrink-0" />
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

        <a href="/#deals"
            className='flex gap-[clamp(0.25rem,1vw,0.5rem)] bg-[#E7F5F3] py-[clamp(0.5rem,1.5vw,0.875rem)] px-[clamp(1rem,3vw,1.5rem)] rounded-lg text-primary text-[clamp(0.875rem,1.5vw,1rem)] font-bold hover:text-primary transition-colors tracking-wider whitespace-nowrap' >
            <CircleStar className='w-[clamp(18px,4vw,24px)] h-[clamp(18px,4vw,24px)]' color='#0DA487' />
            Todays Best Deals
        </a>
    );
};

// --- MAIN COMPONENT ---
const Navbar = () => {
    return (
        <nav className='w-full'>
            <div className='w-full max-w-[min(calc(100%-2rem),83rem)] mx-auto py-0 md:py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(1rem,1vw,1.5rem)]'>
                <div className='flex items-center gap-[clamp(0.5rem,2vw,1.5rem)]'>
                    <div className='hidden md:block shrink-0'>
                        <LeftSideButton />
                    </div>

                    <div className='flex-1 flex justify-center'>
                        <div className='hidden lg:block'>
                            <MainMenu />
                        </div>
                    </div>

                    <div className='hidden md:block shrink-0'>
                        <DealNowButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;