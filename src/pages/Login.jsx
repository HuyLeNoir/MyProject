import logo1 from "./pagesAssets/logo1.png";
import { HiUser, HiLockClosed  } from "react-icons/hi";
import {useState } from "react";
import {useNavigate} from "react-router-dom";
function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        navigate("/detai");
    }
    return (
        <>
            <div className="h-screen w-full flex flex-col items-center justify-center bg-center bg-cover font-display bg-[url('/RLC1.jpg')]">
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
                    <form className="w-full flex flex-col mt-5 gap-2.5 justify-start" onSubmit={handleSubmit}>
                        <div className="flex gap-4 items-center border-b-2 border-secondaryColor hover:border-ctuColor1 focus-within:border-ctuColor1 transition-all ease-in-out duration-500">
                            <HiUser className="text-h5 text-ctuColor1"></HiUser>
                            <input onChange={handleChange} value={inputs.username} placeholder="Username" className="h-10 w-full outline-0 border-0 " type="text" name="username" id="username" />
                        </div>
                        <div className="flex gap-4 items-center border-b-2 border-secondaryColor hover:border-ctuColor1 focus-within:border-ctuColor1 transition-all ease-in-out duration-500">
                            <HiLockClosed className="text-h5 text-ctuColor1"></HiLockClosed>
                            <input onChange={handleChange} value={inputs.password} placeholder="Password" className="h-10 w-full outline-0 border-0 " type="password" name="password" id="password" />
                        </div>
                        <input className="px-3 py-2 rounded-md cursor-pointer hover:bg-blue-900 duration-500 ease-in-out transition-all text-white bg-ctuColor1 shrink-0 grow-0 self-center mt-2.5" type="submit" value="Đăng nhập" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
