import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const FriendDataContext = createContext();

function FriendDataProvider ({ children }) {
  
  const location  = useLocation();
  const pathname = location.pathname;
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
      console.log('fetching friends');
      const fetchFriendList = async () => {
        const response = await fetch('http://localhost:8000/auth/friends/',
        {
            method: 'GET',
            credentials: 'include',
        })
        if(response.ok){
            const responseData = await response.json();
            setFriends(responseData.data);
        }
        else{
          console.log('something went wrong');
        }
      }
      fetchFriendList();

      const timer = setInterval(() => {
        console.log("Fetching friends (via timer)");
        fetchFriendList();
      }, 20000); 
  
      return () => {
        clearInterval(timer);
      };
  }, [pathname]);
  return (
    <FriendDataContext.Provider value={{ friends, setFriends}}>
      {children}
    </FriendDataContext.Provider>
  );
};
export default FriendDataProvider;
