import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import PurchaseOrders from './pages/PurchaseOrders';
import SalesOrders from './pages/SalesOrders';
import StockOperations from './pages/StockOperations';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InventoryProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="customers" element={<Customers />} />
                <Route path="purchase-orders" element={<PurchaseOrders />} />
                <Route path="sales-orders" element={<SalesOrders />} />
                <Route path="stock-operations" element={<StockOperations />} />
                <Route path="reports" element={<Reports />} />
                <Route path="users" element={<UserManagement />} />
              </Route>
            </Routes>
          </NotificationProvider>
        </InventoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;