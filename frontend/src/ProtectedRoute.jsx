import { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("###############################----------------Setup complete. The environment is ready!---------------#######################################");
        const response = await fetch(
          "https://localhost:443/auth/verify_token/",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
        } else setIsAuthenticated(false);
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) return <>Loading ... </>;

  if (!isAuthenticated) return <Navigate to="/signin"/>;

  return <Component />;
};

export default ProtectedRoute;
