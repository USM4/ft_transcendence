import { Route , Navigate} from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ component: Component }) => {

  const isAuthenticated = () => {

    return document.cookie.split('; ').some(row => row.startsWith('access_token='));
  };

  return (
     isAuthenticated() ? <Component /> : <Navigate to="/signin" />
  );
}
export default ProtectedRoute;
