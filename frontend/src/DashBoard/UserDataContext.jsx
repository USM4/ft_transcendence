import React from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserDataContext = createContext();
function UserDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const getData = async () => {
      if (pathname !== '/signin' && pathname !== '/signup' && !pathname.startsWith('/2fa') && pathname !== '/about' && pathname !== '/howtoplay' && pathname !== '/') {
        try {
            const host=import.meta.env.VITE_HOST_URL;
            const response = await fetch(`${host}/auth/dashboard/`, {
              method: "GET",
              credentials: "include",
            });
            if (response.ok) {
              const data = await response.json();
              setUser(data);
            } 
            else {
              const data = await response.json();
              console.error(data.error);
              navigate('/signin');
            }
        } catch (error) {
          console.error('error getting data :', error);
        }
    } 
  };
    getData();
  }, [pathname]);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  return (
    <UserDataContext.Provider value={{ user, updateUser }}>
      {children}
    </UserDataContext.Provider>
  );
}
export default UserDataProvider;
