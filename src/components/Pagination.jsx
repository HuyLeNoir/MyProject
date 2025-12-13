import DropDown from "./Dropdown";
export default function Pagination({
    numberOfRows,
    numberOfPage,
    direction = "vertical",
    align = "center",
    select,
    setSelect,
    setCurrentPage,
}) {
    const NoPage = ["5", "10", "15"];
    return (
        <div className=" w-full grid grid-cols-3 items-center">
            <span className="">Tổng: {numberOfRows}</span>
            <div className="flex gap-2.5 items-center justify-self-center">
                {Array.from({ length: numberOfPage }, (_, i) => (
                    <span
                        key={i}
                        onClick={() => {
                            setCurrentPage(i);
                        }}
                        className="pageButton"
                    >
                        {i + 1}
                    </span>
                ))}
            </div>
            <DropDown
                direction={direction}
                align={align}
                select={select}
                setSelect={setSelect}
                className="justify-self-end"
                size="auto"
                fieldName="Số dòng"
                options={NoPage}
            ></DropDown>
        </div>
    );
}
