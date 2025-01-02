import React from "react";
import { useContext, createContext, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export const FriendDataContext = createContext();

function FriendDataProvider({ children }) {

  const location = useLocation();
  const pathname = location.pathname;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
      const fetchFriendList = async () => {
        if (pathname !== '/signin' && pathname !== '/signup' && !pathname.startsWith('/2fa') && pathname !== '/about' && pathname !== '/howtoplay'){
        const host=import.meta.env.VITE_HOST_URL;
        const response = await fetch(`${host}/auth/friends/`,
        {
            method: 'GET',
            credentials: 'include',
          })
        if (response.ok) {
          const responseData = await response.json();
          setFriends(responseData.data);
        }
        else {
          const responseData = await response.json();
          console.log(responseData.error);
        }
      }
    }
    fetchFriendList();

    const timer = setInterval(() => {
      fetchFriendList();
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [pathname]);
  return (
    <FriendDataContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendDataContext.Provider>
  );
};
export default FriendDataProvider;
