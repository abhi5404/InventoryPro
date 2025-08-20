import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  reorderPoint: number;
  supplier: string;
  barcode?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  totalOrders: number;
  onTimeDelivery: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'received' | 'cancelled';
  orderDate: string;
  expectedDate: string;
  receivedDate?: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
}

interface InventoryContextType {
  products: Product[];
  suppliers: Supplier[];
  customers: Customer[];
  purchaseOrders: PurchaseOrder[];
  salesOrders: SalesOrder[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void;
  updatePurchaseOrder: (id: string, po: Partial<PurchaseOrder>) => void;
  addSalesOrder: (so: Omit<SalesOrder, 'id'>) => void;
  updateSalesOrder: (id: string, so: Partial<SalesOrder>) => void;
  getLowStockProducts: () => Product[];
  getInventoryValue: () => number;
  getTopSellingProducts: () => Product[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      sku: 'PROD001',
      name: 'Wireless Headphones',
      description: 'Premium wireless headphones with noise cancellation',
      category: 'Electronics',
      price: 299.99,
      cost: 150.00,
      quantity: 45,
      reorderPoint: 10,
      supplier: 'TechSupplier Inc',
      barcode: '1234567890123',
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      sku: 'PROD002',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      category: 'Electronics',
      price: 199.99,
      cost: 120.00,
      quantity: 8,
      reorderPoint: 15,
      supplier: 'TechSupplier Inc',
      barcode: '2345678901234',
      imageUrl: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '2024-01-16T09:15:00Z',
      updatedAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '3',
      sku: 'PROD003',
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof bluetooth speaker',
      category: 'Electronics',
      price: 79.99,
      cost: 45.00,
      quantity: 32,
      reorderPoint: 20,
      supplier: 'AudioTech Ltd',
      barcode: '3456789012345',
      imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '2024-01-17T14:20:00Z',
      updatedAt: '2024-01-17T14:20:00Z'
    }
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'TechSupplier Inc',
      contact: 'John Smith',
      email: 'john@techsupplier.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA 94043',
      rating: 4.8,
      totalOrders: 145,
      onTimeDelivery: 96.5,
      createdAt: '2023-06-15T08:30:00Z'
    },
    {
      id: '2',
      name: 'AudioTech Ltd',
      contact: 'Sarah Johnson',
      email: 'sarah@audiotech.com',
      phone: '+1-555-0124',
      address: '456 Audio Avenue, Nashville, TN 37203',
      rating: 4.6,
      totalOrders: 78,
      onTimeDelivery: 94.2,
      createdAt: '2023-07-20T11:45:00Z'
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'orders@acme.com',
      phone: '+1-555-0200',
      address: '789 Business Blvd, New York, NY 10001',
      totalOrders: 23,
      totalSpent: 15750.50,
      createdAt: '2023-08-10T16:20:00Z'
    },
    {
      id: '2',
      name: 'Global Retail Chain',
      email: 'purchasing@globalretail.com',
      phone: '+1-555-0201',
      address: '321 Retail Road, Chicago, IL 60601',
      totalOrders: 41,
      totalSpent: 28900.75,
      createdAt: '2023-09-05T12:10:00Z'
    }
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: '1',
      poNumber: 'PO-2024-001',
      supplierId: '1',
      supplierName: 'TechSupplier Inc',
      items: [
        { productId: '1', productName: 'Wireless Headphones', quantity: 50, unitPrice: 150.00, total: 7500.00 },
        { productId: '2', productName: 'Smart Watch', quantity: 30, unitPrice: 120.00, total: 3600.00 }
      ],
      subtotal: 11100.00,
      tax: 1110.00,
      total: 12210.00,
      status: 'received',
      orderDate: '2024-01-10T09:00:00Z',
      expectedDate: '2024-01-20T09:00:00Z',
      receivedDate: '2024-01-18T14:30:00Z'
    }
  ]);

  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      customerId: '1',
      customerName: 'Acme Corporation',
      items: [
        { productId: '1', productName: 'Wireless Headphones', quantity: 10, unitPrice: 299.99, total: 2999.90 },
        { productId: '3', productName: 'Bluetooth Speaker', quantity: 15, unitPrice: 79.99, total: 1199.85 }
      ],
      subtotal: 4199.75,
      tax: 419.98,
      total: 4619.73,
      status: 'shipped',
      orderDate: '2024-01-12T11:30:00Z',
      deliveryDate: '2024-01-15T16:00:00Z'
    }
  ]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id' | 'createdAt'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id ? { ...supplier, ...updates } : supplier
    ));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const addPurchaseOrder = (po: Omit<PurchaseOrder, 'id'>) => {
    const newPO: PurchaseOrder = {
      ...po,
      id: Date.now().toString()
    };
    setPurchaseOrders(prev => [...prev, newPO]);
  };

  const updatePurchaseOrder = (id: string, updates: Partial<PurchaseOrder>) => {
    setPurchaseOrders(prev => prev.map(po => 
      po.id === id ? { ...po, ...updates } : po
    ));
  };

  const addSalesOrder = (so: Omit<SalesOrder, 'id'>) => {
    const newSO: SalesOrder = {
      ...so,
      id: Date.now().toString()
    };
    setSalesOrders(prev => [...prev, newSO]);
  };

  const updateSalesOrder = (id: string, updates: Partial<SalesOrder>) => {
    setSalesOrders(prev => prev.map(so => 
      so.id === id ? { ...so, ...updates } : so
    ));
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.quantity <= product.reorderPoint);
  };

  const getInventoryValue = () => {
    return products.reduce((total, product) => total + (product.cost * product.quantity), 0);
  };

  const getTopSellingProducts = () => {
    return products.slice().sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  };

  return (
    <InventoryContext.Provider value={{
      products,
      suppliers,
      customers,
      purchaseOrders,
      salesOrders,
      addProduct,
      updateProduct,
      deleteProduct,
      addSupplier,
      updateSupplier,
      deleteSupplier,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addPurchaseOrder,
      updatePurchaseOrder,
      addSalesOrder,
      updateSalesOrder,
      getLowStockProducts,
      getInventoryValue,
      getTopSellingProducts
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
}