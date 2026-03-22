import { memo, useCallback, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronRight, Home, ShoppingBag, Grid3x3, Zap, TrendingUp, Mail } from "lucide-react";

// --- CONSTANTS ---
const MainMenuItems = [
    { name: "Home", link: "/", icon: Home },
    { name: "Shop", link: "/shop", icon: ShoppingBag },
    { name: "Categories", link: "/categories", icon: Grid3x3 },
    { name: "Deals", link: "/deals", icon: Zap },
    { name: "Best Sellers", link: "/best-sellers", icon: TrendingUp },
    { name: "Contact", link: "/contact", icon: Mail }
];

const Categories = [
    "Biscuits & Snacks",
    "Vegetables & Fruits",
    "Beverages",
    "Frozen Foods",
    "Grocery & Staples",
    "Meat & Fish"
];

// --- ANIMATIONS ---
const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const drawerVariants: Variants = {
    hidden: { x: "-100%" },
    visible: {
        x: 0,
        transition: { type: "spring", damping: 25, stiffness: 200 }
    },
    exit: {
        x: "-100%",
        transition: { type: "spring", damping: 25, stiffness: 200 }
    }
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.05, duration: 0.3 }
    })
};

const HamburgerMenu = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* --- HAMBURGER BUTTON --- */}
            <button
                aria-expanded={isOpen}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="flex flex-col gap-[clamp(0.2rem,1vw,0.25rem)] p-[clamp(0.25rem,1vw,0.5rem)] hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary active:scale-95"
            >
                <span className={`w-[clamp(20px,5vw,24px)] h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
                <span className={`w-[clamp(20px,5vw,24px)] h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-[clamp(20px,5vw,24px)] h-[2.5px] bg-primary transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
            </button>

            {/* --- PORTAL: renders directly in document.body, outside Header's stacking context --- */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* --- OVERLAY --- */}
                            <motion.div
                                variants={overlayVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={closeMenu}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-998"
                            />

                            {/* --- DRAWER --- */}
                            <motion.div
                                variants={drawerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="fixed top-0 left-0 h-full w-[min(85vw,20rem)] bg-white shadow-2xl z-999 overflow-y-auto"
                            >
                                {/* --- DRAWER HEADER --- */}
                                <div className="sticky top-0 bg-primary text-white p-[clamp(1rem,3vw,1.5rem)] flex items-center justify-between z-1000">
                                    <h2 className="text-[clamp(1.125rem,3vw,1.25rem)] font-bold">Ibra Cart</h2>
                                    <button
                                        onClick={closeMenu}
                                        className="p-[clamp(0.25rem,1vw,0.5rem)] hover:bg-white/20 rounded-full transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]" />
                                    </button>
                                </div>

                                {/* --- MENU --- */}
                                <div className="p-[clamp(1rem,3vw,1.5rem)]">
                                    <div className="mb-[clamp(1.5rem,4vw,2rem)]">
                                        <nav>
                                            {MainMenuItems.map((item, i) => {
                                                const Icon = item.icon;
                                                return (
                                                    <motion.a
                                                        key={item.name}
                                                        href={item.link}
                                                        onClick={closeMenu}
                                                        custom={i}
                                                        variants={itemVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className="flex items-center justify-between p-[clamp(0.75rem,2vw,1rem)] mb-[clamp(0.25rem,1vw,0.5rem)] rounded-lg hover:bg-gray-100 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)]">
                                                            <Icon className="w-[clamp(18px,4vw,20px)] h-[clamp(18px,4vw,20px)] text-primary" />
                                                            <span className="text-[clamp(0.875rem,2vw,1rem)] font-medium text-gray-800 group-hover:text-primary transition-colors">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <ChevronRight className="w-[clamp(16px,3vw,18px)] h-[clamp(16px,3vw,18px)] text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                    </motion.a>
                                                );
                                            })}
                                        </nav>
                                    </div>

                                    {/* --- CATEGORIES --- */}
                                    <div>
                                        <h3 className="text-[clamp(0.75rem,2vw,0.875rem)] font-bold text-gray-500 uppercase tracking-wider mb-[clamp(0.75rem,2vw,1rem)]">
                                            Categories
                                        </h3>
                                        <div className="space-y-[clamp(0.25rem,1vw,0.5rem)]">
                                            {Categories.map((cat, i) => (
                                                <motion.a
                                                    key={cat}
                                                    href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={closeMenu}
                                                    custom={i + MainMenuItems.length}
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)] p-[clamp(0.5rem,2vw,0.75rem)] rounded-lg hover:bg-gray-100 transition-colors group"
                                                >
                                                    <div className="w-[clamp(5px,1vw,6px)] h-[clamp(5px,1vw,6px)] bg-primary rounded-full group-hover:scale-125 transition-transform" />
                                                    <span className="text-[clamp(0.875rem,2vw,0.875rem)] text-gray-700 group-hover:text-primary transition-colors">
                                                        {cat}
                                                    </span>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* --- DRAWER FOOTER --- */}
                                <div className="sticky bottom-0 bg-gray-50 p-[clamp(1rem,3vw,1.5rem)] border-t border-gray-200">
                                    <p className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-600 text-center">
                                        © 2025 Ibra Cart
                                    </p>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
});

HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;