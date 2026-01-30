import { memo } from 'react';
import {
    Facebook, Twitter, Instagram, Linkedin,
    ChevronRight, MapPin, Phone, Mail, Printer
} from 'lucide-react';

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
        fax: "123456"
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

// --- BRAND & SOCIAL SECTION ---
const BrandInfo = memo(() => (
    <div className="lg:col-span-3">
        <div className="flex items-center gap-1 mb-[clamp(1rem,2vw,1.5rem)]">
            <span className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-primary">{CONFIG.brandName}</span>
            <span className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-[#222]">{CONFIG.brandSuffix}</span>
        </div>
        <p className="text-[clamp(0.813rem,1.5vw,0.875rem)] leading-relaxed mb-[clamp(1.25rem,2.5vw,1.75rem)] text-gray-600">
            {CONFIG.description}
        </p>

        <div className="flex gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(1.5rem,3vw,2rem)]">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm border border-gray-100">
                    <Icon size={18} strokeWidth={1.5} />
                </a>
            ))}
        </div>

        <div className="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)]">
            <img src="/img/app/appstore.svg" alt="App Store" className="h-[clamp(2rem,4vw,2.5rem)] w-auto cursor-pointer active:scale-95 transition-transform" />
            <img src="/img/app/playstore.svg" alt="Play Store" className="h-[clamp(2rem,4vw,2.5rem)] w-auto cursor-pointer active:scale-95 transition-transform" />
        </div>
    </div>
));

// --- LINK GROUP COMPONENT ---
const LinkSection = memo(({ title, links }: { title: string; links: string[] }) => (
    <div className="lg:col-span-2">
        <h4 className="text-[clamp(1rem,2vw,1.125rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)] text-[#222]">{title}</h4>
        <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
            {links.map((link) => (
                <li key={link} className="group flex items-center gap-2 hover:text-primary cursor-pointer transition-colors text-[clamp(0.813rem,1.5vw,1rem)]">
                    <ChevronRight size={20} className="text-gray-500 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    {link}
                </li>
            ))}
        </ul>
    </div>
));

// --- STORE INFO COMPONENT ---
const StoreInfo = memo(() => (
    <div className="lg:col-span-3">
        <h4 className="text-[clamp(1rem,2vw,1.125rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)] text-[#222]">Store information</h4>
        <ul className="space-y-[clamp(1rem,2vw,1.25rem)] text-[clamp(0.813rem,1.5vw,1rem)]">
            <li className="flex gap-[clamp(0.75rem,1.5vw,1rem)] group">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-gray-00 group-hover:text-[#222] transition-colors">{CONFIG.contact.address}</span>
            </li>
            <li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-gray-700 group-hover:text-[#222] transition-colors">{CONFIG.contact.phone}</span>
            </li>
            <li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-gray-700 group-hover:text-[#222] transition-colors">{CONFIG.contact.email}</span>
            </li>
            <li className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] group">
                <Printer className="text-primary shrink-0" size={20} />
                <span className="text-gray-700 group-hover:text-[#222] transition-colors">{CONFIG.contact.fax}</span>
            </li>
        </ul>
    </div>
));

// --- MAIN COMPONENT ---
const Footer = () => {
    return (
        <footer className="w-full bg-[#f8f8f8] pt-[clamp(1rem,4vw,4rem)] pb-[clamp(1.5rem,3vw,2rem)]">
            <div className="w-full max-w-[min(calc(100%-2rem),83rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[clamp(1.5rem,4vw,2.5rem)] pb-[clamp(1rem,3vw,2rem)]">
                    <BrandInfo />

                    {SECTIONS.map((section) => (
                        <LinkSection key={section.title} title={section.title} links={section.links} />
                    ))}

                    <StoreInfo />
                </div>

                {/* BOTTOM BAR SECTION */}
                <div className="mt-[clamp(2rem,4vw,3rem)] pt-[clamp(1.5rem,3vw,2rem)] border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-[clamp(1rem,2vw,1.5rem)]">
                    <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500 font-medium">
                        {CONFIG.copyright}
                    </p>

                    <div className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)]">
                        <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-500">Designed & Developed by</span>
                        <a
                            href={CONFIG.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[clamp(0.875rem,1.3vw,1rem)] font-bold text-primary hover:text-[#0f766e] transition-colors flex items-center gap-1 group"
                        >
                            Ibrahim Gazi
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;