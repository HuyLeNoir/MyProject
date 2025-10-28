import AvatarColumn from "./Avatar";
function TableRow({variant, row, fields, index }) {
    let start = variant === "withAvatar" ? 2 : 1;
    return(
        <tr className={`${index % 2 === 0 ? "bg-secondaryColor" : "bg-white"}`} key={index}>
            {variant === "withAvatar" && <td className="px-4 py-2">
                <AvatarColumn name={row["hoTenGV"]} email={row["emailGV"]} MSCB={row[fields[0]]}></AvatarColumn>
            </td>}
            {
                //field == column :>
                fields.slice(start).map((field, index) => {
                    const align = index === 0 && variant !== "withAvatar" ? "text-left" : "text-center";
                    return (
                        <td className={`${align} px-4 py-2`} key={field + index}>
                            {row[field]}
                        </td>
                    );
                })
            }
        </tr>
    );
}
export default function NormalTable({variant, Theads, fields, currentPage, renderAmount, data }) {
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
                                variant={variant}
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
