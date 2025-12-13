import logo1 from "../assets/logo1.png";
import { HiUser, HiLockClosed } from "react-icons/hi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";
import Toast from "../components/Toast";
export function TextInput({ value, IconLeft, IconRight, onChange, placeHolder, name, id, type }) {
    return (
        <div className="flex w-full gap-4 items-center border-b-2 border-secondaryColor hover:border-ctuColor1 focus-within:border-ctuColor1 transition-all ease-in-out duration-500">
            {IconLeft}
            <input
                onChange={onChange}
                value={value}
                placeholder={placeHolder}
                className="h-10 text-h6 px-2 w-full outline-0 border-0 "
                type={type}
                name={name}
                id={id}
            />
            {IconRight}
        </div>
    );
}

function Login() {
    const { user, setUser } = useContext(UserContext);
    const [ToastMessage, setToastMessage] = useState("");
    const [ToastSuccess, setToastSuccess] = useState(true);
    const [ToastDisplay, SetToastDisplay] = useState(false);
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });
        if (res.ok) {
            const response = await res.json();
            setToastMessage(response.message);
            setToastSuccess(response.success);
            if (response.success) {
                localStorage.setItem("user", JSON.stringify(response.body));
                console.log(response.body.token);
                setUser(response.body.userData);
                setTimeout(() => {
                    if (response.body.userData.role != "Admin") {
                        navigate("/detais");
                    } else {
                        navigate("/admin");
                    }
                }, 2000);
            }
        }
        SetToastDisplay(true);
    }
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center bg-center bg-cover font-display bg-[url('/RLC1.jpg')]">
            <div className="wrapper opacity-98 flex items-center justify-center p-10 flex-col bg-white rounded-md">
                <div className="flex jusitfy-center items-center gap-4">
                    <img className="h-30 w-30 aspect-square " src={logo1} alt="logoctu" />
                    <div className="flex flex-col">
                        <p className="text-h2 leading-10 font-black text-ctuColor1">CICT</p>
                        <p className="text-h6 font-semibold text-ctuGray">
                            Hệ thống quản lý nghiên cứu khoa học
                        </p>
                    </div>
                </div>
                <form
                    className="w-full flex flex-col mt-5 gap-2.5 justify-start"
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        type="text"
                        IconLeft={<HiUser className="text-primaryColor text-h5"></HiUser>}
                        onChange={handleChange}
                        name={"username"}
                        id={"username"}
                        value={inputs.username}
                        placeHolder={"Username"}
                    ></TextInput>
                    <TextInput
                        type="password"
                        IconLeft={
                            <HiLockClosed className="text-primaryColor text-h5"></HiLockClosed>
                        }
                        onChange={handleChange}
                        name={"password"}
                        id={"password"}
                        value={inputs.password}
                        placeHolder={"Password"}
                    ></TextInput>
                    <div className="mt-2.5 flex justify-between items-center">
                        <input
                            className="px-3 py-2 rounded-md cursor-pointer hover:bg-blue-900 duration-500 ease-in-out transition-all text-white bg-ctuColor1 shrink-0 grow-0 self-center"
                            type="submit"
                            value="Đăng nhập"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/");
                            }}
                            className="px-3 py-2 rounded-md cursor-pointer duration-500 ease-in-out transition-all text-textColor2 border-2 border-ctuColor1 shrink-0 grow-0 self-center"
                        >
                            Trở về
                        </button>
                    </div>
                </form>
            </div>
            <Toast
                ToastDisplay={ToastDisplay}
                ToastMessage={ToastMessage}
                ToastSuccess={ToastSuccess}
                SetToastDisplay={SetToastDisplay}
                isSuccess={true}
            ></Toast>
        </div>
    );
}

export default Login;
