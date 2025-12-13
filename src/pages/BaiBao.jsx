import "../App.css";
import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Pagination from "../components/Pagination.jsx";
import DropDown from "../components/Dropdown.jsx";
import InputGiangVien from "../components/InputGiangVien.jsx";
import Search from "../components/newSearch.jsx";
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
import { getPublications, queryPublications } from "../services/Services_Public.js";
import { formatToDisplayDate } from "../util/util.js";
import { exportBaiBaoToExcel } from "../util/exportExcel.js";

//TODO: normalize table for reuseable purpose

function Publications() {
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    const [publicationType, setPublicationType] = useState("");
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
    const currentRows = tableData.displayData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);
    const { data } = useContext(GlobalContext);

    useEffect(() => {
        (async () => {
            const { json } = await getPublications();
            setTableData({ fetchData: json, displayData: json });
            setOpens(
                json.reduce((acc, element) => {
                    acc[element.ID_BAIBAO] = false;
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
            MACB: giangVienHD.MACB || null,
            LOAI_BAIBAO: publicationType || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryPublications(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
    }
    function clearFilters() {
        setCurrentPage(0);
        setPublicationType("");
        setGiangVienHD({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData((prev) => ({ ...prev, displayData: tableData.fetchData }));
    }
    function handleExport() {
        exportBaiBaoToExcel(tableData.displayData, "Danh_sach_bai_bao.xlsx");
    }
    if (!tableData.displayData) {
        return <div>loading</div>;
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
                            size="medium"
                            select={publicationType}
                            setSelect={setPublicationType}
                            fieldName="Loại bài báo"
                            open={false}
                            options={data.types}
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
                            fieldName={"Thành viên tham gia"}
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
                            <TableHeadCell className="w-[40%]">Tên bài báo</TableHeadCell>
                            <TableHeadCell className="text-center">Loại bài báo</TableHeadCell>
                            <TableHeadCell className="text-center">Ngày công bố</TableHeadCell>
                            <TableHeadCell className="text-center">Thành viên</TableHeadCell>
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
                                    <Fragment key={row.ID_BAIBAO}>
                                        <TableRow
                                            className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                            onClick={() => {
                                                setOpens((prev) => ({
                                                    ...prev,
                                                    [row.ID_BAIBAO]: !opens[row.ID_BAIBAO],
                                                }));
                                            }}
                                        >
                                            <TableCell>
                                                <span className="flex gap-2.5 items-center">
                                                    <HiChevronDown
                                                        size={24}
                                                        className={`flex-shrink-0 inline-block leading-none align-middle transition-all text-textColor2 duration-500 ease-in-out ${
                                                            opens[row.ID_BAIBAO] && "rotate-180"
                                                        }`}
                                                    ></HiChevronDown>
                                                    {row.TEN_BAIBAO}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.LOAI_BAIBAO}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatToDisplayDate(new Date(row.NAM_BAIBAO))}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {row.THANHVIEN.split(",")
                                                    .map((row) => row.split(" - ")[1])
                                                    .join(", ")}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div
                                                    className={`${
                                                        opens[row.ID_BAIBAO]
                                                            ? "max-h-160"
                                                            : "max-h-0"
                                                    } px-4 overflow-hidden flex gap-1 flex-col origin-top transition-all duration-500 ease-initial`}
                                                >
                                                    <LabeledText label="Tóm tắt">
                                                        {row.TOMTAT_BAIBAO}
                                                    </LabeledText>
                                                    <LabeledText label="Keywords">
                                                        {row.KEYWORD_BAIBAO}
                                                    </LabeledText>
                                                    {row.LOAI_BAIBAO == "Tạp chí khoa học" ? (
                                                        <div className="flex gap-10">
                                                            <LabeledText label="Đăng trên tạp chí">
                                                                {row.TEN_TAPCHI}
                                                            </LabeledText>
                                                            <LabeledText label="Số đăng">
                                                                {row.SOTAP_TAPCHI}
                                                            </LabeledText>
                                                        </div>
                                                    ) : row.LOAI_BAIBAO == "Hội thảo khoa học" ? (
                                                        <div className="flex gap-10">
                                                            <LabeledText label="Công bố tại hội thảo">
                                                                {row.TEN_HOITHAO}
                                                            </LabeledText>
                                                            <LabeledText label="Địa điểm">
                                                                {row.DIADIEM_HOITHAO}
                                                            </LabeledText>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <LabeledText label="DOI">
                                                        {row.DOI_BAIBAO}
                                                    </LabeledText>
                                                    <LabeledText label="Trích dẫn">
                                                        {row.TRICHDAN_BAIBAO}
                                                    </LabeledText>
                                                    <div className="flex flex-col">
                                                        <span className="text-K2D text-primaryColor">
                                                            Các nguồn tham khảo:
                                                        </span>
                                                        <ol className="list-decimal list-inside p-2 flex flex-col">
                                                            {row.NGUONTHAMKHAO_BAIBAO
                                                                ? row.NGUONTHAMKHAO_BAIBAO.split(
                                                                      ";"
                                                                  ).map((nguon, index) => (
                                                                      <li key={nguon + " " + index}>
                                                                          {nguon}
                                                                      </li>
                                                                  ))
                                                                : "Không có dữ liệu"}
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

export default Publications;
