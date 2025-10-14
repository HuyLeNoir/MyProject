function TableRow({ row, fields, index }) {
    return (
        <tr className={`${index % 2 === 0 ? "bg-secondaryColor" : "bg-white"}`} key={index}>
            {
                //field == column :>
                fields.slice(1).map((field, index) => {
                    const align = index === 0 ? "text-left" : "text-center";
                    return (
                        <td className={`${align} px-4 py-2 `} key={field + index}>
                            {row[field]}
                        </td>
                    );
                })
            }
        </tr>
    );
}
export default function NormalTable({ Theads, fields, currentPage, renderAmount, data }) {
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
                        .map((row, index) => (
                            <TableRow
                                key={index}
                                index={index}
                                row={row}
                                fields={fields}
                            ></TableRow>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
