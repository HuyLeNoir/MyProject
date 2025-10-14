import { HiChevronDown } from "react-icons/hi";
import LabeledText from "./LabeledText";
function TRow({ row, handleRowOpening, isOpen, fields, index, children }) {
    return (
        <>
            <tr
                key={row[fields[0]]}
                className={`${
                    index % 2 == 0 && "bg-secondaryColor"
                } cursor-pointer transition-colors`}
                onClick={() => {
                    handleRowOpening(row[fields[0]]);
                }}
            >
                <td className="min-h-15 flex gap-1.5 items-center px-4 py-2">
                    <HiChevronDown
                        size={24}
                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-initial ${
                            isOpen && "rotate-180"
                        }`}
                    ></HiChevronDown>
                    <span>{row[fields[1]]}</span>
                </td>
                <td className="text-center px-4 py-2">{row[fields[2]]}</td>
                <td className="text-center px-4 py-2">{row[fields[3]]}</td>
                <td className="text-center px-4 py-2">{row[fields[4]]}</td>
                <td className="text-center px-4 py-2">{row[fields[5]]}</td>
                {fields.length > 5 && <td className="text-center px-4 py-2">{row[fields[6]]}</td>}
            </tr>
            <tr key={row[fields[0]] + "detailed"}>
                <td colSpan={fields.length - 1}>{children}</td>
            </tr>
        </>
    );
}

//TODO: normalize accordion row : checked
export default function AccordionTableRow({ isOpen, handleRowOpening, row, fields, index }) {
    //Kiem tra fields[0] (maDeTai/maBaiBao dung lam key de phan biet cac loai bang voi nhau => tu do render cac kieu bang khac nhau)
    const renderDeTai = () => (
        <div
            className={`${
                isOpen ? "max-h-160" : "max-h-0"
            } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
        >
            <span>
                <span className="text-K2D text-primaryColor">Tóm tắt:</span> {row.tomTat}
            </span>
            <span className="text-K2D text-primaryColor">
                Giảng viên hướng dẫn: <span className="text-textColor1">{row.GVHD}</span>
            </span>
            <div className="flex flex-col">
                <span className="text-K2D text-primaryColor">Các thành viên tham gia:</span>
                <ol className="list-decimal list-inside p-2 flex flex-col">
                    {row.members.map((member, index) => (
                        <li key={member + " " + index}>{member}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
    const renderBaiBao = () => (
        <div
            className={`${
                isOpen ? "max-h-160" : "max-h-0"
            } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
        >
            <LabeledText label="Tóm tắt">{row.tomTat}</LabeledText>
            <LabeledText label="Keywords">{row.keywords}</LabeledText>
            <LabeledText label="Email liên hệ">{row.emailLienHe}</LabeledText>
            {row.loaiBaiBao === "Tạp chí khoa học" ? (
                <LabeledText label="Đăng trên tạp chí">{row.tenTapChi}</LabeledText>
            ) : (
                <LabeledText label="Công bố tại hội thảo">{row.tenHoiThao}</LabeledText>
            )}
            <LabeledText label="DOI">{row.DOI}</LabeledText>
            <LabeledText label="Trích dẫn">{row.trichDan}</LabeledText>
            <div className="flex flex-col">
                <span className="text-K2D text-primaryColor">Các nguồn tham khảo:</span>
                <ol className="list-decimal list-inside p-2 flex flex-col">
                    {row.nguonThamKhao.map((nguon, index) => (
                        <li key={nguon + " " + index}>{nguon}</li>
                    ))}
                </ol>
            </div>
            <div className="flex flex-col">
                <span className="text-K2D text-primaryColor">Các đề tài nghiên cứu khoa học có liên quan:</span>
                <ol className="list-decimal list-inside p-2 flex flex-col">
                    {row.cacDeTaiLienQuan.map((detai, index) => (
                        <li key={detai + " " + index}>{detai}</li>
                    ))}
                </ol>
            </div>
            {/* TODO: chuyen nguon tham khao thanh accordion */}
        </div>
    );
    const renderChuyenDe = () => (
        <div
            className={`${
                isOpen ? "max-h-160" : "max-h-0"
            } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-in-out`}
        >
            <LabeledText label="Nội dung báo cáo">
                {row.noiDungBaoCao}
            </LabeledText>
            {/* TODO: chuyen nguon tham khao thanh accordion */}
        </div>
    );
    const renderContent = () => {
    switch (fields[0]) {
        case "maDeTai":
            return renderDeTai();
        case "maBaiBao":
            return renderBaiBao();
        case "maChuyenDe":
            return renderChuyenDe();
        default:
            return null;
    }
};
    return (
        <>
            <TRow
                row={row}
                fields={fields}
                isOpen={isOpen}
                index={index}
                handleRowOpening={handleRowOpening}
            >
                {/* children: just make a div containing detailed information :> */}
                {renderContent()}
            </TRow>
        </>
    );
}
