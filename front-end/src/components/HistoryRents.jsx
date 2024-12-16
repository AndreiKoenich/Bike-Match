import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/UseAxios';
import '../styles/BikeList.css';
import { useAuth } from '../contexts/AuthContext';
import { getIdByToken } from '../utils/jwtUtils';
import { accessoryLabels } from '../utils/accessoryLabels';

function HistoryRents() {
  const { token } = useAuth();
  const [userRents, setUserRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = getIdByToken(token);

  const { data, loading: apiLoading, error: apiError } = useAxios({
    url: `http://localhost:5555/rents/renter/${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    trigger: true,
  });

  useEffect(() => {
    if (data) {
      setUserRents(data);
      setLoading(false);
    }
    if (apiError) {
      setError(apiError);
      setLoading(false);
    }
  }, [data, apiError]);

  return (
    <div>
      <h2>Histórico de Aluguéis</h2>
      {loading || apiLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro: {error.message}</p>
      ) : userRents.length === 0 ? (
        <h3 className="centered-message">Você&nbsp;não&nbsp;possui&nbsp;bicicletas&nbsp;no&nbsp;seu&nbsp;histórico&nbsp;de&nbsp;aluguéis.</h3>
      ) : (
        <div className="bike-card-container">
          {userRents
            .map(rent => (
              <div className="bike-card" key={rent._id}>
                <p>{rent.active ? 'Aluguel em andamento' : 'Devolvida'}</p>
                <h3>{rent.bike.brand} - {rent.bike.model}</h3>
                <p>{rent.bike.description}</p>
                <p>Observações: {rent.bike.observations ?? 'Nenhuma'}</p>
                <p>Acessórios:</p>
                <div className="accessories-container">
                  {Object.entries(rent.bike.accessories)
                    .filter(([, value]) => value === true)
                    .map(([key], index) => (
                      <span key={index} className="accessory-tag">
                        {accessoryLabels[key]}
                      </span>
                    ))}
                </div>
                <p>Peso: {rent.bike.weight}</p>
                <p>Data de Início: {new Date(rent.startDate).toLocaleDateString()}</p>
                <p>Data de Fim: {new Date(rent.endDate).toLocaleDateString()}</p>
                <p>Preço do Aluguel: R$ {rent.rentPrice}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default HistoryRents;
