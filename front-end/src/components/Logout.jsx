import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    setToken(null); 
    sessionStorage.removeItem('token');

    navigate('/login');
  }, [navigate, setToken]);

  return null; 
};

export default Logout;
