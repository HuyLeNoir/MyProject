import MyButton from "../components/MyButton.jsx";
import { Datepicker } from "flowbite-react";
import { getCap, getLinhVuc, getUsers } from "../services/Services.js";
import {
    formatDateLocal,
    SinhVienFromUsers,
    GiangVienFromUsers,
    formatCurrency,
    currencyStringToNunber,
} from "../util/util.js";
import { HiPlus, HiSearch, HiArrowLeft, HiAdjustments, HiDownload, HiTrash } from "react-icons/hi";
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { TextWithLabel, OnlyText } from "../components/Form.jsx";
import { AdminContext } from "../context/Context.jsx";
import Toast from "../components/Toast.jsx";
import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "../components/TableOverhaul.jsx";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal.jsx";
import DropDown from "../components/Dropdown.jsx";
import TextInput from "../components/InputGiangVien.jsx";
import Pagination from "../components/Pagination.jsx";
import { DeTaiContext } from "../context/Context.jsx";

export function EditDeTai() {
    const { id } = useParams();
    return <div></div>;
}
export function NewDeTai() {
    console.log("new detai rerender");
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
    function handleGet() {
        console.log("fetching detais");
    }
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
            handleGet();
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
    const [data, setData] = useState([]);
    const { capDeTai, setCapDeTai, linhVuc, setLinhVuc, DSCap, DSLinhVuc } =
        useContext(DeTaiContext);
    const [searchValue, setSearchValue] = useState("");
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    //paginatioon
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState({ DT01: false, DT02: false });
    function handleChange(e) {
        setSearchValue(e.target.value);
    }
    function handleSearch() {
        console.log("searching with value of", searchValue);
    }
    function handleFilter() {
        setFilterIsOpen(false);
    }
    function resetFilter() {
        setCapDeTai();
        setLinhVuc();
        setFilterIsOpen(false);
    }
    function handleSelectAll(e) {
        console.log("select all");
        const isChecked = e.target.checked;
        const updatedRow = Object.keys(selectedRows).reduce((acc, key) => {
            acc[key] = isChecked;
            return acc;
        }, {});
        setSelectedRows(updatedRow);
    }
    function handleSelectRows(ID) {
        console.log("changing state of ", ID);
        setSelectedRows((prev) => ({ ...prev, [ID]: !prev[ID] }));
    }
    function calcSelecting() {
        return Object.values(selectedRows).filter((ID) => ID == true).length;
    }
    let selectedAmount = calcSelecting();

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
                                ); //chuyen thanh obj
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
                        <Link to="new">Thêm đề tài</Link>
                    </MyButton>
                </div>
                <div className={`${filterIsOpen ? "absolute" : "hidden"} mt-2.5 w-full bg-white`}>
                    <div className="p-5 w-full shadow-md flex gap-2.5">
                        <DropDown
                            size="medium"
                            className="min-w-40"
                            select={capDeTai}
                            setSelect={setCapDeTai}
                            fieldName={"Cấp đề tài"}
                            options={DSCap}
                        ></DropDown>
                        <DropDown
                            size="medium"
                            className="min-w-40"
                            select={linhVuc}
                            setSelect={setLinhVuc}
                            options={DSLinhVuc}
                            fieldName={"Lĩnh vực đề tài"}
                        ></DropDown>
                        <MyButton
                            onClick={handleFilter}
                            size={"small"}
                            className="bg-successColor min-w-25"
                        >
                            Xác nhận
                        </MyButton>
                        <MyButton
                            onClick={resetFilter}
                            size={"small"}
                            className="bg-warningColor min-w-25"
                        >
                            Huỷ
                        </MyButton>
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
                                <CheckBox onChange={handleSelectAll}></CheckBox>
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%]">Mã đề tài</TableHeadCell>
                            <TableHeadCell className="text-left">Tên</TableHeadCell>
                            <TableHeadCell className="w-[15%] text-center">Cấp</TableHeadCell>
                            <TableHeadCell className="w-[15%] text-center">Lĩnh vực</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <CheckBox
                                    onChange={() => {
                                        handleSelectRows("DT01");
                                    }}
                                    checked={selectedRows["DT01"]}
                                ></CheckBox>
                            </TableCell>
                            <TableCell className="text-center">DT01</TableCell>
                            <TableCell className="hover:underline hover:cursor-pointer">
                                <Link to="edit/DT01">
                                    Đánh giá trình độ và năng lực công nghệ sản xuất của doanh
                                    nghiệp và các ngành, lĩnh vực sản xuất trên địa bàn thành phố
                                    Cần Thơ
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">Địa phương</TableCell>
                            <TableCell className="text-center">Kinh tế</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <CheckBox
                                    onChange={() => {
                                        handleSelectRows("DT02");
                                    }}
                                    checked={selectedRows["DT02"]}
                                ></CheckBox>
                            </TableCell>
                            <TableCell className="text-center">DT02</TableCell>
                            <TableCell>
                                Đánh giá trình độ và năng lực công nghệ sản xuất của doanh nghiệp và
                                các ngành, lĩnh vực sản xuất trên địa bàn thành phố Cần Thơ
                            </TableCell>
                            <TableCell className="text-center">Địa phương</TableCell>
                            <TableCell className="text-center">Kinh tế</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Pagination
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
            console.log("getData was called?");
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
    useEffect(() => {
        setToastDisplay(true);
        setToastSuccess(true);
        setToastMessage("Hi");
    }, []);
    useEffect(() => {
        console.log(DSCap);
    }, [DSCap]);
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
