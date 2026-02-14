//* AUTH NÀY ĐỂ ĐÁ NGƯỜI DÙNG VỀ LOGIN NẾU CHƯA LOGIN 








import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

// 1. Khởi tạo Context
const AuthContext = createContext();

// 2. Tạo Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe sự thay đổi trạng thái đăng nhập từ Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Nếu đã login, lưu thông tin user (tên, email, ảnh)
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Dọn dẹp khi component unmount
  }, []);

  const value = {
    currentUser,
    loggedIn: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook để các trang khác gọi dùng cho nhanh
export const useAuth = () => useContext(AuthContext);