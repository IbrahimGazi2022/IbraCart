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

            <div className='relative z-10 px-6 md:px-12'>
                <p className='flex items-center gap-2 text-sm md:text-lg text-gray-600 tracking-wider'>
                    Exclusive Offer
                    <span className='bg-secondary text-white px-1 md:px-2.5 py-1 md:py-1.5 font-bold rounded-full'>30% Off</span>
                </p>
                <h1 className='text-lg md:text-5xl font-semibold uppercase mt-4 tracking-wide leading-tight'>
                    <span className='block'>Stay home</span>
                    <span className='block'>delivered your</span>
                    <span className='block text-primary font-extrabold'>Daily Needs</span>
                </h1>
                <button className='flex items-center gap-2 mt-4 bg-secondary text-white py-2 md:py-3 px-2 md:px-5 rounded-xl hover:bg-secondary/90 transition-colors cursor-pointer'>
                    Shop Now
                    <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <ArrowRight />
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

            <div className='relative z-10 px-8'>
                <p className='flex items-center gap-2 text-secondary font-semibold text-3xl md:text-5xl'>
                    45%
                    <span className='text-gray-500 text-lg md:text-xl mt-4 uppercase'>Off</span>
                </p>
                <p className='mt-2 capitalize text-2xl md:text-3xl font-semibold text-primary'>Nut Collection</p>
                <span className='block text-gray-500 mt-2 tracking-wide text-sm'>We deliver organic products</span>
                <span className='block text-gray-500 tracking-wide text-sm'>vegetables & fruits</span>

                <button className='flex items-center gap-2 mt-4 text-black hover:text-primary transition-colors'>
                    Shop Now
                    <ArrowRight size={20} />
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

            <div className='relative z-10 px-8'>
                <p className='flex items-center gap-2 text-secondary font-semibold text-4xl md:text-5xl'>
                    25%
                    <span className='text-gray-500 text-lg md:text-xl mt-4 uppercase'>Off</span>
                </p>
                <p className='mt-2 capitalize text-2xl md:text-3xl font-semibold text-primary'>Fresh Fruits</p>
                <span className='block text-gray-500 mt-2 tracking-wide text-sm'>100% Natural & Organic</span>
                <span className='block text-gray-500 tracking-wide text-sm'>Fresh from farm</span>

                <button className='flex items-center gap-2 mt-4 text-black hover:text-primary transition-colors'>
                    Shop Now
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <div className='w-full'>
            <div className='max-w-7xl mx-auto py-4'>
                <div className='grid grid-cols-1 px-4 md:grid-cols-1 lg:grid-cols-3 gap-4 md:px-6 lg:px-0'>

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