import { useEffect, useState } from "react";
import AcordionTableRow from "./AccordionTableRow";
export default function Table({ renderAmount, currentPage, Theads, data, fields }) {
    const [rows, setRows] = useState({});
    //{id, open/close}
    function handleRowOpening(id) {
        setRows((prev) => ({ ...prev, [id]: !prev[id] })); //trang thai open/close cua cac row
        console.log("open" + id);
    }
    useEffect(() => {
        console.log(rows);
    }, [rows]);
    return (
        <div className="p-4">
            <table className="min-w-full rounded-lg overflow-hidden">
                <thead className="bg-backgroundColor text-h6 text-textColor3">
                    <tr>
                        {Theads.map(({ size, fieldName }) => (
                            <th key={fieldName} className={`text-center ${size}`}>
                                {fieldName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice(
                            renderAmount * currentPage,
                            renderAmount * currentPage + renderAmount
                        )
                        .map((rowData, index) => (
                            <AcordionTableRow
                                key={rowData[fields[0]]}
                                handleRowOpening={handleRowOpening}
                                row={rowData}
                                fields={fields}
                                isOpen={rows[rowData[fields[0]]]}
                                index={index}
                            ></AcordionTableRow>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
