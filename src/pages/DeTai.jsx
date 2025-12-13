import "../App.css";
import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Pagination from "../components/Pagination.jsx";
import DropDown from "../components/Dropdown.jsx";
import InputGiangVien from "../components/InputGiangVien.jsx";
import Search from "../components/newSearch.jsx";
import { formatCurrency, formatToDisplayDate } from "../util/util.js";
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
import { getDeTai, queryResearchs } from "../services/Services_Public.js";
import { exportDeTaiToExcel } from "../util/exportExcel.js";

//TODO: normalize table for reuseable purpose

function DeTai() {
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    //filter
    const [linhVuc, setLinhVuc] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [capDeTai, setCapDeTai] = useState("");
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
            const { res, json } = await getDeTai();
            setTableData((prev) => ({ fetchData: json, displayData: json }));
            setOpens(
                json.reduce((acc, element) => {
                    acc[element.ID_DETAI] = false;
                    return acc;
                }, {})
            );
        })();
    }, []);
    async function handleFilters() {
        const query = {
            MACB: giangVienHD.MACB || null,
            TEN_LINH_VUC: linhVuc || null,
            TEN_CAP: capDeTai || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryResearchs(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
    }
    function clearFilters() {
        setCapDeTai("");
        setLinhVuc("");
        setGiangVienHD({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData((prev) => ({ ...prev, displayData: tableData.fetchData }));
    }
    function handleExport() {
        exportDeTaiToExcel(tableData.fetchData, "Danh_sach_de_tai.xlsx");
    }
    if (!tableData) {
        return <div>loading...</div>;
    }
    return (
        <div className="font-display bg-white">
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
                            select={linhVuc}
                            setSelect={setLinhVuc}
                            fieldName="Lĩnh vực"
                            open={false}
                            size="medium"
                            options={data.fields}
                        ></DropDown>
                        <DropDown
                            align="start"
                            direction="vertical"
                            size="medium"
                            select={capDeTai}
                            setSelect={setCapDeTai}
                            fieldName="Cấp đề tài"
                            open={false}
                            options={data.levels}
                        ></DropDown>
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
                            fieldName={"Giảng Viên Hướng Dẫn"}
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
                            <TableHeadCell className="w-[50%]">Tên đề tài</TableHeadCell>
                            <TableHeadCell className="text-center">Cấp đề tài</TableHeadCell>
                            <TableHeadCell className="text-center">Lĩnh vực</TableHeadCell>
                            <TableHeadCell className="text-center">Chủ nhiệm</TableHeadCell>
                            <TableHeadCell className="text-center">Ngày thực hiện</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.displayData.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
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
                                    <Fragment key={row.ID_DETAI}>
                                        <TableRow
                                            className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                setOpens((prev) => ({
                                                    ...prev,
                                                    [row.ID_DETAI]: !opens[row.ID_DETAI],
                                                }));
                                            }}
                                        >
                                            <TableCell>
                                                <span className="flex gap-2.5 items-center">
                                                    <HiChevronDown
                                                        size={24}
                                                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-in-out ${
                                                            opens[row.ID_DETAI] && "rotate-180"
                                                        }`}
                                                    ></HiChevronDown>
                                                    {row.TEN_DETAI}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.TEN_CAP}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.TEN_LINH_VUC}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {
                                                    row.THANHVIEN.split(",")
                                                        .filter(
                                                            (element) =>
                                                                element.split("-")[2] == "Chủ nhiệm"
                                                        )[0]
                                                        .split("-")[1]
                                                }
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatToDisplayDate(new Date(row.NGAYBD)) +
                                                    " - " +
                                                    formatToDisplayDate(new Date(row.NGAYKT))}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div
                                                    className={`${
                                                        opens[row.ID_DETAI]
                                                            ? "max-h-160"
                                                            : "max-h-0"
                                                    } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
                                                >
                                                    <span className="flex gap-2.5">
                                                        <span className=" text-primaryColor">
                                                            Tóm tắt:
                                                        </span>
                                                        <span>{row.TOMTAT_NCKH}</span>
                                                    </span>
                                                    <span className="flex gap-2.5 text-primaryColor">
                                                        <span>Giảng viên hướng dẫn:</span>
                                                        <span className="text-textColor1">
                                                            {row.GVHD.split("-")[1]}
                                                        </span>
                                                    </span>
                                                    <div className="flex gap-10">
                                                        <div className="flex gap-2.5">
                                                            <span className="text-primaryColor">
                                                                Kinh phí dự kiến
                                                            </span>
                                                            <span>
                                                                {formatCurrency(row.KINHPHIDUKIEN)}{" "}
                                                                VND
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2.5">
                                                            <span className="text-primaryColor">
                                                                Kinh phí thực tế
                                                            </span>
                                                            <span>
                                                                {formatCurrency(row.KINHPHITHUCCHI)}{" "}
                                                                VND
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className=" text-primaryColor">
                                                            Các thành viên tham gia:
                                                        </span>
                                                        <ol className="list-decimal list-inside p-2 flex flex-col">
                                                            {row.THANHVIEN.split(",").map(
                                                                (member, index) => (
                                                                    <li key={member + " " + index}>
                                                                        {member.split("-")[1]}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ol>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className=" text-primaryColor">
                                                            Các bài báo liên quan
                                                        </span>
                                                        <ol className="list-decimal list-inside p-2 flex flex-col">
                                                            {row.THANHVIEN.split(",").map(
                                                                (member, index) => (
                                                                    <li key={member + " " + index}>
                                                                        {member.split("-")[1]}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ol>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    align="start"
                    direction="vertical"
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

export default DeTai;
