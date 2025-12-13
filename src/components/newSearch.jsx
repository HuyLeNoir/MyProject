import { HiSearch } from "react-icons/hi";
export default function Search({ value, setValue, self }) {
    function handleChange(e) {
        setValue(e.target.value);
    }
    let Self = "";
    switch (self) {
        case "end":
            Self = "self-end";
            break;
        case "start":
            Self = "self-start";
            break;
        default:
            break;
    }
    return (
        <div className="flex flex-col">
            <p className="p-0.5">Tìm kiếm</p>
            <div
                className={`${Self} flex px-2 gap-1 items-center border border-textColor3 rounded-3xl focus-within:shadow-md focus-within:border-black transition-all ease-in-out duration-300`}
            >
                <HiSearch className="text-textColor2" size={24}></HiSearch>
                <input
                    onChange={handleChange}
                    value={value}
                    placeholder="Search..."
                    type="text"
                    className="outline-0 rounded-md px-3 py-1"
                ></input>
            </div>
        </div>
    );
}
