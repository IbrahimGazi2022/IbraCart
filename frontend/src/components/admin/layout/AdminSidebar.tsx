import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    ShoppingCart,
    Users,
    Settings,
    X,
    LayoutTemplate
} from 'lucide-react';

interface AdminSidebarProps {
    onClose: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: LayoutTemplate, label: 'Hero Section', path: '/admin/hero' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
        { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="h-full flex flex-col bg-white border-r border-gray-100">

            {/* --- LOGO & CLOSE BUTTON --- */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Admin</h2>
                        <p className="text-xs text-gray-500">Panel</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* --- NAVIGATION MENU --- */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/admin'}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* --- USER PROFILE SECTION --- */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminSidebar;