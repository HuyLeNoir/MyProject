import Header from "./components/header";
import { Outlet, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";

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
function NavItem({ children }) {
    return (
        <span className="flex w-full duration-100 text-h5 transition-all ease-in-out px-2 py-1 gap-2.5 hover:border-r-4 hover:text-primaryColor cursor-pointer border-primaryColor">
            {children}
        </span>
    );
}
export default function Admin() {
    const [open, setOpen] = useState(false);
    return (
        <div className="text-textColor1 font-display overflow-x-hidden">
            <Header></Header>
            <div className="Wrapper h-screen grid grid-cols-10 px-10 py-5 gap-5 bg-backgroundColor">
                <nav className="col-span-2 flex flex-col gap-1">
                    <NavItem>
                        <Link to="dashboard">Dashboard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="detais">Đề tài NCKH</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="publications">Bài báo</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="seminars">Chuyên đề</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="projects">Dự án</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="teachers">Giảng viên</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="users">Người dùng</Link>
                    </NavItem>
                    <div className="dropdown">
                        <div
                            onClick={() => {
                                setOpen(!open);
                            }}
                            className="w-full flex gap-2.5 justify-between items-center text-h5 transition-all duration-100 ease-in-out px-2 py-1 hover:border-r-4 hover:text-primaryColor cursor-pointer border-primaryColor"
                        >
                            <span>Danh mục</span>
                            <HiChevronDown></HiChevronDown>
                        </div>
                        <ul
                            className={`content overflow-hidden text-h6 transition-all ease-in-out duration-200 ${
                                open ? "max-h-20" : "max-h-0"
                            }`}
                        >
                            <li className="px-5 py-1">
                                <Link to="danhmuc/cap">Cấp bậc nghiên cứu</Link>
                            </li>
                            <li className="px-5 py-1">
                                <Link to="danhmuc/linhvuc">Lĩnh vực nghiên cứu</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="col-span-8 main">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
