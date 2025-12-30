import React from 'react';

// --- ALL CONSTANTS HERE ---
const Image = [
    { src: '../img/payments/1.svg' },
    { src: '../img/payments/2.svg' },
    { src: '../img/payments/3.svg' },
];

const PaymentOffers = () => {
    return (
        <div className='w-full px-4'>
            <div className='max-w-7xl mx-auto'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-semibold mt-4 mb-6 tracking-wider'>
                        Bank & Wallet Offers
                    </h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10'>
                    {Image.map((item, index) => (
                        <div key={index} className='h-48 md:h-40 bg-[#f3f3f3] rounded-xl flex items-center justify-between px-4 md:px-8'>
                            <div>
                                <p className='text-xl md:text-2xl lg:text-3xl font-semibold text-secondary uppercase mb-2'>get 10% off</p>
                                <span className='block tracking-wide text-sm md:text-base'>when you spend $20</span>
                            </div>
                            <img
                                src={item.src}
                                alt="Payment Image"
                                className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentOffers;