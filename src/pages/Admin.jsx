import Header from "../components/header.jsx";
import { Outlet, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { useState, useCallback } from "react";
import { AdminContext } from "../context/Context.jsx";

// Simple local TextInput for admin page (avoids importing from Login)

// Placeholder components for other admin subpages

function NavItem({ children }) {
    return (
        <span className="flex w-full duration-100 text-h5 transition-all ease-in-out px-2 py-1 gap-2.5 hover:border-r-4 hover:text-primaryColor cursor-pointer border-primaryColor">
            {children}
        </span>
    );
}
function DropDownMenu() {
    const [open, setOpen] = useState(false);

    return (
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
                    open ? "max-h-40" : "max-h-0"
                }`}
            >
                <li className="px-5 py-1 hover:bg-gray-50 transition-all ease-in-out duration-200 hover:text-ctuColor1">
                    <Link to="danhmuc/cap">Cấp bậc nghiên cứu</Link>
                </li>
                <li className="px-5 py-1 hover:bg-gray-50 transition-all ease-in-out duration-200 hover:text-ctuColor1">
                    <Link to="danhmuc/linhvuc">Lĩnh vực nghiên cứu</Link>
                </li>
                <li className="px-5 py-1 hover:bg-gray-50 transition-all ease-in-out duration-200 hover:text-ctuColor1">
                    <Link to="danhmuc/type">Loại bài báo</Link>
                </li>
            </ul>
        </div>
    );
}
function AdminContent() {
    const [ToastMessage, setToastMessage] = useState("");
    const [ToastSuccess, setToastSuccess] = useState(true);
    const [ToastDisplay, setToastDisplay] = useState(false);

    /**
     * Hiển thị Toast thông báo
     * @param {string} message Thông báo muốn hiển thị
     * @param {boolean} success Trạng thái thành công hay thất bại
     */
    const showToast = useCallback(
        (message, success) => {
            setToastMessage(message);
            setToastSuccess(success);
            setToastDisplay(true);
        },
        [setToastMessage, setToastSuccess, setToastDisplay]
    );
    // Dependencies: Bao gồm tất cả các hàm setter được sử dụng bên trong.

    // ✨ Tối ưu hóa ToastResponse ✨
    const ToastResponse = useCallback(
        async (res) => {
            const response = await res.json();
            // showToast cũng là một dependency vì nó được gọi bên trong hàm này
            showToast(response.message, response.success);
        },
        [showToast]
    );
    return (
        <div className="col-span-8 main">
            <AdminContext.Provider
                value={{
                    ToastMessage,
                    ToastSuccess,
                    ToastDisplay,
                    setToastDisplay,
                    setToastMessage,
                    setToastSuccess,
                    ToastResponse,
                    showToast,
                }}
            >
                <Outlet></Outlet>
            </AdminContext.Provider>
        </div>
    );
}
export default function Admin() {
    return (
        <div className="text-textColor1 font-display h-screen bg-backgroundColor overflow-x-hidden">
            <Header></Header>
            <div className="Wrapper relative grid grid-cols-10 py-5 gap-5">
                <nav className="col-span-2 flex sticky top-5 bg-white flex-col self-start rounded-lg shadow-md gap-1">
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
                        <Link to="users">Người dùng</Link>
                    </NavItem>
                    <DropDownMenu />
                </nav>
                <AdminContent />
            </div>
        </div>
    );
}
