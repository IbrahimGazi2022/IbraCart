import React, { memo, useCallback, useState } from "react";

const HamburgerMenu = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <button
            onClick={toggleMenu}
            className="flex flex-col gap-1 p-2 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
        >
            <span className={`w-6 h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
        </button>
    );
});

HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;