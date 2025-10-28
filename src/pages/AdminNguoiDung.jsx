import MyButton from "../components/MyButton";
import { HiPlus, HiDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal";
import { TextWithLabel } from "../components/Form";
import DropDown from "../components/Dropdown";
import { useContext } from "react";
import { GlobalContext } from "../context/Context";

import Toast from "../components/Toast";

import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "../components/TableOverhaul";
import { getUsers } from "../services/Services";
export default function AdminNguoiDung() {
    //same for components that use modal for crud
    const target = "";
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
    } = useContext(GlobalContext);

    const [data, setData] = useState([]);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(target); //edit target

    const [createModal, setcreateModal] = useState(false);
    const [inputs, setInputs] = useState(initialInput);
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedAmount, setSelectAmount] = useState(0);

    //this component state
    const [role, setRole] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    function resetInput(initialInput) {
        setInputs(initialInput);
        setRole(initialInput.ROLE);
        setEducationLevel(initialInput.HOC_VAN);
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
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value })); //name la gia tri cua bien, neu khong co [] se la tao 1 object {name: value}
    }
    function handleSelectRows(ID) {
        console.log("changing state of ", ID);
        setSelectedRows((prev) => ({ ...prev, [ID]: !prev[ID] }));
    }
    useEffect(() => {
        //load du lieu ngay khi mount
        handleGet();
    }, []);
    useEffect(() => {
        setSelectAmount(Object.values(selectedRows).filter((ID) => ID == true).length);
    }, [selectedRows]);
    //CRUD
    async function handleGet() {
        try {
            const { usersRes, DSUser } = await getUsers();
            setData(DSUser);
            setSelectedRows(Object.fromEntries(DSUser.map((row) => [row.USERID, false])));
        } catch (error) {
            console.log("fetch failed");
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

        const { EMAIL, SDT, MSSV, MACB } = inputs;
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
            isSuccess = false;
            errMessage = "Vui lòng kiểm tra lại mã số sinh viên";
        }
        response["isSuccess"] = isSuccess;
        response["message"] = !isSuccess ? errMessage : succMessage;
        return response;
    }
    async function handleCreate() {
        inputs["HOC_VAN"] = educationLevel;
        inputs["ROLE"] = role;
        const { isSuccess, message } = checkInput(inputs);
        console.log(isSuccess, message);
        if (!isSuccess) {
            //kiem tra input
            setToastDisplay(true);
            setToastSuccess(false);
            setToastMessage(message);
        } else {
            console.log(inputs);
            try {
                const res = await fetch("/api/admin/users", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inputs),
                });
                await response(res);
                resetInput(initialInput);
                await handleGet();
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    async function handleEdit() {
        const target = editModal;
        inputs["ROLE"] = role;
        inputs["HOC_VAN"] = educationLevel;
        try {
            const res = await fetch(`/api/admin/users/${target}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            ToastResponse(res); //thong bao cho nguoi dung
            await handleGet();
        } catch (error) {
            console.log(error.message);
        }
        resetInput(initialInput);
        setEditModal(false);
    }
    async function handleDelete(target) {
        try {
            const res = await fetch(`/api/admin/users/${target}`, {
                method: "delete",
            });
            ToastResponse(res); //thong bao cho nguoi dung
            handleGet();
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
                        onChange={handleChange}
                        value={inputs.USERID}
                        name="USERID"
                        id="USERID"
                    >
                        Mã người dùng
                    </TextWithLabel>
                    <TextWithLabel
                        type="password"
                        onChange={handleChange}
                        value={inputs.PASSWORD}
                        name="PASSWORD"
                        id="PASSWORD"
                    >
                        Password
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.HO_TEN_USER}
                        name="HO_TEN_USER"
                        id="HO_TEN_USER"
                    >
                        Họ tên người dùng
                    </TextWithLabel>
                    <TextWithLabel onChange={handleChange} value={inputs.SDT} name="SDT" id="SDT">
                        Số điện thoại
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.EMAIL}
                        name="EMAIL"
                        id="EMAIL"
                    >
                        Email
                    </TextWithLabel>
                    <div className="flex gap-2.5 items-center justify-start">
                        <DropDown
                            size="small"
                            className="min-h-20"
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
                            className="min-h-20"
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
                                    value={inputs.MSSV}
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
                                    value={inputs.MACB}
                                    name="MACB"
                                    id="MACB"
                                >
                                    MACB
                                </TextWithLabel>
                            </div>
                        ))}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
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
                <ModalHeader>Tạo người dùng mới</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        disabled={true}
                        onChange={handleChange}
                        value={inputs.USERID}
                        name="USERID"
                        id="USERID"
                    >
                        Mã người dùng
                    </TextWithLabel>
                    <TextWithLabel
                        type="password"
                        onChange={handleChange}
                        value={inputs.PASSWORD}
                        name="PASSWORD"
                        id="PASSWORD"
                    >
                        Password
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.HO_TEN_USER}
                        name="HO_TEN_USER"
                        id="HO_TEN_USER"
                    >
                        Họ tên người dùng
                    </TextWithLabel>
                    <TextWithLabel onChange={handleChange} value={inputs.SDT} name="SDT" id="SDT">
                        Số điện thoại
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.EMAIL}
                        name="EMAIL"
                        id="EMAIL"
                    >
                        Email
                    </TextWithLabel>
                    <div className="flex gap-2.5 items-center justify-start">
                        <DropDown
                            size="small"
                            className="min-h-20"
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
                            className="min-h-20"
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
                                    value={inputs.MSSV}
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
                                    value={inputs.MACB}
                                    name="MACB"
                                    id="MACB"
                                >
                                    MACB
                                </TextWithLabel>
                            </div>
                        ))}
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
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
                <div className="TableControl min-h-15 grid grid-cols-8 gap-5">
                    <div
                        className={`${
                            selectedAmount != 0 ? "visible" : "invisible"
                        } flex gap-x-2.5 col-span-2 justify-start items-center`}
                    >
                        <span className="px-2 py-1 text-h6 text-primaryColor">
                            {selectedAmount} đã chọn
                        </span>
                        <MyButton
                            size="medium"
                            variant="outline"
                            onClick={() => setDisplayConfirmModal(true)}
                            className={"px-2 py-1 text-h6 border-redWarning text-redWarning"}
                        >
                            Xoá đã chọn
                        </MyButton>
                    </div>
                    <MyButton
                        IconLeft={<HiDownload></HiDownload>}
                        size="small"
                        className="border-2 border-secondaryColor col-start-7 justify-center text-textColor2"
                    >
                        Export
                    </MyButton>
                    <MyButton
                        onClick={() => setcreateModal(true)}
                        IconRight={<HiPlus></HiPlus>}
                        size="small"
                        className="bg-successColor justify-center text-textColor1"
                    >
                        Thêm user
                    </MyButton>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[5%]">
                                <CheckBox onChange={handleSelectAll}></CheckBox>
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%]">Mã người dùng</TableHeadCell>
                            <TableHeadCell className="text-left w-[15%]">MSSV/MSCB</TableHeadCell>
                            <TableHeadCell className="text-left">Tên người dùng</TableHeadCell>
                            <TableHeadCell className="text-center">Học vấn</TableHeadCell>
                            <TableHeadCell className="text-center w-[15%]">Chức vụ</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="text-h6">
                        {data.map((row) => (
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
                                        setEditModal(row.USERID);
                                        setInputs(row);
                                        row.MACB === null ? (row.MACB = "") : (row.MSSV = "");
                                        setRole(row.ROLE);
                                        setEducationLevel(row.HOC_VAN);
                                    }}
                                    className="hover:underline hover:cursor-pointer"
                                >
                                    {row.HO_TEN_USER}
                                </TableCell>
                                <TableCell className="text-center">{row.HOC_VAN}</TableCell>
                                <TableCell className="text-center">{row.ROLE}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
