export default function Button({
    IconLeft,
    IconRight,
    onClick,
    children,
    size,
    variant,
    className = "",
    ...props
}) {
    const sizes = {
        small: "px-2 py-1 text-p",
        medium: "px-3 py-2 text-h6",
        large: "px-4 py-3 text-h5",
    };
    const variants = {
        underline: "border-b-2",
        outline: "border-2",
        none: "border-none",
    };
    return (
        <button
            {...props}
            onClick={onClick}
            className={`${sizes[size]} ${variants[variant]} flex gap-2.5 items-center justify-center rounded-md cursor-pointer focus:outline-0 ${className}`}
        >
            {IconLeft}
            {children}
            {IconRight}
        </button>
    );
}
