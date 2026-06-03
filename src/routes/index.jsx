import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';

// Pages
import DashboardPage from '../pages/DashboardPage';
import TransportMasterPage from '../pages/TransportMasterPage';
import ReportsPage from '../pages/ReportsPage';
import LoginPage from '../features/auth/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // Maps to the "Consignor / Consignee" menu item path
      {
        path: 'masters/consignor-consignee',
        element: <TransportMasterPage />,
      },
      // Maps to "Tracking / Enquiry System" just as an example
      {
        path: 'reports/tracking-enquiry',
        element: <ReportsPage />,
      },
      // Catch-all route for other unmapped menu paths
      {
        path: '*',
        element: (
          <div className="p-6 text-center mt-20 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4 opacity-20">🚧</div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Module Under Construction</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              This path has not been implemented yet. You can click on "Dashboard" or specifically mapped routes in the Menu to navigate.
            </p>
          </div>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);
