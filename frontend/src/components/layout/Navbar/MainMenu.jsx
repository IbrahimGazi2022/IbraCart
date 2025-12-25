import React, { useState } from 'react';
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
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='flex items-center gap-8'>
            {MainMenuItems.map((item, index) => (
                <a
                    key={item.name}
                    href={item.link}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    className='flex items-center gap-4 text-md text-black hover:text-primary font-medium transition-colors'
                >
                    {item.name}
                    <motion.div
                        variants={iconVariants}
                        initial="rest"
                        animate={hoveredIndex === index ? "hover" : "rest"}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <ChevronDown size={18} strokeWidth={3} />
                    </motion.div>
                </a>
            ))}
        </div>
    );
};

export default MainMenu;
