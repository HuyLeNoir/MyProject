import { useState, useEffect, useRef} from "react";
export default function TextInput({fieldName, users, giangVienHD , setGiangVienHD}){
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false)
    const resultRef = useRef()
    useEffect(() => {
            const handleClickOutside = (event) => {
                if(!resultRef.current.contains(event.target)){ //resultRef.current là html dom
                    setOpen(false)
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []
    );
    function handleUserInput(e){
        setOpen(true)
        setGiangVienHD(prev => ({...prev, Name: e.target.value}))
        console.log(e.target.value) //function test
        const result = users.filter(user =>
            user.Name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        if(e.target.value == "" || result.length == 0){
            setOpen(false)
        }
        setSearchResults(result)
    }
    function onSelectGiangVien(user){
        setOpen(false);
        setGiangVienHD(user);
    }
    return (
        <div className="flex gap-2.5 justify-center items-center">
            <p>{fieldName}</p>
            <div className="relative">
                <input type="text" onChange={handleUserInput} value={giangVienHD.Name} className="border-1 border-textColor3 rounded-md px-3 py-1" placeholder="Nhập tên hoặc MSCB"/>
                <div ref={resultRef} className={`${open ? "scale-100 opacity-100 border-1 border-textColor3" : "scale-0 opacity-0 border-0"} bg-white overflow-hidden rounded-md shadow-md z-10 w-full origin-top duration-300 transition-all absolute mt-2 flex flex-col`}>
                    {
                        searchResults.map(user => (
                            <button onClick={() => {onSelectGiangVien(user)}} key={user.MSCB} className="hover:bg-gray-50 cursor-pointer text-textColor1 text-p p-2 text-left">{user.Name} - {user.MSCB}</button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}