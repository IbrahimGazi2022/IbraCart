import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}>
                <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="lg:ml-64">

                {/* --- HEADER --- */}
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                {/* --- PAGE CONTENT --- */}
                <main className="p-6 bg-gray-50 min-h-screen">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default AdminLayout;