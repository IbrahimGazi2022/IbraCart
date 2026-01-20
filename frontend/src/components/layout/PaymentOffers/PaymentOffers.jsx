import React from 'react';
import { motion } from 'framer-motion';

// --- DATA: Payment/Bank Offers ---
const OFFERS = [
    {
        src: '../img/payments/1.svg',
        bankName: 'Visa Card',
        discount: '10% OFF',
        condition: 'Min Spend $20',
        bgColor: 'bg-blue-50/50',
        borderColor: 'border-blue-100'
    },
    {
        src: '../img/payments/2.svg',
        bankName: 'Mastercard',
        discount: '15% OFF',
        condition: 'Min Spend $50',
        bgColor: 'bg-orange-50/50',
        borderColor: 'border-orange-100'
    },
    {
        src: '../img/payments/3.svg',
        bankName: 'Digital Wallet',
        discount: ' Cashback',
        condition: 'Up to $10 on first pay',
        bgColor: 'bg-green-50/50',
        borderColor: 'border-green-100'
    },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, 
        }
    }
};

const cardVariants = {
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
        <section className='w-full py-6 bg-white'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-0'>

                {/* --- SECTION HEADER --- */}
                <div className='mb-6'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='h-1 w-10 bg-secondary rounded-full' />
                        <span className='text-secondary font-bold text-sm uppercase tracking-widest'>
                            Payment Partners
                        </span>
                    </div>
                    <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
                        Bank & Wallet Offers
                    </h2>
                </div>

                {/* --- OFFERS GRID --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    {OFFERS.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className={`relative overflow-hidden group h-40 flex items-center justify-between px-6 md:px-8 rounded-2xl border ${item.borderColor} ${item.bgColor} transition-colors hover:bg-white`}
                        >
                            {/* Background Decorative Circle */}
                            <div className='absolute -right-8 -bottom-8 w-32 h-32 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-700' />

                            {/* --- CONTENT --- */}
                            <div className='relative z-10'>
                                <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1'>
                                    {item.bankName}
                                </p>
                                <h3 className='text-2xl md:text-3xl font-black text-secondary leading-none mb-2'>
                                    {item.discount}
                                </h3>
                                <p className='text-sm md:text-base font-medium text-gray-600'>
                                    {item.condition}
                                </p>

                                <button className='mt-3 text-xs font-bold text-gray-800 underline underline-offset-4 hover:text-secondary transition-colors'>
                                    T&C Apply
                                </button>
                            </div>

                            {/* --- LOGO --- */}
                            <div className='relative z-10'>
                                <img
                                    src={item.src}
                                    alt={item.bankName}
                                    className='w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm group-hover:rotate-12 transition-transform duration-300'
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