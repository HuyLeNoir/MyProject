import { useState, useEffect, useRef } from "react";
export default function TextInput({
    fieldName,
    users,
    giangVien,
    setGiangVien,
    size = "auto",
    direction = "row",
}) {
    const sizes = {
        small: "min-w-30",
        medium: "min-w-40",
        large: "min-w-60",
        auto: " ",
    };
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const resultRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!resultRef.current.contains(event.target)) {
                //resultRef.current là html dom
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    function handleUserInput(e) {
        setOpen(true);
        setGiangVien({ input: e.target.value });
        const result = users.filter(
            (user) =>
                user.HO_TEN_USER.toLowerCase().includes(e.target.value.toLowerCase()) ||
                user.MACB.includes(e.target.value)
        );
        if (e.target.value == "" || result.length == 0) {
            setOpen(false);
        }
        setSearchResults(result);
    }
    useEffect(() => {
        setSelected(false);
    }, [!giangVien.input]);
    function onSelectGiangVien(user) {
        setOpen(false);
        setSelected(true);
        setGiangVien({
            input: user.MACB + " - " + user.HO_TEN_USER,
            HO_TEN_USER: user.HO_TEN_USER,
            MACB: user.MACB,
        });
    }
    return (
        <div className={`${direction !== "row" ? "flex-col" : ""} flex justify-center items-left`}>
            <p className="p-0.5">{fieldName}</p>
            <div className={`relative ${sizes[size]}`}>
                <input
                    type="text"
                    onChange={handleUserInput}
                    value={giangVien.input || ""}
                    className={`border-1 ${
                        selected ? "border-black" : "border-textColor3"
                    } focus:shadow-md transition-all outline-0 focus:border-black ease-in-out duration-300 w-full rounded-md px-3 py-1`}
                    placeholder="Nhập tên hoặc MACB"
                />
                <div
                    ref={resultRef}
                    className={`${
                        open
                            ? "scale-100 opacity-100 border-1 border-textColor3"
                            : "scale-0 opacity-0 border-0"
                    } bg-white overflow-hidden rounded-md shadow-md w-full origin-top duration-300 transition-all absolute mt-2 flex flex-col`}
                >
                    {searchResults.map((user) => (
                        <button
                            onClick={() => {
                                onSelectGiangVien(user);
                            }}
                            key={user.MACB}
                            className="hover:bg-gray-50 cursor-pointer text-textColor1 text-p p-2 text-left"
                        >
                            {user.MACB} - {user.HO_TEN_USER}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
