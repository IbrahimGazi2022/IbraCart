import { memo, useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight, MapPin, Phone, Mail, Printer } from 'lucide-react';
import { motion, useInView, Variants } from "framer-motion"

// --- ALL CONSTANTS & DATA HERE ---
const CONFIG = {
    brandName: "IBRA",
    brandSuffix: "CART.",
    description: "Full Stack Developer passionate about creating beautiful and functional web applications.",
    contact: {
        address: "Khulna Sadar, Khulna, Bangladesh",
        phone: "+880 1732 570 530",
        email: "coder.ibrahimgazi@gmail.com",
        website: "https://ibrahim-the-coder.vercel.app/",
        fax: "+880 1732 570 530"
    },
    copyright: `© ${new Date().getFullYear()} Ibrahim Gazi. All rights reserved.`,
    payments: [
        { src: '/img/payments/visa.png', alt: 'Visa' },
        { src: '/img/payments/american.png', alt: 'American Express' },
        { src: '/img/payments/discover.png', alt: 'Discover' },
        { src: '/img/payments/giro-pay.png', alt: 'Giro Pay' },
        { src: '/img/payments/master-card.png', alt: 'Mastercard' }
    ]
};

const SECTIONS = [
    {
        title: "About Fastkart",
        links: ['About Us', 'Contact Us', 'Terms & Conditions', 'Careers', 'Latest Blog']
    },
    {
        title: "Useful Link",
        links: ['Your Order', 'Your Account', 'Track Orders', 'Your Wishlist', 'FAQs']
    },
    {
        title: "Categories",
        links: ['Fresh Vegetables', 'Hot Spice', 'Brand New Bags', 'New Bakery', 'New Grocery']
    }
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        y: 30,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const bottomBarVariants: Variants = {
    hidden: {
        scaleX: 0,
        opacity: 0
    },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    }
};

const socialIconVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.15,
        rotate: 5,
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

const appButtonVariants: Variants = {
    initial: { y: 0 },
    hover: {
        y: -4,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const linkItemVariants: Variants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1
    }
};

const iconFloatVariants: Variants = {
    float: {
        y: [0, -3, 0],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5
        }
    }
};

const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

