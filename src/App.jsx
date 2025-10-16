import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import DeTai from "./pages/DeTai";
import BaiBao from "./pages/BaiBao";
import DuAn from "./pages/DuAn";
import ChuyenDe from "./pages/ChuyenDe";
import GiangVien from "./pages/GiangVien";
import Login from "./pages/Login";
import "./App.css";

function App() {
    const router = useRoutes([
        {
            path:"/",
            element: <Navigate to="/detai" replace />,
        },
        {
            path: "/detai",
            element: <DeTai />,
        },
        {
            path: "/baibao",
            element: <BaiBao />,
        },
        {
            path: "/chuyende",
            element: <ChuyenDe />,
        },
        {
            path: "/duan",
            element: <DuAn />,
        },
        {
            path: "/giangvien",
            element: <GiangVien />,
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);
    return router;
    // return (
    //     <Routes>
    //       <Route path="/" element={<Navigate to="/detai" replace />} />
    //       <Route path="/detai" element={<DeTai />} />
    //       <Route path="/baibao" element={<BaiBao />} />
    //       <Route path="/chuyende" element={<ChuyenDe />} />
    //       <Route path="/duan" element={<DuAn />} />
    //       <Route path="/giangvien" element={<GiangVien />} />
    //       <Route path="/login" element={<Login />} />
    //     </Routes>
    // );
}

export default App;
