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
        <Route path="/orders" element={<PrivateRoute allowedRoles={['admin', 'partner', 'manager']}><OrdersPage /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute allowedRoles={['admin', 'partner', 'manager']}><ClientsPage /></PrivateRoute>} />
        <Route path="/pvz" element={<PrivateRoute allowedRoles={['admin']}><PVZPage /></PrivateRoute>} />
        <Route path="/statistics" element={<PrivateRoute allowedRoles={['admin', 'partner']}><StatisticsPage /></PrivateRoute>} />
        <Route path="/partners" element={<PrivateRoute allowedRoles={['admin']}><PartnersPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute allowedRoles={['admin']}><UsersPage /></PrivateRoute>} />
        <Route path="/transportation" element={<PrivateRoute allowedRoles={['admin', 'partner', 'manager']}><TransportationPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

const ObserverApp = observer(App);

export default ObserverApp;
