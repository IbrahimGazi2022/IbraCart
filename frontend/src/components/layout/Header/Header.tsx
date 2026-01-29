import { memo, useCallback, useState } from 'react';
import { Search, PhoneCall, Heart, ShoppingCart, User } from 'lucide-react';
import HamburgerMenu from '../Navbar/HamburgerMenu';

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
        <a href="/"
            className="shrink-0 flex items-center hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
        >
            <img
                src={CONFIG.logo}
                alt="Company Logo"
                className='h-[clamp(2rem,6vw,3rem)] w-auto object-contain'
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
        <div className='hidden md:block md:flex-1 max-w-[min(95%,36rem)]'>
            <div className='relative'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="I'm Searching for......"
                    className="w-full px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] pr-[clamp(2rem,8vw,2.5rem)] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-[clamp(0.875rem,1.5vw,1rem)]"
                />
                <button onClick={handleSearch} className='absolute right-[clamp(0.5rem,2vw,0.75rem)] top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary'>
                    <Search className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                </button>
            </div>
        </div>
    );
});

// --- CONTACT DETAILS ---
const ContactNumber = memo(() => (
    <a href={`tel:${CONFIG.contactNumber}`}
        className="hidden lg:flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] hover:text-primary transition-colors shrink-0"
    >
        <PhoneCall className='w-[clamp(22px,4vw,26px)] h-[clamp(22px,4vw,26px)]' />
        <div className='flex flex-col'>
            <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500 font-medium whitespace-nowrap">{CONFIG.delivaryTime}</span>
            <span className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium whitespace-nowrap">{CONFIG.contactNumber}</span>
        </div>
    </a>
));


// --- WISHLIST ICON COMPONENT ---
const WishlistIcon = memo(() => (
    <button
        className="relative p-[clamp(0.25rem,1vw,0.5rem)] hover:bg-gray-100 rounded-full transition-colors shrink-0"
        aria-label="Wishlist"
    >
        <Heart className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        {CONFIG.wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-secondary text-white text-[clamp(0.625rem,1.2vw,0.75rem)] rounded-full w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] flex items-center justify-center font-semibold">
                {CONFIG.wishlistCount}
            </span>
        )}
    </button>
));

// --- CART ICON ---
const CartIcon = memo(() => (
    <button
        className="relative p-[clamp(0.25rem,1vw,0.5rem)] hover:bg-gray-100 rounded-full transition-colors shrink-0"
        aria-label="Shopping Cart"
    >
        <ShoppingCart className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        {CONFIG.cartCount > 0 && (
            <span className="absolute -top-[clamp(0.125rem,0.5vw,0.25rem)] -right-[clamp(0.125rem,0.5vw,0.25rem)] bg-secondary text-white text-[clamp(0.625rem,1.2vw,0.75rem)] rounded-full w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] flex items-center justify-center font-semibold">
                {CONFIG.cartCount}
            </span>
        )}
    </button>
));


// --- USER ICON COMPONENT ---
const UserIcon = memo(() => (
    <button
        className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] p-[clamp(0.25rem,1vw,0rem)] hover:bg-gray-100 rounded-full transition-colors shrink-0"
        aria-label="User Account"
    >
        <User className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
        <div className="hidden md:flex flex-col items-start">
            <span className="text-[clamp(0.75rem,1.2vw,0.75rem)] text-gray-500 font-medium whitespace-nowrap">Hello,</span>
            <span className="text-[clamp(0.875rem,1.5vw,0.875rem)] font-semibold tracking-widest whitespace-nowrap">My Account</span>
        </div>
    </button>
));


// --- DIVIDER COMPONENT ---
const Divider = memo(() => (
    <div className="hidden md:block h-[clamp(1rem,4vw,1.5rem)] w-px bg-gray-400 shrink-0"></div>
));

// --- MAIN COMPONENT ---
const Header = () => {
    return (
        <header className='w-full py-[clamp(0.75rem,2vw,1rem)]'>
            <div className='w-full max-w-[min(calc(100%-2rem),80rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)] flex gap-[clamp(0.5rem,2vw,1rem)] items-center justify-between'>
                <div className='flex md:hidden items-center justify-between w-full gap-[clamp(0.5rem,2vw,1rem)]'>
                    <HamburgerMenu />
                    <Logo />

                    <div className='flex items-center gap-[clamp(0.5rem,2vw,1rem)]'>
                        <WishlistIcon />
                        <CartIcon />
                        <UserIcon />
                    </div>
                </div>

                {/* --- DESKTOP LAYOUT --- */}
                <div className='hidden md:flex items-center gap-[clamp(0.5rem,2vw,1rem)] w-full'>
                    <Logo />
                    <SearchBox />
                    <ContactNumber />
                    <Divider />
                    <WishlistIcon />
                    <Divider />
                    <CartIcon />
                    <Divider />
                    <UserIcon />
                </div>
            </div>
        </header>
    );
};

export default Header;