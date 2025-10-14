import "../App.css";
import { useEffect, useState, useRef } from "react";
import InputGiangVien from "./components/InputGiangVien.jsx";
import Pagination from "./components/pagination.jsx";
import Table from "./components/NormalTable.jsx";
import NavigationBar from "./components/NavBar.jsx";
import MyButton from "./components/MyButton.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";

//TODO: New normal table componenet

function Main({ children }) {
    return <div className="Wrapper p-4">{children}</div>;
}

function TableDuAn() {
    //fetch data lien quan tu csdl
    const DATA = [
        {hoTenGV: "Mã Trường Thành", MSCB:"002937", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Võ Trí Thức", MSCB:"002483", hocVi: "Nghiên cứu sinh", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Trần Nguyễn Minh Thư", MSCB:"002635", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Trần Việt Châu", MSCB:"002692", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Phạm Nguyên Khang", MSCB:"001348", hocVi: "Phó Giáo Sư - Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Lê Quyết Thắng", MSCB:"000509", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Lưu Tiến Đạo", MSCB:"002805", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Phạm Xuân Hiền", MSCB:"001707", hocVi: "Thạc sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Trần Nguyễn Dương Chi", MSCB:"002684", hocVi: "Tiến sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Phan Bích Chung", MSCB:"002265", hocVi: "Thạc sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Nguyễn Bá Diệp", MSCB:"002484", hocVi: "Nghiên cứu sinh", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Phạm Nguyên Hoàng", MSCB:"002640", hocVi: "Thạc sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
        {hoTenGV: "Huỳnh Ngọc Thái Anh", MSCB:"002854", hocVi: "Thạc sĩ", emailGV: "abcxyz@ctu.edu.vn", sdtGV :"0999999999"},
    ];
    const Theads = [
        { size: "w-[30%]", fieldName: "Tên giảng viên" },
        { size: "", fieldName: "Mã số cán bộ" },
        { size: "", fieldName: "Trình độ chuyên môn" },
        { size: "", fieldName: "Email" },
        { size: "", fieldName: "SDT" },
    ];
    //field[0] phai la key nen lap lai mscb
    const fields = ["MSCB", "hoTenGV", "MSCB", "hocVi", "emailGV", "sdtGV"];
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
    //cac bien dung trong danh so trang

    const [currentPage, setCurrentPage] = useState(0);
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = DATA.length;
    const currentRows = tableData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);
    function handleFilters() {
        const data = DATA.filter(item => (
            (giangVien.Name === "" || item.hoTenGV === giangVien.Name)
        ))
        setTableData(data);
    }
    function clearFilters() {
        setGiangVien({Name: "", MSCB: ""});
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
                    <InputGiangVien
                        fieldName={"Giảng viên"}
                        users={giangVienKHMT}
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                    ></InputGiangVien>
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
                variant="withAvatar"
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
function GiangVien() {
    return (
        <div className="font-K2D bg-backgroundColor">
            <Header>
                <NavigationBar></NavigationBar>
            </Header>
            <Main>
                <TableDuAn></TableDuAn>
            </Main>
            <Footer></Footer>
        </div>
    );
}

export default GiangVien;
