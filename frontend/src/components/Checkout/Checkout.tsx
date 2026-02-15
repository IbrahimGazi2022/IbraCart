import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { MapPin, Phone, User, CreditCard, Smartphone, Banknote, ShoppingBag } from 'lucide-react';

// --- CONSTANTS ---
const DELIVERY_CHARGE = 50;
const TAX_RATE = 0.05;

// --- PAYMENT METHODS ---
const PaymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
    { id: 'bkash', label: 'bKash', icon: Smartphone },
    { id: 'card', label: 'Card', icon: CreditCard },
];

// --- ANIMATIONS ---
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// --- INPUT FIELD ---
const InputField = ({
    label,
    icon: Icon,
    placeholder,
    type = 'text'
}: {
    label: string;
    icon: React.ElementType;
    placeholder: string;
    type?: string;
}) => (
    <div className='flex flex-col gap-1.5'>
        <label className='text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold text-gray-600 flex items-center gap-1.5'>
            <Icon className='w-4 h-4 text-primary' />
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className='border border-gray-200 rounded-lg px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)] focus:outline-none focus:border-primary transition-colors placeholder-gray-400'
        />
    </div>
);

// --- MAIN COMPONENT ---
const Checkout = () => {
    const { items } = useSelector((state: RootState) => state.cart);
    const [selectedPayment, setSelectedPayment] = useState('cod');

    // --- CALCULATIONS ---
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + DELIVERY_CHARGE + tax;

    return (
        <div className='w-full max-w-[min(calc(100%-2rem),84rem)] mx-auto px-[clamp(1rem,3vw,1.5rem)] py-[clamp(1.5rem,4vw,2.5rem)]'>

            {/* --- PAGE TITLE --- */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-[clamp(1.5rem,4vw,2rem)] font-bold text-gray-800 mb-[clamp(1.5rem,4vw,2rem)]'
            >
                Checkout
            </motion.h1>

            <div className='flex flex-col lg:flex-row gap-[clamp(1.5rem,4vw,2rem)]'>

                {/* --- LEFT SIDE --- */}
                <div className='flex-1 flex flex-col gap-[clamp(1rem,3vw,1.5rem)]'>

                    {/* --- SHIPPING ADDRESS --- */}
                    <motion.div
                        variants={sectionVariants}
                        initial='hidden'
                        animate='visible'
                        className='bg-white rounded-xl p-[clamp(1rem,3vw,1.5rem)] shadow-sm border border-gray-100'
                    >
                        <h2 className='text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-gray-800 mb-[clamp(1rem,3vw,1.25rem)]'>
                            Shipping Address
                        </h2>
                        <div className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'>
                            <InputField label='Full Name' icon={User} placeholder='Enter your full name' />
                            <InputField label='Phone Number' icon={Phone} placeholder='+880 1XXX XXX XXX' type='tel' />
                            <InputField label='Address' icon={MapPin} placeholder='Enter your full address' />
                        </div>
                    </motion.div>

                    {/* --- PAYMENT METHOD --- */}
                    <motion.div
                        variants={sectionVariants}
                        initial='hidden'
                        animate='visible'
                        transition={{ delay: 0.1 }}
                        className='bg-white rounded-xl p-[clamp(1rem,3vw,1.5rem)] shadow-sm border border-gray-100'
                    >
                        <h2 className='text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-gray-800 mb-[clamp(1rem,3vw,1.25rem)]'>
                            Payment Method
                        </h2>
                        <div className='flex flex-col gap-[clamp(0.5rem,1.5vw,0.75rem)]'>
                            {PaymentMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <motion.div
                                        key={method.id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`flex items-center gap-[clamp(0.75rem,2vw,1rem)] p-[clamp(0.75rem,2vw,1rem)] rounded-lg border-2 cursor-pointer transition-colors ${selectedPayment === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        {/* --- RADIO --- */}
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedPayment === method.id ? 'border-primary' : 'border-gray-300'}`}>
                                            {selectedPayment === method.id && (
                                                <div className='w-2.5 h-2.5 rounded-full bg-primary' />
                                            )}
                                        </div>
                                        <Icon className={`w-5 h-5 shrink-0 ${selectedPayment === method.id ? 'text-primary' : 'text-gray-400'}`} />
                                        <span className={`text-[clamp(0.875rem,1.5vw,1rem)] font-medium ${selectedPayment === method.id ? 'text-primary' : 'text-gray-700'}`}>
                                            {method.label}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT SIDE --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className='w-full lg:w-[clamp(18rem,30vw,22rem)] shrink-0'
                >
                    <div className='bg-white rounded-xl p-[clamp(1rem,3vw,1.5rem)] shadow-sm border border-gray-100 sticky top-4'>

                        {/* --- ORDER REVIEW --- */}
                        <h2 className='text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-gray-800 mb-[clamp(1rem,3vw,1.25rem)] flex items-center gap-2'>
                            <ShoppingBag className='w-5 h-5 text-primary' />
                            Order Review
                        </h2>

                        {/* --- ITEMS --- */}
                        <div className='flex flex-col gap-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(1rem,3vw,1.25rem)]'>
                            {items.map((item) => (
                                <div key={item.id} className='flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] object-cover rounded-lg shrink-0'
                                    />
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold text-gray-800 truncate'>
                                            {item.name}
                                        </p>
                                        <p className='text-[clamp(0.75rem,1.2vw,0.75rem)] text-gray-400'>
                                            x{item.quantity}
                                        </p>
                                    </div>
                                    <p className='text-[clamp(0.75rem,1.5vw,0.875rem)] font-bold text-gray-800 shrink-0'>
                                        ৳{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* --- DIVIDER --- */}
                        <div className='border-t border-gray-100 mb-[clamp(1rem,3vw,1.25rem)]' />

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
                            <div className='border-t border-gray-100 pt-[clamp(0.5rem,1.5vw,0.75rem)] flex justify-between font-bold text-gray-800 text-[clamp(1rem,2vw,1.125rem)]'>
                                <span>Total</span>
                                <span>৳{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* --- PLACE ORDER BUTTON (DISABLED) --- */}
                        <motion.button
                            disabled
                            className='w-full bg-primary/40 text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-[clamp(1rem,3vw,1.5rem)] cursor-not-allowed'
                        >
                            Place Order
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;