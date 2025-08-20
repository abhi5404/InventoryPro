import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'staff' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['*'],
  manager: ['products.read', 'products.write', 'suppliers.read', 'suppliers.write', 'customers.read', 'customers.write', 'orders.read', 'orders.write', 'stock.read', 'stock.write', 'reports.read'],
  staff: ['products.read', 'products.write', 'customers.read', 'orders.read', 'orders.write', 'stock.read'],
  auditor: ['products.read', 'suppliers.read', 'customers.read', 'orders.read', 'stock.read', 'reports.read']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users
    const demoUsers: Record<string, { user: User, password: string }> = {
      'admin@company.com': {
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@company.com',
          role: 'admin',
          permissions: rolePermissions.admin
        },
        password: 'admin123'
      },
      'manager@company.com': {
        user: {
          id: '2',
          name: 'Manager User',
          email: 'manager@company.com',
          role: 'manager',
          permissions: rolePermissions.manager
        },
        password: 'manager123'
      }
    };

    const userData = demoUsers[email];
    if (!userData || userData.password !== password) {
      setLoading(false);
      throw new Error('Invalid credentials');
    }

    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}