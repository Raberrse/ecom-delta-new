'use client'
import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  user_id: string;
  details: any; 
  ordered_at: string;
}

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (!response.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5">Order Management</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Order ID</th>
              <th scope="col" className="py-3 px-6">User ID</th>
              <th scope="col" className="py-3 px-6">Details</th>
              <th scope="col" className="py-3 px-6">Created At</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.user_id}</td>
                <td className="py-4 px-6">{JSON.stringify(order.details)}</td>
                <td className="py-4 px-6">{new Date(order.ordered_at).toLocaleDateString()}</td>
                <td className="py-4 px-6">
                  <button onClick={() => deleteOrder(order.id)}
                    className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                    Finish Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
