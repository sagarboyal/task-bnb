import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Menu from '../components/common/Menu';
import { useSession } from '../contexts/SessionContext';

export default function MainLayout() {
  const navigate = useNavigate();
  const { isSetupComplete } = useSession();

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      {isSetupComplete && <Menu onSubmenuItemClick={handleMenuClick} />}
      <main className="flex-1 w-full overflow-x-hidden pt-4 pb-12">
        <div className="mx-auto max-w-7xl w-full relative">
          {/* Outlet is where the nested routes (pages) will be injected */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
