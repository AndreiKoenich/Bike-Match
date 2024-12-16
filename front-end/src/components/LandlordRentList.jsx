import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAxios from '../hooks/UseAxios';
import '../styles/LandlordRentList.css';
import { formattedDate } from '../utils/dateUtils';
import { getIdByToken } from '../utils/jwtUtils';

function LandlordRentList() {
  const { token } = useAuth();
  const [rents, setRents] = useState([]);
  const [users, setUsers] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [bikeClients, setBikeClients] = useState({});
  const [bikeModels, setBikeModels] = useState({});
  const [bikeBrands, setBikeBrands] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteRent, setDeleteRent] = useState(false);
  const [rentIdToBeDeleted, setRentIdToBeDeleted] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRents, setFilteredRents] = useState([]);
  const userId = getIdByToken(token);

  const { data: dataRents, loading: apiLoadingRents, error: apiErrorRents } = useAxios({
    url: `http://localhost:5555/rents/landlord/${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: true,
  });

  const { data: dataUsers, loading: apiLoadingUsers, error: apiErrorUsers } = useAxios({
    url: 'http://localhost:5555/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: true,
  });

  const { data: dataBikes, loading: apiLoadingBikes, error: apiErrorBikes } = useAxios({
    url: 'http://localhost:5555/bikes',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: true,
  });

  const { loading: deleteRentLoading, error: deleteRentError } = useAxios({
    url: `http://localhost:5555/rents/${rentIdToBeDeleted}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: deleteRent,
  });

  useEffect(() => {
    if (dataRents) {
      setRents(dataRents);
      setFilteredRents(dataRents); 
      setLoading(false);
    }

    if (dataUsers) {
      setUsers(dataUsers);
      setLoading(false);
    }

    if (dataBikes) {
        setBikes(dataBikes);
        setLoading(false);
    }

      if (dataRents && dataUsers && dataBikes) {
        const clients = {};
        const models = {};
        const brands = {};
    
        dataRents.forEach((rent) => {
          const client = dataUsers.find((user) => user._id === rent.renter);
          clients[rent._id] = client ? client.login : 'Desconhecido';
    
          const bike2 = dataBikes.find((bike) => bike._id === rent.bike._id);
          models[rent._id] = bike2 ? bike2.model : 'Desconhecido';
          brands[rent._id] = bike2 ? bike2.brand : 'Desconhecido';
        });
    
        setBikeClients(clients);
        setBikeModels(models);
        setBikeBrands(brands);
      }

    if (apiErrorRents) {
      setError(apiErrorRents);
      setLoading(false);
    }

    if (apiErrorUsers) {
      setError(apiErrorUsers);
      setLoading(false);
    }

  }, [dataRents, dataUsers, apiErrorRents, apiErrorUsers]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRents(rents);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = rents.filter((rent) => {
        const activityText = rent.active ? 'em andamento' : 'finalizado';
        const startDateText = formattedDate(rent.startDate);
        const endDateText = formattedDate(rent.endDate);
        return (
          rent._id.toLowerCase().includes(searchLower) ||
          (bikeClients[rent._id] && bikeClients[rent._id].toLowerCase().includes(searchLower)) ||
          (bikeBrands[rent._id] && bikeBrands[rent._id].toLowerCase().includes(searchLower)) || // Marca
          (bikeModels[rent._id] && bikeModels[rent._id].toLowerCase().includes(searchLower)) || // Modelo
          rent.landlord.toLowerCase().includes(searchLower) ||
          rent.renter.toLowerCase().includes(searchLower) ||
          rent.startDate.toLowerCase().includes(searchLower) ||
          rent.endDate.toString().includes(searchTerm) || 
          rent.rentPrice.toString().includes(searchTerm) ||
          activityText.includes(searchLower) ||
          startDateText.includes(searchLower) ||
          endDateText.includes(searchLower) 
        );
      });
      setFilteredRents(filtered);
    }
  }, [searchTerm, rents]);

  useEffect(() => {
    if (deleteRent && !deleteRentLoading) {
      setDeleteRent(false);
      setRentIdToBeDeleted(null);
      setLoading(false);
    }
    if (deleteRentError) {
      setError(deleteRentError);
      setDeleteRent(false);
      setLoading(false);
    }
  }, [deleteRent, deleteRentLoading, deleteRentError]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  
    const sortedRents = [...rents].sort((a, b) => {
      let aValue, bValue;
  
      if (key === 'brand') {
        aValue = bikeBrands[a._id] || '';
        bValue = bikeBrands[b._id] || '';
      } else if (key === 'model') {
        aValue = bikeModels[a._id] || '';
        bValue = bikeModels[b._id] || '';
      } else if (key === 'renter') {
        aValue = bikeClients[a._id] || ''; 
        bValue = bikeClients[b._id] || '';
      } else {
        aValue = a[key];
        bValue = b[key];
      }
  
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  
    setRents(sortedRents);
  };
  

  return (
    <div className="rents-list-container">
      <h2>Lista de Aluguéis</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Pesquisar um aluguel a partir de qualquer dado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {rents.length === 0 || filteredRents.length === 0 ? (
        <h3 className="centered-message">Nenhum&nbsp;aluguel&nbsp;encontrado.</h3>
      ) : (
        <table className="rents-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('brand')}>Marca</th>
              <th onClick={() => requestSort('model')}>Modelo</th>
              <th onClick={() => requestSort('renter')}>Locatário</th>
              <th onClick={() => requestSort('startDate')}>Início</th>
              <th onClick={() => requestSort('endDate')}>Término</th>
              <th onClick={() => requestSort('rentPrice')}>Preço Total (R$)</th>
              <th onClick={() => requestSort('active')}>Situação</th>
            </tr>
          </thead>
          <tbody>
            {filteredRents.map((rent) => (
              <tr key={rent._id}>
                <td>{bikeBrands[rent._id]}</td>
                <td>{bikeModels[rent._id]}</td>
                <td>{bikeClients[rent._id]}</td>
                <td>{formattedDate(rent.startDate)}</td>
                <td>{formattedDate(rent.endDate)}</td>
                <td>{rent.rentPrice}</td>
                <td>{rent.active ? 'Em andamento' : 'Finalizado'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandlordRentList;