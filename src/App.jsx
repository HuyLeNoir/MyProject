import { Navigate, Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import DeTai from "./pages/DeTai";
import BaiBao from "./pages/BaiBao";
import DuAn from "./pages/DuAn";
import ChuyenDe from "./pages/ChuyenDe";
import GiangVien from "./pages/GiangVien";
import Login from "./pages/Login";
import Admin, {
    Dashboard as AdminDashboard,
    BaiBao as AdminBaiBao,
    ChuyenDe as AdminChuyenDe,
    DuAn as AdminDuAn,
    GiangVien as AdminGiangVien,
    NguoiDung as AdminNguoiDung,
    DanhMuc as AdminDanhMuc,
} from "./pages/Admin";
import { DeTai as AdminDeTai, DanhSachDeTai, NewDeTai, EditDeTai } from "./pages/AdminDeTai";
import Header from "./pages/components/header";
import NavItem from "./pages/components/navItem";
import { useState, createContext, useEffect, useContext } from "react";
import "./App.css";

//TODO: finish admin
export const UserContext = createContext();
function AppContent() {
    const [user, setUser] = useState("");
    const location = useLocation();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {location.pathname !== "/login" && !location.pathname.includes("/Admin") && (
                <Header>
                    <div className="flex gap-0 NavBar">
                        <NavItem
                            navigateToTarget="/detai"
                            fieldName="Danh sách đề tài NCKH"
                        ></NavItem>
                        <NavItem navigateToTarget="/baibao" fieldName="Danh sách bài báo"></NavItem>
                        <NavItem
                            navigateToTarget="/chuyende"
                            fieldName="Danh sách chuyên đề"
                        ></NavItem>
                        <NavItem navigateToTarget="/duan" fieldName="Danh sách dự án"></NavItem>
                        <NavItem
                            navigateToTarget="/giangvien"
                            fieldName="Danh sách giảng viên"
                        ></NavItem>
                    </div>
                </Header>
            )}
            <Routes>
                <Route path="/" element={<Navigate to="/detai" replace />} />
                <Route path="/Admin" element={<Admin />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="detai" element={<AdminDeTai />}>
                        <Route index element={<DanhSachDeTai />}></Route>
                        <Route path="new" element={<NewDeTai />}></Route>
                        <Route path="edit/:id" element={<EditDeTai />}></Route>
                    </Route>
                    <Route path="baibao" element={<AdminBaiBao />} />
                    <Route path="chuyende" element={<AdminChuyenDe />} />
                    <Route path="duan" element={<AdminDuAn />} />
                    <Route path="giangvien" element={<AdminGiangVien />} />
                    <Route path="nguoidung" element={<AdminNguoiDung />} />
                    <Route path="danhmuc" element={<AdminDanhMuc />} />
                </Route>
                <Route path="/detai" element={<DeTai />} />
                <Route path="/baibao" element={<BaiBao />} />
                <Route path="/chuyende" element={<ChuyenDe />} />
                <Route path="/duan" element={<DuAn />} />
                <Route path="/giangvien" element={<GiangVien />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
