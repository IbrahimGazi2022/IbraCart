import { memo, useCallback, useState, useRef } from 'react';
import { Search, PhoneCall, Heart, ShoppingCart, User } from 'lucide-react';
import HamburgerMenu from '../Navbar/HamburgerMenu';
import { motion, Variants, useInView } from 'framer-motion';

// --- ALL CONSTANTS HERE ---
const CONFIG = {
    logo: '../img/logo/logo.png',
    contactNumber: "+880 1732 570 530",
    delivaryTime: "24/7 Delivery",
    cartCount: 3,
    wishlistCount: 5
};

// --- ANIMATION VARIANTS ---

// Container Animation
const headerContainerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const headerItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// Logo Animation
const logoVariants: Variants = {
    hover: {
        scale: 1.05,
        rotate: [0, -2, 2, 0],
        transition: {
            duration: 0.4
        }
    },
    tap: {
        scale: 0.95
    }
};

// Search Box Animation
const searchBoxVariants: Variants = {
    focus: {
        scale: 1.02,
        boxShadow: "0 4px 12px rgba(13, 164, 135, 0.15)",
        transition: {
            duration: 0.2
        }
    }
};

const searchButtonVariants: Variants = {
    hover: {
        scale: 1.1,
        color: "#0DA487",
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

// Icon Button Animation
const iconButtonVariants: Variants = {
    hover: {
        scale: 1.1,
        backgroundColor: "rgba(229, 231, 235, 0.5)",
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

// Badge Animation
const badgeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: 0.5
        }
    },
    pulse: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
        }
    }
};

