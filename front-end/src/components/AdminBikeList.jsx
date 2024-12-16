import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAxios from '../hooks/UseAxios';
import '../styles/AdminBikeList.css';

function AdminBikeList() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [bikeOwners, setBikeOwners] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteBike, setDeleteBike] = useState(false);
  const [bikeIdToBeDeleted, setBikeIdToBeDeleted] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBikes, setFilteredBikes] = useState([]);

  const { data: dataBikes, loading: apiLoadingBikes, error: apiErrorBikes } = useAxios({
    url: 'http://localhost:5555/bikes',
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

  const { loading: deleteBikeLoading, error: deleteBikeError } = useAxios({
    url: `http://localhost:5555/bikes/${bikeIdToBeDeleted}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: deleteBike,
  });

  useEffect(() => {
    if (dataBikes) {
      setBikes(dataBikes);
      setFilteredBikes(dataBikes); 
      setLoading(false);
    }
    if (dataUsers) {
      setUsers(dataUsers);
      setLoading(false);
    }
    if (dataBikes && dataUsers) {
      const owners = {};
      dataBikes.forEach(bike => {
        const owner = dataUsers.find(user => user._id === bike.landlord);
        owners[bike._id] = owner ? owner.login : 'Desconhecido';
        setBikeOwners(owners);
      });
    }
    if (apiErrorBikes) {
      setError(apiErrorBikes);
      setLoading(false);
    }
    if (apiErrorUsers) {
      setError(apiErrorUsers);
      setLoading(false);
    }
  }, [dataBikes, apiErrorBikes, dataUsers, apiErrorUsers]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBikes(bikes);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = bikes.filter((bike) => {
        const availabilityText = bike.available ? 'disponível' : 'alugada';
  
        return (
          bike._id.toLowerCase().includes(searchLower) ||
          bike.landlord.toLowerCase().includes(searchLower) ||
          bike.brand.toLowerCase().includes(searchLower) ||
          bike.model.toLowerCase().includes(searchLower) ||
          bike.weight.toString().includes(searchLower) ||
          bike.price.toString().includes(searchLower) ||
          bike.registerDate.toLowerCase().includes(searchLower) ||
          (bikeOwners[bike._id] && bikeOwners[bike._id].toLowerCase().includes(searchLower)) ||
          availabilityText.includes(searchLower)
        );
      });
      setFilteredBikes(filtered);
    }
  }, [searchTerm, bikes]);

  const handleDeleteBike = () => {
    setDeleteBike(true);
    setBikes(bikes.filter((bike) => bike._id !== bikeIdToBeDeleted));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (deleteBike && !deleteBikeLoading) {
      setDeleteBike(false);
      setBikeIdToBeDeleted(null);
      setLoading(false);
    }
    if (deleteBikeError) {
      setError(deleteBikeError);
      setDeleteBike(false);
      setLoading(false);
    }
  }, [deleteBike, deleteBikeLoading, deleteBikeError]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedBikes = [...bikes].sort((a, b) => {
      let aValue, bValue;
  
      if (key === 'landlord') {
        aValue = bikeOwners[a._id] || '';
        bValue = bikeOwners[b._id] || '';
      }
      else {
        aValue = a[key];
        bValue = b[key];
      }
  
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setBikes(sortedBikes);
  };

  const openDeleteModal = (bikeId) => {
    setBikeIdToBeDeleted(bikeId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bikes-list-container">
      <h2>Lista de Bicicletas</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Pesquisar uma bicicleta a partir de qualquer dado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {bikes.length === 0 || filteredBikes.length === 0 ? (
        <h3 className="centered-message">Nenhuma&nbsp;bicicleta&nbsp;encontrada.</h3>
      ) : (
        <table className="bikes-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('_id')}>ID da Bicicleta</th>
              <th onClick={() => requestSort('landlord')}>Proprietário</th>
              <th onClick={() => requestSort('brand')}>Marca</th>
              <th onClick={() => requestSort('model')}>Modelo</th>
              <th onClick={() => requestSort('weight')}>Peso (kg)</th>
              <th onClick={() => requestSort('price')}>Preço (R$)</th>
              <th onClick={() => requestSort('registerDate')}>Data de Cadastro</th>
              <th onClick={() => requestSort('available')}>Disponibilidade</th>
              <th>Remoção</th>
            </tr>
          </thead>
          <tbody>
            {filteredBikes.map((bike) => (
              <tr key={bike._id}>
                <td>{bike._id}</td>
                <td>{bikeOwners[bike._id]}</td>
                <td>{bike.brand}</td>
                <td>{bike.model}</td>
                <td>{bike.weight}</td>
                <td>{bike.price}</td>
                <td>{bike.registerDate}</td>
                <td>{bike.available ? 'Disponível' : 'Alugada'}</td>
                <td>
                  <button onClick={() => openDeleteModal(bike._id)} className="delete-button">
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
            <p>Você deseja remover esta bicicleta?</p>
            <button onClick={handleDeleteBike} className="confirm-button">Sim</button>
            <button onClick={closeDeleteModal} className="cancel-button">Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBikeList;