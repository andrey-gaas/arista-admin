import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdersPage from './pages/Orders/Orders';
import LoginPage from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
