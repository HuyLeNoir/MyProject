import MyButton from "../components/MyButton.jsx";
import { Datepicker } from "flowbite-react";
import {
    getCap,
    getDeTai,
    getLinhVuc,
    getUsers,
    getDeTaiByID,
    queryResearchs,
} from "../services/Services.js";
import {
    formatDateLocal,
    SinhVienFromUsers,
    GiangVienFromUsers,
    formatCurrency,
    currencyStringToNunber,
    getToken,
} from "../util/util.js";
import { HiPlus, HiSearch, HiArrowLeft, HiAdjustments, HiDownload, HiTrash } from "react-icons/hi";
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { TextWithLabel, OnlyText } from "../components/Form.jsx";
import { AdminContext, GlobalContext } from "../context/Context.jsx";
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

export function EditDeTai() {
    const { id } = useParams();
    const token = getToken();
    const [capDeTai, setCapDeTai] = useState();
    const [linhVuc, setLinhVuc] = useState();
    const { DSCap, DSLinhVuc, DSSinhVien, DSGiangVien } = useContext(DeTaiContext);
    const { ToastResponse, showToast } = useContext(AdminContext);
    const [giangVien, setGiangVien] = useState("");
    const [chuNhiem, setChuNhiem] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [member, setMember] = useState("");
    const [members, setMembers] = useState({});
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        async function getData() {
            const { getDeTaiByIDJson } = await getDeTaiByID(id);
            const data = getDeTaiByIDJson;
            if (data) {
                const tempInputs = {
                    ID_DETAI: data.ID_DETAI,
                    TEN_DETAI: data.TEN_DETAI,
                    KINHPHIDUKIEN: String(data.KINHPHIDUKIEN),
                    KINHPHITHUCTE: String(data.KINHPHITHUCCHI),
                    TOMTAT_NCKH: data.TOMTAT_NCKH,
                };
                setInputs(tempInputs);
                setLinhVuc(data.TEN_LINH_VUC);
                setCapDeTai(data.TEN_CAP);
                setGiangVien({ input: data.GVHD });
                setStartDate(new Date(data.NGAYBD));
                setEndDate(new Date(data.NGAYKT));
                setMembers(
                    data.THANHVIEN.split(",").reduce((acc, member) => {
                        const parts = member.split("-");
                        const mssv = parts[0];
                        const hoten = parts[1];
                        const vaitro = parts[2];
                        acc[mssv] = {
                            HO_TEN_USER: hoten,
                            CHU_NHIEM: vaitro == "Chủ nhiệm" ? true : false,
                        };
                        return acc;
                    }, {})
                );
                setChuNhiem(
                    data.THANHVIEN.split(",")
                        .filter((element) => element.includes("Chủ nhiệm"))[0]
                        .split("-")
                        .slice(0, 2)
                        .join(" - ")
                );
            }
        }
        getData();
    }, []);

    async function handleSubmit() {
        const submitInput = { ...inputs };
        let membersArray = Object.entries(members).map(([MSSV, USER]) => {
            const isChuNhiem = chuNhiem ? chuNhiem.split(" - ")[0] === MSSV : false;
            return {
                MSSV: MSSV,
                HO_TEN_USER: USER.HO_TEN_USER,
                CHU_NHIEM: isChuNhiem,
            };
        });
        submitInput["GVHD"] = giangVien;
        submitInput["TEN_CAP"] = capDeTai;
        submitInput["TEN_LINH_VUC"] = linhVuc;
        submitInput["MEMBERS"] = membersArray;
        submitInput["NGAYBD"] = formatDateLocal(startDate);
        submitInput["NGAYKT"] = formatDateLocal(endDate);
        submitInput["KINHPHIDUKIEN"] = currencyStringToNunber(submitInput["KINHPHIDUKIEN"]);
        submitInput["KINHPHITHUCTE"] = currencyStringToNunber(submitInput["KINHPHITHUCTE"]);
        const REQUIRED_FIELDS = [
            "ID_DETAI",
            "TEN_DETAI",
            "GVHD",
            "KINHPHIDUKIEN",
            "KINHPHITHUCTE",
            "TEN_CAP",
            "TEN_LINH_VUC",
            "NGAYBD",
            "NGAYKT",
            "TOMTAT_NCKH",
        ];

        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        // Kiểm tra trường hợp MEMBERS (phải có ít nhất 1 người)
        if (!submitInput["MEMBERS"] || submitInput["MEMBERS"].length === 0) {
            showToast("Vui lòng thêm ít nhất 1 thành viên.", false);
            return;
        }

        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        try {
            console.log(submitInput);
            const res = await fetch(`/api/admin/detais/${submitInput.ID_DETAI}`, {
                method: "put",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(submitInput),
            });
            ToastResponse(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const giangVienKHMT = DSGiangVien;
    function resetInput() {
        setInputs({});
        setLinhVuc("");
        setCapDeTai("");
        setGiangVien("");
        setMember("");
        setMembers({});
        setChuNhiem("");
        setStartDate(null);
        setEndDate(null);
    }
    const handleChange = useCallback(
        (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setInputs((prev) => ({ ...prev, [name]: value }));
        },
        [setInputs]
    );
    function handleMemberChange(e) {
        setMember(e.target.value);
    }

    const handleAddMember = useCallback(() => {
        const sinhvien = DSSinhVien.find((sinhvien) => sinhvien.MSSV == member);
        if (!sinhvien) {
            showToast(`Không tìm thấy ${member}`, false);
            return;
        }
        setMembers((prev) => ({
            ...prev,
            [sinhvien.MSSV]: { HO_TEN_USER: sinhvien.HO_TEN_USER, CHU_NHIEM: false },
        }));

        setMember(""); //reset lai input
    }, [member, DSSinhVien, showToast, setMembers, setMember]);
    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/detais">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Chỉnh sửa đề tài {id}</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    name="ID_DETAI"
                    className="w-150"
                    id="ID_DETAI"
                    value={inputs.ID_DETAI || ""}
                    disabled={true}
                    onChange={handleChange}
                >
                    Mã đề tài
                </TextWithLabel>
                <TextWithLabel
                    value={inputs.TEN_DETAI || ""}
                    onChange={handleChange}
                    name="TEN_DETAI"
                    className="w-full"
                    id="TEN_DETAI"
                >
                    Tên đề tài
                </TextWithLabel>
                <div className="flex z-10 px-2 gap-2.5">
                    <DropDown
                        size="large"
                        fieldName={"Lĩnh vực"}
                        options={DSLinhVuc}
                        select={linhVuc}
                        setSelect={setLinhVuc}
                    ></DropDown>
                    <DropDown
                        size="large"
                        fieldName={"Cấp đề tài"}
                        options={DSCap}
                        select={capDeTai}
                        setSelect={setCapDeTai}
                    ></DropDown>
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={giangVienKHMT}
                        fieldName={"Giảng viên hướng dẫn"}
                    ></TextInput>
                </div>
                <div className="flex gap-2.5 items-center justify-center">
                    <TextWithLabel
                        id="member"
                        value={member || ""}
                        name="member"
                        onChange={handleMemberChange}
                        placeHolder="Nhập MSSV để thêm"
                    >
                        Thành viên tham gia
                    </TextWithLabel>

                    <button
                        onClick={handleAddMember}
                        className="bg-buttonColor flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10"
                    >
                        <HiPlus size={24} />
                    </button>
                </div>
                <Table className="w-150">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>STT</TableHeadCell>
                            <TableHeadCell>Họ và tên</TableHeadCell>
                            <TableHeadCell>MSSV</TableHeadCell>
                            <TableHeadCell>Tuỳ chọn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(members).map(([MSSV, USER], index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{USER.HO_TEN_USER}</TableCell>
                                <TableCell>{MSSV}</TableCell>
                                <TableCell>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MyButton
                                            onClick={() => {
                                                const newMembers = { ...members };
                                                delete newMembers[MSSV];
                                                setMembers(newMembers);
                                            }}
                                            IconLeft={
                                                <HiTrash size={24} className="text-redWarning" />
                                            }
                                        ></MyButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DropDown
                    className="z-9"
                    size="large"
                    options={Object.entries(members).map(
                        ([MSSV, { HO_TEN_USER }]) => MSSV + " - " + HO_TEN_USER
                    )}
                    select={chuNhiem}
                    setSelect={setChuNhiem}
                    fieldName={"Chủ nhiệm đề tài"}
                ></DropDown>
                <label htmlFor="NgayBD" className="px-2">
                    Ngày bắt đầu
                </label>
                <Datepicker
                    placeholder="Chọn ngày"
                    value={startDate || new Date()}
                    id="NgayBD"
                    language="vi"
                    onChange={(selectedDate) => {
                        setStartDate(selectedDate);
                    }}
                    className="font-display"
                ></Datepicker>
                <label htmlFor="NgayKT" className="px-2">
                    Ngày kết thúc
                </label>

                <Datepicker
                    placeholder="Chọn ngày"
                    value={endDate || new Date()}
                    minDate={startDate || new Date()}
                    id="NgayKT"
                    language="vi"
                    onChange={(selectedDate) => {
                        setEndDate(selectedDate);
                    }}
                    className="font-display"
                ></Datepicker>
                <div className="flex gap-2.5">
                    <TextWithLabel
                        id="KINHPHIDUKIEN"
                        name="KINHPHIDUKIEN"
                        value={formatCurrency(inputs.KINHPHIDUKIEN) || ""}
                        onChange={handleChange}
                    >
                        Kinh phí dự kiến
                    </TextWithLabel>
                    <TextWithLabel
                        id="KINHPHITHUCTE"
                        name="KINHPHITHUCTE"
                        value={formatCurrency(inputs.KINHPHITHUCTE) || ""}
                        onChange={handleChange}
                    >
                        Kinh phí thực tế
                    </TextWithLabel>
                </div>
                <label htmlFor="tomtat">Tóm tắt đề tài</label>
                <textarea
                    value={inputs.TOMTAT_NCKH || ""}
                    name="TOMTAT_NCKH"
                    id="TOMTAT_NCKH"
                    className="w-full border rounded-md h-100"
                    onChange={handleChange}
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
export function NewDeTai() {
    //test data
    const {
        capDeTai,
        setCapDeTai,
        linhVuc,
        setLinhVuc,
        DSCap,
        DSLinhVuc,
        DSSinhVien,
        DSGiangVien,
    } = useContext(DeTaiContext);
    const { ToastResponse } = useContext(AdminContext);
    const { showToast } = useContext(AdminContext);
    const [giangVien, setGiangVien] = useState("");
    const [chuNhiem, setChuNhiem] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [member, setMember] = useState("");
    const [members, setMembers] = useState({});
    const [inputs, setInputs] = useState({});
    async function handleSubmit() {
        const submitInput = { ...inputs };

        let membersArray = Object.entries(members).map(([MSSV, USER]) => {
            const isChuNhiem = chuNhiem ? chuNhiem.split(" - ")[0] === MSSV : false;
            return {
                MSSV: MSSV,
                HO_TEN_USER: USER.HO_TEN_USER,
                CHU_NHIEM: isChuNhiem,
            };
        });
        submitInput["GVHD"] = giangVien;
        submitInput["TEN_CAP"] = capDeTai;
        submitInput["TEN_LINH_VUC"] = linhVuc;
        submitInput["MEMBERS"] = membersArray;
        submitInput["NGAYBD"] = formatDateLocal(startDate);
        submitInput["NGAYKT"] = formatDateLocal(endDate);
        submitInput["KINHPHIDUKIEN"] = currencyStringToNunber(submitInput["KINHPHIDUKIEN"]);
        submitInput["KINHPHITHUCTE"] = currencyStringToNunber(submitInput["KINHPHITHUCTE"]);

        const REQUIRED_FIELDS = [
            "ID_DETAI",
            "TEN_DETAI",
            "GVHD",
            "KINHPHIDUKIEN",
            "KINHPHITHUCTE",
            "TEN_CAP",
            "TEN_LINH_VUC",
            "NGAYBD",
            "NGAYKT",
            "TOMTAT_NCKH",
        ];

        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        // Kiểm tra trường hợp MEMBERS (phải có ít nhất 1 người)
        if (!submitInput["MEMBERS"] || submitInput["MEMBERS"].length === 0) {
            showToast("Vui lòng thêm ít nhất 1 thành viên.", false);
            return;
        }

        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        try {
            console.log(submitInput);
            const res = await fetch("/api/admin/detais/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitInput),
            });

            ToastResponse(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const giangVienKHMT = DSGiangVien;
    function resetInput() {
        setInputs({});
        setLinhVuc("");
        setCapDeTai("");
        setGiangVien("");
        setMember("");
        setMembers({});
        setChuNhiem("");
        setStartDate(null);
        setEndDate(null);
    }
    const handleChange = useCallback(
        (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setInputs((prev) => ({ ...prev, [name]: value }));
        },
        [setInputs]
    );
    function handleMemberChange(e) {
        setMember(e.target.value);
    }

    const handleAddMember = useCallback(() => {
        const sinhvien = DSSinhVien.find((sinhvien) => sinhvien.MSSV == member);
        if (!sinhvien) {
            showToast(`Không tìm thấy ${member}`, false);
            return;
        }
        setMembers((prev) => ({
            ...prev,
            [sinhvien.MSSV]: { HO_TEN_USER: sinhvien.HO_TEN_USER, CHU_NHIEM: false },
        }));

        setMember(""); //reset lai input
    }, [member, DSSinhVien, showToast, setMembers, setMember]);
    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/detais">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Thêm một đề tài mới</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    name="ID_DETAI"
                    className="w-150"
                    id="ID_DETAI"
                    value={inputs.ID_DETAI || ""}
                    onChange={handleChange}
                >
                    Mã đề tài
                </TextWithLabel>
                <TextWithLabel
                    value={inputs.TEN_DETAI || ""}
                    onChange={handleChange}
                    name="TEN_DETAI"
                    className="w-150"
                    id="TEN_DETAI"
                >
                    Tên đề tài
                </TextWithLabel>
                <div className="flex z-10 px-2 gap-2.5">
                    <DropDown
                        size="large"
                        fieldName={"Lĩnh vực"}
                        options={DSLinhVuc}
                        select={linhVuc}
                        setSelect={setLinhVuc}
                    ></DropDown>
                    <DropDown
                        size="large"
                        fieldName={"Cấp đề tài"}
                        options={DSCap}
                        select={capDeTai}
                        setSelect={setCapDeTai}
                    ></DropDown>
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={giangVienKHMT}
                        fieldName={"Giảng viên hướng dẫn"}
                    ></TextInput>
                </div>
                <div className="flex gap-2.5 items-center justify-center">
                    <TextWithLabel
                        id="member"
                        value={member || ""}
                        name="member"
                        onChange={handleMemberChange}
                        placeHolder="Nhập MSSV để thêm"
                    >
                        Thành viên tham gia
                    </TextWithLabel>

                    <button
                        onClick={handleAddMember}
                        className="bg-buttonColor flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10"
                    >
                        <HiPlus size={24} />
                    </button>
                </div>
                <Table className="w-150">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>STT</TableHeadCell>
                            <TableHeadCell>Họ và tên</TableHeadCell>
                            <TableHeadCell>MSSV</TableHeadCell>
                            <TableHeadCell>Tuỳ chọn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(members).map(([MSSV, USER], index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{USER.HO_TEN_USER}</TableCell>
                                <TableCell>{MSSV}</TableCell>
                                <TableCell>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MyButton
                                            onClick={() => {
                                                const newMembers = { ...members };
                                                delete newMembers[MSSV];
                                                setMembers(newMembers);
                                            }}
                                            IconLeft={
                                                <HiTrash size={24} className="text-redWarning" />
                                            }
                                        ></MyButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DropDown
                    className="z-9"
                    size="large"
                    options={Object.entries(members).map(
                        ([MSSV, { HO_TEN_USER }]) => MSSV + " - " + HO_TEN_USER
                    )}
                    select={chuNhiem}
                    setSelect={setChuNhiem}
                    fieldName={"Chủ nhiệm đề tài"}
                ></DropDown>
                <label htmlFor="NgayBD" className="px-2">
                    Ngày bắt đầu
                </label>
                <Datepicker
                    placeholder="Chọn ngày"
                    value={startDate}
                    id="NgayBD"
                    language="vi"
                    onChange={(selectedDate) => {
                        setStartDate(selectedDate);
                    }}
                    className="font-display"
                ></Datepicker>
                <label htmlFor="NgayKT" className="px-2">
                    Ngày kết thúc
                </label>

                <Datepicker
                    placeholder="Chọn ngày"
                    value={endDate}
                    minDate={startDate}
                    id="NgayKT"
                    language="vi"
                    onChange={(selectedDate) => {
                        setEndDate(selectedDate);
                    }}
                    className="font-display"
                ></Datepicker>
                <div className="flex gap-2.5">
                    <TextWithLabel
                        id="KINHPHIDUKIEN"
                        name="KINHPHIDUKIEN"
                        value={formatCurrency(inputs.KINHPHIDUKIEN) || ""}
                        onChange={handleChange}
                    >
                        Kinh phí dự kiến
                    </TextWithLabel>
                    <TextWithLabel
                        id="KINHPHITHUCTE"
                        name="KINHPHITHUCTE"
                        value={formatCurrency(inputs.KINHPHITHUCTE) || ""}
                        onChange={handleChange}
                    >
                        Kinh phí thực tế
                    </TextWithLabel>
                </div>
                <label htmlFor="tomtat">Tóm tắt đề tài</label>
                <textarea
                    value={inputs.TOMTAT_NCKH || ""}
                    name="TOMTAT_NCKH"
                    id="TOMTAT_NCKH"
                    className="w-full border rounded-md h-100"
                    onChange={handleChange}
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
export function DanhSachDeTai() {
    const navigate = useNavigate();
    const token = getToken();
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    const { capDeTai, setCapDeTai, linhVuc, setLinhVuc } = useContext(DeTaiContext);
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
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
    const numberOfPage = Math.ceil(tableData.displayData.length / rowPerPage);
    const [selectedRows, setSelectedRows] = useState({ DT01: false, DT02: false });
    const { data } = useContext(GlobalContext);
    useEffect(() => {
        console.log(data);
    }, [data]);

    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/admin/detais/${id}`, {
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
            const { getDeTaiRes, DSDeTai } = await getDeTai();
            if (getDeTaiRes.ok) {
                setTableData({ displayData: DSDeTai, fetchData: DSDeTai });
                setSelectedRows(Object.fromEntries(DSDeTai.map((row) => [row.ID_DETAI, false])));
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
            MACB: giangVienHD.MACB || null,
            TEN_LINH_VUC: linhVuc || null,
            TEN_CAP: capDeTai || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryResearchs(query);
        console.log(json);
        setTableData((prev) => ({ ...prev, displayData: json }));
        setSearchValue("");
    }
    async function handleFilters() {
        setCurrentPage(0);
        const query = {
            MACB: giangVienHD.MACB || null,
            TEN_LINH_VUC: linhVuc || null,
            TEN_CAP: capDeTai || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryResearchs(query);
        console.log(json);
        setTableData((prev) => ({ ...prev, displayData: json }));
        setFilterIsOpen(false);
    }
    function clearFilters() {
        setCurrentPage(0);
        setCapDeTai("");
        setLinhVuc("");
        setNamBD("");
        setNamKT("");
        setGiangVienHD({});
        setTableData((prev) => ({ ...prev, displayData: tableData.fetchData }));
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

            <h1 className="text-h2 font-semibold my-2.5">Danh sách đề tài</h1>
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
                            <TextInput
                                direction="col"
                                fieldName={"Giảng Viên Hướng Dẫn"}
                                users={data.giangVien}
                                giangVien={giangVienHD}
                                setGiangVien={setGiangVienHD}
                            ></TextInput>
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
                            <TableHeadCell>
                                <CheckBox
                                    checked={selectedRows.all}
                                    onChange={handleSelectAll}
                                ></CheckBox>
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%]">Mã đề tài</TableHeadCell>
                            <TableHeadCell className="text-left">Tên</TableHeadCell>
                            <TableHeadCell className="w-[15%] text-center">Cấp</TableHeadCell>
                            <TableHeadCell className="w-[15%] text-center">Lĩnh vực</TableHeadCell>
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
                                    currentPage * rowPerPage,
                                    currentPage * rowPerPage + rowPerPage
                                )
                                .map(({ ID_DETAI, TEN_DETAI, TEN_CAP, TEN_LINH_VUC }) => (
                                    <TableRow key={ID_DETAI}>
                                        <TableCell>
                                            <CheckBox
                                                onChange={() => {
                                                    handleSelectRows(ID_DETAI);
                                                }}
                                                checked={selectedRows[ID_DETAI]}
                                            ></CheckBox>
                                        </TableCell>
                                        <TableCell className="text-center">{ID_DETAI}</TableCell>
                                        <TableCell className="hover:underline hover:cursor-pointer">
                                            <Link to={`edit/${ID_DETAI}`}>{TEN_DETAI}</Link>
                                        </TableCell>
                                        <TableCell className="text-center">{TEN_CAP}</TableCell>
                                        <TableCell className="text-center">
                                            {TEN_LINH_VUC}
                                        </TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    numberOfRows={tableData.displayData.length}
                    numberOfPage={numberOfPage}
                    setCurrentPage={setCurrentPage}
                    select={rowPerPage}
                    setSelect={setRowPerPage}
                ></Pagination>
            </div>
        </>
    );
}
export function DeTai() {
    const [capDeTai, setCapDeTai] = useState();
    const [linhVuc, setLinhVuc] = useState();
    const [DSSinhVien, setDSSinhVien] = useState([]);
    const [DSCap, setDSCap] = useState([]);
    const [DSGiangVien, setDSGiangVien] = useState([]);
    const [DSLinhVuc, setDSLinhVuc] = useState([]);
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
            const { cap, DSCap } = await getCap();
            const { linhvucRes, DSLinhVuc } = await getLinhVuc();
            const { usersRes, DSUser } = await getUsers();
            setDSCap(DSCap.map((row) => row.TEN_CAP));
            setDSLinhVuc(DSLinhVuc.map((row) => row.TEN_LINH_VUC));
            const sv = SinhVienFromUsers(DSUser);
            setDSSinhVien(sv);
            const gv = GiangVienFromUsers(DSUser);
            setDSGiangVien(gv);
        }
        getData();
    }, []);

    return (
        <DeTaiContext.Provider
            value={{
                capDeTai,
                setCapDeTai,
                linhVuc,
                setLinhVuc,
                DSCap,
                DSLinhVuc,
                DSSinhVien,
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
        </DeTaiContext.Provider>
    );
}
