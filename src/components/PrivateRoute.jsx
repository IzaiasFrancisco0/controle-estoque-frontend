import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }

    setIsAuthChecked(true);
  }, [navigate]);

  if (!isAuthChecked) {
    return <div className="w-full h-screen flex items-center justify-center text-gray-600">Verificando login...</div>;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
