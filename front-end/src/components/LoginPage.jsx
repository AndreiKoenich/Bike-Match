import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5555/users/login', {
        login: username,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setToken(token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="submit-button-container">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>
        <p className="register-message">
          Não possui uma conta? {"  "}
          <Link to="/register">Registre-se!</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
