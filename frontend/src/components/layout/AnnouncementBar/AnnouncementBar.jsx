import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ALL CONSTANTS HERE --- 
const LANGUAGES = [
    { code: 'bn', name: 'বাংলা', flag: 'https://flagcdn.com/w40/bd.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' }
];

const MESSAGES = [
    "Welcome to Ibra Cart – Your Smart Shopping Destination",
    "24/7 Online Shopping Available",
    "Fast & Secure Checkout Experience",
    "Trusted Products at the Best Prices"
];

const CONFIG = {
    location: "Khulna City, Bangladesh",
    slideInterval: 3000,
    animationDuration: 0.5
};

// --- CUSTOM HOOKS FOR DROPDOWN CLOSE ---
const useClickOutside = (ref, callback) => {
    const memoizedCallback = useCallback(callback, [callback]);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                memoizedCallback(); 
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, memoizedCallback]);
};

// --- CUSTOM HOOKS FOR SLIDING TEXT ---
const useRotatingIndex = (length, interval) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % length);
        }, interval);

        return () => clearInterval(timer);
    }, [length, interval]);

    return index;
};

// --- LOCATION COMPONENTS ---
const LocationSection = memo(() => (
    <div className="shrink-0 flex items-center gap-2">
        <MapPin size={16} className="shrink-0" />
        <span className="text-sm md:text-base font-medium tracking-wide">
            {CONFIG.location}
        </span>
    </div>
));
LocationSection.displayName = 'LocationSection';

// --- SLIDING ANNOUNCEMENT ---
const AnnouncementSlider = memo(() => {
    const currentIndex = useRotatingIndex(MESSAGES.length, CONFIG.slideInterval);

    return (
        <div className="hidden md:flex flex-1 justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: CONFIG.animationDuration }}
                    className="text-sm md:text-base font-medium tracking-wide capitalize"
                >
                    {MESSAGES[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});
AnnouncementSlider.displayName = 'AnnouncementSlider';

// --- LANGUAGE DROPDOWN ---
const LanguageDropdown = memo(() => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(LANGUAGES[1]);

    // ✅ FIX: Ekhon setIsOpen available, tai closeDropdown thik hobe
    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleSelect = useCallback((language) => {
        setSelected(language);
        setIsOpen(false);
    }, []);

    useClickOutside(dropdownRef, closeDropdown);

    return (
        <div className="shrink-0 relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 hover:opacity-90 transition-opacity"
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <img
                    src={selected.flag}
                    alt={selected.name}
                    className="w-7 h-4.5 object-cover"
                />
                <span className="text-sm md:text-base tracking-wider">{selected.name}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-2 mt-2 w-32 bg-white text-black border border-gray-100 rounded-md shadow-lg overflow-hidden z-50">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang)}
                            className={`w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-100 transition-colors ${selected.code === lang.code ? 'bg-gray-100' : ''}`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.name}
                                className="w-7 h-4.5 object-cover"
                            />
                            <span className="text-sm">{lang.name}</span>
                            {selected.code === lang.code && (
                                <span className="ml-auto text-secondary">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});
LanguageDropdown.displayName = 'LanguageDropdown';

// --- MAIN COMPONENT --- 
const AnnouncementBar = () => {
    return (
        <section className="w-full bg-primary">
            <div className="max-w-7xl mx-auto py-0.5 pl-2 md:pl-0 text-white flex justify-between items-center">
                <LocationSection />
                <AnnouncementSlider />
                <LanguageDropdown />
            </div>
        </section>
    );
};

export default AnnouncementBar;