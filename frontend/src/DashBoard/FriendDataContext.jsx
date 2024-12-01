import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';

export const FriendDataContext = React.createContext();

function FriendDataProvider ({ children }) {
  const [friends, setFriends] = React.useState([]);

  const fetchFriendList = async () => {
    const response = await fetch('http://localhost:8000/auth/friends/',
    {
        method: 'GET',
        credentials: 'include',
    })
    if(response.ok){
        const responseData = await response.json();
        setFriends(responseData.data);
        console.log(responseData.data);
    }
    else{
      console.log('something went wrong');
    }
  }
    useEffect(() => {
      fetchFriendList();
    }, []);
  return (
    <FriendDataContext.Provider value={{ friends, setFriends, fetchFriendList}}>
      {children}
    </FriendDataContext.Provider>
  );
};
export default FriendDataProvider;
