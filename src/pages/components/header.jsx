import logo1 from "../pagesAssets/logo1.png";
import logo2 from "../pagesAssets/logo2.png";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { HiUserCircle } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Header({ children }) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    function handleLogout() {
        localStorage.clear();
        setUser("");
        alert("Ban co chac muon logout chu?");
    }
    return (
        <>
            <div className="bg-buttonColor p-2 flex items-center justify-between">
                <div className="flex">
                    <img className="aspect-square w-25" src={logo1} alt="logoCtu" />
                    <img className="aspect-square w-25" src={logo2} alt="logoCtu" />
                </div>
                <div className="font-K2D text-textColor1 flex flex-col gap-1 items-center justify-center">
                    <p className="text-h5">Khoa Khoa học máy tính</p>
                    <p className="text-h2 font-semibold">Hệ thống quản lý nghiên cứu khoa học</p>
                </div>
                {user.userId ? (
                    <div className="bg-buttonColor rounded-md p-2 flex flex-col items-center justify-center self-start">
                        <div className="flex gap-2.5 justify-center items-center">
                            <HiUserCircle size={24}></HiUserCircle>
                            <p className="text-h6 font-K2D text-textColor1">
                                Xin chào, {user.userId}
                            </p>
                        </div>
                        <MyButton
                            onClick={handleLogout}
                            size="small"
                            variant="none"
                            className="bg-warningColor self-end mt-2.5"
                        >
                            Đăng xuất
                        </MyButton>
                    </div>
                ) : (
                    <div
                        onClick={() => navigate("/login")}
                        className="bg-buttonColor rounded-md p-2 cursor-pointer flex items-center justify-center self-start group"
                    >
                        <HiUserCircle className="group-hover:text-gray-800 text-3xl duration-500 ease-initial"></HiUserCircle>
                        <p className="text-h6 font-K2D text-textColor1 group-hover:text-gray-800 duration-500 ease-initial">
                            Tài Khoản
                        </p>
                    </div>
                )}
            </div>
            {children}
        </>
    );
}
