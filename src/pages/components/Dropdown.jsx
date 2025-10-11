import { useEffect, useState, useRef } from 'react';
import { HiUserCircle, HiChevronDown } from "react-icons/hi";

export default function DropDown({ className, fieldName, options, selected, setSelected, size}){
    const [open, setOpen] = useState(false);
    // const [selected, setSelected] = useState("");
    const sizes = {
        small: "min-w-30",
        medium: "min-w-40",
        large: "min-w-60",
        auto: " ",
    }
    const dropDownRef = useRef();
    function handleOpen(){
        setOpen(!open)
    }
    useEffect(() => {
            const handleClickOutside = (event) => {
                if(!dropDownRef.current.contains(event.target)){
                    setOpen(false)
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []
    );
    function handleSelect(option){
        setSelected(option)
        setOpen(false)
    }
    return(
        <div className={className}>
            <div className="flex gap-2.5 items-center" ref={dropDownRef}>
            <p className='p-0.5'>{fieldName}</p>
            <div className='relative'>
                <button 
                onClick={handleOpen}
                className={`${selected ? "text-textColor1" : "text-textColor3"} ${sizes[size] || " "} cursor-pointer flex gap-0.5 items-center justify-between border-1 px-3 py-1 rounded-md`}>{selected || "Chọn"}
                <HiChevronDown className={`transition-all duration-500 ease-initial ${open && 'rotate-180'}`}></HiChevronDown>
                </button>
                <ul className={`${open ? "scale-100 opacity-100" : "scale-0 opacity-0" }transition-all shadow-md origin-top duration-300 ease-initial absolute overflow-hidden border-1 bg-white border-textColor3 w-full rounded-md mt-2 scale-0`}>
                    {options.map((option, index) => (
                        <li
                        onClick={()=>handleSelect(option)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        key={index}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
}