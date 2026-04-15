import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "CUSTOMER" | "RESTAURANT" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, email: string) => void;
  signup: (role: UserRole, email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("biterider_auth");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("biterider_auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("biterider_auth");
    }
  }, [user]);

  const login = (role: UserRole, email: string) => {
    // Mock login logic
    const mockUser: User = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: role === "RESTAURANT" ? "Global Kitchen Partner" : "Cyber Explorer",
      email,
      role,
    };
    setUser(mockUser);
  };

  const signup = (role: UserRole, email: string, name: string) => {
    // Mock signup logic
    const mockUser: User = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      name,
      email,
      role,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
