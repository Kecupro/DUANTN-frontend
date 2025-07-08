"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../../../app/(site)/cautrucdata";

interface AdminAuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  isAuthorized: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  
  // Hàm lấy user từ API
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          
          // Kiểm tra quyền admin
          if (userData.role === "1" || userData.role === "2") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            // Redirect về trang chủ nếu không có quyền
            router.push("/");
          }
        } else {
          setUser(null);
          setIsAuthorized(false);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsAuthorized(false);
        router.push("/");
      }
    } else {
      setUser(null);
      setIsAuthorized(false);
      router.push("/");
    }
    setIsLoading(false);
  };

  // Đọc user từ localStorage khi load
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Kiểm tra quyền admin
      if (parsedUser.role === "1" || parsedUser.role === "2") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/");
      }
    } else {
      setIsAuthorized(false);
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthorized(false);
    router.push("/");
  };

  return (
    <AdminAuthContext.Provider value={{ 
      user, 
      setUser, 
      logout, 
      refreshUser, 
      isLoading, 
      isAuthorized 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}; 