import MyButton from "../components/MyButton";
import { HiPlus, HiDownload, HiSearch, HiAdjustments } from "react-icons/hi";
import InputFileUpload from "../components/Fileupload";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal";
import { OnlyText, TextWithLabel } from "../components/Form";
import DropDown from "../components/Dropdown";
import { useContext } from "react";
import { AdminContext } from "../context/Context";
import { formatDisplayDateToSQLDate, formatToDisplayDate, getToken } from "../util/util";
import Toast from "../components/Toast";

import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "../components/Table";
import { getUsers, queryUsers } from "../services/Services";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
export default function AdminNguoiDung() {
    const navigate = useNavigate();
    const token = getToken();
    //same for components that use modal for crud
    const initialInput = {
        USERID: "",
        HO_TEN_USER: "",
        SDT: "",
        EMAIL: "",
        PASSWORD: "",
        MSSV: "",
        MACB: "",
        HOC_VAN: "",
        ROLE: "",
    };
    const {
        ToastMessage,
        ToastSuccess,
        ToastDisplay,
        setToastDisplay,
        setToastMessage,
        setToastSuccess,
        ToastResponse,
        showToast,
    } = useContext(AdminContext);
    const [tableData, setTableData] = useState({ fetchData: [], displayData: [] });
    const [gioiTinh, setGioiTinh] = useState();
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(""); //edit target
    const [searchValue, setSearchValue] = useState("");
    const [createModal, setcreateModal] = useState(false);
    const [filterIsOpen, setFilterIsOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);

    //this component state
    const [role, setRole] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [role_filter, setRole_filter] = useState("");
    const [educationLevel_filter, setEducationLevel_filter] = useState("");
    const [inputs, setInputs] = useState({});
    const [selectedRows, setSelectedRows] = useState({});
    async function handleSearch() {
        // shorthand: search by USERID/HO_TEN_USER/EMAIL
        setCurrentPage(0);
        const query = { Search: searchValue || null };
        try {
            const { res, json } = await queryUsers(query);
            if (res.ok) setTableData((prev) => ({ ...prev, displayData: json }));
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleFilters() {
        setCurrentPage(0);
        const query = {
            ROLE: role_filter || null,
            HOC_VAN: educationLevel_filter || null,
            Search: searchValue || null,
        };
        try {
            const { res, json } = await queryUsers(query);
            if (res.ok) setTableData((prev) => ({ ...prev, displayData: json }));
        } catch (error) {
            console.error(error.message);
        }
        setFilterIsOpen(false);
    }

    function clearFilters() {
        setCurrentPage(0);
        setRole_filter("");
        setEducationLevel_filter("");
        setSearchValue("");
        setTableData((prev) => ({ ...prev, displayData: prev.fetchData }));
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
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value })); //name la gia tri cua bien, neu khong co [] se la tao 1 object {name: value}
    }
    function handleSelectRows(ID) {
        console.log("changing state of ", ID);
        setSelectedRows((prev) => ({ ...prev, [ID]: !prev[ID] }));
    }

    function resetInput(initialInput) {
        setInputs(initialInput);
        setRole(initialInput.ROLE);
        setEducationLevel(initialInput.HOC_VAN);
    }
    useEffect(() => {
        //load du lieu ngay khi mount
        handleGet();
        setInputs({});
    }, []);
    const selectedAmount = Object.entries(selectedRows).filter(
        ([key, value]) => value == true && key != "all"
    ).length;
    //CRUD
    async function handleGet() {
        try {
            const { usersRes, DSUser } = await getUsers();
            if (usersRes.ok) {
                setTableData({ displayData: DSUser, fetchData: DSUser });
                setSelectedRows(Object.fromEntries(DSUser.map((row) => [row.USERID, false])));
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("403")) {
                navigate("/login");
            }
        }
    }
    function checkInput(inputs) {
        const Email_reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        const SDT_reg = /^0[0-9]{9}$/;
        const MSSV_reg = /^B[0-9]{7}$/i;
        const MACB_reg = /[0-9]{6}/;
        // co the khong can thiet
        const ROLE_reg = /^SinhVien|GiangVien|Admin$/i;
        const hoc_van_reg = /^Sinh viên|Nghiên cứu sinh|Thạc sĩ|tiến sĩ|PGS.TS|GS.TS|$/;

        const { EMAIL, SDT, MSSV, MACB, ROLE } = inputs;
        let errMessage = "err";
        const succMessage = "Kiểm tra inputs thành công";
        const response = { isSuccess: true, message: "" };
        let { isSuccess } = response;
        if (inputs.USERID.trim().length == 0) {
            isSuccess = false;
            errMessage = "USERID không được bỏ trống";
        } else if (inputs.HO_TEN_USER.trim().length == 0 && isSuccess) {
            errMessage = "USERNAME không được bỏ trống";
            isSuccess = false;
        } else if (!SDT_reg.test(SDT) && isSuccess) {
            isSuccess = false;
            errMessage = "Vui lòng kiểm tra lại số điện thoại";
        } else if (!Email_reg.test(EMAIL) && isSuccess) {
            isSuccess = false;
            errMessage = "Vui lòng kiểm tra lại địa chỉ email";
        } else if (!MSSV ? !MACB_reg.test(MACB) : !MSSV_reg.test(MSSV) && isSuccess) {
            if (ROLE !== "Admin") {
                isSuccess = false;
                errMessage = "Vui lòng kiểm tra lại mã số sinh viên hoặc mã cán bộ";
            }
        }
        response["isSuccess"] = isSuccess;
        response["message"] = !isSuccess ? errMessage : succMessage;
        return response;
    }
    async function handleCreate() {
        const submitInputs = { ...inputs };
        submitInputs["HOC_VAN"] = educationLevel;
        submitInputs["ROLE"] = role;
        submitInputs["GIOITINH_USER"] = gioiTinh;
        submitInputs["NGAYSINH_USER"] = formatDisplayDateToSQLDate(submitInputs["NGAYSINH_USER"]);
        const { isSuccess, message } = checkInput(submitInputs);
        if (!isSuccess) {
            //kiem tra input
            setToastDisplay(true);
            setToastSuccess(false);
            setToastMessage(message);
        } else {
            console.log(submitInputs);
            try {
                const res = await fetch("/api/admin/users", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(submitInputs),
                });
                ToastResponse(res);
                resetInput(initialInput);
                await handleGet();
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    async function handleEdit() {
        const target = editModal;
        const submitInputs = { ...inputs };
        submitInputs["HOC_VAN"] = educationLevel;
        submitInputs["ROLE"] = role;
        submitInputs["GIOITINH_USER"] = gioiTinh;
        submitInputs["NGAYSINH_USER"] = formatDisplayDateToSQLDate(submitInputs["NGAYSINH_USER"]);
        try {
            const res = await fetch(`/api/admin/users/${target}`, {
                method: "put",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(submitInputs),
            });
            ToastResponse(res); //thong bao cho nguoi dung
            await handleGet();
        } catch (error) {
            console.log(error.message);
        }
        setEditModal(false);
    }
    async function handleDelete(target) {
        try {
            const res = await fetch(`/api/admin/users/${target}`, {
                method: "delete",
                headers: { Authorization: `Bearer ${token}` },
            });
            ToastResponse(res); //thong bao cho nguoi dung
            await handleGet();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="wrapper">
            <Modal show={createModal}>
                <ModalHeader>Tạo người dùng mới</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        placeHolder={"Mã người dùng"}
                        onChange={handleChange}
                        value={inputs.USERID || ""}
                        name="USERID"
                        id="USERID"
                    >
                        Mã người dùng
                    </TextWithLabel>
                    <TextWithLabel
                        placeHolder={"Mật khẩu"}
                        type="password"
                        onChange={handleChange}
                        value={inputs.PASSWORD || ""}
                        name="PASSWORD"
                        id="PASSWORD"
                    >
                        Password
                    </TextWithLabel>
                    <TextWithLabel
                        placeHolder={"Tên người dùng"}
                        onChange={handleChange}
                        value={inputs.HO_TEN_USER || ""}
                        name="HO_TEN_USER"
                        id="HO_TEN_USER"
                    >
                        Họ tên người dùng
                    </TextWithLabel>
                    <div className="flex gap-20">
                        <TextWithLabel
                            className="w-full"
                            placeHolder={"DD/MM/YYYY"}
                            onChange={handleChange}
                            value={inputs.NGAYSINH_USER || ""}
                            name="NGAYSINH_USER"
                            id="NGAYSINH_USER"
                        >
                            Ngày tháng năm sinh
                        </TextWithLabel>
                        <DropDown
                            direction="col"
                            className="z-10 self-start w-full"
                            fieldName={"Giới tính"}
                            options={["Nam", "Nữ", "Furry"]}
                            select={gioiTinh}
                            setSelect={setGioiTinh}
                        ></DropDown>
                    </div>
                    <div className="flex gap-20">
                        <TextWithLabel
                            className="w-full"
                            onChange={handleChange}
                            value={inputs.SDT}
                            name="SDT"
                            id="SDT"
                        >
                            Số điện thoại
                        </TextWithLabel>
                        <TextWithLabel
                            className="w-full"
                            onChange={handleChange}
                            value={inputs.EMAIL || ""}
                            name="EMAIL"
                            id="EMAIL"
                        >
                            Email
                        </TextWithLabel>
                    </div>
                    <div className="flex gap-2.5 items-center justify-start">
                        <DropDown
                            size="medium"
                            fieldName={"Trình độ học vấn"}
                            select={educationLevel}
                            options={[
                                "Sinh viên",
                                "Nghiên cứu sinh",
                                "Thạc sĩ",
                                "Tiến sĩ",
                                "PGS. TS",
                                "GS. TS",
                            ]}
                            setSelect={setEducationLevel}
                        ></DropDown>
                        <DropDown
                            size="small"
                            fieldName={"Chức vụ"}
                            select={role}
                            options={["SinhVien", "GiangVien", "Admin"]}
                            setSelect={setRole}
                        ></DropDown>
                    </div>
                    {role !== "Admin" &&
                        role !== "" &&
                        (role == "SinhVien" ? (
                            <div className="SinhVien">
                                <TextWithLabel
                                    onChange={handleChange}
                                    value={inputs.MSSV || ""}
                                    name="MSSV"
                                    id="MSSV"
                                >
                                    MSSV
                                </TextWithLabel>
                            </div>
                        ) : (
                            <div className="GiangVien">
                                <TextWithLabel
                                    onChange={handleChange}
                                    value={inputs.MACB || ""}
                                    name="MACB"
                                    id="MACB"
                                >
                                    MACB
                                </TextWithLabel>
                                <InputFileUpload></InputFileUpload>
                            </div>
                        ))}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end mt-20 gap-2.5 w-full">
                        <button
                            onClick={() => {
                                resetInput(initialInput);
                                setcreateModal(false);
                            }}
                            className="cursor-pointer border-b-2 text-textColor2 border-textColor2 text-h5 overflow-visible px-4 py-1 hover:bg-gray-100 transition-all ease-in-out duration-300"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleCreate}
                            className="cursor-pointer border-b-2 text-white bg-primaryColor text-h5 overflow-visible px-4 py-1 hover:bg-blue-900 transition-all ease-in-out duration-300"
                        >
                            Create
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
            <Modal show={editModal}>
                <ModalHeader>Chỉnh sửa người dùng {inputs.USERID}</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        disabled={true}
                        onChange={handleChange}
                        value={inputs.USERID || ""}
                        name="USERID"
                        id="USERID"
                    >
                        Mã người dùng
                    </TextWithLabel>
                    <TextWithLabel
                        type="password"
                        onChange={handleChange}
                        value={inputs.PASSWORD || ""}
                        name="PASSWORD"
                        id="PASSWORD"
                    >
                        Password
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.HO_TEN_USER || ""}
                        name="HO_TEN_USER"
                        id="HO_TEN_USER"
                    >
                        Họ tên người dùng
                    </TextWithLabel>
                    <div className="flex gap-20">
                        <TextWithLabel
                            className="w-full"
                            placeHolder={"DD/MM/YYYY"}
                            onChange={handleChange}
                            value={inputs.NGAYSINH_USER || ""}
                            name="NGAYSINH_USER"
                            id="NGAYSINH_USER"
                        >
                            Ngày tháng năm sinh
                        </TextWithLabel>
                        <DropDown
                            direction="col"
                            className="z-10 w-full self-start"
                            fieldName={"Giới tính"}
                            options={["Nam", "Nữ", "Furry"]}
                            select={gioiTinh}
                            setSelect={setGioiTinh}
                        ></DropDown>
                    </div>
                    <div className="flex gap-20">
                        <TextWithLabel
                            className="w-full"
                            onChange={handleChange}
                            value={inputs.SDT}
                            name="SDT"
                            id="SDT"
                        >
                            Số điện thoại
                        </TextWithLabel>
                        <TextWithLabel
                            className="w-full"
                            onChange={handleChange}
                            value={inputs.EMAIL || ""}
                            name="EMAIL"
                            id="EMAIL"
                        >
                            Email
                        </TextWithLabel>
                    </div>

                    <div className="flex gap-2.5 items-center justify-start">
                        <DropDown
                            size="medium"
                            fieldName={"Trình độ học vấn"}
                            select={educationLevel}
                            options={[
                                "Sinh viên",
                                "Nghiên cứu sinh",
                                "Thạc sĩ",
                                "Tiến sĩ",
                                "PGS. TS",
                                "GS. TS",
                            ]}
                            setSelect={setEducationLevel}
                        ></DropDown>
                        <DropDown
                            size="small"
                            fieldName={"Chức vụ"}
                            select={role}
                            options={["SinhVien", "GiangVien", "Admin"]}
                            setSelect={setRole}
                        ></DropDown>
                    </div>
                    {role !== "Admin" &&
                        role !== "" &&
                        (role == "SinhVien" ? (
                            <div className="SinhVien">
                                <TextWithLabel
                                    onChange={handleChange}
                                    value={inputs.MSSV || ""}
                                    name="MSSV"
                                    id="MSSV"
                                >
                                    MSSV
                                </TextWithLabel>
                            </div>
                        ) : (
                            <div className="GiangVien">
                                <TextWithLabel
                                    onChange={handleChange}
                                    value={inputs.MACB || ""}
                                    name="MACB"
                                    id="MACB"
                                >
                                    MACB
                                </TextWithLabel>
                            </div>
                        ))}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end mt-20 gap-2.5 w-full">
                        <button
                            onClick={() => {
                                resetInput(initialInput);
                                setEditModal(false);
                            }}
                            className="cursor-pointer border-b-2 text-textColor2 border-textColor2 text-h5 overflow-visible px-4 py-1 hover:bg-gray-100 transition-all ease-in-out duration-300"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                handleEdit();
                            }}
                            className="cursor-pointer border-b-2 text-white bg-primaryColor text-h5 overflow-visible px-4 py-1 hover:bg-blue-900 transition-all ease-in-out duration-300"
                        >
                            Edit
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
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
            <h1 className="text-h2 font-semibold my-2.5">Danh sách người dùng</h1>
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
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
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
                        onClick={() => {
                            setcreateModal(true);
                        }}
                        IconRight={<HiPlus></HiPlus>}
                        size="small"
                        className="bg-successColor justify-center text-textColor1"
                    >
                        Thêm
                    </MyButton>
                </div>
                <div className={`${filterIsOpen ? "absolute" : "hidden"} mt-2.5 w-full bg-white`}>
                    <div className="p-5 w-full shadow-md flex flex-col gap-2.5">
                        <div className="flex gap-2.5">
                            <DropDown
                                align="start"
                                direction="vertical"
                                size="medium"
                                select={role_filter}
                                setSelect={setRole_filter}
                                fieldName="Chức vụ"
                                open={false}
                                options={["SinhVien", "GiangVien", "Admin"]}
                            ></DropDown>
                            <DropDown
                                align="start"
                                direction="vertical"
                                size="medium"
                                select={educationLevel_filter}
                                setSelect={setEducationLevel_filter}
                                fieldName="Trình độ học vấn"
                                open={false}
                                options={[
                                    "Sinh viên",
                                    "Nghiên cứu sinh",
                                    "Thạc sĩ",
                                    "Tiến sĩ",
                                    "PGS. TS",
                                    "GS. TS",
                                ]}
                            ></DropDown>
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
                            <TableHeadCell className="w-[15%]">Mã người dùng</TableHeadCell>
                            <TableHeadCell className="text-left w-[15%]">MSSV/MSCB</TableHeadCell>
                            <TableHeadCell className="text-left">Tên người dùng</TableHeadCell>
                            <TableHeadCell className="text-center">Học vấn</TableHeadCell>
                            <TableHeadCell className="text-center w-[15%]">Chức vụ</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="text-h6">
                        {tableData.displayData.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No result
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.displayData.map((row) => (
                                <TableRow key={row.USERID}>
                                    <TableCell>
                                        <CheckBox
                                            onChange={() => {
                                                handleSelectRows(row.USERID);
                                            }}
                                            checked={selectedRows[row.USERID]}
                                        ></CheckBox>
                                    </TableCell>
                                    <TableCell className="text-center">{row.USERID}</TableCell>

                                    <TableCell className="text-left">
                                        {(row.ROLE == "Admin" && "Admin") || //gan gia tri mac dinh neu role la admin
                                            (row.ROLE !== "Admin" &&
                                                (row.ROLE == "SinhVien" ? row.MSSV : row.MACB))}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            const cloneRow = { ...row };
                                            cloneRow.NGAYSINH_USER = formatToDisplayDate(
                                                new Date(cloneRow.NGAYSINH_USER)
                                            );
                                            setInputs(cloneRow);
                                            cloneRow.MACB === null
                                                ? (cloneRow.MACB = "")
                                                : (cloneRow.MSSV = "");
                                            setRole(row.ROLE);
                                            setEducationLevel(row.HOC_VAN);
                                            setGioiTinh(row.GIOITINH_USER);
                                            setEditModal(row.USERID);
                                        }}
                                        className="hover:underline hover:cursor-pointer"
                                    >
                                        {row.HO_TEN_USER}
                                    </TableCell>
                                    <TableCell className="text-center">{row.HOC_VAN}</TableCell>
                                    <TableCell className="text-center">{row.ROLE}</TableCell>
                                </TableRow>
                            ))
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
            <Toast
                ToastDisplay={ToastDisplay}
                ToastMessage={ToastMessage}
                ToastSuccess={ToastSuccess}
                SetToastDisplay={setToastDisplay}
            ></Toast>
        </div>
    );
}
