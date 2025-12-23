import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// --- CONSTANTS --- 
const MenuItems = [
    {
        name: "Biscuits & Snacks",
        src: "../img/svg/biscuit.svg",
        subItems: ["Biscuits", "Chips", "Cookies", "Namkeen"]
    },
    {
        name: "Vegetables & Fruits",
        src: "../img/svg/vegetable.svg",
        subItems: ["Fresh Vegetables", "Fresh Fruits", "Leafy Greens", "Organic"]
    },
    {
        name: "Beverages",
        src: "../img/svg/cup.svg",
        subItems: ["Soft Drinks", "Juice", "Tea & Coffee", "Energy Drinks"]
    },
    {
        name: "Frozen Foods",
        src: "../img/svg/frozen.svg",
        subItems: ["Frozen Vegetables", "Frozen Snacks", "Ice Cream", "Ready Meals"]
    },
    {
        name: "Grocery & Staples",
        src: "../img/svg/grocery.svg",
        subItems: ["Rice", "Dal & Pulses", "Oil & Ghee", "Spices"]
    },
    {
        name: "Meat & Fish",
        src: "../img/svg/meats.svg",
        subItems: ["Chicken", "Beef", "Mutton", "Fish", "Seafood"]
    }
];

// --- LEFT SIDE BUTTON ---
const LeftSideButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            className='relative flex items-center cursor-pointer'>
            <h1 className='pl-6 pr-12 py-3 bg-primary text-white font-bold tracking-wider rounded-md flex items-center gap-6'>
                <div className='flex flex-col gap-1'>
                    <div className='w-6 h-0.5 bg-white'></div>
                    <div className='w-4 h-0.5 bg-white'></div>
                    <div className='w-6 h-0.5 bg-white'></div>
                    <div className='w-5 h-0.5 bg-white'></div>
                </div>
                All Categories
            </h1>
            {isOpen && (
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="absolute top-14 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                    <div className='w-68 p-4 bg-white rounded-xl'>
                        {MenuItems.map((item) => (
                            <div key={item.name}>
                                <h2
                                    role="button"
                                    tabIndex={0}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className="flex items-center justify-between gap-2 text-lg tracking-wider mb-4">
                                    <div className="flex items-center gap-2">
                                        <img src={item.src} className='w-6 h-6' />
                                        {item.name}
                                    </div>
                                    <span><ChevronRight className="w-5 h-5" /></span>
                                </h2>
                            </div>
                        ))}

                        {hoveredItem && (
                            <div
                                onMouseEnter={() => setHoveredItem(hoveredItem)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="absolute left-70 top-0 p-4 w-54 text-lg tracking-wider shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-md">
                                <ul>
                                    {MenuItems.find(item => item.name === hoveredItem)?.subItems.map((subItem) => (
                                        <li key={subItem} className="flex items-center gap-2 mb-2 hover:text-primary cursor-pointer transition-colors">
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---
const Navbar = () => {
    return (
        <nav className='w-full'>
            <div className='max-w-7xl mx-auto py-3 px-1'>
                <div className='flex items-center gap-4'>
                    <div className='hidden md:block'>
                        <LeftSideButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;