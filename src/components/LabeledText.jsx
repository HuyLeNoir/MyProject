export default function LabeledText({label, children}){
    return(
        <span className="text-K2D text-primaryColor">
               {label + ": "} <span className="text-textColor1">{children}</span>
        </span>
    );
}