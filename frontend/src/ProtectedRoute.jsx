import { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/verify_token/',
          {
            credentials: 'include',
          });
        if (response.ok) {
          setIsAuthenticated(true);
          
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
