import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAxios from '../hooks/UseAxios';
import '../styles/AdminRentList.css';
import { formattedDate } from '../utils/dateUtils';

function AdminRentList() {
  const { token } = useAuth();
  const [rents, setRents] = useState([]);
  const [users, setUsers] = useState([]);
  const [bikeOwners, setBikeOwners] = useState({});
  const [bikeClients, setBikeClients] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteRent, setDeleteRent] = useState(false);
  const [rentIdToBeDeleted, setRentIdToBeDeleted] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRents, setFilteredRents] = useState([]);

  const { data: dataRents, loading: apiLoadingRents, error: apiErrorRents } = useAxios({
    url: 'http://localhost:5555/rents',
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

    if (dataRents && dataUsers) {
      const owners = {};
      dataRents.forEach(rent => {
        const owner = dataUsers.find(user => user._id === rent.landlord);
        owners[rent._id] = owner ? owner.login : 'Desconhecido';
        setBikeOwners(owners);
      });

      const clients = {};
      dataRents.forEach(rent => {
        const client = dataUsers.find(user => user._id === rent.renter);
        clients[rent._id] = client ? client.login : 'Desconhecido';
        setBikeClients(clients);
      });
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
      } 
      else {
        const searchLower = searchTerm.toLowerCase();
        const filtered = rents.filter((rent) => {
          const activityText = rent.active ? 'em andamento' : 'finalizado';
          const startDateText = formattedDate(rent.startDate);
          const endDateText = formattedDate(rent.endDate);
          return(
            rent._id.toLowerCase().includes(searchLower) ||
            (bikeOwners[rent._id] && bikeOwners[rent._id].toLowerCase().includes(searchLower)) ||
            (bikeClients[rent._id] && bikeClients[rent._id].toLowerCase().includes(searchLower)) ||
            rent.landlord.toLowerCase().includes(searchLower) ||
            rent.renter.toLowerCase().includes(searchLower) ||
            rent.bike.toLowerCase().includes(searchLower) ||
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

  const handleDeleteRent = () => {
    setDeleteRent(true);
    setRents(rents.filter((rent) => rent._id !== rentIdToBeDeleted));
    setIsModalOpen(false);
  };

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
  
      if (key === 'landlord') {
        aValue = bikeOwners[a._id] || '';
        bValue = bikeOwners[b._id] || '';
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

  const openDeleteModal = (rentId) => {
    setRentIdToBeDeleted(rentId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rents-list-container-admin">
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
        <table className="rents-table-admin">
          <thead>
            <tr>
              <th onClick={() => requestSort('_id')}>ID do Aluguel</th>
              <th onClick={() => requestSort('landlord')}>Locador</th>
              <th onClick={() => requestSort('renter')}>Locatário</th>
              <th onClick={() => requestSort('bike')}>Bicicleta</th>
              <th onClick={() => requestSort('startDate')}>Início</th>
              <th onClick={() => requestSort('endDate')}>Término</th>
              <th onClick={() => requestSort('rentPrice')}>Preço Total (R$)</th>
              <th onClick={() => requestSort('active')}>Situação</th>
              <th>Remoção</th>
            </tr>
          </thead>
          <tbody>
            {filteredRents.map((rent) => (
              <tr key={rent._id}>
                <td>{rent._id}</td>
                <td>{bikeOwners[rent._id]}</td>
                <td>{bikeClients[rent._id]}</td>
                <td>{rent.bike}</td>
                <td>{formattedDate(rent.startDate)}</td>
                <td>{formattedDate(rent.endDate)}</td>
                <td>{rent.rentPrice}</td>
                <td>{rent.active ? 'Em andamento' : 'Finalizado'}</td>
                <td>
                  <button onClick={() => openDeleteModal(rent._id)} className="delete-button">
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Você deseja remover este aluguel?</p>
            <button onClick={handleDeleteRent} className="confirm-button">Sim</button>
            <button onClick={closeDeleteModal} className="cancel-button">Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRentList;