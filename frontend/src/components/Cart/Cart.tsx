import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Tag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../store/cartSlice';
import { useState } from 'react';

// --- CONSTANTS ---
const DELIVERY_CHARGE = 50;
const TAX_RATE = 0.05;
const COUPON_CODES: Record<string, number> = {
    'SAVE10': 10,
    'SAVE20': 20,
};

// --- ANIMATIONS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
};

// --- EMPTY CART ---
const EmptyCart = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col items-center justify-center py-[clamp(3rem,10vw,6rem)] gap-[clamp(1rem,3vw,1.5rem)]'
    >
        <ShoppingCart className='w-[clamp(4rem,10vw,6rem)] h-[clamp(4rem,10vw,6rem)] text-gray-300' />
        <h2 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-gray-500'>Your cart is empty</h2>
        <p className='text-gray-400 text-[clamp(0.875rem,2vw,1rem)]'>Add some products to get started</p>
        <motion.a
            href='/'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center gap-2 bg-primary text-white px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-semibold text-[clamp(0.875rem,2vw,1rem)] mt-2'
        >
            <ArrowLeft className='w-4 h-4' />
            Continue Shopping
        </motion.a>
    </motion.div>
);

// --- MAIN COMPONENT ---
const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.cart);
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [couponError, setCouponError] = useState('');

    // --- CALCULATIONS ---
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = appliedCoupon ? COUPON_CODES[appliedCoupon] : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + DELIVERY_CHARGE + tax - discount;

    // --- COUPON HANDLER ---
    const handleApplyCoupon = () => {
        if (COUPON_CODES[couponInput.toUpperCase()]) {
            setAppliedCoupon(couponInput.toUpperCase());
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
            setAppliedCoupon(null);
        }
    };

    return (
        <div className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)] py-[clamp(1.5rem,4vw,2.5rem)]'>

            {/* --- PAGE TITLE --- */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-[clamp(1.5rem,4vw,2rem)] font-bold text-gray-800 mb-[clamp(1.5rem,4vw,2rem)]'
            >
                Shopping Cart
                <span className='text-gray-400 text-[clamp(1rem,2vw,1.25rem)] font-normal ml-2'>
                    ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
            </motion.h1>

            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className='flex flex-col lg:flex-row gap-[clamp(1.5rem,4vw,2rem)]'>

                    {/* --- CART ITEMS --- */}
                    <motion.div
                        variants={containerVariants}
                        initial='hidden'
                        animate='visible'
                        className='flex-1'
                    >
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    exit='exit'
                                    layout
                                    className='flex items-center gap-[clamp(0.75rem,2vw,1.25rem)] bg-white rounded-xl p-[clamp(0.75rem,2vw,1.25rem)] mb-[clamp(0.75rem,2vw,1rem)] shadow-sm border border-gray-100'
                                >
                                    {/* --- PRODUCT IMAGE --- */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-[clamp(4rem,12vw,6rem)] h-[clamp(4rem,12vw,6rem)] object-cover rounded-lg shrink-0'
                                    />

                                    {/* --- PRODUCT INFO --- */}
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='text-[clamp(0.875rem,2vw,1rem)] font-semibold text-gray-800 truncate'>
                                            {item.name}
                                        </h3>
                                        <p className='text-primary font-bold text-[clamp(0.875rem,2vw,1rem)] mt-1'>
                                            ৳{item.price}
                                        </p>
                                    </div>

                                    {/* --- QUANTITY SELECTOR --- */}
                                    <div className='flex items-center gap-[clamp(0.375rem,1vw,0.5rem)] shrink-0'>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                            className='w-[clamp(1.75rem,4vw,2rem)] h-[clamp(1.75rem,4vw,2rem)] rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors'
                                        >
                                            <Minus className='w-3 h-3' />
                                        </motion.button>
                                        <span className='text-[clamp(0.875rem,2vw,1rem)] font-semibold w-6 text-center'>
                                            {item.quantity}
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                            className='w-[clamp(1.75rem,4vw,2rem)] h-[clamp(1.75rem,4vw,2rem)] rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors'
                                        >
                                            <Plus className='w-3 h-3' />
                                        </motion.button>
                                    </div>

                                    {/* --- SUBTOTAL --- */}
                                    <p className='text-[clamp(0.875rem,2vw,1rem)] font-bold text-gray-800 shrink-0 w-[clamp(4rem,8vw,6rem)] text-right'>
                                        ৳{(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    {/* --- REMOVE BUTTON --- */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className='text-gray-300 hover:text-red-500 transition-colors shrink-0'
                                    >
                                        <Trash2 className='w-[clamp(16px,3vw,20px)] h-[clamp(16px,3vw,20px)]' />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* --- CART ACTIONS --- */}
                        <div className='flex items-center justify-between mt-[clamp(1rem,3vw,1.5rem)]'>
                            <motion.a
                                href='/'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='flex items-center gap-2 text-primary font-semibold text-[clamp(0.875rem,2vw,1rem)] hover:underline'
                            >
                                <ArrowLeft className='w-4 h-4' />
                                Continue Shopping
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => dispatch(clearCart())}
                                className='text-red-400 hover:text-red-600 font-semibold text-[clamp(0.875rem,2vw,1rem)] transition-colors'
                            >
                                Clear Cart
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* --- CART SUMMARY --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className='w-full lg:w-[clamp(18rem,30vw,22rem)] shrink-0'
                    >
                        <div className='bg-white rounded-xl p-[clamp(1rem,3vw,1.5rem)] shadow-sm border border-gray-100 sticky top-4'>

                            <h2 className='text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-gray-800 mb-[clamp(1rem,3vw,1.5rem)]'>
                                Order Summary
                            </h2>

                            {/* --- COUPON INPUT --- */}
                            <div className='mb-[clamp(1rem,3vw,1.5rem)]'>
                                <label className='text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold text-gray-600 flex items-center gap-1 mb-2'>
                                    <Tag className='w-4 h-4' />
                                    Promo Code
                                </label>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        placeholder='Enter code'
                                        className='flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[clamp(0.75rem,1.5vw,0.875rem)] focus:outline-none focus:border-primary transition-colors'
                                    />
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleApplyCoupon}
                                        className='bg-primary text-white px-3 py-2 rounded-lg text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold hover:bg-primary/90 transition-colors'
                                    >
                                        Apply
                                    </motion.button>
                                </div>
                                {/* --- COUPON FEEDBACK --- */}
                                {couponError && (
                                    <p className='text-red-500 text-xs mt-1'>{couponError}</p>
                                )}
                                {appliedCoupon && (
                                    <p className='text-green-500 text-xs mt-1'>✓ Coupon applied! ৳{discount} off</p>
                                )}
                            </div>

                            {/* --- PRICE BREAKDOWN --- */}
                            <div className='space-y-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)]'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal</span>
                                    <span>৳{subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Delivery</span>
                                    <span>৳{DELIVERY_CHARGE}</span>
                                </div>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Tax (5%)</span>
                                    <span>৳{tax.toFixed(2)}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className='flex justify-between text-green-500'>
                                        <span>Discount</span>
                                        <span>-৳{discount}</span>
                                    </div>
                                )}
                                <div className='border-t border-gray-100 pt-[clamp(0.5rem,1.5vw,0.75rem)] flex justify-between font-bold text-gray-800 text-[clamp(1rem,2vw,1.125rem)]'>
                                    <span>Total</span>
                                    <span>৳{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* --- CHECKOUT BUTTON --- */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-[clamp(1rem,3vw,1.5rem)] transition-colors'
                            >
                                Proceed to Checkout
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Cart;