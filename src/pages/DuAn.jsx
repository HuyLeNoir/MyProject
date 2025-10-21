import "../App.css";
import { useEffect, useState, useRef } from "react";
import InputGiangVien from "./components/InputGiangVien.jsx";
import Pagination from "./components/pagination.jsx";
import DropDown from "./components/Dropdown.jsx";
import Table from "./components/NormalTable.jsx";
import Search from "./components/Search.jsx";
import NavigationBar from "./components/removed/NavBar.jsx";
import MyButton from "./components/MyButton.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";

//TODO: New normal table componenet

function Main({ children }) {
    return <div className="Wrapper p-4 font-K2D">{children}</div>;
}

function TableDuAn() {
    //fetch data lien quan tu csdl
    const DATA = [
        {
            maDuAn: "maDuAn01",
            tenDuAn: "Tên dự án 1",
            thanhVien: "Thành viên 1 Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",  
            capDuAn: "Cấp cơ sở",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2023 - 13/10/2025",

        },
        {
            maDuAn: "maDuAn02",
            tenDuAn: "Tên dự án 2",
            thanhVien: "Thành viên 1 Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",
            capDuAn: "Cấp bộ",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2023 - 13/10/2025",
        },
        {
            maDuAn: "maDuAn03",
            tenDuAn: "Tên dự án 3",
            thanhVien: "Thành viên 1 Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",
            capDuAn: "Cấp nhà nước",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2023 - 13/10/2025",
        },
        {
            maDuAn: "maDuAn04",
            tenDuAn: "Tên dự án abcxyz",
            thanhVien: "Thành viên 1 Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",
            capDuAn: "Cấp địa phương",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2023 - 13/10/2025",
        },
        {
            maDuAn: "maDuAn05",
            tenDuAn: "Tên dự án áidákdjákdjákdjaksd",
            thanhVien: "Thành viên 1 Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",
            capDuAn: "Cấp bộ",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2023 - 13/10/2025",
        },
        {
            maDuAn: "maDuAn06",
            tenDuAn: "Tên dự án 33339999",
            thanhVien: "Mã Trường Thành Thành viên 2 Thành viên 3 Thành viên 4 Thành viên 5",
            capDuAn: "Cấp nhà nước",
            kinhPhi: "1.000.000$",
            thoiGianThucHien: "13/7/2021 - 13/10/2022",
        },
    ];
    const Theads = [
        { size: "w-[30%]", fieldName: "Tên dự án" },
        { size: "w-[30%]", fieldName: "Thành viên tham gia" },
        { size: "", fieldName: "Kinh phí thực hiện" },
        { size: "", fieldName: "Cấp dự án" },
        { size: "", fieldName: "Thời gian thực hiện" },
    ];
    const fields = ["maDuAn", "tenDuAn", "thanhVien", "kinhPhi", "capDuAn", "thoiGianThucHien"];
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const cacCapDuAn = ["Cấp sinh viên", "Cấp cơ sở", "Cấp nghiên cứu sinh", "Cấp địa phương", "Cấp bộ", "Cấp nhà nước"];
    const giangVienKHMT = [
        {Name: "Mã Trường Thành", MSCB:"002937"},
        {Name: "Võ Trí Thức", MSCB:"002483"},
        {Name: "Trần Nguyễn Minh Thư", MSCB:"002635"},
        {Name: "Trần Việt Châu", MSCB:"002692"},
        {Name: "Phạm Nguyên Khang", MSCB:"001348"},
        {Name: "Lê Quyết Thắng", MSCB:"000509"},
        {Name: "Lưu Tiến Đạo", MSCB:"002805"},
        {Name: "Phạm Xuân Hiền", MSCB:"001707"},
        {Name: "Trần Nguyễn Dương Chi", MSCB:"002684"},
        {Name: "Phan Bích Chung", MSCB:"002265"},
        {Name: "Nguyễn Bá Diệp", MSCB:"002484"},
        {Name: "Phạm Nguyên Hoàng", MSCB:"002640"},
        {Name: "Huỳnh Ngọc Thái Anh", MSCB:"002854"},
    ];
    //cac state

    const [giangVien, setGiangVien] = useState({ Name: "", MSCB: "" });
    const [tableData, setTableData] = useState(DATA);
    const [capDuAn, setCapDuAn] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    //cac bien dung trong danh so trang
    const defaultRowPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [NofRowPerPage, setNofRowPerPage] = useState(defaultRowPerPage); //so row hien thi trong 1 table default: 10
    const totalRows = DATA.length;
    const currentRows = tableData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);
    function handleFilters() {
        let search = searchValue.toLowerCase().trim();
        let data = DATA.filter(
            (item) =>
                (capDuAn === "" || item.capDuAn === capDuAn) &&
                (giangVien.Name === "" || item.thanhVien.includes(giangVien.Name)) &&
                (search === "" || item.tenDuAn.toLowerCase().includes(search)) &&
                (namBD === "" || Number(item.thoiGianThucHien.split("-")[0].split("/")[2].trim()) >= Number(namBD)) &&
                (namKT === "" || Number(item.thoiGianThucHien.split("-")[1].split("/")[2].trim()) <= Number(namKT))
        );
        setTableData(data);
    }
    function clearFilters() {
        setSearchValue("");
        setCapDuAn("");
        setNamBD("");
        setNamKT("");
        setTableData(DATA);
    }
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <MyButton
                    size="small"
                    variant="none"
                    className="self-end bg-buttonColor text-textColor1"
                >
                    Xuất danh sách
                </MyButton>
                <div className="flex gap-2.5 tableNavigation">
                    <DropDown
                        size="medium"
                        selected={capDuAn}
                        setSelected={setCapDuAn}
                        fieldName="Cấp dự án"
                        open={false}
                        options={cacCapDuAn}
                    ></DropDown>
                    <InputGiangVien
                        fieldName={"Giảng viên tham gia"}
                        users={giangVienKHMT}
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                    ></InputGiangVien>
                    <DropDown
                        size="auto"
                        selected={namBD}
                        setSelected={setNamBD}
                        fieldName="Từ năm"
                        open={false}
                        options={years}
                    ></DropDown>
                    <DropDown
                        size="auto"
                        selected={namKT}
                        setSelected={setNamKT}
                        fieldName="Đến năm"
                        open={false}
                        options={years}
                    ></DropDown>
                    <Search searchValue={searchValue} setSearchValue={setSearchValue}></Search>
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
            <Table
                Theads={Theads}
                fields={fields}
                currentPage={currentPage}
                renderAmount={Number(NofRowPerPage)}
                data={tableData}
            ></Table>
            <Pagination
                setCurrentPage={setCurrentPage}
                numberOfRows={totalRows}
                numberOfPage={NoOfPage}
                selected={NofRowPerPage}
                setSelected={setNofRowPerPage}
            ></Pagination>
        </>
    );
}
function DuAn() {
    return (
        <div className="font-display bg-backgroundColor">
            <Main>
                <TableDuAn></TableDuAn>
            </Main>
            <Footer></Footer>
        </div>
    );
}

export default DuAn;
