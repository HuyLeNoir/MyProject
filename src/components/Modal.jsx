export function Modal({ show, children, onClose }) {
    if (!show) return null;
    return (
        <div className="fixed flex justify-center items-center inset-x-0 top-0 z-50 h-screen bg-black/40 overflow-y-auto overflow-x-hidden md:inset-0 md:h-full">
            <div className="rounded-lg overflow-hidden bg-white w-5/10">{children}</div>
        </div>
    );
}
export function ModalHeader({ children }) {
    return <div className="flex p-5 bg-primaryColor text-h4 text-white">{children}</div>;
}
export function ModalBody({ children }) {
    return <div className="flex flex-col p-5">{children}</div>;
}
export function ModalFooter({ children }) {
    return <div className="flex p-5">{children}</div>;
}
