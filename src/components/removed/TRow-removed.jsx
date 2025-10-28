import { HiChevronDown } from "react-icons/hi";
export default function TRow({ row, handleRowOpening, isOpen, fields, index, children }) {
    return (
        <>
            <tr
                key={row[fields[0]]}
                className={`${
                    index % 2 == 0 && "bg-secondaryColor "
                } cursor-pointer transition-colors `}
                onClick={() => {
                    handleRowOpening(row[fields[0]]);
                }}
            >
                <td className="flex gap-1.5 items-center px-4 py-2">
                    <HiChevronDown
                        size={24}
                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-initial ${
                            isOpen && "rotate-180"
                        }`}
                    ></HiChevronDown>
                    <span>{row[fields[1]]}</span>
                </td>
                <td className="text-center px-4 py-2">{row[fields[2]]}</td>
                <td className="text-center px-4 py-2">{row[fields[3]]}</td>
                <td className="text-center px-4 py-2">{row[fields[4]]}</td>
                <td className="text-center px-4 py-2">{row[fields[5]]}</td>
            </tr>
            <tr key={row[fields[0]] + "detailed"}>
                <td colSpan="5">
                    {children}
                </td>
            </tr>
        </>
    );
}
