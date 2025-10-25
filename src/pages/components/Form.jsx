export function TextWithLabel({
    disable = false,
    id,
    className = "",
    children,
    onChange,
    ...props
}) {
    return (
        <span className={`text-p flex flex-col justify-start`}>
            <label className="px-2 whitespace-nowrap" htmlFor={id}>
                {children}
            </label>
            {disable ? (
                <OnlyText disabled disable={disable} onChange={onChange} id={id} {...props} />
            ) : (
                <OnlyText onChange={onChange} id={id} {...props} />
            )}
        </span>
    );
}
export function OnlyText({ className = "", disable, ...props }) {
    return (
        <input
            {...props}
            className={`${className} h-10 px-2 outline-0 border-b-2 transition-all ease-in-out duration-300 border-secondaryColor ${
                disable
                    ? "bg-black/5 cursor-not-allowed text-textColor2"
                    : "hover:border-primaryColor focus:border-primaryColor"
            }`}
        />
    );
}
