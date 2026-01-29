import { motion, Variants } from 'framer-motion';

// --- TYPES ---
interface Offer {
    src: string;
    bankName: string;
    discount: string;
    condition: string;
    bgColor: string;
    borderColor: string;
}

// --- DATA: Payment/Bank Offers ---
const OFFERS: Offer[] = [
    {
        src: '/img/payments/1.svg',
        bankName: 'Visa Card',
        discount: '10% OFF',
        condition: 'Min Spend $20',
        bgColor: 'bg-blue-50/50',
        borderColor: 'border-blue-100'
    },
    {
        src: '/img/payments/2.svg',
        bankName: 'Mastercard',
        discount: '15% OFF',
        condition: 'Min Spend $50',
        bgColor: 'bg-orange-50/50',
        borderColor: 'border-orange-100'
    },
    {
        src: '/img/payments/3.svg',
        bankName: 'Digital Wallet',
        discount: 'Cashback',
        condition: 'Up to $10 on first pay',
        bgColor: 'bg-green-50/50',
        borderColor: 'border-green-100'
    },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.04)",
        transition: { duration: 0.3 }
    }
};

const PaymentOffers = () => {
    return (
        <section className='w-full py-[clamp(1rem,3vw,1.5rem)] bg-white'>
            <div className='w-full max-w-[min(calc(100%-2rem),83rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)]'>

                {/* --- SECTION HEADER --- */}
                <div className='mb-[clamp(1rem,3vw,1.5rem)]'>
                    <div className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mb-[clamp(0.375rem,1vw,0.5rem)]'>
                        <div className='h-[clamp(3px,0.5vw,4px)] w-[clamp(2rem,5vw,2.5rem)] bg-secondary rounded-full' />
                        <span className='text-secondary font-bold text-[clamp(0.75rem,1.2vw,0.875rem)] uppercase tracking-widest'>
                            Payment Partners
                        </span>
                    </div>
                    <h2 className='text-[clamp(1.875rem,4vw,2.25rem)] font-black text-gray-900 tracking-tight'>
                        Bank & Wallet Offers
                    </h2>
                </div>

                {/* --- OFFERS GRID --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,1.5rem)]'
                >
                    {OFFERS.map((item: Offer, index: number) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className={`relative overflow-hidden group h-[clamp(8rem,25vw,10rem)] flex items-center justify-between px-[clamp(1rem,3vw,2rem)] rounded-2xl border ${item.borderColor} ${item.bgColor} transition-colors hover:bg-white`}
                        >
                            {/* Background Decorative Circle */}
                            <div className='absolute -right-8 -bottom-8 w-32 h-32 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-700' />

                            {/* --- CONTENT --- */}
                            <div className='relative z-10'>
                                <p className='text-[clamp(0.75rem,1.2vw,0.75rem)] font-bold text-gray-500 uppercase tracking-widest mb-[clamp(0.25rem,0.5vw,0.25rem)]'>
                                    {item.bankName}
                                </p>
                                <h3 className='text-[clamp(1.5rem,3vw,1.875rem)] font-black text-secondary leading-none mb-[clamp(0.375rem,1vw,0.5rem)]'>
                                    {item.discount}
                                </h3>
                                <p className='text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-gray-600'>
                                    {item.condition}
                                </p>

                                <button
                                    type="button"
                                    className='mt-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(0.75rem,1.2vw,0.75rem)] font-bold text-gray-800 underline underline-offset-4 hover:text-secondary transition-colors'
                                    aria-label={`Terms and conditions for ${item.bankName} offer`}
                                >
                                    T&C Apply
                                </button>
                            </div>

                            {/* --- LOGO --- */}
                            <div className='relative z-10'>
                                <img
                                    src={item.src}
                                    alt={`${item.bankName} logo`}
                                    className='w-[clamp(4rem,10vw,5rem)] h-[clamp(4rem,10vw,5rem)] object-contain drop-shadow-sm group-hover:rotate-12 transition-transform duration-300'
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentOffers;