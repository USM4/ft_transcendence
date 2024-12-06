import React from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext();
function UserDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/dashboard/", {
          method: "GET",
          credentials: "include",
        });
        console.log("response", response)
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          // navigate('dashboard')
        }
        else
          navigate('signin/')
      } catch (error) {
        console.error('error getting data :', error);
      }
    };
    getData();
  }, []);
  
    const updateUser = (updatedUser) => {
      setUser(updatedUser);
  };
  console.log("USER CONTEXT PROVDER:", user)
  return (
    <UserDataContext.Provider value={{ user, updateUser}}>
      {children}
    </UserDataContext.Provider>
  );
}
export default UserDataProvider;
