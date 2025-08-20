import React, { useState } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Plus,
  Search,
  ArrowRightLeft,
  Package,
  TrendingUp,
  TrendingDown,
  Calendar,
  User
} from 'lucide-react';

type OperationType = 'adjustment' | 'transfer' | 'receive' | 'issue';

interface StockOperation {
  id: string;
  type: OperationType;
  productName: string;
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  reason: string;
  performedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function StockOperations() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<OperationType | ''>('');
  
  // Mock data for stock operations
  const stockOperations: StockOperation[] = [
    {
      id: '1',
      type: 'adjustment',
      productName: 'Smart Watch',
      quantity: -2,
      reason: 'Damaged items found during audit',
      performedBy: 'John Smith',
      date: '2024-01-18T10:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      type: 'transfer',
      productName: 'Wireless Headphones',
      quantity: 10,
      fromLocation: 'Warehouse A',
      toLocation: 'Warehouse B',
      reason: 'Stock rebalancing',
      performedBy: 'Sarah Johnson',
      date: '2024-01-17T14:15:00Z',
      status: 'approved'
    },
    {
      id: '3',
      type: 'receive',
      productName: 'Bluetooth Speaker',
      quantity: 25,
      reason: 'Purchase order PO-2024-002 received',
      performedBy: 'Mike Wilson',
      date: '2024-01-16T09:45:00Z',
      status: 'approved'
    }
  ];

  const filteredOperations = stockOperations.filter(operation => {
    const matchesSearch = operation.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operation.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === '' || operation.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getOperationIcon = (type: OperationType) => {
    switch (type) {
      case 'adjustment':
        return Package;
      case 'transfer':
        return ArrowRightLeft;
      case 'receive':
        return TrendingUp;
      case 'issue':
        return TrendingDown;
      default:
        return Package;
    }
  };

  const getOperationColor = (type: OperationType) => {
    switch (type) {
      case 'adjustment':
        return 'text-yellow-600 bg-yellow-100';
      case 'transfer':
        return 'text-blue-600 bg-blue-100';
      case 'receive':
        return 'text-green-600 bg-green-100';
      case 'issue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Operations</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track stock movements, adjustments, and transfers
          </p>
        </div>
        {hasPermission('stock.write') && (
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-2" />
            New Operation
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: 'Stock Adjustment', type: 'adjustment', icon: Package },
          { name: 'Stock Transfer', type: 'transfer', icon: ArrowRightLeft },
          { name: 'Stock Receipt', type: 'receive', icon: TrendingUp },
          { name: 'Stock Issue', type: 'issue', icon: TrendingDown }
        ].map((action) => (
          <button
            key={action.type}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${getOperationColor(action.type as OperationType)}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{action.name}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search operations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as OperationType | '')}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="adjustment">Stock Adjustment</option>
            <option value="transfer">Stock Transfer</option>
            <option value="receive">Stock Receipt</option>
            <option value="issue">Stock Issue</option>
          </select>

          <div className="text-sm text-gray-600">
            Showing {filteredOperations.length} of {stockOperations.length} operations
          </div>
        </div>
      </div>

      {/* Operations List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredOperations.map((operation) => {
            const Icon = getOperationIcon(operation.type);
            return (
              <div key={operation.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getOperationColor(operation.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {operation.type.charAt(0).toUpperCase() + operation.type.slice(1)} - {operation.productName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{operation.reason}</p>
                      {operation.fromLocation && operation.toLocation && (
                        <p className="text-xs text-gray-500 mt-1">
                          From {operation.fromLocation} to {operation.toLocation}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        operation.quantity > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {operation.quantity > 0 ? '+' : ''}{operation.quantity}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(operation.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <User className="h-3 w-3 mr-1" />
                        {operation.performedBy}
                      </div>
                    </div>
                    
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(operation.status)}`}>
                      {operation.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOperations.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stock operations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}