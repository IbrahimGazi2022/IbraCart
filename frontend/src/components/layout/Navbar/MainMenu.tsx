import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// --- CONSTANTS --- 
const MainMenuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Categories", link: "/categories" },
    { name: "Deals", link: "/deals" },
    { name: "Best Sellers", link: "/best-sellers" },
    { name: "Contact", link: "/contact" }
];


// --- ANIMATION --- 
const iconVariants = {
    rest: {
        rotate: 0,
    },
    hover: {
        rotate: 180,
    }
};


const MainMenu = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='flex items-center gap-[clamp(1rem,2vw,2rem)]'>
            {MainMenuItems.map((item, index) => (
                <a
                    key={item.name}
                    href={item.link}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    className='flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-[clamp(0.875rem,1.2vw,1rem)] text-black hover:text-primary font-medium transition-colors whitespace-nowrap'
                >
                    {item.name}
                    <motion.div
                        variants={iconVariants}
                        initial="rest"
                        animate={hoveredIndex === index ? "hover" : "rest"}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <ChevronDown className='w-[clamp(16px,1.5vw,18px)] h-[clamp(16px,1.5vw,18px)]' strokeWidth={3} />
                    </motion.div>
                </a>
            ))}
        </div>
    );
};

export default MainMenu;