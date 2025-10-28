export default function Button({
    IconLeft,
    IconRight,
    onClick,
    children,
    size = "small",
    variant = "none",
    className = "",
    ...props
}) {
    const sizes = {
        small: "px-2 py-1 text-p min-w-10",
        medium: "px-3 py-2 text-h6 min-w-20",
        large: "px-4 py-3 text-h5 min-w-30",
    };
    const variants = {
        underline: "border-b-3",
        outline: "border-2",
        none: "",
    };
    return (
        <button
            {...props}
            onClick={onClick}
            className={`${sizes[size]} ${
                variants[variant]
            } flex gap-2.5 items-center justify-center ${
                variant == "underline" ? "" : "rounded-md"
            } cursor-pointer focus:outline-0 ${className}`}
        >
            {IconLeft}
            {children}
            {IconRight}
        </button>
    );
}
