import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from './store/authStore';

import { PrivateRoute } from './components';
import OrdersPage from './pages/Orders/Orders';
import LoginPage from './pages/Login/Login';
import ClientsPage from './pages/Clients/Clients';
import PVZPage from './pages/PVZ/PVZ';
import StatisticsPage from './pages/Statistics/Statistics';
import PartnersPage from './pages/Partners/Partners';
import UsersPage from './pages/Users/Users';
import TransportationPage from './pages/Transportation/Transportation';

function App() {
  const token = localStorage.getItem('token');

  if (token) {
    authStore.fetchProfile();
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
        <Route path="/pvz" element={<PrivateRoute><PVZPage /></PrivateRoute>} />
        <Route path="/statistics" element={<PrivateRoute><StatisticsPage /></PrivateRoute>} />
        <Route path="/partners" element={<PrivateRoute><PartnersPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="/transportation" element={<PrivateRoute><TransportationPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

const ObserverApp = observer(App);

export default ObserverApp;
