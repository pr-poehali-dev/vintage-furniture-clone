import { useState, useEffect } from "react";
import { User, CartItem } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Array<{
    id: string;
    date: string;
    total: number;
    status: string;
    items: CartItem[];
  }>>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedOrderHistory = localStorage.getItem('orderHistory');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setOrderHistory([]);
    localStorage.removeItem('orderHistory');
  };

  return {
    user,
    setUser,
    isAuthDialogOpen,
    setIsAuthDialogOpen,
    isProfileDialogOpen,
    setIsProfileDialogOpen,
    orderHistory,
    setOrderHistory,
    handleLogin,
    handleUpdateUser,
    handleLogout,
  };
}