// Contact Animation
const contactHoverVariants: Variants = {
    hover: {
        scale: 1.05,
        color: "#0DA487",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

// Phone Icon Float
const phoneIconVariants: Variants = {
    float: {
        y: [0, -3, 0],
        rotate: [0, 5, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Divider Animation
const dividerVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// --- LOGO ---
const Logo = memo(() => {
    return (
        <motion.a
            href="/"
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="shrink-0 flex items-center"
            aria-label="Go to homepage"
        >
            <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={CONFIG.logo}
                alt="Company Logo"
                className='h-[clamp(2rem,6vw,3rem)] w-auto object-contain'
            />
        </motion.a>
    );
});
Logo.displayName = 'Logo';

// --- SEARCH BOX ---
const SearchBox = memo(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        console.log('Searching:', searchQuery);
    }, [searchQuery]);

    return (
        <motion.div
            variants={headerItemVariants}
            className='hidden md:block md:flex-1 max-w-[min(95%,36rem)]'
        >
            <motion.div
                animate={isFocused ? "focus" : ""}
                variants={searchBoxVariants}
                className='relative'
            >
                <motion.input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="I'm Searching for......"
                    className="w-full px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] pr-[clamp(2rem,8vw,2.5rem)] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-[clamp(0.875rem,1.5vw,1rem)] transition-all"
                    whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                    onClick={handleSearch}
                    variants={searchButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className='absolute right-[clamp(0.5rem,2vw,0.75rem)] top-1/2 -translate-y-1/2 text-gray-500'
                >
                    <Search className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                </motion.button>
            </motion.div>
        </motion.div>
    );
});
SearchBox.displayName = 'SearchBox';

// --- CONTACT DETAILS ---
const ContactNumber = memo(() => (
    <motion.a
        href={`tel:${CONFIG.contactNumber}`}
        variants={contactHoverVariants}
        whileHover="hover"
        className="hidden lg:flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] transition-colors shrink-0"
    >
        <motion.div variants={phoneIconVariants} animate="float">
            <PhoneCall className='w-[clamp(22px,4vw,26px)] h-[clamp(22px,4vw,26px)]' />
        </motion.div>
        <div className='flex flex-col'>
            <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500 font-medium whitespace-nowrap">{CONFIG.delivaryTime}</span>
            <span className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium whitespace-nowrap">{CONFIG.contactNumber}</span>
        </div>
    </motion.a>
));
ContactNumber.displayName = 'ContactNumber';

// --- WISHLIST ICON COMPONENT ---
const WishlistIcon = memo(() => (
    <motion.button
        variants={iconButtonVariants}
        whileHover="hover"
        whileTap="tap"
        className="relative p-[clamp(0.25rem,1vw,0.5rem)] rounded-full transition-colors shrink-0"
        aria-label="Wishlist"
    >
        <motion.div
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
        >
            <Heart className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        </motion.div>
        {CONFIG.wishlistCount > 0 && (
            <motion.span
                variants={badgeVariants}
                initial="hidden"
                animate={["visible", "pulse"]}
                className="absolute top-0 right-0 bg-secondary text-white text-[clamp(0.625rem,1.2vw,0.75rem)] rounded-full w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] flex items-center justify-center font-semibold"
            >
                {CONFIG.wishlistCount}
            </motion.span>
        )}
    </motion.button>
));
WishlistIcon.displayName = 'WishlistIcon';

// --- CART ICON ---
const CartIcon = memo(() => (
    <motion.button
        variants={iconButtonVariants}
        whileHover="hover"
        whileTap="tap"
        className="relative p-[clamp(0.25rem,1vw,0.5rem)] rounded-full transition-colors shrink-0"
        aria-label="Shopping Cart"
    >
        <motion.div
            whileHover={{ scale: 1.2, y: [0, -3, 0] }}
            transition={{ duration: 0.4 }}
        >
            <ShoppingCart className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        </motion.div>
        {CONFIG.cartCount > 0 && (
            <motion.span
                variants={badgeVariants}
                initial="hidden"
                animate={["visible", "pulse"]}
                className="absolute -top-[clamp(0.125rem,0.5vw,0.25rem)] -right-[clamp(0.125rem,0.5vw,0.25rem)] bg-secondary text-white text-[clamp(0.625rem,1.2vw,0.75rem)] rounded-full w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] flex items-center justify-center font-semibold"
            >
                {CONFIG.cartCount}
            </motion.span>
        )}
    </motion.button>
));
CartIcon.displayName = 'CartIcon';

// --- USER ICON COMPONENT ---
const UserIcon = memo(() => (
    <motion.button
        variants={iconButtonVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] p-[clamp(0.25rem,1vw,0rem)] rounded-full transition-colors shrink-0"
        aria-label="User Account"
    >
        <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
        >
            <User className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        </motion.div>
        <div className="hidden md:flex flex-col items-start">
            <span className="text-[clamp(0.75rem,1.2vw,0.75rem)] text-gray-500 font-medium whitespace-nowrap">Hello,</span>
            <span className="text-[clamp(0.875rem,1.5vw,0.875rem)] font-semibold tracking-widest whitespace-nowrap">My Account</span>
        </div>
    </motion.button>
));
UserIcon.displayName = 'UserIcon';

// --- DIVIDER COMPONENT ---
const Divider = memo(() => (
    <motion.div
        variants={dividerVariants}
        className="hidden md:block h-[clamp(1rem,4vw,1.5rem)] w-px bg-gray-400 shrink-0"
        style={{ transformOrigin: 'center' }}
    />
));
Divider.displayName = 'Divider';

// --- MAIN COMPONENT ---
const Header = () => {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, amount: 0.5 });

    return (
        <motion.header
            ref={headerRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='w-full py-0 md:py-[clamp(0.75rem,2vw,1rem)] sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm'
        >
            <motion.div
                variants={headerContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)] flex gap-[clamp(0.5rem,2vw,1rem)] items-center justify-between'
            >
                {/* --- MOBILE LAYOUT --- */}
                <motion.div
                    variants={headerItemVariants}
                    className='flex md:hidden items-center justify-between w-full gap-[clamp(0.5rem,2vw,1rem)]'
                >
                    <HamburgerMenu />
                    <Logo />

                    <div className='flex items-center gap-[clamp(0.5rem,2vw,1rem)]'>
                        <WishlistIcon />
                        <CartIcon />
                        <UserIcon />
                    </div>
                </motion.div>

                {/* --- DESKTOP LAYOUT --- */}
                <div className='hidden md:flex items-center gap-[clamp(0.5rem,2vw,1rem)] w-full'>
                    <motion.div variants={headerItemVariants}>
                        <Logo />
                    </motion.div>
                    <SearchBox />
                    <motion.div variants={headerItemVariants}>
                        <ContactNumber />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <Divider />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <WishlistIcon />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <Divider />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <CartIcon />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <Divider />
                    </motion.div>
                    <motion.div variants={headerItemVariants}>
                        <UserIcon />
                    </motion.div>
                </div>
            </motion.div>
        </motion.header>
    );
};

export default Header;