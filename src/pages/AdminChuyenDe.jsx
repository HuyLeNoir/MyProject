import MyButton from "../components/MyButton.jsx";
import { Datepicker } from "flowbite-react";
import {
    getCap,
    getLinhVuc,
    getUsers,
    getSeminarByID,
    getSeminars,
    querySeminars,
} from "../services/Services.js";
import {
    formatDateLocal,
    SinhVienFromUsers,
    GiangVienFromUsers,
    formatCurrency,
    currencyStringToNunber,
    getToken,
    formatToDisplayDate,
} from "../util/util.js";
import { HiPlus, HiSearch, HiArrowLeft, HiAdjustments, HiDownload, HiTrash } from "react-icons/hi";
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { TextWithLabel, OnlyText } from "../components/Form.jsx";
import { AdminContext, ChuyenDeContext, GlobalContext } from "../context/Context.jsx";
import Toast from "../components/Toast.jsx";
import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "../components/Table.jsx";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal.jsx";
import DropDown from "../components/Dropdown.jsx";
import TextInput from "../components/InputGiangVien.jsx";
import Pagination from "../components/Pagination.jsx";
import { DeTaiContext } from "../context/Context.jsx";

export function EditChuyenDe() {
    const { id } = useParams();
    const token = getToken();
    const { DSGiangVien } = useContext(ChuyenDeContext);
    const { ToastResponse, showToast } = useContext(AdminContext);
    const [giangVien, setGiangVien] = useState("");
    const [date, setDate] = useState(new Date());
    const [inputs, setInputs] = useState({});
    const giangVienKHMT = DSGiangVien;
    useEffect(() => {
        async function getData() {
            const { res, json } = await getSeminarByID(id);
            const gv = json.BAOCAOVIEN;
            setGiangVien({ input: gv });
            setDate(new Date(json.NGAYDIENRA_SEMINAR));
            setInputs({
                DIADIEMDIENRA_SEMINAR: json.DIADIEMDIENRA_SEMINAR,
                ID_SEMINAR: json.ID_SEMINAR,
                TEN_SEMINAR: json.TEN_SEMINAR,
                THOILUONG_SEMINAR: json.THOILUONG_SEMINAR,
                SOLUONGTHAMDU_SEMINAR: json.SOLUONGTHAMDU_SEMINAR,
                DOITUONGTHAMGIA_SEMINAR: json.DOITUONGTHAMGIA_SEMINAR,
                NOIDUNGBAOCAO_SEMINAR: json.NOIDUNGBAOCAO_SEMINAR,
            });
        }
        getData();
    }, []);
    async function handleSubmit() {
        const submitInput = { ...inputs };
        submitInput["NGAYDIENRA_SEMINAR"] = formatDateLocal(date);
        submitInput["MACB"] = giangVien.input;
        const REQUIRED_FIELDS = [
            "ID_SEMINAR",
            "TEN_SEMINAR",
            "NGAYDIENRA_SEMINAR",
            "DIADIEMDIENRA_SEMINAR",
            "THOILUONG_SEMINAR",
            "SOLUONGTHAMDU_SEMINAR",
            "DOITUONGTHAMGIA_SEMINAR",
            "NOIDUNGBAOCAO_SEMINAR",
        ];

        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        if (!giangVien) {
            showToast("Vui lòng chọn báo cáo viên.", false);
            return;
        }

        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        try {
            console.log(submitInput);
            const res = await fetch(`/api/admin/seminars/${id}`, {
                method: "put",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(submitInput),
            });
            ToastResponse(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        if (
            (name == "THOILUONG_SEMINAR" || name == "SOLUONGTHAMDU_SEMINAR") &&
            !/^\d*$/.test(value)
        ) {
            console.log("FUCK");
            return;
        }
        setInputs((prev) => ({ ...prev, [name]: value }));
    });

    function resetInput() {
        setInputs({});
        setGiangVien("");
        setDate(null);
    }
    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/seminars">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Edit chuyên đề {id}</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    disabled={true}
                    name="ID_SEMINAR"
                    value={inputs.ID_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Mã chuyên đề
                </TextWithLabel>
                <TextWithLabel
                    name="TEN_SEMINAR"
                    value={inputs.TEN_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Tên chuyên đề
                </TextWithLabel>
                <div className="z-10">
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={giangVienKHMT}
                        fieldName={"Báo cáo viên"}
                    ></TextInput>
                </div>
                <label htmlFor="ngaybaocao">Ngày báo cáo</label>
                <Datepicker
                    name="NGAYDIENRA_SEMINAR"
                    value={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    id="ngaybaocao"
                    language="vi-vn"
                ></Datepicker>
                <TextWithLabel
                    name="DIADIEMDIENRA_SEMINAR"
                    value={inputs.DIADIEMDIENRA_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Địa điểm
                </TextWithLabel>
                <div className="flex gap-2.5 items-end">
                    <TextWithLabel
                        name="THOILUONG_SEMINAR"
                        value={inputs.THOILUONG_SEMINAR || ""}
                        onChange={handleChange}
                        className="w-50"
                        placeHolder="Nhập mã chuyên đề"
                    >
                        Thời lượng
                    </TextWithLabel>
                    <span>Phút</span>
                </div>
                <div className="flex gap-2.5 items-end">
                    <TextWithLabel
                        name="SOLUONGTHAMDU_SEMINAR"
                        value={inputs.SOLUONGTHAMDU_SEMINAR || ""}
                        onChange={handleChange}
                        className="w-50"
                        placeHolder="Nhập mã chuyên đề"
                    >
                        Số lượng tham dự
                    </TextWithLabel>
                    <span>Người</span>
                </div>
                <TextWithLabel
                    name="DOITUONGTHAMGIA_SEMINAR"
                    value={inputs.DOITUONGTHAMGIA_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Đối tượng tham gia
                </TextWithLabel>
                <label htmlFor="noidung">Nội dung báo cáo</label>
                <textarea
                    name="NOIDUNGBAOCAO_SEMINAR"
                    value={inputs.NOIDUNGBAOCAO_SEMINAR || ""}
                    onChange={handleChange}
                    id="noidung"
                    className="w-full border rounded-md h-100"
                ></textarea>

                <div className="flex w-full gap-2.5 justify-between flex-row-reverse  items-center">
                    <MyButton
                        onClick={handleSubmit}
                        size="large"
                        className="bg-primaryColor text-white"
                    >
                        Xác nhận
                    </MyButton>
                </div>
            </div>
        </>
    );
}
export function NewChuyenDe() {
    const [inputs, setInputs] = useState({});
    const [date, setDate] = useState(null);
    const token = getToken();
    const [giangVien, setGiangVien] = useState("");
    const { DSGiangVien } = useContext(ChuyenDeContext);
    const { showToast, ToastResponse } = useContext(AdminContext);
    const giangVienKHMT = DSGiangVien;
    //test data
    async function handleSubmit() {
        const submitInput = { ...inputs };
        submitInput["NGAYDIENRA_SEMINAR"] = formatDateLocal(date);
        submitInput["MACB"] = giangVien.input;
        const REQUIRED_FIELDS = [
            "ID_SEMINAR",
            "TEN_SEMINAR",
            "NGAYDIENRA_SEMINAR",
            "DIADIEMDIENRA_SEMINAR",
            "THOILUONG_SEMINAR",
            "SOLUONGTHAMDU_SEMINAR",
            "DOITUONGTHAMGIA_SEMINAR",
            "NOIDUNGBAOCAO_SEMINAR",
        ];

        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        if (!giangVien) {
            showToast("Vui lòng chọn báo cáo viên.", false);
            return;
        }

        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        try {
            console.log(submitInput);
            const res = await fetch("/api/admin/seminars/", {
                method: "post",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(submitInput),
            });
            ToastResponse(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        if (
            (name == "THOILUONG_SEMINAR" || name == "SOLUONGTHAMDU_SEMINAR") &&
            !/^\d*$/.test(value)
        ) {
            console.log("FUCK");
            return;
        }
        setInputs((prev) => ({ ...prev, [name]: value }));
    });

    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/seminars">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Thêm một chuyên đề mới</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    name="ID_SEMINAR"
                    value={inputs.ID_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Mã chuyên đề
                </TextWithLabel>
                <TextWithLabel
                    name="TEN_SEMINAR"
                    value={inputs.TEN_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Tên chuyên đề
                </TextWithLabel>
                <div className="z-10">
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={giangVienKHMT}
                        fieldName={"Báo cáo viên"}
                    ></TextInput>
                </div>
                <label htmlFor="ngaybaocao">Ngày báo cáo</label>
                <Datepicker
                    name="NGAYDIENRA_SEMINAR"
                    value={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    id="ngaybaocao"
                    language="vi-vn"
                ></Datepicker>
                <TextWithLabel
                    name="DIADIEMDIENRA_SEMINAR"
                    value={inputs.DIADIEMDIENRA_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Địa điểm
                </TextWithLabel>
                <div className="flex gap-2.5 items-end">
                    <TextWithLabel
                        name="THOILUONG_SEMINAR"
                        value={inputs.THOILUONG_SEMINAR || ""}
                        onChange={handleChange}
                        className="w-50"
                        placeHolder="Nhập mã chuyên đề"
                    >
                        Thời lượng
                    </TextWithLabel>
                    <span>Phút</span>
                </div>
                <div className="flex gap-2.5 items-end">
                    <TextWithLabel
                        name="SOLUONGTHAMDU_SEMINAR"
                        value={inputs.SOLUONGTHAMDU_SEMINAR || ""}
                        onChange={handleChange}
                        className="w-50"
                        placeHolder="Nhập mã chuyên đề"
                    >
                        Số lượng tham dự
                    </TextWithLabel>
                    <span>Người</span>
                </div>
                <TextWithLabel
                    name="DOITUONGTHAMGIA_SEMINAR"
                    value={inputs.DOITUONGTHAMGIA_SEMINAR || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeHolder="Nhập mã chuyên đề"
                >
                    Đối tượng tham gia
                </TextWithLabel>
                <label htmlFor="noidung">Nội dung báo cáo</label>
                <textarea
                    name="NOIDUNGBAOCAO_SEMINAR"
                    value={inputs.NOIDUNGBAOCAO_SEMINAR || ""}
                    onChange={handleChange}
                    id="noidung"
                    className="w-full border rounded-md h-100"
                ></textarea>

                <div className="flex w-full gap-2.5 justify-between flex-row-reverse  items-center">
                    <MyButton
                        onClick={handleSubmit}
                        size="large"
                        className="bg-primaryColor text-white"
                    >
                        Tạo
                    </MyButton>
                    <MyButton
                        onClick={() => {
                            resetInput();
                        }}
                        size="large"
                        variant="underline"
                        className="text-textColor2 border-textColor3"
                    >
                        Huỷ
                    </MyButton>
                </div>
            </div>
        </>
    );
}
export function DanhSachChuyenDe() {
    const token = getToken();
    const navigate = useNavigate();
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [giangVienHD, setGiangVienHD] = useState({});
    const { showToast, ToastResponse } = useContext(AdminContext);
    const [searchValue, setSearchValue] = useState("");
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    //paginatioon
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState({ DT01: false, DT02: false });
    const { data } = useContext(GlobalContext);
    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/admin/seminars/${id}`, {
                method: "delete",
                headers: { Authorization: `Bearer ${token}` },
            });
            ToastResponse(res);
        } catch (error) {
            showToast(error.message, false);
        }
    }
    async function handleGet() {
        try {
            const { res, json } = await getSeminars();
            console.log(json);
            if (res.ok) {
                setTableData({ fetchData: json, displayData: json });
                setSelectedRows(Object.fromEntries(json.map((row) => [row.ID_SEMINARS, false])));
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("403")) {
                navigate("/login");
            }
        }
    }
    useEffect(() => {
        handleGet();
    }, []);
    function handleChange(e) {
        setSearchValue(e.target.value);
    }
    async function handleSearch() {
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
        setFilterIsOpen(false);
    }
    function clearFilters() {
        setCurrentPage(0);
        setGiangVienHD({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
        setTableData({ displayData: tableData.fetchData, fetchData: tableData.fetchData });
        setFilterIsOpen(false);
    }
    function handleSelectAll(e) {
        const isChecked = e.target.checked;
        const updatedRow = Object.keys(selectedRows).reduce((acc, key) => {
            acc[key] = isChecked;
            return acc;
        }, {});
        updatedRow.all = e.target.checked;
        setSelectedRows(updatedRow);
    }
    function handleSelectRows(ID) {
        setSelectedRows((prev) => ({ ...prev, [ID]: !prev[ID] }));
    }
    const selectedAmount = Object.entries(selectedRows).filter(
        ([key, value]) => value == true && key != "all"
    ).length;

    return (
        <>
            <Modal show={confirmModal}>
                <ModalHeader>Are You sure?</ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
                        <button
                            onClick={() => {
                                setDisplayConfirmModal(false);
                            }}
                            className="cursor-pointer border-b-2 text-textColor2 border-textColor2 text-h5 overflow-visible px-4 py-1 hover:bg-gray-100 transition-all ease-in-out duration-300"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                let targets = Object.entries(selectedRows).filter(
                                    ([key, value]) => value == true //loc ra cac row ma selected la true
                                );
                                targets.forEach(([key]) => {
                                    handleDelete(key);
                                    setDisplayConfirmModal(false);
                                });
                            }}
                            className="cursor-pointer border-b-2 text-white bg-primaryColor text-h5 overflow-visible px-4 py-1 hover:bg-blue-900 transition-all ease-in-out duration-300"
                        >
                            Yippy!
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
            <h1 className="text-h2 font-semibold my-2.5">Danh sách chuyên đề</h1>
            <div className="relative bg-white p-5 rounded-lg">
                <div className="TableControl grid grid-cols-8 gap-5">
                    <div className="col-span-3 flex justify-center items-center">
                        <span className=" h-full bg-buttonColor aspect-square flex justify-center items-center rounded-bl-md rounded-tl-md text-textColor2">
                            <HiSearch size={24}></HiSearch>
                        </span>
                        <OnlyText
                            type={"text"}
                            name={"searchBar"}
                            id={"searchBar"}
                            onChange={handleChange}
                            className="h-full"
                            value={searchValue}
                            placeHolder={"Mã hoặc tên đề tài"}
                        ></OnlyText>
                        <button
                            className={
                                "bg-buttonColor text-textColor2 px-1 cursor-pointer text-p rounded-br-md rounded-tr-md whitespace-nowrap h-full"
                            }
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    <MyButton
                        onClick={() => {
                            setFilterIsOpen(!filterIsOpen);
                        }}
                        IconLeft={<HiAdjustments />}
                        size="small"
                        className="border-2 col-start-6 border-secondaryColor justify-center text-textColor2"
                    >
                        Filter
                    </MyButton>
                    <MyButton
                        IconLeft={<HiDownload></HiDownload>}
                        size="small"
                        className="border-2 border-secondaryColor justify-center text-textColor2"
                    >
                        Export
                    </MyButton>
                    <MyButton
                        IconRight={<HiPlus></HiPlus>}
                        size="small"
                        className="bg-successColor justify-center text-textColor1"
                    >
                        <Link to="new">Thêm</Link>
                    </MyButton>
                </div>
                <div className={`${filterIsOpen ? "absolute" : "hidden"} mt-2.5 w-full bg-white`}>
                    <div className="p-5 w-full shadow-md flex flex-col gap-2.5">
                        <div className="flex gap-2.5">
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
                            <TextInput
                                direction="col"
                                fieldName={"Báo cáo viên"}
                                users={data.giangVien}
                                giangVien={giangVienHD}
                                setGiangVien={setGiangVienHD}
                            ></TextInput>
                        </div>
                        <div className="flex gap-2.5">
                            <MyButton
                                onClick={handleFilters}
                                size={"small"}
                                className="bg-successColor min-w-25"
                            >
                                Xác nhận
                            </MyButton>
                            <MyButton
                                onClick={clearFilters}
                                size={"small"}
                                className="bg-warningColor min-w-25"
                            >
                                Huỷ
                            </MyButton>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        selectedAmount != 0 ? "visible" : "invisible"
                    } flex p-2 gap-x-2.5`}
                >
                    <span className="px-2 py-1 text-h6 text-primaryColor">
                        {selectedAmount} đã chọn
                    </span>
                    <MyButton
                        className={"border-1 px-2 py-1 text-h6 border-redWarning text-redWarning"}
                        onClick={() => {
                            setDisplayConfirmModal(true);
                        }}
                    >
                        Xoá đã chọn
                    </MyButton>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[5%]">
                                <CheckBox
                                    checked={selectedRows.all}
                                    onChange={handleSelectAll}
                                ></CheckBox>
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%]">Mã chuyên đề</TableHeadCell>
                            <TableHeadCell className="text-left">Tên chuyên đề</TableHeadCell>
                            <TableHeadCell className="w-[20%] text-center">
                                Báo cáo viên
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%] text-center">
                                Ngyày báo cáo
                            </TableHeadCell>
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
                                    rowPerPage * currentPage,
                                    rowPerPage * currentPage + rowPerPage
                                )
                                .map(
                                    ({
                                        ID_SEMINAR,
                                        TEN_SEMINAR,
                                        BAOCAOVIEN,
                                        NGAYDIENRA_SEMINAR,
                                    }) => (
                                        <TableRow key={ID_SEMINAR}>
                                            <TableCell>
                                                <CheckBox
                                                    onChange={() => {
                                                        handleSelectRows(ID_SEMINAR);
                                                    }}
                                                    checked={selectedRows[ID_SEMINAR]}
                                                ></CheckBox>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {ID_SEMINAR}
                                            </TableCell>
                                            <TableCell className="hover:underline hover:cursor-pointer">
                                                <Link to={`edit/${ID_SEMINAR}`}>{TEN_SEMINAR}</Link>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {BAOCAOVIEN}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {formatToDisplayDate(new Date(NGAYDIENRA_SEMINAR))}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    numberOfRows={tableData.displayData.length}
                    numberOfPage={Math.ceil(tableData.displayData.length / rowPerPage)}
                    setCurrentPage={setCurrentPage}
                    select={rowPerPage}
                    setSelect={setRowPerPage}
                ></Pagination>
            </div>
        </>
    );
}
export function AdminChuyenDe() {
    const [DSGiangVien, setDSGiangVien] = useState([]);
    const {
        ToastMessage,
        ToastSuccess,
        ToastDisplay,
        setToastDisplay,
        setToastMessage,
        setToastSuccess,
        showToast,
    } = useContext(AdminContext);

    useEffect(() => {
        async function getData() {
            const user = await getUsers();
            const gv = GiangVienFromUsers(user.DSUser);
            setDSGiangVien(gv);
        }
        getData();
    }, []);

    return (
        <ChuyenDeContext.Provider
            value={{
                DSGiangVien,
            }}
        >
            <Outlet />
            <Toast
                ToastDisplay={ToastDisplay}
                ToastMessage={ToastMessage}
                ToastSuccess={ToastSuccess}
                SetToastDisplay={setToastDisplay}
            ></Toast>
        </ChuyenDeContext.Provider>
    );
}
