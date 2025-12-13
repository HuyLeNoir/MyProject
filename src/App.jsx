import { Navigate, Route, Routes, BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import DeTai from "./pages/DeTai";
import BaiBao from "./pages/BaiBao";
import DuAn from "./pages/DuAn";
import ChuyenDe from "./pages/ChuyenDe";
import GiangVien from "./pages/GiangVien";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { Dashboard } from "./pages/AdminDashboard";
import { DeTai as AdminDeTai, DanhSachDeTai, NewDeTai, EditDeTai } from "./pages/AdminDeTai";
import { AdminChuyenDe, DanhSachChuyenDe, NewChuyenDe, EditChuyenDe } from "./pages/AdminChuyenDe";
import { AdminProject, DanhSachProject, EditProject, NewProject } from "./pages/AdminProject";
import { getCap, getLinhVuc, getType, getUsers } from "./services/Services_Public";
import { SinhVienFromUsers, GiangVienFromUsers } from "./util/util";
import AdminNguoiDung from "./pages/AdminNguoiDung";
import AdminDanhMucCap from "./pages/AdminDanhMucCap";
import AdminDanhMucLoaiBaiBao from "./pages/AdminDanhMucLoaiBaiBao";
import AdminDanhMucLinhVuc from "./pages/AdminDanhMucLinhVuc";
import TeacherDetail from "./pages/TeacherDetail";
import Header from "./components/header";
import NavItem from "./components/navItem";
import { useState, useEffect } from "react";
import { UserContext, GlobalContext } from "./context/Context";
import "./App.css";
import {
    AdminPublication,
    DanhSachPublication,
    EditPublication,
    NewPublication,
} from "./pages/AdminPublication";
function AppContent() {
    const [data, setData] = useState({ levels: [], fields: [], giangVien: [], sinhVien: [] });
    const [user, setUser] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        async function getData() {
            try {
                const [capData, userData, fieldData, types] = await Promise.all([
                    getCap(),
                    getUsers(),
                    getLinhVuc(),
                    getType(),
                ]);
                const { DSCap } = capData;
                const { DSUser } = userData;
                const { DSLinhVuc } = fieldData;
                setData({
                    types: types.json.map((row) => row.TEN_LOAI),
                    levels: DSCap.map((row) => row.TEN_CAP),
                    sinhVien: SinhVienFromUsers(DSUser),
                    giangVien: GiangVienFromUsers(DSUser),
                    fields: DSLinhVuc.map((row) => row.TEN_LINH_VUC),
                });
            } catch (error) {
                console.log(error.message);
                alert("Something went wrong");
            }
        }
        getData();

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser).userData;
            console.log(foundUser);
            setUser(foundUser);
        }
    }, []);
    useEffect(() => {
        if (location.pathname === "/" && user) {
            if (user.role === "Admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/detais", { replace: true });
            }
        }
    }, [location.pathname, user]);
    useEffect(() => {
        if (location.pathname.includes("/admin") && ((user && user.role !== "Admin") || !user)) {
            alert("Không có quyền truy cập");
            console.log("executed");
            navigate("/detais", { replace: true });
        }
    }, [location.pathname, user]);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <GlobalContext.Provider value={{ data }}>
                {location.pathname !== "/login" &&
                    !location.pathname.includes("/admin") &&
                    !location.pathname.includes("error") && (
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
                                <NavItem
                                    navigateToTarget="/projects"
                                    fieldName="Danh sách dự án"
                                ></NavItem>
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
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="teachers/:id" element={<TeacherDetail />} />
                        <Route path="detais" element={<AdminDeTai />}>
                            <Route index element={<DanhSachDeTai />}></Route>
                            <Route path="new" element={<NewDeTai />}></Route>
                            <Route path="edit/:id" element={<EditDeTai />}></Route>
                        </Route>
                        <Route path="publications" element={<AdminPublication />}>
                            <Route index element={<DanhSachPublication />}></Route>
                            <Route path="new" element={<NewPublication />}></Route>
                            <Route path="edit/:id" element={<EditPublication />}></Route>
                        </Route>
                        <Route path="seminars" element={<AdminChuyenDe />}>
                            <Route index element={<DanhSachChuyenDe />}></Route>
                            <Route path="new" element={<NewChuyenDe />}></Route>
                            <Route path="edit/:id" element={<EditChuyenDe />}></Route>
                        </Route>
                        <Route path="projects" element={<AdminProject />}>
                            <Route index element={<DanhSachProject />}></Route>
                            <Route path="new" element={<NewProject />}></Route>
                            <Route path="edit/:id" element={<EditProject />}></Route>
                        </Route>
                        <Route path="users" element={<AdminNguoiDung />} />
                        <Route path="danhmuc/cap" element={<AdminDanhMucCap />}></Route>
                        <Route path="danhmuc/linhvuc" element={<AdminDanhMucLinhVuc />}></Route>
                        <Route path="danhmuc/type" element={<AdminDanhMucLoaiBaiBao />}></Route>
                    </Route>
                    <Route path="/detais" element={<DeTai />} />
                    <Route path="/publications" element={<BaiBao />} />
                    <Route path="/seminars" element={<ChuyenDe />} />
                    <Route path="/projects" element={<DuAn />} />
                    <Route path="/teachers" element={<GiangVien />}></Route>
                    <Route path="/teachers/:id" element={<TeacherDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/error/:status" element={<ErrorWrapper />} />
                </Routes>
            </GlobalContext.Provider>
        </UserContext.Provider>
    );
}
import { useParams } from "react-router-dom";
function ErrorWrapper() {
    const { status } = useParams();
    return <ErrorPage status={Number(status)} />;
}
export function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen font-display">
                <AppContent />
            </div>
        </BrowserRouter>
    );
}
