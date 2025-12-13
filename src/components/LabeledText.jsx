export default function LabeledText({ label, children }) {
    return (
        <div className=" text-primaryColor">
            {label + ": "} <p className="text-textColor1">{children}</p>
        </div>
    );
}
