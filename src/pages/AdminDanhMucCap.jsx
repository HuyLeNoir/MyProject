import MyButton from "../components/MyButton";
import { HiPlus, HiDownload } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal";
import { TextWithLabel } from "../components/Form";
import { getCap } from "../services/Services";

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
import { AdminContext } from "../context/Context";
function DanhSachCap() {
    const target = "";
    const { ToastMessage, ToastSuccess, ToastDisplay, setToastDisplay, ToastResponse } =
        useContext(AdminContext);
    const initialInput = { MA_CAP: "", TEN_CAP: "", MO_TA_CAP: "" };
    const [data, setData] = useState([]);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(target); //edit target
    const [createModal, setCreateModal] = useState(false);
    const [inputs, setInputs] = useState(initialInput);
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedAmount, setSelectAmount] = useState(0);

    function handleSelectAll(e) {
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
        handleGet();
    }, []);
    useEffect(() => {
        setSelectAmount(Object.values(selectedRows).filter((ID) => ID == true).length);
    }, [selectedRows]);
    //CRUD
    async function handleGet() {
        try {
            const { capRes, DSCap } = await getCap();
            setData(DSCap);
            setSelectedRows(Object.fromEntries(DSCap.map((row) => [row.MA_CAP, false])));
        } catch (error) {
            console.log("fetch failed");
        }
    }
    async function handleCreate() {
        try {
            const res = await fetch("/api/admin/danhmuc/cap/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            ToastResponse(res);
            setInputs(initialInput);
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
    }
    async function handleEdit() {
        const MA_CAP = editModal;
        const { TEN_CAP, MO_TA_CAP } = inputs;
        try {
            const res = fetch(`/api/admin/danhmuc/cap/${MA_CAP}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ TEN_CAP, MO_TA_CAP }),
            });
            ToastResponse(res); //thong bao cho nguoi dung
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
        setInputs(initialInput);
        setEditModal(false);
    }
    async function handleDelete(target) {
        try {
            const res = await fetch(`/api/admin/danhmuc/cap/${target}`, {
                method: "delete",
            });
            ToastResponse(res); //thong bao cho nguoi dung
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Modal show={createModal}>
                <ModalHeader>Tạo cấp mới</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.MA_CAP}
                        name="MA_CAP"
                        id="MA_CAP"
                    >
                        Mã cấp
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_CAP}
                        name="TEN_CAP"
                        id="TEN_CAP"
                    >
                        Tên cấp
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MO_TA_CAP}
                        name="MO_TA_CAP"
                        id="MO_TA_CAP"
                        className="p-2 w-[100%] h-20 border-secondaryColor border-2 transition-all ease-in-out duration-300 focus:border-primaryColor outline-0"
                    ></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
                        <button
                            onClick={() => {
                                setInputs(initialInput);
                                setCreateModal(false);
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
                <ModalHeader>Sửa cấp</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        disabled={true}
                        onChange={handleChange}
                        value={inputs.MA_CAP}
                        name="MA_CAP"
                        id="MA_CAP"
                    >
                        Mã cấp
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_CAP}
                        name="TEN_CAP"
                        id="TEN_CAP"
                    >
                        Tên cấp
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MO_TA_CAP}
                        name="MO_TA_CAP"
                        id="MO_TA_CAP"
                        className="p-2 w-[100%] h-20 border-secondaryColor border-2 transition-all ease-in-out duration-300 focus:border-primaryColor outline-0"
                    ></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
                        <button
                            onClick={() => {
                                setInputs(initialInput);
                                setEditModal(false);
                            }}
                            className="cursor-pointer border-b-2 text-textColor2 border-textColor2 text-h5 overflow-visible px-4 py-1 hover:bg-gray-100 transition-all ease-in-out duration-300"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleEdit}
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
            <h1 className="text-h2 font-semibold my-2.5">Danh sách cấp nghiên cứu</h1>
            <div className="relative bg-white p-5 rounded-lg">
                <div className="TableControl grid grid-cols-8 gap-5">
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
                        onClick={() => setCreateModal(true)}
                        IconRight={<HiPlus></HiPlus>}
                        size="small"
                        className="bg-successColor justify-center text-textColor1"
                    >
                        Thêm đề tài
                    </MyButton>
                </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[5%]">
                                <CheckBox onChange={handleSelectAll}></CheckBox>
                            </TableHeadCell>
                            <TableHeadCell className="w-[15%]">Mã cấp</TableHeadCell>
                            <TableHeadCell className="text-left">Tên cấp</TableHeadCell>
                            <TableHeadCell className="text-center">Mô tả</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="text-h6">
                        {data.map((row) => (
                            <TableRow key={row.MA_CAP}>
                                <TableCell>
                                    <CheckBox
                                        onChange={() => {
                                            handleSelectRows(row.MA_CAP);
                                        }}
                                        checked={selectedRows[row.MA_CAP]}
                                    ></CheckBox>
                                </TableCell>
                                <TableCell className="text-center">{row.MA_CAP}</TableCell>
                                <TableCell
                                    onClick={() => {
                                        setEditModal(row.MA_CAP);
                                        setInputs(row);
                                    }}
                                    className="hover:underline hover:cursor-pointer"
                                >
                                    {row.TEN_CAP}
                                </TableCell>
                                <TableCell className="text-center">{row.MO_TA_CAP}</TableCell>
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
        </>
    );
}
export default function AdminDanhMucCap() {
    return (
        <div className="wrapper">
            <DanhSachCap></DanhSachCap>
        </div>
    );
}
