import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem } from "@/data/mockData";

export type OrderStatus = "placed" | "preparing" | "delivered" | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  address: string;
  phone: string;
  payment: string;
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (orderData: Omit<Order, "id" | "status" | "createdAt">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearAllOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("biterider_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("biterider_orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = useCallback((orderData: Omit<Order, "id" | "status" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      status: "placed",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const clearAllOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, clearAllOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
