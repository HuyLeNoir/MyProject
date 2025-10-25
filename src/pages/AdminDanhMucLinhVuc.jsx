import MyButton from "./components/MyButton";
import { HiPlus, HiDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "./components/Modal";
import { TextWithLabel } from "./components/Form";
import { Toast } from "./Login";

import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "./components/TableOverhaul";
function DanhSachCap() {
    const target = "";
    const initialInput = { MA_LINH_VUC: "", TEN_LINH_VUC: "", MO_TA_LINH_VUC: "" };
    const [ToastMessage, setToastMessage] = useState("");
    const [data, setData] = useState([]);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(target); //edit target
    const [ToastSuccess, setToastSuccess] = useState(true);
    const [ToastDisplay, setToastDisplay] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputs, setInputs] = useState(initialInput);
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedAmount, setSelectAmount] = useState(0);
    async function response(res) {
        if (res.ok) {
            console.log("status: ok.");
            const response = await res.json();
            setToastMessage(response.message);
            setToastSuccess(response.success);
        }
        setToastDisplay(true);
        setOpenModal(false);
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
        handleGet();
    }, []);
    useEffect(() => {
        setSelectAmount(Object.values(selectedRows).filter((ID) => ID == true).length);
    }, [selectedRows]);
    //CRUD
    async function handleGet() {
        try {
            const res = await fetch("/api/admin/danhmuc/linhvuc");
            const json = await res.json();
            if (res.ok) {
                console.log("fetch completed");
            }
            setData(json);
            //init trang thai select, tranh bi loi control uncontroled element
            setSelectedRows({}); //tra ve initial cua selectedRows de tranh sau khi xoa thi cac gia tri (prev) tuc la id cu van con
            json.map((row) => {
                setSelectedRows((prev) => ({ ...prev, [row.MA_LINH_VUC]: false }));
            });
        } catch (error) {
            console.log("fetch failed");
        }
    }
    async function handleCreate() {
        console.log(inputs);
        try {
            const res = await fetch("/api/admin/danhmuc/linhvuc/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            await response(res);
            setInputs(initialInput);
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
    }
    async function handleEdit() {
        const MA_LINH_VUC = editModal;
        const { TEN_LINH_VUC, MO_TA_LINH_VUC } = inputs;
        try {
            const res = fetch(`/api/admin/danhmuc/linhvuc/${MA_LINH_VUC}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ TEN_LINH_VUC, MO_TA_LINH_VUC }),
            });
            await response(res); //thong bao cho nguoi dung
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
        setInputs(initialInput);
        setEditModal(false);
    }
    async function handleDelete(target) {
        try {
            const res = await fetch(`/api/admin/danhmuc/linhvuc/${target}`, {
                method: "delete",
            });
            await response(res); //thong bao cho nguoi dung
            handleGet();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Modal show={openModal}>
                <ModalHeader>Tạo lĩnh vực mới</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.MA_LINH_VUC}
                        name="MA_LINH_VUC"
                        id="MA_LINH_VUC"
                    >
                        Mã lĩnh vực
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_LINH_VUC}
                        name="TEN_LINH_VUC"
                        id="TEN_LINH_VUC"
                    >
                        Tên lĩnh vực
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MO_TA_LINH_VUC}
                        name="MO_TA_LINH_VUC"
                        id="MO_TA_LINH_VUC"
                        className="p-2 w-[100%] h-20 border-secondaryColor border-2 transition-all ease-in-out duration-300 focus:border-primaryColor outline-0"
                    ></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end gap-2.5 w-full">
                        <button
                            onClick={() => {
                                setInputs(initialInput);
                                setOpenModal(false);
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
                <ModalHeader>Sửa lĩnh vực</ModalHeader>
                <ModalBody>
                    <TextWithLabel
                        disable={true}
                        onChange={handleChange}
                        value={inputs.MA_LINH_VUC}
                        name="MA_LINH_VUC"
                        id="MA_LINH_VUC"
                    >
                        Mã lĩnh vực
                    </TextWithLabel>
                    <TextWithLabel
                        onChange={handleChange}
                        value={inputs.TEN_LINH_VUC}
                        name="TEN_LINH_VUC"
                        id="TEN_LINH_VUC"
                    >
                        Tên lĩnh vực
                    </TextWithLabel>
                    <label className="px-2" htmlFor="moTa">
                        Mô tả
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={inputs.MO_TA_LINH_VUC}
                        name="MO_TA_LINH_VUC"
                        id="MO_TA_LINH_VUC"
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

            <h1 className="text-h2 font-semibold my-2.5">Danh sách lĩnh vực nghiên cứu</h1>
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
                            onClick={() => setDisplayConfirmModal(true)}
                            className={
                                "border-1 px-2 py-1 text-h6 border-redWarning text-redWarning"
                            }
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
                        onClick={() => setOpenModal(true)}
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
                            <TableHeadCell className="w-[15%]">Mã lĩnh vực</TableHeadCell>
                            <TableHeadCell className="text-left">Tên lĩnh vực</TableHeadCell>
                            <TableHeadCell className="text-center">Mô tả</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="text-h6">
                        {data.map((row) => (
                            <TableRow key={row.MA_LINH_VUC}>
                                <TableCell>
                                    <CheckBox
                                        onChange={() => {
                                            handleSelectRows(row.MA_LINH_VUC);
                                        }}
                                        checked={selectedRows[row.MA_LINH_VUC]}
                                    ></CheckBox>
                                </TableCell>
                                <TableCell className="text-center">{row.MA_LINH_VUC}</TableCell>
                                <TableCell
                                    onClick={() => {
                                        setEditModal(row.MA_LINH_VUC);
                                        setInputs(row);
                                    }}
                                    className="hover:underline hover:cursor-pointer"
                                >
                                    {row.TEN_LINH_VUC}
                                </TableCell>
                                <TableCell className="text-center">{row.MO_TA_LINH_VUC}</TableCell>
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
                isSuccess={true}
            ></Toast>
        </>
    );
}
export default function AdminDanhMucLinhVuc() {
    return (
        <div className="wrapper">
            <DanhSachCap></DanhSachCap>
        </div>
    );
}
