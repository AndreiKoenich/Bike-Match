import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAxios from '../hooks/UseAxios';
import '../styles/AdminUserList.css';

function AdminUserList() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data, loading: apiLoading, error: apiError } = useAxios({
    url: 'http://localhost:5555/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: true,
  });

  const { loading: deleteUserLoading, error: deleteUserError } = useAxios({
    url: `http://localhost:5555/users/${userIdToBeDeleted}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    trigger: deleteUser,
  });

  useEffect(() => {
    if (data) {
      const filtered = data.filter((user) => user.role !== 'Administrador');
      setUsers(filtered);
      setFilteredUsers(filtered);
      setLoading(false);
    }
    if (apiError) {
      setError(apiError);
      setLoading(false);
    }
  }, [data, apiError]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user._id.toLowerCase().includes(searchLower) ||
          user.login.toLowerCase().includes(searchLower) ||
          user.age.toString().includes(searchTerm) || 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.registerDate.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDeleteUser = () => {
    setDeleteUser(true);
    setUsers(users.filter((user) => user._id !== userIdToBeDeleted));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (deleteUser && !deleteUserLoading) {
      setDeleteUser(false);
      setUserIdToBeDeleted(null);
      setLoading(false);
    }
    if (deleteUserError) {
      setError(deleteUserError);
      setDeleteUser(false);
      setLoading(false);
    }
  }, [deleteUser, deleteUserLoading, deleteUserError]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const openDeleteModal = (userId) => {
    setUserIdToBeDeleted(userId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="users-list-container">
      <h2>Lista de Usuários</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Pesquisar um usuário a partir de qualquer dado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {users.length === 0 || filteredUsers.length === 0 ? (
        <h3 className="centered-message">Nenhum&nbsp;usuário&nbsp;encontrado.</h3>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('_id')}>ID do Usuário</th>
              <th onClick={() => requestSort('login')}>Login</th>
              <th onClick={() => requestSort('name')}>Nome</th>
              <th onClick={() => requestSort('age')}>Idade</th>
              <th onClick={() => requestSort('email')}>E-mail</th>
              <th onClick={() => requestSort('role')}>Papel</th>
              <th onClick={() => requestSort('registerDate')}>Data de Registro</th>
              <th>Remoção</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.login}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.registerDate}</td>
                <td>
                  <button onClick={() => openDeleteModal(user._id)} className="delete-button">
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
            <p>Você deseja remover este usuário?</p>
            <button onClick={handleDeleteUser} className="confirm-button">Sim</button>
            <button onClick={closeDeleteModal} className="cancel-button">Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserList;