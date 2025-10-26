import { useEffect } from "react";
export default function Toast({ ToastDisplay, ToastSuccess, SetToastDisplay, ToastMessage }) {
    const pos = ToastDisplay ? "top-4 opacity-100" : "-top-20 opacity-0";
    const bgColor = ToastSuccess ? "bg-successColor" : "bg-warningColor";
    //-20-> 1
    useEffect(() => {
        const timer = setTimeout(() => SetToastDisplay(false), 2000);
        return () => clearTimeout(timer); // cleanup tránh leak
    }, [ToastDisplay]);
    return (
        <div
            className={`${
                ToastDisplay ? "visible" : "invisible"
            } fixed w-screen z-99999 flex-col pointer-events-none h-screen top-0 inset-x-0 flex items-center justify-start`}
        >
            <div
                className={`rounded-sm text-textColor1 text-h5 px-2 py-1 ${bgColor} absolute ${pos} transition-all ease-in-out`}
            >
                <p>{ToastMessage}</p>
            </div>
        </div>
    );
}
