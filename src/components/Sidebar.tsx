import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Package,
  Truck,
  Users,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  UserCog,
  Archive
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const { user, hasPermission } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, permission: 'dashboard.read' },
    { name: 'Products', href: '/products', icon: Package, permission: 'products.read' },
    { name: 'Suppliers', href: '/suppliers', icon: Truck, permission: 'suppliers.read' },
    { name: 'Customers', href: '/customers', icon: Users, permission: 'customers.read' },
    { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart, permission: 'orders.read' },
    { name: 'Sales Orders', href: '/sales-orders', icon: FileText, permission: 'orders.read' },
    { name: 'Stock Operations', href: '/stock-operations', icon: Archive, permission: 'stock.read' },
    { name: 'Reports', href: '/reports', icon: BarChart3, permission: 'reports.read' },
    { name: 'User Management', href: '/users', icon: UserCog, permission: '*' }
  ];

  const filteredNavigation = navigation.filter(item => 
    hasPermission(item.permission) || item.permission === 'dashboard.read'
  );

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">InventoryPro</h1>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${isActive
                      ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className={`
                    mr-3 h-5 w-5 transition-colors duration-150
                    ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}
                  `} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 w-full p-4 bg-gray-50 border-t">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}