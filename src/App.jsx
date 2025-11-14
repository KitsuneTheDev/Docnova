import './App.css';
// ant design imports
import { Button } from 'antd';

// component imports
import { BrowserRouter, Routes, Route } from 'react-router';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';
import PublicRoutes from './pages/PublicRoutes.jsx';
import AppLayout from './components/AppLayout.jsx';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes  />}>
          <Route element={<AppLayout />}>
            <Route path="/invoices" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
