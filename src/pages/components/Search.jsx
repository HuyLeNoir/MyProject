import { useState, useRef, useEffect } from "react";
import { HiOutlineSearch,HiX  } from "react-icons/hi";
export default function Search({searchValue, setSearchValue}){
    const [searching, setSearching] = useState(false);
    const fieldRef = useRef();
    function handleInput(e){
        setSearchValue(e.target.value)
        if(e.target.value === ""){
            setSearching(false)
        }
    }
    useEffect(() => {
            const handleClickOutside = (event) => {
                if(!fieldRef.current.contains(event.target)){
                    setSearching(false)
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []
    );
    return(
        <div className="flex focus-within:border-2 focus-within:border-black justify-center items-center p-0.5 transition-all duration-300 ease-initial rounded-md border-1 border-textColor3 gap-2.5">
            <HiOutlineSearch className={`${!searching ? "max-w-120" : "max-w-0"} transition-all duration-300 ease-initial text-2xl text-textColor2`}></HiOutlineSearch>
            <input ref={fieldRef} onClick={()=>{setSearching(true)}} onChange={handleInput} value={searchValue} className="text-p focus:outline-none text-textColor1" type="text" placeholder="Tìm Kiếm"/>
            <button className="rounded-full text-2xl cursor-pointer transition-colors duration-300 ease-initial hover:bg-buttonColor bg-secondaryColor text-textColor2" onClick={() => {
                setSearching(false);
                setSearchValue("")
            }}><HiX/></button>
        </div>
    );
}