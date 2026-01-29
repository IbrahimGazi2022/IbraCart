import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ALL CONSTANTS HERE ---
const Image = {
    img1: '../img/hero/1.jpg',
    img2: '../img/hero/2.jpg',
    img3: '../img/hero/3.jpg',
};

// --- LEFT SIDE IMAGE --- 
const LeftSideImage = () => {
    return (
        <div className='relative h-full flex items-center'>
            <img
                src={Image.img1}
                alt="Hero Image"
                className='w-full h-full object-cover absolute rounded-md'
            />

            <div className='relative z-10 px-[clamp(1.5rem,4vw,3rem)]'>
                <p className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-600 tracking-wider'>
                    Exclusive Offer
                    <span className='bg-secondary text-white px-[clamp(0.25rem,1.5vw,0.625rem)] py-[clamp(0.25rem,1vw,0.375rem)] font-bold rounded-full text-[clamp(0.75rem,1.2vw,0.875rem)]'>30% Off</span>
                </p>
                <h1 className='text-[clamp(1.125rem,5vw,3rem)] font-semibold uppercase mt-[clamp(0.75rem,2vw,1rem)] tracking-wide leading-tight'>
                    <span className='block'>Stay home</span>
                    <span className='block'>delivered your</span>
                    <span className='block text-primary font-extrabold'>Daily Needs</span>
                </h1>
                <button className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] bg-secondary text-white py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(0.5rem,3vw,1.25rem)] rounded-xl hover:bg-secondary/90 transition-colors cursor-pointer text-[clamp(0.875rem,1.5vw,1rem)]'>
                    Shop Now
                    <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <ArrowRight className='w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]' />
                    </motion.div>
                </button>
            </div>
        </div >
    );
};


// --- RIGHT SIDE IMAGE ONE --- 
const RightSideImage1 = () => {
    return (
        <div className='relative flex items-center h-full'>
            <img
                src={Image.img2}
                alt="Hero Image"
                className='w-full h-full absolute object-cover rounded-md'
            />

            <div className='relative z-10 px-[clamp(1.5rem,3vw,2rem)]'>
                <p className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-secondary font-semibold text-[clamp(1.875rem,5vw,3rem)]'>
                    45%
                    <span className='text-gray-500 text-[clamp(1.125rem,2vw,1.25rem)] mt-[clamp(0.75rem,2vw,1rem)] uppercase'>Off</span>
                </p>
                <p className='mt-[clamp(0.375rem,1vw,0.5rem)] capitalize text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-primary'>Nut Collection</p>
                <span className='block text-gray-500 mt-[clamp(0.375rem,1vw,0.5rem)] tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'>We deliver organic products</span>
                <span className='block text-gray-500 tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'>vegetables & fruits</span>

                <button className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] text-black hover:text-primary transition-colors text-[clamp(0.875rem,1.5vw,1rem)]'>
                    Shop Now
                    <ArrowRight className='w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]' />
                </button>
            </div>
        </div>
    );
};


// --- RIGHT SIDE IMAGE TWO --- 
const RightSideImage2 = () => {
    return (
        <div className='relative flex items-center h-full'>
            <img
                src={Image.img3}
                alt="Hero Image"
                className='w-full h-full absolute object-cover rounded-md'
            />

            <div className='relative z-10 px-[clamp(1.5rem,3vw,2rem)]'>
                <p className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-secondary font-semibold text-[clamp(2rem,5vw,3rem)]'>
                    25%
                    <span className='text-gray-500 text-[clamp(1.125rem,2vw,1.25rem)] mt-[clamp(0.75rem,2vw,1rem)] uppercase'>Off</span>
                </p>
                <p className='mt-[clamp(0.375rem,1vw,0.5rem)] capitalize text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-primary'>Fresh Fruits</p>
                <span className='block text-gray-500 mt-[clamp(0.375rem,1vw,0.5rem)] tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'>100% Natural & Organic</span>
                <span className='block text-gray-500 tracking-wide text-[clamp(0.875rem,1.2vw,0.875rem)]'>Fresh from farm</span>

                <button className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.75rem,2vw,1rem)] text-black hover:text-primary transition-colors text-[clamp(0.875rem,1.5vw,1rem)]'>
                    Shop Now
                    <ArrowRight className='w-[clamp(18px,3vw,20px)] h-[clamp(18px,3vw,20px)]' />
                </button>
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <div className='w-full'>
            <div className='w-full max-w-[min(calc(100%-1rem),83rem)] mx-auto py-[clamp(0.75rem,2vw,1rem)]'>
                <div className='grid grid-cols-1 px-[clamp(1rem,1vw,1.5rem)] md:grid-cols-1 lg:grid-cols-3 gap-[clamp(0.75rem,2vw,1rem)]'>

                    <div className='lg:col-span-2 h-[30vh] md:h-[50vh] lg:h-[65vh]'>
                        <LeftSideImage />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 h-[30vh] md:h-[45vh] lg:h-[65vh]'>
                        <div className='h-full'>
                            <RightSideImage1 />
                        </div>

                        <div className='h-full'>
                            <RightSideImage2 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;