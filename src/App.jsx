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
} from "./pages/Admin";
import { DeTai as AdminDeTai, DanhSachDeTai, NewDeTai, EditDeTai } from "./pages/AdminDeTai";
import AdminNguoiDung from "./pages/AdminNguoiDung";
import AdminDanhMucCap from "./pages/AdminDanhMucCap";
import AdminDanhMucLinhVuc from "./pages/AdminDanhMucLinhVuc";

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
            {location.pathname !== "/login" && !location.pathname.includes("/admin") && (
                <Header>
                    <div className="flex gap-0 NavBar">
                        <NavItem
                            navigateToTarget="/detais"
                            fieldName="Danh sách đề tài NCKH"
                        ></NavItem>
                        <NavItem
                            navigateToTarget="/publications"
                            fieldName="Danh sách bài báo"
                        ></NavItem>
                        <NavItem
                            navigateToTarget="/seminars"
                            fieldName="Danh sách chuyên đề"
                        ></NavItem>
                        <NavItem navigateToTarget="/projects" fieldName="Danh sách dự án"></NavItem>
                        <NavItem
                            navigateToTarget="/teachers"
                            fieldName="Danh sách giảng viên"
                        ></NavItem>
                    </div>
                </Header>
            )}
            <Routes>
                <Route path="/" element={<Navigate to="/detais" replace />} />
                <Route path="/admin" element={<Admin />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="detais" element={<AdminDeTai />}>
                        <Route index element={<DanhSachDeTai />}></Route>
                        <Route path="new" element={<NewDeTai />}></Route>
                        <Route path="edit/:id" element={<EditDeTai />}></Route>
                    </Route>
                    <Route path="publications" element={<AdminBaiBao />} />

                    <Route path="seminars" element={<AdminChuyenDe />} />

                    <Route path="projects" element={<AdminDuAn />} />

                    <Route path="teachers" element={<AdminGiangVien />} />
                    <Route path="users" element={<AdminNguoiDung />} />
                    <Route path="danhmuc/cap" element={<AdminDanhMucCap />}></Route>
                    <Route path="danhmuc/linhvuc" element={<AdminDanhMucLinhVuc />}></Route>
                </Route>
                <Route path="/detais" element={<DeTai />} />
                <Route path="/publications" element={<BaiBao />} />
                <Route path="/seminars" element={<ChuyenDe />} />
                <Route path="/projects" element={<DuAn />} />
                <Route path="/teachers" element={<GiangVien />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </UserContext.Provider>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
