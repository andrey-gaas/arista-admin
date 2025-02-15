import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PrivateRoute } from './components';
import OrdersPage from './pages/Orders/Orders';
import LoginPage from './pages/Login/Login';
import authStore from './store/authStore';

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
      </Routes>
    </Router>
  );
}

const ObserverApp = observer(App);

export default ObserverApp;
