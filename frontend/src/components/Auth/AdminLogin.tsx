import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../config/apiConfig';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

// --- ANIMATIONS ---
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const }
    }
};

const formVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' as const }
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

// --- MAIN COMPONENT ---
const AdminLogin = () => {
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
        <div className='w-full min-h-[70vh] flex items-center justify-center px-[clamp(1rem,3vw,1.5rem)] py-[clamp(2rem,5vw,3rem)] bg-gray-50'>
            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'
            >
                {/* --- HEADER --- */}
                <div className='px-[clamp(1.25rem,4vw,2rem)] py-[clamp(0.875rem,2vw,1.125rem)] border-b border-gray-100'>
                    <h2 className='text-[clamp(0.875rem,2vw,1rem)] font-bold text-primary'>Admin Login</h2>
                </div>

                {/* --- FORM --- */}
                <motion.div
                    variants={formVariants}
                    initial='hidden'
                    animate='visible'
                    className='p-[clamp(1.25rem,4vw,2rem)] flex flex-col gap-[clamp(0.75rem,2vw,1rem)]'
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
                        {isLoading ? <><Spinner />Logging in...</> : 'Admin Login'}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;