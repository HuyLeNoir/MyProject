import MyButton from "../components/MyButton";
import { HiPlus, HiDownload } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "../components/Modal";
import { TextWithLabel } from "../components/Form";
import { getCap, getType } from "../services/Services";
import { getToken } from "../util/util";

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
import { AdminContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
function DanhSachLoai() {
    const token = getToken();
    const navigate = useNavigate();
    const target = "";
    const { ToastMessage, ToastSuccess, ToastDisplay, setToastDisplay, ToastResponse } =
        useContext(AdminContext);
    const initialInput = { ID_LOAI: "", TEN_LOAI: "", MOTA_LOAI: "" };
    const [data, setData] = useState([]);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(target); //edit target
    const [createModal, setCreateModal] = useState(false);
    const [inputs, setInputs] = useState(initialInput);
    const [selectedRows, setSelectedRows] = useState({ all: false });

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
        setSelectedRows((prev) => ({ ...prev, [ID]: !prev[ID] }));
    }
    useEffect(() => {
        handleGet();
    }, []);
    const selectedAmount = Object.entries(selectedRows).filter(
        ([key, value]) => value == true && key != "all"
    ).length;

    //CRUD
    async function handleGet() {
        console.log("called");
        try {
            const { res, json } = await getType();
            if (res.ok) {
                setData(json);
                console.log(json);
                setSelectedRows(Object.fromEntries(json.map((row) => [row.ID_LOAI, false])));
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("403")) {
                navigate("/login");
            }
        }
    }
    async function handleCreate() {
        try {
            const res = await fetch("/api/admin/danhmuc/type/", {
                method: "post",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
        const ID_LOAI = editModal;
        const { TEN_LOAI, MOTA_LOAI } = inputs;
        try {
            const res = fetch(`/api/admin/danhmuc/type/${ID_LOAI}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ TEN_LOAI, MOTA_LOAI }),
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
            const res = await fetch(`/api/admin/danhmuc/type/${target}`, {
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
                        value={inputs.ID_LOAI}
                        name="ID_LOAI"
                        id="ID_LOAI"
                    >
                        Mã cấp
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_LOAI}
                        name="TEN_LOAI"
                        id="TEN_LOAI"
                    >
                        Tên cấp
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MOTA_LOAI}
                        name="MOTA_LOAI"
                        id="MOTA_LOAI"
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
                        value={inputs.ID_LOAI}
                        name="ID_LOAI"
                        id="ID_LOAI"
                    >
                        Mã cấp
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_LOAI}
                        name="TEN_LOAI"
                        id="TEN_LOAI"
                    >
                        Tên cấp
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MOTA_LOAI}
                        name="MOTA_LOAI"
                        id="MOTA_LOAI"
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
            <h1 className="text-h2 font-semibold my-2.5">Danh sách loại bài báo</h1>
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
                        Thêm
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
                            <TableHeadCell className="w-[15%]">Mã loại bài báo</TableHeadCell>
                            <TableHeadCell className="text-left">Tên loại bài báo</TableHeadCell>
                            <TableHeadCell className="text-center">Mô tả</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="text-h6">
                        {data.map((row) => (
                            <TableRow key={row.ID_LOAI}>
                                <TableCell>
                                    <CheckBox
                                        onChange={() => {
                                            handleSelectRows(row.ID_LOAI);
                                        }}
                                        checked={selectedRows[row.ID_LOAI]}
                                    ></CheckBox>
                                </TableCell>
                                <TableCell className="text-center">{row.ID_LOAI}</TableCell>
                                <TableCell
                                    onClick={() => {
                                        setEditModal(row.ID_LOAI);
                                        setInputs(row);
                                    }}
                                    className="hover:underline hover:cursor-pointer"
                                >
                                    {row.TEN_LOAI}
                                </TableCell>
                                <TableCell className="text-center">{row.MOTA_LOAI}</TableCell>
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
export default function AdminDanhMucLoaiBaiBao() {
    return (
        <div className="wrapper">
            <DanhSachLoai></DanhSachLoai>
        </div>
    );
}
