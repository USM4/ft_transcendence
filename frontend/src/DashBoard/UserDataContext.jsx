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
      try {
        const response = await fetch("https://localhost:443/auth/dashboard/", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
        else if (pathname !== '/signin' && pathname !== '/signup' && pathname !== '/2fa' && pathname !== '/about' && pathname !== '/howtoplay' )
        {
          // console.log("galk yahia :--------------- ", pathname);
          navigate('signin/')
        }

      } catch (error) {
        console.error('error getting data :', error);
      }
    };
    getData();
  }, [pathname]);
  
    const updateUser = (updatedUser) => {
      setUser(updatedUser);
  };
  return (
    <UserDataContext.Provider value={{ user, updateUser}}>
      {children}
    </UserDataContext.Provider>
  );
}
export default UserDataProvider;