// --- BRAND & SOCIAL SECTION ---
const BrandInfo = memo(() => {
    return (
        <motion.div
            variants={itemVariants}
            className="lg:col-span-3"
        >
            <div className="flex items-center gap-1 mb-[clamp(1rem,2vw,1.5rem)]">
                <span className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-primary">{CONFIG.brandName}</span>
                <span className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-[#222]">{CONFIG.brandSuffix}</span>
            </div>
            <p className="text-[clamp(0.813rem,1.5vw,0.875rem)] leading-relaxed mb-[clamp(1.25rem,2.5vw,1.75rem)] text-gray-600">
                {CONFIG.description}
            </p>

            <div className="flex gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(1.5rem,3vw,2rem)]">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                    <motion.a
                        key={index}
                        href="#"
                        variants={socialIconVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm border border-gray-100 hover:shadow-md"
                    >
                        <Icon size={18} strokeWidth={1.5} />
                    </motion.a>
                ))}
            </div>

            <div className="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)]">
                <motion.img
                    variants={appButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    src="/img/app/appstore.svg"
                    alt="App Store"
                    className="h-[clamp(2rem,4vw,2.5rem)] w-auto cursor-pointer shadow-sm hover:shadow-md transition-shadow rounded-md"
                />
                <motion.img
                    variants={appButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    src="/img/app/playstore.svg"
                    alt="Play Store"
                    className="h-[clamp(2rem,4vw,2.5rem)] w-auto cursor-pointer shadow-sm hover:shadow-md transition-shadow rounded-md"
                />
            </div>
        </motion.div>
    );
});
BrandInfo.displayName = 'BrandInfo';

// --- LINK GROUP COMPONENT ---
const LinkSection = memo(({ title, links }: { title: string; links: string[] }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
        >
            <h4 className="text-[clamp(1rem,2vw,1.125rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)] text-[#222]">{title}</h4>
            <motion.ul
                variants={listVariants}
                className="space-y-[clamp(0.75rem,1.5vw,1rem)]"
            >
                {links.map((link) => (
                    <motion.li
                        key={link}
                        variants={linkItemVariants}
                        className="group flex items-center gap-2 hover:text-primary cursor-pointer transition-colors text-[clamp(0.813rem,1.5vw,1rem)] relative"
                    >
                        <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <ChevronRight size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
                        </motion.div>
                        <span className="relative">
                            {link}
                            <motion.span
                                className="absolute left-0 bottom-0 h-1px bg-primary"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </span>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
});
LinkSection.displayName = 'LinkSection';

// --- STORE INFO COMPONENT ---
const StoreInfo = memo(() => {
    return (
        <motion.div
            variants={itemVariants}
            className="lg:col-span-3"
        >
            <h4 className="text-[clamp(1rem,2vw,1.125rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)] text-[#222]">Store information</h4>
            <ul className="space-y-[clamp(1rem,2vw,1.25rem)] text-[clamp(0.813rem,1.5vw,1rem)]">
                <motion.li className="flex gap-[clamp(0.75rem,1.5vw,1rem)] group cursor-pointer">
                    <motion.div 
                        variants={iconFloatVariants} 
                        animate="float"
                        style={{ willChange: 'transform' }}
                    >
                        <MapPin className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    </motion.div>
                    <span className="text-gray-600 group-hover:text-[#222] transition-colors">{CONFIG.contact.address}</span>
                </motion.li>
                <motion.li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group cursor-pointer">
                    <motion.div 
                        variants={iconFloatVariants} 
                        animate="float"
                        style={{ willChange: 'transform' }}
                    >
                        <Phone className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    </motion.div>
                    <span className="text-gray-600 group-hover:text-[#222] transition-colors">{CONFIG.contact.phone}</span>
                </motion.li>
                <motion.li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group cursor-pointer">
                    <motion.div 
                        variants={iconFloatVariants} 
                        animate="float"
                        style={{ willChange: 'transform' }}
                    >
                        <Mail className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    </motion.div>
                    <span className="text-gray-600 group-hover:text-[#222] transition-colors">{CONFIG.contact.email}</span>
                </motion.li>
                <motion.li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group cursor-pointer">
                    <motion.div 
                        variants={iconFloatVariants} 
                        animate="float"
                        style={{ willChange: 'transform' }}
                    >
                        <Printer className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    </motion.div>
                    <span className="text-gray-600 group-hover:text-[#222] transition-colors">{CONFIG.contact.fax}</span>
                </motion.li>
            </ul>
        </motion.div>
    );
});
StoreInfo.displayName = 'StoreInfo';

// --- MAIN COMPONENT ---
const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const bottomRef = useRef(null);
    const isBottomInView = useInView(bottomRef, { once: true, amount: 0.5 });

    return (
        <footer className="w-full bg-[#f8f8f8] pt-[clamp(1rem,4vw,4rem)] pb-[clamp(1.5rem,3vw,2rem)]">
            <div className="w-full max-w-[min(calc(100%-2rem),83rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[clamp(1.5rem,4vw,2.5rem)] pb-[clamp(1rem,3vw,2rem)]"
                >
                    <BrandInfo />

                    {SECTIONS.map((section) => (
                        <LinkSection key={section.title} title={section.title} links={section.links} />
                    ))}

                    <StoreInfo />
                </motion.div>

                {/* BOTTOM BAR SECTION */}
                <motion.div
                    ref={bottomRef}
                    variants={bottomBarVariants}
                    initial="hidden"
                    animate={isBottomInView ? "visible" : "hidden"}
                    className="mt-[clamp(2rem,4vw,3rem)] pt-[clamp(1.5rem,3vw,2rem)] border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-[clamp(1rem,2vw,1.5rem)]"
                    style={{ transformOrigin: 'left' }}
                >
                    <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500 font-medium">
                        {CONFIG.copyright}
                    </p>

                    <div className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)]">
                        <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500">Designed & Developed by</span>
                        <motion.a
                            href={CONFIG.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[clamp(0.875rem,1.3vw,1rem)] font-bold text-primary hover:text-[#0f766e] transition-colors flex items-center gap-1 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ibrahim Gazi
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <ChevronRight size={16} />
                            </motion.div>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;