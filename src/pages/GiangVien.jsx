import "../App.css";
import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Pagination from "../components/Pagination.jsx";
import DropDown from "../components/Dropdown.jsx";
import InputGiangVien from "../components/InputGiangVien.jsx";
import Search from "../components/newSearch.jsx";
import { formatCurrency, formatToDisplayDate } from "../util/util.js";
import LabeledText from "../components/LabeledText.jsx";
import MyButton from "../components/MyButton.jsx";
import { redirect, useNavigate } from "react-router-dom";
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
import { getProjects, getSeminars } from "../services/Services_Public.js";

export default function Teachers() {
    const navigate = useNavigate();
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState([]);
    //filter
    const [searchValue, setSearchValue] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [giangVien, setGiangVien] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    //cac bien dung trong danh so trang
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = tableData.length;
    const currentRows = tableData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);
    const { data } = useContext(GlobalContext);

    useEffect(() => {
        console.log(data);
        setTableData(data.giangVien);
    }, [data]);
    useEffect(() => {}, [tableData]);

    function handleFilters() {
        let data = tableData.filter(
            (item) =>
                (giangVienHD.Name === "" ||
                    item.GVHD.toLowerCase() === giangVienHD.Name.toLowerCase()) &&
                (linhVuc === "" || item.linhVuc === linhVuc) &&
                (searchValue.trim() === "" ||
                    item.tomTat.toLowerCase().includes(searchValue.trim()) ||
                    item.members.toString().toLowerCase().includes(searchValue.trim())) &&
                (capDeTai === "" || item.capDeTai === "Đề tài cấp " + capDeTai) &&
                (namBD === "" || Number(item.ngayThucHien.split("/")[2]) >= Number(namBD)) &&
                (namKT === "" || Number(item.ngayThucHien.split("/")[2]) <= Number(namKT))
        );
        setTableData(data);
    }
    function clearFilters() {
        setCapDeTai("");
        setLinhVuc("");
        setGiangVien({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData(tableData);
    }
    return (
        <div className="font-display flex flex-col min-h-[70vh] bg-white">
            <div className="Wrapper p-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[40%] text-left">
                                Tên giảng viên
                            </TableHeadCell>
                            <TableHeadCell className="text-center">Mã số cán bộ</TableHeadCell>
                            <TableHeadCell className="text-center">
                                Trình độ chuyên môn
                            </TableHeadCell>
                            <TableHeadCell className="text-center">Email</TableHeadCell>
                            <TableHeadCell className="text-center">SDT</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData
                            .slice(
                                currentPage * NofRowPerPage,
                                currentPage * NofRowPerPage + NofRowPerPage
                            )
                            .map((row) => (
                                <Fragment key={row.USERID}>
                                    <TableRow
                                        className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                        onClick={() => {
                                            navigate(`/teachers/${row.MACB}`);
                                        }}
                                    >
                                        <TableCell>
                                            <div className="flex gap-5">
                                                <div className="avatarWrapper aspect-square w-12 rounded-full overflow-hidden">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt="GiangVienAvatar"
                                                        src={`/${row.MACB}.jpg`}
                                                    />
                                                </div>
                                                <div className="Name flex flex-col">
                                                    <p className="text-textColor1 text-h6">
                                                        {row.HO_TEN_USER}
                                                    </p>
                                                    <p className="text-small text-textColor2">
                                                        {row.EMAIL}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">{row.MACB}</TableCell>
                                        <TableCell className="text-center">{row.HOC_VAN}</TableCell>
                                        <TableCell className="text-center">{row.EMAIL}</TableCell>
                                        <TableCell className="text-center">{row.SDT}</TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
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
