import { memo, useCallback, useState } from 'react';
import { Search, PhoneCall, Heart, ShoppingCart, User } from 'lucide-react';

// --- ALL CONSTANTS HERE ---
const CONFIG = {
    logo: '../img/logo/logo.png',
    contactNumber: "+880 1732 570 530",
    delivaryTime: "24/7 Delivery",
    cartCount: 3,
    wishlistCount: 5
};

// --- LOGO ---
const Logo = memo(() => {
    return (
        <a
            href="/"
            className="shrink-0 flex items-center hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
        >
            <img
                src={CONFIG.logo}
                alt="Company Logo"
                className='h-8 md:h-10 lg:h-12 w-auto object-contain'
            />
        </a>
    );
});

// --- SEARCH BOX ---
const SearchBox = memo(() => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        console.log('Searching:', searchQuery);
    }, [searchQuery]);

    return (
        <div className='hidden md:block md:flex-1 max-w-xs md:max-w-md lg:max-w-xl'>
            <div className='relative'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="I'm Searching for......"
                    className="w-full px-4 py-2 md:py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                />
                <button onClick={handleSearch} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary'>
                    <Search size={24} />
                </button>
            </div>
        </div>
    );
});

// --- CONTACT DETAILS ---
const ContactNumber = memo(() => (
    <a href={`tel:${CONFIG.contactNumber}`}
        className="hidden lg:flex items-center gap-2 hover:text-primary transition-colors"
    >
        <PhoneCall size={26} />
        <div className='flex flex-col'>
            <span className="text-xs lg:text-sm text-gray-500 font-medium">{CONFIG.delivaryTime}</span>
            <span className="text-sm lg:text-base font-medium">{CONFIG.contactNumber}</span>
        </div>
    </a>
));


// --- WISHLIST ICON COMPONENT ---
const WishlistIcon = memo(() => (
    <button
        className="relative p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Wishlist"
    >
        <Heart size={20} className='md:w-6 md:h-6' />
        {CONFIG.wishlistCount > 0 && (
            <span className="absolute top-0 right-0 md:top-0.5 md:right-0.5 bg-secondary text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                {CONFIG.wishlistCount}
            </span>
        )}
    </button>
));

// --- CART ICON ---
const CartIcon = memo(() => (
    <button
        className="relative p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Shopping Cart"
    >
        <ShoppingCart size={20} className="md:w-6 md:h-6" />
        {CONFIG.cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-secondary text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                {CONFIG.cartCount}
            </span>
        )}
    </button>
));


// --- USER ICON COMPONENT ---
const UserIcon = memo(() => (
    <button
        className="flex items-center gap-1 md:gap-2 p-1 md:p-0 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="User Account"
    >
        <User size={20} className="w-5 h-5 md:w-6 md:h-6" />
        <div className="hidden md:flex flex-col items-start">
            <span className="text-xs text-gray-500 font-medium">Hello,</span>
            <span className="text-sm font-semibold tracking-widest">My Account</span>
        </div>
    </button>
));


// --- HAMBURGER MENU ---
const HamburgerMenu = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1 -p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Toggle menu"
        >
            <span className={`w-6 h-[2.5px] bg-primary transition-transform ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-primary transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2.5px] bg-primary transition-transform ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
        </button>
    );
});

// --- DIVIDER COMPONENT ---
const Divider = memo(() => (
    <div className="hidden md:block h-6 w-px bg-gray-400"></div>
));

// --- MAIN COMPONENT ---
const Header = () => {
    return (
        <header className='w-full py-4'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-0 flex gap-4 items-center'>
                <Logo />
                <SearchBox />
                <ContactNumber />
                <Divider />
                <WishlistIcon />
                <Divider />
                <CartIcon />
                <Divider />
                <UserIcon />
                <HamburgerMenu />
            </div>
        </header>
    );
};

export default Header;
