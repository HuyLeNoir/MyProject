import Header from "./components/header";
import { Outlet } from "react-router-dom";

// Simple local TextInput for admin page (avoids importing from Login)

// Placeholder components for other admin subpages
export function Dashboard() {
    return <div>Admin Dashboard</div>;
}
export function BaiBao() {
    return <div>Admin Bài Báo</div>;
}
export function ChuyenDe() {
    return <div>Admin Chuyên Đề</div>;
}
export function DuAn() {
    return <div>Admin Dự Án</div>;
}
export function GiangVien() {
    return <div>Admin Giảng Viên</div>;
}
export function NguoiDung() {
    return <div>Admin Người Dùng</div>;
}
export function DanhMuc() {
    return <div>Admin Danh Mục</div>;
}
function NavItem({ children }) {
    return (
        <span className="flex w-full duration-100 text-h5 transition-all ease-in-out px-2 py-1 gap-2.5 hover:border-r-4 hover:text-primaryColor cursor-pointer border-primaryColor">
            {children}
        </span>
    );
}
export default function Admin() {
    return (
        <div className="text-textColor1 font-display overflow-x-hidden">
            <Header></Header>
            <div className="Wrapper h-screen grid grid-cols-10 px-10 py-5 gap-5 bg-backgroundColor">
                <nav className="col-span-2 flex flex-col gap-1">
                    <NavItem>Dashboard</NavItem>
                    <NavItem>Đề tài</NavItem>
                    <NavItem>Bài báo</NavItem>
                    <NavItem>Chuyên đề</NavItem>
                    <NavItem>Dự án</NavItem>
                    <NavItem>Giảng viên</NavItem>
                    <NavItem>Người dùng</NavItem>
                    <NavItem>Danh mục</NavItem>
                </nav>
                <div className="col-span-8 main">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
