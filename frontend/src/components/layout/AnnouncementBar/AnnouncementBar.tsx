import { useState, useRef, useEffect, useCallback, memo, RefObject } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ALL CONSTANTS HERE --- 
interface Language {
    code: string;
    name: string;
    flag: string;
}

const LANGUAGES: Language[] = [
    { code: 'bn', name: 'Bangla', flag: 'https://flagcdn.com/w40/bd.png' },
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
const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>, callback: () => void) => {
    const memoizedCallback = useCallback(callback, [callback]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                memoizedCallback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, memoizedCallback]);
};


// --- CUSTOM HOOKS FOR SLIDING TEXT ---
const useRotatingIndex = (length: number, interval: number): number => {
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
    <div className="shrink-0 flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
        <MapPin size={16} className="shrink-0 w-[clamp(14px,3vw,16px)] h-[clamp(14px,3vw,16px)]" />
        <span className="text-[clamp(0.75rem,1.5vw,1rem)] font-medium tracking-wide whitespace-nowrap">
            {CONFIG.location}
        </span>
    </div>
));
LocationSection.displayName = 'LocationSection';


// --- SLIDING ANNOUNCEMENT ---
const AnnouncementSlider = memo(() => {
    const currentIndex = useRotatingIndex(MESSAGES.length, CONFIG.slideInterval);

    return (
        <div className="hidden md:flex flex-1 justify-center px-[clamp(1rem,3vw,2rem)]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: CONFIG.animationDuration }}
                    className="text-[clamp(0.75rem,1.5vw,1rem)] font-medium tracking-wide capitalize text-center"
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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Language>(LANGUAGES[1]);
    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleSelect = useCallback((language: Language) => {
        setSelected(language);
        setIsOpen(false);
    }, []);

    useClickOutside(dropdownRef, closeDropdown);

    return (
        <div className="shrink-0 relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.5rem)] hover:opacity-90 transition-opacity"
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <img
                    src={selected.flag}
                    alt={selected.name}
                    className="w-[clamp(20px,5vw,28px)] h-auto object-cover"
                />
                <span className="text-[clamp(0.75rem,1.5vw,1rem)] tracking-wider whitespace-nowrap">{selected.name}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 w-[clamp(14px,3vw,16px)] h-[clamp(14px,3vw,16px)] ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.25rem,1vw,0.5rem)] min-w-[clamp(7rem,20vw,8rem)] bg-white text-black border border-gray-100 rounded-md shadow-lg overflow-hidden z-50">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang)}
                            className={`w-full flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] px-[clamp(0.5rem,2vw,0.75rem)] py-[clamp(0.375rem,1.5vw,0.5rem)] hover:bg-gray-100 transition-colors ${selected.code === lang.code ? 'bg-gray-100' : ''}`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.name}
                                className="w-[clamp(20px,5vw,28px)] h-auto object-cover"
                            />
                            <span className="text-[clamp(0.75rem,1.5vw,0.875rem)]">{lang.name}</span>
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
            <div className="w-full max-w-[min(100%-1rem,90rem)] mx-auto py-[clamp(0.125rem,0.4vw,0.125rem)] px-[clamp(0.5rem,2vw,1rem)] text-white flex justify-between items-center">
                <LocationSection />
                <AnnouncementSlider />
                <LanguageDropdown />
            </div>
        </section>
    );
};

export default AnnouncementBar;