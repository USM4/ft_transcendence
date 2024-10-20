import { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null for loading state

    useEffect(() => {
      const verifyToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/verify_token/',  {
              method: 'GET',
              credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
          } else
              setIsAuthenticated(false);
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
        }
      };
  
      verifyToken();
    }, []);
    
  if (isAuthenticated === null)
    return <div>Loading...</div>;

  if (!isAuthenticated)
    return <Navigate to="/signin" />;

  return <Component />;
  };

export default ProtectedRoute;
