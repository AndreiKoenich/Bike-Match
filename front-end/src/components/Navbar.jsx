import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import '../styles/AdminNavbar.css';
import { useAuth } from '../contexts/AuthContext';
import { getRoleByToken } from '../utils/jwtUtils';
import { userRoles } from '../utils/userRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { token } = useAuth();
  const role = token ? getRoleByToken(token) : null;

  return (
    <>
      {token && role === userRoles.ADMINISTRATOR && (
        <nav className="navAdmin">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/adminUserList">Usuários</Link>
            </li>
            <li>
              <Link to="/adminBikeList">Bicicletas</Link>
            </li>
            <li>
              <Link to="/adminRentList">Aluguéis</Link>
            </li>
          </ul>
          <div className="logout-container">
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" title="Sair" />
            </Link>
          </div>
        </nav>
      )}
      {token && role !== userRoles.ADMINISTRATOR && (
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {role === userRoles.LANDLORD && (
              <li>
                <Link to="/registerBike">Cadastrar Bicicleta</Link>
              </li>
            )}
            {role === userRoles.LANDLORD && (
              <li>
                <Link to="/landlordBikeList">Minhas Bicicletas</Link>
              </li>
            )}
            {role === userRoles.LANDLORD && (
              <li>
                <Link to="/landlordRentList">Aluguéis</Link>
              </li>
            )}
            {role === userRoles.RENTER && (
              <li>
                <Link to="/bikes">Bikes Disponíveis</Link>
              </li>
            )}
            {role === userRoles.RENTER && (
              <li>
                <Link to="/rents">Aluguéis</Link>
              </li>
            )}
            {role === userRoles.RENTER && (
              <li>
                <Link to="/history">Histórico</Link>
              </li>
            )}
          </ul>
          <div className="logout-container">
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" title="Sair" />
            </Link>
          </div>
        </nav>
      )}
      {!token && (
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/register">Cadastro</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
