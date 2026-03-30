import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../config/apiConfig';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../reusableComp/Modal';
    
// --- TYPES ---
type AuthTab = 'login' | 'register' | 'admin';

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

// --- SPINNER ---
const Spinner = () => (
    <svg className='animate-spin h-5 w-5 text-white shrink-0' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4z' />
    </svg>
);

// --- INPUT FIELD ---
const InputField = ({
    label,
    icon: Icon,
    placeholder,
    type = 'text',
    value,
    onChange
}: {
    label: string;
    icon: React.ElementType;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                    value={value}
                    onChange={onChange}
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
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(login(data.user));
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/user');
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            key='login'
            variants={tabContentVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
        >
            <InputField
                label='Email'
                icon={Mail}
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label='Password'
                icon={Lock}
                placeholder='Enter your password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* --- FORGOT PASSWORD --- */}
            <div className='flex justify-end'>
                <button className='text-[clamp(0.75rem,1.5vw,0.875rem)] text-primary hover:underline font-medium'>
                    Forgot Password?
                </button>
            </div>

            {/* --- LOGIN BUTTON --- */}
            <motion.button
                onClick={handleLogin}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Logging in...
                    </>
                ) : (
                    'Login'
                )}
            </motion.button>
        </motion.div>
    );
};

// --- REGISTER FORM ---
const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(login(data.user));
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            key='register'
            variants={tabContentVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
        >
            <InputField label='Full Name' icon={User} placeholder='Enter your full name' value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label='Email' icon={Mail} placeholder='Enter your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label='Phone' icon={Phone} placeholder='+880 1XXX XXX XXX' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <InputField label='Password' icon={Lock} placeholder='Create a password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <motion.button
                onClick={handleRegister}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Registering...
                    </>
                ) : (
                    'Register'
                )}
            </motion.button>

            <Modal
                isOpen={isModalOpen}
                message='Registration successful!'
                onClose={() => {
                    setIsModalOpen(false);
                    onSuccess();
                }}
            />
        </motion.div>
    );
};

// --- ADMIN LOGIN FORM ---
const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(login(data.user));
                navigate('/admin');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            key='admin'
            variants={tabContentVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
        >
            <InputField label='Email' icon={Mail} placeholder='Enter admin email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label='Password' icon={Lock} placeholder='Enter admin password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <motion.button
                onClick={handleAdminLogin}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(13, 164, 135, 0.3)' } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className='w-full bg-primary text-white py-[clamp(0.75rem,2vw,1rem)] rounded-lg font-bold text-[clamp(0.875rem,2vw,1rem)] mt-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Logging in...
                    </>
                ) : (
                    'Admin Login'
                )}
            </motion.button>
        </motion.div>
    );
};

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
                    {(['login', 'register', 'admin'] as AuthTab[]).map((tab) => (
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
                        {activeTab === 'login'
                            ? <LoginForm />
                            : activeTab === 'register'
                                ? <RegisterForm onSuccess={() => setActiveTab('login')} />
                                : <AdminLoginForm />
                        }
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;