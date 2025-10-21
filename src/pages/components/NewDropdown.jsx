import { useEffect, useState, useRef } from "react";
import React from "react";
import { HiUserCircle, HiChevronDown } from "react-icons/hi";

export default function DropDown({
    className = "",
    size = "default",
    children,
    fieldName,
    select,
    setSelect,
}) {
    const sizes = {
        small: "min-w-40",
        medium: "min-w-80",
        default: "",
    };
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef();
    function handleOpen() {
        setOpen(!open);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropDownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    function handleSelect(option) {
        setSelect(option);
        setOpen(false);
    }
    return (
        <div className={className}>
            <div className="flex gap-2.5 items-center" ref={dropDownRef}>
                <p className="p-0.5">{fieldName}</p>
                <div className="relative">
                    <button
                        onClick={handleOpen}
                        className={`${
                            select ? "text-textColor1" : "text-textColor3"
                        } cursor-pointer flex gap-0.5 ${
                            sizes[size]
                        } items-center justify-between border-1 px-3 py-1 rounded-md`}
                    >
                        {select || "Chọn"}
                        <HiChevronDown
                            className={`transition-all duration-500 ease-initial ${
                                open && "rotate-180"
                            }`}
                        ></HiChevronDown>
                    </button>
                    <ul
                        className={`${
                            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }transition-all shadow-md origin-top duration-300 ease-initial z-9999 absolute overflow-hidden border-1 bg-white border-textColor3 w-full rounded-md mt-2 scale-0`}
                    >
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, {
                                onClick: () => handleSelect(child.props.children),
                                className: "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
