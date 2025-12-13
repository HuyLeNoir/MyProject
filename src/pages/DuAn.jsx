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
import {
    getProjects,
    getSeminars,
    queryProjects,
    querySeminars,
} from "../services/Services_Public.js";
import { exportDuAnToExcel } from "../util/exportExcel.js";

function Projects() {
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState({ displayData: [], fetchData: [] });
    //filter
    const [searchValue, setSearchValue] = useState("");
    const [capDuAn, setCapDuAn] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [opens, setOpens] = useState([]);
    const [giangVien, setGiangVien] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    //cac bien dung trong danh so trang
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = tableData.displayData.length;
    const NoOfPage = Math.ceil(totalRows / NofRowPerPage);
    const { data } = useContext(GlobalContext);

    useEffect(() => {
        async function getData() {
            const { json } = await getProjects();
            setTableData({ fetchData: json, displayData: json });
            setOpens(
                json.reduce((acc, element) => {
                    acc[element.ID_PROJECT] = false;
                    return acc;
                }, {})
            );
        }
        getData();
    }, []);
    useEffect(() => {
        console.log(tableData);
    }, [tableData]);

    async function handleFilters() {
        setCurrentPage(0);
        const query = {
            MACB: giangVien.MACB,
            CAP_PROJECT: capDuAn,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue,
        };
        const { res, json } = await queryProjects(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
    }
    function clearFilters() {
        setCurrentPage(0);
        setCapDuAn("");
        setGiangVien({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData({ fetchData: tableData.fetchData, displayData: tableData.fetchData });
    }
    function handleExport() {
        exportDuAnToExcel(tableData.displayData, "Danh_sach_du_an.xlsx");
    }
    if (!tableData) {
        return <div>loading....</div>;
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
                            size="medium"
                            select={capDuAn}
                            setSelect={setCapDuAn}
                            fieldName="Cấp dự án"
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
                            fieldName={"Báo cáo viên"}
                            users={data.giangVien}
                            giangVien={giangVien}
                            setGiangVien={setGiangVien}
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
                            <TableHeadCell className="w-[40%]">Tên dự án</TableHeadCell>
                            <TableHeadCell className="text-center">
                                Thành viên tham gia
                            </TableHeadCell>
                            <TableHeadCell className="text-center">
                                Kinh phí thực hiện
                            </TableHeadCell>
                            <TableHeadCell className="text-center">Cấp dự án</TableHeadCell>
                            <TableHeadCell className="text-center">
                                Thời gian thực hiện
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.displayData.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
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
                                    <Fragment key={row.ID_PROJECT}>
                                        <TableRow
                                            className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                setOpens((prev) => ({
                                                    ...prev,
                                                    [row.ID_PROJECT]: !opens[row.ID_PROJECT],
                                                }));
                                            }}
                                        >
                                            <TableCell>
                                                <span className="flex gap-2.5 items-center">
                                                    <HiChevronDown
                                                        size={24}
                                                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-in-out ${
                                                            opens[row.ID_PROJECT] && "rotate-180"
                                                        }`}
                                                    ></HiChevronDown>
                                                    {row.TEN_PROJECT}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.THANHVIEN.split(",")
                                                    .map((row) => row.split("-")[1])
                                                    .join(", ")}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatCurrency(row.KINHPHI_PROJECT) + " VND"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.CAP_PROJECT}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatToDisplayDate(new Date(row.NGAYBD_PROJECT)) +
                                                    " - " +
                                                    formatToDisplayDate(
                                                        new Date(row.NGAYKT_PROJECT)
                                                    )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div
                                                    className={`${
                                                        opens[row.ID_PROJECT]
                                                            ? "max-h-100"
                                                            : "max-h-0"
                                                    } px-4 overflow-hidden flex w-full gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
                                                >
                                                    <LabeledText label="Mô tả dự án">
                                                        {row.MOTA_PROJECT}
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

export default Projects;
