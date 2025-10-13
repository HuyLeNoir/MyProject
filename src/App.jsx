import { Routes, Route, Navigate } from 'react-router-dom';
import DeTai from './pages/DeTai';
import BaiBao from './pages/BaiBao';
import DuAn from './pages/DuAn';
import ChuyenDe from './pages/ChuyenDe';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/detai" replace />} />
        <Route path="/detai" element={<DeTai />} />
        <Route path="/baibao" element={<BaiBao />} />
        <Route path="/chuyende" element={<ChuyenDe />} />
        <Route path="/duan" element={<DuAn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App
