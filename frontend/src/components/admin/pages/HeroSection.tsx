import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, EyeOff, Image, Type, Tag } from 'lucide-react';
import { API_URL } from '../../../config/apiConfig';

// --- TYPES ---
interface MainBanner {
    badgeText: string;
    badgeDiscount: string;
    headingLine1: string;
    headingLine2: string;
    headingLine3: string;
    buttonText: string;
    image: string;
    isActive: boolean;
}

interface SmallBanner {
    id: number;
    discount: string;
    title: string;
    description1: string;
    description2: string;
    buttonText: string;
    image: string;
    isActive: boolean;
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- INPUT FIELD COMPONENT ---
const InputField = ({ label, value, onChange, placeholder }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
    </div>
);

// --- IMAGE UPLOAD COMPONENT ---
const ImageUpload = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: formData }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Upload failed');
        return data.secure_url;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be under 10MB');
            return;
        }

        setError('');
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            onChange(url);
        } catch (err) {
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <div className="space-y-2">
                {/* --- UPLOAD AREA --- */}
                <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg transition cursor-pointer group
                    ${uploading ? 'border-primary/40 bg-primary/5 cursor-not-allowed' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-primary/40'}`}>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition
                            ${uploading ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                            {uploading
                                ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                : <Upload className="w-4 h-4 text-primary" />
                            }
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-600">
                                {uploading ? 'Uploading to Cloudinary...' : 'Click to upload image'}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={handleFileChange}
                    />
                </label>

                {/* --- ERROR --- */}
                {error && (
                    <p className="text-xs text-red-500 font-medium">{error}</p>
                )}

                {/* --- UPLOADED IMAGE PREVIEW --- */}
                {value && !uploading && (
                    <div className="flex items-center gap-3 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
                        <img src={value} alt="uploaded" className="w-10 h-10 object-cover rounded-md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700">Uploaded to Cloudinary</p>
                            <p className="text-xs text-gray-400 truncate">{value}</p>
                        </div>
                        <button
                            onClick={() => onChange('')}
                            className="text-gray-400 hover:text-red-500 transition text-xs font-medium"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- SECTION HEADER ---
const SectionHeader = ({ icon: Icon, title, subtitle }: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
}) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
);

// --- TOGGLE ---
const Toggle = ({ value, onChange, label }: {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <button
            onClick={() => onChange(!value)}
            className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-gray-200'}`}
        >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

// --- MAIN COMPONENT ---
const HeroSection = () => {
    const [activeTab, setActiveTab] = useState<'main' | 'small'>('main');
    const [saved, setSaved] = useState(false);

    const [mainBanner, setMainBanner] = useState<MainBanner>({
        badgeText: 'Exclusive Offer',
        badgeDiscount: '30% Off',
        headingLine1: 'Stay home',
        headingLine2: 'delivered your',
        headingLine3: 'Daily Needs',
        buttonText: 'Shop Now',
        image: '../img/hero/1.jpg',
        isActive: true,
    });

    const [smallBanners, setSmallBanners] = useState<SmallBanner[]>([
        {
            id: 1,
            discount: '45%',
            title: 'Nut Collection',
            description1: 'We deliver organic products',
            description2: 'vegetables & fruits',
            buttonText: 'Shop Now',
            image: '../img/hero/2.jpg',
            isActive: true,
        },
        {
            id: 2,
            discount: '25%',
            title: 'Fresh Fruits',
            description1: '100% Natural & Organic',
            description2: 'Fresh from farm',
            buttonText: 'Shop Now',
            image: '../img/hero/3.jpg',
            isActive: true,
        },
    ]);

    const updateMain = (field: keyof MainBanner, value: string | boolean) => {
        setMainBanner(prev => ({ ...prev, [field]: value }));
    };

    const updateSmall = (id: number, field: keyof SmallBanner, value: string | boolean) => {
        setSmallBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    // --- FETCH HERO BANNERS ON LOAD ---
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${API_URL}/api/hero`);
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    const main = data.data.find((b: any) => b.type === 'main');
                    const smalls = data.data.filter((b: any) => b.type === 'small');

                    if (main) {
                        setMainBanner({
                            badgeText: main.badgeText || '',
                            badgeDiscount: main.badgeDiscount || '',
                            headingLine1: main.headingLine1 || '',
                            headingLine2: main.headingLine2 || '',
                            headingLine3: main.headingLine3 || '',
                            buttonText: main.buttonText || '',
                            image: main.imageUrl || '',
                            isActive: main.isActive,
                        });
                    }

                    if (smalls.length > 0) {
                        setSmallBanners(smalls.map((b: any) => ({
                            id: b.id,
                            discount: b.discount || '',
                            title: b.title || '',
                            description1: b.description1 || '',
                            description2: b.description2 || '',
                            buttonText: b.buttonText || '',
                            image: b.imageUrl || '',
                            isActive: b.isActive,
                        })));
                    }
                }
            } catch (error) {
                console.error('Fetch failed:', error);
            }
        };

        fetchBanners();
    }, []);


    // --- SAVE HERO BANNERS TO DATABASE ---
    const handleSave = async () => {
        try {
            const response = await fetch(`${API_URL}/api/hero`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mainBanner,
                    smallBanners,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            }
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    return (
        <div className="space-y-6">

            {/* --- PAGE HEADER --- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Hero Section</h1>
                    <p className="text-gray-500 mt-1">Manage your homepage hero banners</p>
                </div>
                <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all ${saved
                        ? 'bg-green-500 text-white shadow-green-200'
                        : 'bg-primary text-white shadow-primary/30'
                        }`}
                >
                    <Save className="w-4 h-4" />
                    {saved ? 'Saved!' : 'Save Changes'}
                </motion.button>
            </div>

            {/* --- INFO BANNER --- */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-linear-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3"
            >
                <Eye className="w-5 h-5 text-primary" />
                <p className="text-sm text-gray-700">Changes will reflect live on the homepage hero section</p>
            </motion.div>

            {/* --- TABS --- */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
                {[
                    { key: 'main', label: 'Left Side Banner', icon: Image },
                    { key: 'small', label: 'Right Side Banners', icon: Tag },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as 'main' | 'small')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* --- MAIN BANNER TAB --- */}
            {activeTab === 'main' && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* FORM */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 space-y-5"
                    >
                        <SectionHeader icon={Type} title="Main Banner Content" subtitle="Large hero banner on the left side" />

                        <Toggle
                            label="Banner Active"
                            value={mainBanner.isActive}
                            onChange={(v) => updateMain('isActive', v)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Badge Text"
                                value={mainBanner.badgeText}
                                onChange={(v) => updateMain('badgeText', v)}
                                placeholder="Exclusive Offer"
                            />
                            <InputField
                                label="Badge Discount"
                                value={mainBanner.badgeDiscount}
                                onChange={(v) => updateMain('badgeDiscount', v)}
                                placeholder="30% Off"
                            />
                        </div>

                        <div className="space-y-3">
                            <InputField
                                label="Heading Line 1"
                                value={mainBanner.headingLine1}
                                onChange={(v) => updateMain('headingLine1', v)}
                                placeholder="Stay home"
                            />
                            <InputField
                                label="Heading Line 2"
                                value={mainBanner.headingLine2}
                                onChange={(v) => updateMain('headingLine2', v)}
                                placeholder="delivered your"
                            />
                            <InputField
                                label="Heading Line 3 (Highlighted)"
                                value={mainBanner.headingLine3}
                                onChange={(v) => updateMain('headingLine3', v)}
                                placeholder="Daily Needs"
                            />
                        </div>

                        <InputField
                            label="Button Text"
                            value={mainBanner.buttonText}
                            onChange={(v) => updateMain('buttonText', v)}
                            placeholder="Shop Now"
                        />

                        <ImageUpload
                            label="Banner Image"
                            value={mainBanner.image}
                            onChange={(v) => updateMain('image', v)}
                        />
                    </motion.div>

                    {/* PREVIEW */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-primary" />
                                Live Preview
                            </h3>
                            <div className="relative rounded-lg overflow-hidden h-48 bg-gray-100">
                                <img
                                    src={mainBanner.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x200/e5e7eb/9ca3af?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="absolute bottom-0 left-0 p-3">
                                    <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                                        {mainBanner.badgeDiscount}
                                    </span>
                                    <p className="text-white font-bold text-sm mt-1 leading-tight">
                                        {mainBanner.headingLine1}<br />
                                        {mainBanner.headingLine2}<br />
                                        <span className="text-green-300">{mainBanner.headingLine3}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
                            <h3 className="text-sm font-bold text-gray-700">Status</h3>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${mainBanner.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${mainBanner.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                {mainBanner.isActive ? 'Active — Visible on site' : 'Inactive — Hidden from site'}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* --- SMALL BANNERS TAB --- */}
            {activeTab === 'small' && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {smallBanners.map((banner, index) => (
                        <motion.div
                            key={banner.id}
                            variants={itemVariants}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                        >
                            {/* FORM */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <SectionHeader
                                        icon={Tag}
                                        title={`Small Banner ${index + 1}`}
                                        subtitle="Right side small banner"
                                    />
                                    <button
                                        onClick={() => updateSmall(banner.id, 'isActive', !banner.isActive)}
                                        className={`p-2 rounded-lg transition ${banner.isActive ? 'text-primary bg-primary/10' : 'text-gray-400 bg-gray-100'}`}
                                    >
                                        {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Discount %"
                                        value={banner.discount}
                                        onChange={(v) => updateSmall(banner.id, 'discount', v)}
                                        placeholder="45%"
                                    />
                                    <InputField
                                        label="Title"
                                        value={banner.title}
                                        onChange={(v) => updateSmall(banner.id, 'title', v)}
                                        placeholder="Nut Collection"
                                    />
                                </div>

                                <InputField
                                    label="Description Line 1"
                                    value={banner.description1}
                                    onChange={(v) => updateSmall(banner.id, 'description1', v)}
                                    placeholder="We deliver organic products"
                                />
                                <InputField
                                    label="Description Line 2"
                                    value={banner.description2}
                                    onChange={(v) => updateSmall(banner.id, 'description2', v)}
                                    placeholder="vegetables & fruits"
                                />
                                <InputField
                                    label="Button Text"
                                    value={banner.buttonText}
                                    onChange={(v) => updateSmall(banner.id, 'buttonText', v)}
                                    placeholder="Shop Now"
                                />
                                <ImageUpload
                                    label="Banner Image"
                                    value={banner.image}
                                    onChange={(v) => updateSmall(banner.id, 'image', v)}
                                />
                            </div>

                            {/* PREVIEW */}
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-primary" />
                                        Preview
                                    </h3>
                                    <div className="relative rounded-lg overflow-hidden h-36 bg-gray-100">
                                        <img
                                            src={banner.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/400x150/e5e7eb/9ca3af?text=No+Image';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/10" />
                                        <div className="absolute bottom-0 left-0 p-3">
                                            <p className="text-red-400 font-bold text-lg">{banner.discount} <span className="text-gray-300 text-xs">OFF</span></p>
                                            <p className="text-green-300 font-bold text-sm">{banner.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm p-4">
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${banner.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${banner.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        {banner.isActive ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default HeroSection; 