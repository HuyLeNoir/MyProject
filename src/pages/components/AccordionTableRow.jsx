import { HiChevronDown } from "react-icons/hi";
function TRow({ row, handleRowOpening, isOpen, fields, index, children }) {
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

//TODO: normalize accordion row : checked
export default function AccordionTableRow({ isOpen, handleRowOpening, row, fields, index }) {
    return (
        <>
            <TRow
                row={row}
                fields={fields}
                isOpen={isOpen}
                index={index}
                handleRowOpening={handleRowOpening}
            >
                {/* children: just make a div containing detailed information :> */}
                <div
                    className={`${
                        isOpen ? "max-h-120" : "max-h-0"
                    } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
                >
                    <span>
                        <span className="text-K2D text-primaryColor">Tóm tắt:</span> {row.tomTat}
                    </span>
                    <span className="text-K2D text-primaryColor">
                        Giảng viên hướng dẫn: <span className="text-textColor1">{row.GVHD}</span>
                    </span>
                    <div className="flex flex-col">
                        <span className="text-K2D text-primaryColor">Các thành viên tham gia:</span>
                        <ol className="list-decimal list-inside p-2 flex flex-col">
                            {row.members.map((member, index) => (
                                <li key={member + " " + index}>{member}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </TRow>
        </>
    );
}
