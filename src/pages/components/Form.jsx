export function TextWithLabel({
    disabled = false,
    id,
    className = "",
    children,
    onChange,
    ...props
}) {
    return (
        <span className={`${className} text-p flex flex-col justify-start`}>
            <label className="px-2 whitespace-nowrap" htmlFor={id}>
                {children}
            </label>
            {disabled ? (
                <OnlyText disabled={disabled} onChange={onChange} id={id} {...props} />
            ) : (
                <OnlyText onChange={onChange} id={id} {...props} />
            )}
        </span>
    );
}
export function Select({ className = "", name, id, options, ...props }) {
    <select name={name} id={id}>
        {options.map((option) => (
            <option>{option}</option>
        ))}
    </select>;
}
export function OnlyText({ className = "", placeHolder, icon, disabled, ...props }) {
    return (
        <div className="flex gap-2.5 w-full h-full items-center">
            {icon}
            <input
                {...props}
                placeholder={placeHolder}
                disabled={disabled}
                className={`${className} h-10 w-full px-2 outline-0 border-b-2 transition-all ease-in-out duration-300 border-secondaryColor ${
                    disabled
                        ? "bg-black/5 cursor-not-allowed text-textColor2"
                        : "hover:border-primaryColor focus:border-primaryColor"
                }`}
            />
        </div>
    );
}
