import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';

export const FriendDataContext = React.createContext();

function FriendDataProvider ({ children }) {
  const { pathname } = window.location;
  const [friends, setFriends] = React.useState([]);
  console.log("------------------",pathname);
  
  useEffect(() => {
      console.log('fetching friends');
      const fetchFriendList = async () => {
        const response = await fetch('https://localhost:443/auth/friends/',
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
    }, [pathname]);
  return (
    <FriendDataContext.Provider value={{ friends, setFriends}}>
      {children}
    </FriendDataContext.Provider>
  );
};
export default FriendDataProvider;
