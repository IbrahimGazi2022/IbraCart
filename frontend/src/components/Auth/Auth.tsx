import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

// --- TYPES ---
type AuthTab = 'login' | 'register';

// --- ANIMATIONS ---
const tabContentVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' as const }
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: { duration: 0.2 }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const }
    }
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
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className='flex flex-col gap-1.5'>
            <label className='text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold text-gray-600 flex items-center gap-1.5'>
                <Icon className='w-4 h-4 text-primary' />
                {label}
            </label>
            <div className='relative'>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className='w-full border border-gray-200 rounded-lg px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.625rem,1.5vw,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)] focus:outline-none focus:border-primary transition-colors placeholder-gray-400 pr-10'
                />
                {/* --- PASSWORD TOGGLE --- */}
                {isPassword && (
                    <button
                        type='button'
                        onClick={() => setShowPassword(prev => !prev)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors'
                    >
                        {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                )}
            </div>
        </div>
    );
};

// --- LOGIN FORM ---
const LoginForm = () => (
    <motion.div
        key='login'
        variants={tabContentVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
    >
        <InputField label='Email' icon={Mail} placeholder='Enter your email' type='email' />
        <InputField label='Password' icon={Lock} placeholder='Enter your password' type='password' />

        {/* --- FORGOT PASSWORD --- */}
        <div className='flex justify-end'>
            <button className='text-[clamp(0.75rem,1.5vw,0.875rem)] text-primary hover:underline font-medium'>
                Forgot Password?
            </button>
        </div>

        {/* --- LOGIN BUTTON --- */}
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-2 transition-colors'
        >
            Login
        </motion.button>
    </motion.div>
);

// --- REGISTER FORM ---
const RegisterForm = () => (
    <motion.div
        key='register'
        variants={tabContentVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
    >
        <InputField label='Full Name' icon={User} placeholder='Enter your full name' />
        <InputField label='Email' icon={Mail} placeholder='Enter your email' type='email' />
        <InputField label='Phone' icon={Phone} placeholder='+880 1XXX XXX XXX' type='tel' />
        <InputField label='Password' icon={Lock} placeholder='Create a password' type='password' />

        {/* --- REGISTER BUTTON --- */}
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-2 transition-colors'
        >
            Register
        </motion.button>
    </motion.div>
);

// --- MAIN COMPONENT ---
const Auth = () => {
    const [activeTab, setActiveTab] = useState<AuthTab>('login');

    return (
        <div className='w-full min-h-[70vh] flex items-center justify-center px-[clamp(1rem,3vw,1.5rem)] py-[clamp(2rem,5vw,3rem)] bg-gray-50'>
            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'
            >
                {/* --- TABS --- */}
                <div className='flex'>
                    {(['login', 'register'] as AuthTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-[clamp(0.875rem,2vw,1.125rem)] text-[clamp(0.875rem,2vw,1rem)] font-bold capitalize tracking-wide transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {/* --- ACTIVE INDICATOR --- */}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId='activeTab'
                                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* --- DIVIDER --- */}
                <div className='h-px bg-gray-100' />

                {/* --- FORM CONTENT --- */}
                <div className='p-[clamp(1.25rem,4vw,2rem)]'>
                    <AnimatePresence mode='wait'>
                        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;