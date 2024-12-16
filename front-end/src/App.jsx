import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import HomePage from './components/HomePage';
import BikeList from './components/BikeList';
import RegisterBike from './components/RegisterBike';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import BikesRents from './components/BikesRents';
import HistoryRents from './components/HistoryRents';

import LandlordBikeList from './components/LandlordBikeList';
import LandlordRentList from './components/LandlordRentList';

import AdminUserList from './components/AdminUserList';
import AdminBikeList from './components/AdminBikeList';
import AdminRentList from './components/AdminRentList';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/registerBike" element={<RegisterBike />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/bikes" element={<BikeList />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/rents" element={<BikesRents />} />
          <Route path="/history" element={<HistoryRents />} />

          <Route path="/landlordBikeList" element={<LandlordBikeList/>} />
          <Route path="/landlordRentList" element={<LandlordRentList/>} />

          <Route path="/adminUserList" element={<AdminUserList/>} />
          <Route path="/adminBikeList" element={<AdminBikeList/>} />
          <Route path="/adminRentList" element={<AdminRentList/>} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
