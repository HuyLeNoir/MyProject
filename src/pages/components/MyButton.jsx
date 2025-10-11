export default function Button({onClick, children, size, variant, className}){
    const sizes = {
    small: "px-2 py-2 text-p",
    medium: "px-3 py-2 text-h6",
    large: "px-4 py-3 text-h5"
    };
    const variants = {
        underline: "border-b-2",
        outline: "border-2",
        none: "border-none"
    };
    return (
        <button onClick={onClick} className={`${sizes[size]} ${variants[variant]} rounded-md cursor-pointer focus:outline-0 ${className}`}>
            {children}
        </button>
    );
}