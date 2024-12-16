import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/AdminHomePage.css';
import { useAuth } from '../contexts/AuthContext';
import { getRoleByToken } from '../utils/jwtUtils';
import { userRoles} from '../utils/userRoles';


function HomePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const role = token ? getRoleByToken(token) : null;

  const handleExploreClick = () => {

    if (token) {
      navigate('/bikes');
    } else {
      navigate('/login');
    }

  };

  return (
    <div className="home-containerAdmin">
      {role === userRoles.ADMINISTRATOR ? (
        <h1>Bem-vindo, administrador do BikeMatch!</h1>
      ) : (
        <>
          <h1>Bem-vindo ao BikeMatch!</h1>
          <p>
            O BikeMatch é a sua solução ideal para alugar bicicletas de forma rápida, fácil e segura.
            Explore uma ampla variedade de bikes disponíveis para aluguel e encontre a que melhor
            atende às suas necessidades.
          </p>
          <p>
            Quer aproveitar um passeio ao ar livre ou precisa de uma bike para o seu dia a dia?
            No BikeMatch, você encontra a bike perfeita para qualquer ocasião!
          </p>
          <button className="explore-button" onClick={handleExploreClick}>
            Explore as Bikes Disponíveis
          </button>
        </>
      )}
    </div>
  );
}

export default HomePage;
