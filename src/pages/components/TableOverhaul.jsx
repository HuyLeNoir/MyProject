export function Table({ children, className = "", ...props }) {
    return (
        <div className="TableWrapper">
            <table className={`${className} w-full rounded-lg overflow-hidden`} {...props}>
                {children}
            </table>
        </div>
    );
}

export function TableHead({ children, className = "", ...props }) {
    return (
        <thead className={`${className} bg-blue-50 text-textColor2`} {...props}>
            {children}
        </thead>
    );
}

export function TableBody({ children, className = "", ...props }) {
    return (
        <tbody className={`${className} `} {...props}>
            {children}
        </tbody>
    );
}

export function TableRow({ children, className = "", ...props }) {
    return (
        <tr className={`${className}`} {...props}>
            {children}
        </tr>
    );
}

export function TableHeadCell({ children, className = "", ...props }) {
    return (
        <th className={`${className} px-4 py-4`} {...props}>
            {children}
        </th>
    );
}

export function TableCell({ children, className = "", ...props }) {
    return (
        <td className={`${className} px-4 py-4`} {...props}>
            {children}
        </td>
    );
}

export function CheckBox({ onChange, checked, className = "", ...props }) {
    return (
        <label className="peer flex justify-center items-center">
            <input
                type="checkbox"
                onChange={onChange}
                checked={checked}
                className={`${className} size-5 outline-none border-1 border-gray-600 accent-primaryColor checked:appearance-auto overflow-hidden appearance-none rounded sm`}
                {...props}
            />
        </label>
    );
}
