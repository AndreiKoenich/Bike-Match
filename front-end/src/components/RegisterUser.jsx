import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/UseAxios';
import '../styles/RegisterUser.css';
import { currentDate } from '../utils/dateUtils';

function RegisterUser() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [registerDate, setRegisterDate] = useState('');
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const { data, loading, error } = useAxios({
    url: 'http://localhost:5555/users',
    method: 'POST',
    body: { name, login, age, email, cpf, password, role, registerDate: currentDate() },
    headers: { 'Content-Type': 'application/json' },
    trigger: submit,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit);
  };

  useEffect(() => {
    if (data) {
      navigate('/login');
    }
  }, [data, navigate]);


  return (
    <div className="register-user-container">
      <h2>Venha fazer parte da nossa comunidade!</h2>
      <form onSubmit={handleSubmit} className="register-user-form form-grid">
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-group role-selection">
          <label>Qual papel você deseja possuir em nossa comunidade?</label>
          <label>
            <input
              type="radio"
              name="role"
              value="Locatario"
              checked={role === 'Locatario'}
              onChange={(e) => setRole(e.target.value)}
            />
            Locatário - desejo alugar bicicletas de outros usuários.
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Locador"
              checked={role === 'Locador'}
              onChange={(e) => setRole(e.target.value)}
            />
            Locador - desejo oferecer bicicletas para outros usuários alugarem.
          </label>
        </div>

        <div className="submit-button-container">
          <button type="submit" className="submit-button">Finalizar Cadastro</button>
        </div>
      </form>

      {loading && <p className="loading">Carregando...</p>}
      {error && Array.isArray(error) ? (
        <ul className="error-list">
          {error.map((err, index) => (
            <li key={index} className="error-item">{err}</li>
          ))}
        </ul>
      ) : (
        error && <p className="error-message">Erro: {error}</p>
      )}
      {data && <p className="success-message">Cadastro efetuado com sucesso!</p>}
    </div>
  );
}

export default RegisterUser;
