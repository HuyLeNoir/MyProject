import "../App.css";
import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Pagination from "../components/Pagination.jsx";
import DropDown from "../components/Dropdown.jsx";
import InputGiangVien from "../components/InputGiangVien.jsx";
import Search from "../components/newSearch.jsx";
import { formatCurrency, formatToDisplayDate } from "../util/util.js";
import LabeledText from "../components/LabeledText.jsx";
import MyButton from "../components/MyButton.jsx";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableHeadCell,
} from "../components/Table.jsx";
import Footer from "../components/Footer.jsx";
import { HiChevronDown } from "react-icons/hi";
import { GlobalContext } from "../context/Context.jsx";
import { getSeminars, querySeminars } from "../services/Services_Public.js";
import { exportChuyenDeToExcel } from "../util/exportExcel.js";

//TODO: normalize table for reuseable purpose

function Seminars() {
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    //filter
    const [searchValue, setSearchValue] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [opens, setOpens] = useState([]);
    const [giangVienHD, setGiangVienHD] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    //cac bien dung trong danh so trang
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = tableData.displayData.length;
    const NoOfPage = Math.ceil(totalRows / NofRowPerPage);
    const { data } = useContext(GlobalContext);

    useEffect(() => {
        (async () => {
            const { json } = await getSeminars();
            setTableData({ displayData: json, fetchData: json });
            setOpens(
                json.reduce((acc, element) => {
                    acc[element.ID_SEMINAR] = false;
                    return acc;
                }, {})
            );
        })();
    }, []);
    useEffect(() => {
        console.log(tableData);
    }, [tableData]);
    async function handleFilters() {
        setCurrentPage(0);
        const query = {
            MACB: giangVienHD.MACB,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue,
        };
        const { res, json } = await querySeminars(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
    }
    function clearFilters() {
        setCurrentPage(0);
        setGiangVienHD({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData({ displayData: tableData.fetchData, fetchData: tableData.fetchData });
    }
    function handleExport() {
        exportChuyenDeToExcel(tableData.displayData, "Danh_sach_chuyen_de.xlsx");
    }
    if (!tableData.fetchData) {
        return <div>Loading.....</div>;
    }
    return (
        <div className="font-display flex flex-col min-h-[70vh] bg-white">
            <div className="Wrapper p-4">
                <div className="flex flex-col gap-2.5">
                    <MyButton
                        onClick={handleExport}
                        size="small"
                        variant="none"
                        className="self-end bg-buttonColor text-textColor1"
                    >
                        Xuất danh sách
                    </MyButton>
                    <div className="flex gap-2.5 tableNavigation">
                        <DropDown
                            align="start"
                            direction="vertical"
                            size="auto"
                            select={namBD}
                            setSelect={setNamBD}
                            fieldName="Từ năm"
                            open={false}
                            options={years}
                        ></DropDown>
                        <DropDown
                            align="start"
                            direction="vertical"
                            size="auto"
                            select={namKT}
                            setSelect={setNamKT}
                            fieldName="Đến năm"
                            open={false}
                            options={years}
                        ></DropDown>
                        <InputGiangVien
                            direction="col"
                            fieldName={"Báo cáo viên"}
                            users={data.giangVien}
                            giangVien={giangVienHD}
                            setGiangVien={setGiangVienHD}
                        ></InputGiangVien>
                        <Search self="end" value={searchValue} setValue={setSearchValue}></Search>
                    </div>
                    <div className="flex gap-2.5">
                        <MyButton
                            onClick={handleFilters}
                            size="small"
                            variant="none"
                            className="bg-successColor text-textColor1"
                        >
                            Xác Nhận
                        </MyButton>
                        <MyButton
                            onClick={clearFilters}
                            size="small"
                            variant="none"
                            className="bg-warningColor text-textColor1"
                        >
                            Huỷ
                        </MyButton>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[40%]">Tên chuyên đề</TableHeadCell>
                            <TableHeadCell className="text-center">Báo cáo viên</TableHeadCell>
                            <TableHeadCell className="text-center">Ngày báo cáo</TableHeadCell>
                            <TableHeadCell className="text-center">Địa điểm</TableHeadCell>
                            <TableHeadCell className="text-center">Số lượng</TableHeadCell>
                            <TableHeadCell className="text-center">Đối tượng</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.displayData.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No result
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.displayData
                                .slice(
                                    currentPage * NofRowPerPage,
                                    currentPage * NofRowPerPage + NofRowPerPage
                                )
                                .map((row) => (
                                    <Fragment key={row.ID_SEMINAR}>
                                        <TableRow
                                            className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                setOpens((prev) => ({
                                                    ...prev,
                                                    [row.ID_SEMINAR]: !opens[row.ID_SEMINAR],
                                                }));
                                            }}
                                        >
                                            <TableCell>
                                                <span className="flex gap-2.5 items-center">
                                                    <HiChevronDown
                                                        size={24}
                                                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-in-out ${
                                                            opens[row.ID_SEMINAR] && "rotate-180"
                                                        }`}
                                                    ></HiChevronDown>
                                                    {row.TEN_SEMINAR}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.BAOCAOVIEN}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatToDisplayDate(
                                                    new Date(row.NGAYDIENRA_SEMINAR)
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.DIADIEMDIENRA_SEMINAR}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.SOLUONGTHAMDU_SEMINAR}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.DOITUONGTHAMGIA_SEMINAR}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <div
                                                    className={`${
                                                        opens[row.ID_SEMINAR]
                                                            ? "max-h-100"
                                                            : "max-h-0"
                                                    } px-4 overflow-hidden flex w-full gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
                                                >
                                                    <LabeledText label="Nội dung báo cáo">
                                                        {row.NOIDUNGBAOCAO_SEMINAR}
                                                    </LabeledText>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    direction="vertical"
                    align="end"
                    setCurrentPage={setCurrentPage}
                    numberOfRows={totalRows}
                    numberOfPage={NoOfPage}
                    select={NofRowPerPage}
                    setSelect={setNofRowPerPage}
                ></Pagination>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Seminars;
