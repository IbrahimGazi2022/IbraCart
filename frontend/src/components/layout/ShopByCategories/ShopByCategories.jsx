import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- ALL CONSTANTS HERE ---
const Categories = [
    {
        name: "Biscuits & Snacks",
        src: "../img/products/1.jpg"
    },
    {
        name: "Beverages",
        src: "../img/products/2.jpg"
    },
    {
        name: "Dairy Products",
        src: "../img/products/3.jpg"
    },
    {
        name: "Frozen Foods",
        src: "../img/products/4.jpg"
    },
    {
        name: "Bakery Items",
        src: "../img/products/5.jpg"
    },
    {
        name: "Breakfast Cereals",
        src: "../img/products/6.jpg"
    },
    {
        name: "Chocolates",
        src: "../img/products/7.jpg"
    },
    {
        name: "Cooking Essentials",
        src: "../img/products/8.jpg"
    },
    {
        name: "Spices & Masala",
        src: "../img/products/9.jpg"
    },
    {
        name: "Instant Foods",
        src: "../img/products/10.jpg"
    },
    {
        name: "Sauces & Ketchup",
        src: "../img/products/11.jpg"
    },
    {
        name: "Dry Fruits & Nuts",
        src: "../img/products/12.jpg"
    },
    {
        name: "Baby Food",
        src: "../img/products/13.jpg"
    },
    {
        name: "Health & Nutrition",
        src: "../img/products/14.jpg"
    },
    {
        name: "Organic Products",
        src: "../img/products/15.jpg"
    },
    {
        name: "Household Items",
        src: "../img/products/16.jpg"
    }

];


// ---  CATEGORIES BUTTON COMPONENT ---
const CategoriesButton = () => {
    return (
        Categories.map((category) => (
            <div className='flex flex-col items-center min-w-40'>
                <img src={category.src} alt="" className='w-32 h-30' />
                <p className='text-md font-medium text-gray-700 tracking-wider'>{category.name}</p>
            </div>
        ))
    );
};


// --- MAIN COMPONENT ---
const ShopByCategories = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    };

    return (
        <div className='w-full h-90'>
            <div className='max-w-7xl mx-auto px-4 pt-24 md:pt-0 md:px-6 lg:px-0'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-2xl md:text-3xl font-semibold mt-2 mb-2 tracking-wider'>
                        Shop By Categories
                    </h1>
                    <div className='flex gap-3'>
                        <ChevronLeft onClick={scrollLeft} className='w-10 h-10 bg-white shadow-sm cursor-pointer stroke-[rgb(13,164,135)] rounded-md hover:bg-primary hover:stroke-amber-50' />
                        <ChevronRight onClick={scrollRight} className='w-10 h-10 bg-white shadow-sm cursor-pointer stroke-[rgb(13,164,135)] rounded-md  hover:bg-primary hover:stroke-amber-50' />
                    </div>
                </div>
                <div ref={scrollRef} className='flex gap-8 justify-start items-center overflow-x-auto scroll-hide' >
                    <CategoriesButton />
                </div>
            </div>
        </div>
    );
};

export default ShopByCategories;
