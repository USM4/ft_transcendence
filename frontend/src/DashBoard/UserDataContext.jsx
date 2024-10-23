import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';


export const UserDataContext = createContext();
function UserDataProvider ({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch('http://localhost:8000/auth/profile/',
              {
                method: 'GET',
                credentials: 'include',
              }
            )
            if(response.ok)
            {
              const data = await response.json();
              setUser(data);
              // console.log(user.avatar);
            }
            else
              console.error('error getting data ');          
            
          } catch (error) {
              console.error('error getting data :', error);          
          } 
        }
        // if(user.avatar === null){
        //   user.avatar = './anonyme.png';
        //   console.log('entered')
        // }
        getData();
      }, []);
    if(user === null)
      return <div> fetching user data .. </div>
    return(
        <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    );    
};
export default UserDataProvider;