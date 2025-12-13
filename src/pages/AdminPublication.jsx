import MyButton from "../components/MyButton.jsx";
import {
    getUsers,
    getPublications,
    getPublicationByID,
    getType,
    queryPublications,
} from "../services/Services.js";
import {
    GiangVienFromUsers,
    formatDisplayDateToSQLDate,
    formatToDisplayDate,
    getToken,
} from "../util/util.js";
import { HiPlus, HiSearch, HiArrowLeft, HiAdjustments, HiDownload, HiTrash } from "react-icons/hi";
import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { TextWithLabel, OnlyText } from "../components/Form.jsx";
import { AdminContext, GlobalContext, PublicationContext } from "../context/Context.jsx";
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

export function EditPublication() {
    const { id } = useParams();
    const [inputs, setInputs] = useState({});
    const [type, setType] = useState(""); //loai cua bai bao
    const [nguonThamKhao, setNguonThamKhao] = useState("");
    const [listNguonThamKhao, setListNguonThamKhao] = useState([]);
    const [members, setMembers] = useState([]);
    const token = getToken();
    const [giangVien, setGiangVien] = useState("");
    const { DSGiangVien, types } = useContext(PublicationContext);
    const { showToast, ToastResponse } = useContext(AdminContext);
    //test data
    useEffect(() => {
        async function getData() {
            try {
                const { res, json } = await getPublicationByID(id);
                const {
                    DOI_BAIBAO,
                    ID_BAIBAO,
                    KEYWORD_BAIBAO,
                    LOAI_BAIBAO,
                    NAM_BAIBAO,
                    SOTAP_TAPCHI,
                    TEN_BAIBAO,
                    TEN_TAPCHI,
                    THANHVIEN,
                    TOMTAT_BAIBAO,
                    NGUONTHAMKHAO,
                    TRICHDAN_BAIBAO,
                    TEN_HOITHAO,
                    DIADIEM_HOITHAO,
                } = json;

                setInputs({
                    ID_BAIBAO: ID_BAIBAO,
                    KEYWORD_BAIBAO: KEYWORD_BAIBAO,
                    LOAI_BAIBAO: LOAI_BAIBAO,
                    NAM_BAIBAO: formatToDisplayDate(new Date(NAM_BAIBAO)),
                    SOTAP_TAPCHI: SOTAP_TAPCHI,
                    TEN_BAIBAO: TEN_BAIBAO,
                    TEN_TAPCHI: TEN_TAPCHI,
                    TOMTAT_BAIBAO: TOMTAT_BAIBAO,
                    TRICHDAN_BAIBAO: TRICHDAN_BAIBAO,
                    TEN_HOITHAO: TEN_HOITHAO,
                    DIADIEM_HOITHAO: DIADIEM_HOITHAO,
                    DOI_BAIBAO: DOI_BAIBAO,
                });
                setType(LOAI_BAIBAO);
                setMembers(THANHVIEN.split(","));
                setListNguonThamKhao(NGUONTHAMKHAO.split(";"));
                console.log(json);
            } catch (error) {
                console.log(error.message);
            }
        }
        getData();
    }, []);

    function handleAddMember() {
        console.log("added", giangVien.input);
        if (members.find((member) => member.includes(giangVien.input))) {
            return;
        }
        setMembers([...members, giangVien.input]);
    }
    function handleRemoveMember(target) {
        setMembers(members.filter((row) => !row.includes(target)));
    }
    async function handleSubmit() {
        const submitInput = { ...inputs };
        submitInput["THANHVIEN"] = members;
        submitInput["NGUONTHAMKHAO"] = listNguonThamKhao;
        submitInput["LOAI_BAIBAO"] = type;
        submitInput["NAM_BAIBAO"] = formatDisplayDateToSQLDate(submitInput["NAM_BAIBAO"]);
        const REQUIRED_FIELDS = [
            "ID_BAIBAO",
            "TEN_BAIBAO",
            "LOAI_BAIBAO",
            "NAM_BAIBAO",
            "DOI_BAIBAO",
            "KEYWORD_BAIBAO",
            "TRICHDAN_BAIBAO",
            "TOMTAT_BAIBAO",
        ];
        if (type == "Tạp chí khoa học") {
            REQUIRED_FIELDS.push("TEN_TAPCHI");
            REQUIRED_FIELDS.push("SOTAP_TAPCHI");
            submitInput["DIADIEM_HOITHAO"] = null;
            submitInput["TEN_HOITHAO"] = null;
            setInputs((prev) => ({ ...prev, DIADIEM_HOITHAO: "", TEN_HOITHAO: "" }));
        } else if (type == "Hội thảo khoa học") {
            REQUIRED_FIELDS.push("TEN_HOITHAO");
            REQUIRED_FIELDS.push("DIADIEM_HOITHAO");
            submitInput["SOTAP_TAPCHI"] = null;
            submitInput["TEN_TAPCHI"] = null;
            setInputs((prev) => ({ ...prev, SOTAP_TAPCHI: "", TEN_TAPCHI: "" }));
        } else {
            submitInput["DIADIEM_HOITHAO"] = null;
            submitInput["TEN_HOITHAO"] = null;
            submitInput["SOTAP_TAPCHI"] = null;
            submitInput["TEN_TAPCHI"] = null;
        }
        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        if (members.length == 0 || !members) {
            showToast("Vui lòng thêm ít nhất một giảng viên.", false);
            return;
        }
        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        let res;
        try {
            console.log(submitInput);
            res = await fetch(`/api/admin/publications/${id}`, {
                method: "put",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(submitInput),
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            ToastResponse(res);
        }
    }

    const handleChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value }));
    });

    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/publications">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Thêm một bài báo mới</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    className="w-full"
                    disabled={true}
                    onChange={handleChange}
                    placeHolder="Nhập mã bài báo"
                    name="ID_BAIBAO"
                    value={inputs.ID_BAIBAO || ""}
                >
                    Mã bài báo
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập tên bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="TEN_BAIBAO"
                    value={inputs.TEN_BAIBAO || ""}
                >
                    Tên bài báo
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập DOI của bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="DOI_BAIBAO"
                    value={inputs.DOI_BAIBAO || ""}
                >
                    DOI
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập trích dẫn của bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="TRICHDAN_BAIBAO"
                    value={inputs.TRICHDAN_BAIBAO || ""}
                >
                    Trích dẫn
                </TextWithLabel>
                <TextWithLabel
                    type="text"
                    placeHolder="Ngày công bố"
                    className="w-50"
                    onChange={handleChange}
                    name="NAM_BAIBAO"
                    value={inputs.NAM_BAIBAO || ""}
                >
                    Ngày công bố
                </TextWithLabel>
                <label htmlFor="keywords">Keywords</label>
                <textarea
                    placeholder="Những từ khoá của bài báo"
                    name="KEYWORD_BAIBAO"
                    value={inputs.KEYWORD_BAIBAO || ""}
                    onChange={handleChange}
                    id="keywords"
                    className=" p-2 w-full border rounded-md h-20"
                ></textarea>
                <label htmlFor="tomtat">Tóm tắt</label>
                <textarea
                    placeholder="Tóm tắt của bài báo"
                    name="TOMTAT_BAIBAO"
                    value={inputs.TOMTAT_BAIBAO || ""}
                    onChange={handleChange}
                    id="tomtat"
                    className="w-full p-2 border rounded-md h-100"
                ></textarea>
                <div className="flex gap-2.5">
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={DSGiangVien}
                        fieldName={"Giảng viên tham gia"}
                    ></TextInput>
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
                            <TableHeadCell>MACB</TableHeadCell>
                            <TableHeadCell>Tuỳ chọn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members
                            .map((member) => member.split(" - "))
                            .map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">{member[1]}</TableCell>
                                    <TableCell className="text-center">{member[0]}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <MyButton
                                                onClick={() => {
                                                    handleRemoveMember(member[0]);
                                                }}
                                                IconLeft={
                                                    <HiTrash
                                                        size={24}
                                                        className="text-redWarning"
                                                    />
                                                }
                                            ></MyButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <div className="flex w-150 items-center gap-2.5">
                    <TextWithLabel
                        className="w-full"
                        onChange={(e) => {
                            setNguonThamKhao(e.target.value);
                        }}
                        placeHolder="Nhập nguồn tham khảo"
                        name="nguonThamKhao"
                        value={nguonThamKhao}
                    >
                        Trích dẫn nguồn tham khảo
                    </TextWithLabel>
                    <button
                        onClick={(e) => {
                            if (!listNguonThamKhao.includes(nguonThamKhao)) {
                                setListNguonThamKhao((prev) => [...prev, nguonThamKhao]);
                            }
                        }}
                        className="bg-buttonColor self-end flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10"
                    >
                        <HiPlus size={24} />
                    </button>
                </div>
                <Table className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[15%]">ID</TableHeadCell>
                            <TableHeadCell>Nguồn</TableHeadCell>
                            <TableHeadCell className="whitespace-nowrap">Tuỳ chọn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listNguonThamKhao.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="text-left">{row}</TableCell>
                                <TableCell className="text-center">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MyButton
                                            onClick={() => {
                                                setListNguonThamKhao(
                                                    listNguonThamKhao.filter(
                                                        (element) => !(element == row)
                                                    )
                                                );
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
                    size="medium"
                    fieldName="Loại bài báo"
                    options={types}
                    select={type}
                    setSelect={setType}
                ></DropDown>

                {type &&
                    (type === "Tạp chí khoa học" ? (
                        <div>
                            <div className="flex gap-10">
                                <TextWithLabel
                                    placeHolder="Tên của tạp chí"
                                    className="w-150"
                                    onChange={handleChange}
                                    name="TEN_TAPCHI"
                                    value={inputs.TEN_TAPCHI || ""}
                                >
                                    Tên tạp chí
                                </TextWithLabel>
                                <TextWithLabel
                                    placeHolder="Đăng tại số, tập"
                                    className="w-50"
                                    onChange={handleChange}
                                    name="SOTAP_TAPCHI"
                                    value={inputs.SOTAP_TAPCHI || ""}
                                >
                                    Số đăng
                                </TextWithLabel>
                            </div>
                        </div>
                    ) : type === "Hội thảo khoa học" ? (
                        <div>
                            <div className="flex gap-10">
                                <TextWithLabel
                                    placeHolder="Tên của hội thảo"
                                    className="w-150"
                                    onChange={handleChange}
                                    name="TEN_HOITHAO"
                                    value={inputs.TEN_HOITHAO || ""}
                                >
                                    Tên hội thảo
                                </TextWithLabel>
                                <TextWithLabel
                                    placeHolder="Địa điểm diễn ra hội thảo"
                                    className="w-50"
                                    onChange={handleChange}
                                    name="DIADIEM_HOITHAO"
                                    value={inputs.DIADIEM_HOITHAO || ""}
                                >
                                    Địa điểm hội thảo
                                </TextWithLabel>
                            </div>
                        </div>
                    ) : (
                        ""
                    ))}
                <div className="flex w-full gap-2.5 justify-between flex-row-reverse  items-center">
                    <MyButton
                        onClick={handleSubmit}
                        size="large"
                        className="bg-primaryColor text-white"
                    >
                        Xác nhận
                    </MyButton>
                    <MyButton
                        onClick={() => {
                            setInputs({});
                            setMembers([]);
                            setType("");
                            setGiangVien("");
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
export function NewPublication() {
    const [inputs, setInputs] = useState({});
    const [type, setType] = useState(""); //loai cua bai bao
    const [members, setMembers] = useState([]);
    const [nguonThamKhao, setNguonThamKhao] = useState("");
    const [listNguonThamKhao, setListNguonThamKhao] = useState([]);
    const token = getToken();
    const [giangVien, setGiangVien] = useState("");
    const { DSGiangVien, types } = useContext(PublicationContext);
    const { showToast, ToastResponse } = useContext(AdminContext);
    //test data
    function handleAddMember() {
        console.log("added", giangVien.input);
        if (members.find((member) => member.includes(giangVien.input))) {
            return;
        }
        setMembers([...members, giangVien.input]);
    }
    function handleRemoveMember(target) {
        setMembers(members.filter((row) => !row.includes(target)));
    }
    async function handleSubmit() {
        const submitInput = { ...inputs };
        submitInput["THANHVIEN"] = members;
        submitInput["NGUONTHAMKHAO"] = listNguonThamKhao;
        submitInput["LOAI_BAIBAO"] = type;
        submitInput["NAM_BAIBAO"] = formatDisplayDateToSQLDate(submitInput["NAM_BAIBAO"]);
        console.log(submitInput["NAM_BAIBAO"]);
        const REQUIRED_FIELDS = [
            "ID_BAIBAO",
            "TEN_BAIBAO",
            "LOAI_BAIBAO",
            "NAM_BAIBAO",
            "DOI_BAIBAO",
            "KEYWORD_BAIBAO",
            "TRICHDAN_BAIBAO",
            "TOMTAT_BAIBAO",
        ];
        if (type == "Tạp chí khoa học") {
            REQUIRED_FIELDS.push("TEN_TAPCHI");
            REQUIRED_FIELDS.push("SOTAP_TAPCHI");
        } else if (type == "Hội thảo khoa học") {
            REQUIRED_FIELDS.push("TEN_HOITHAO");
            REQUIRED_FIELDS.push("DIADIEM_HOITHAO");
        } else {
            console.log("ARGHHHH");
        }
        // Tìm các trường bị thiếu
        const missingField = REQUIRED_FIELDS.find((field) => {
            // Kiểm tra xem giá trị có trống rỗng, null, hoặc undefined không
            const value = submitInput[field];
            return !value || (typeof value === "string" && value.trim() === "");
        });

        if (members.length == 0 || !members) {
            showToast("Vui lòng thêm ít nhất một giảng viên.", false);
            return;
        }
        // Nếu tìm thấy trường bị thiếu, dừng lại và hiển thị lỗi
        if (missingField) {
            showToast(`Trường "${missingField}" là bắt buộc!`, false);
            return;
        }
        try {
            console.log(submitInput);
            const res = await fetch("/api/admin/publications/", {
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
        if (name == "KINHPHI_PROJECT" && !/^\d*$/.test(value.replace(/\./g, ""))) {
            return;
        }
        setInputs((prev) => ({ ...prev, [name]: value }));
    });
    useEffect(() => {
        console.log(listNguonThamKhao);
    }, [listNguonThamKhao]);
    return (
        <>
            <div className="flex gap-2.5 justify-left items-center">
                <MyButton className="bg-buttonColor aspect-square h-12">
                    <Link to="/admin/publications">
                        <HiArrowLeft size={32}></HiArrowLeft>
                    </Link>
                </MyButton>
                <h1 className="text-h2 font-semibold my-2.5">Thêm một dự án mới</h1>
            </div>
            <div className="relative bg-white p-5 shadow-md border-1 flex flex-col items-start gap-2.5 border-gray-200">
                <TextWithLabel
                    onChange={handleChange}
                    placeHolder="Nhập mã bài báo"
                    name="ID_BAIBAO"
                    value={inputs.ID_BAIBAO || ""}
                >
                    Mã bài báo
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập tên bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="TEN_BAIBAO"
                    value={inputs.TEN_BAIBAO || ""}
                >
                    Tên bài báo
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập DOI của bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="DOI_BAIBAO"
                    value={inputs.DOI_BAIBAO || ""}
                >
                    DOI
                </TextWithLabel>
                <TextWithLabel
                    placeHolder="Nhập trích dẫn của bài báo"
                    className="w-full"
                    onChange={handleChange}
                    name="TRICHDAN_BAIBAO"
                    value={inputs.TRICHDAN_BAIBAO || ""}
                >
                    Trích dẫn
                </TextWithLabel>
                <TextWithLabel
                    type="text"
                    placeHolder="Ngày công bố"
                    className="w-50"
                    onChange={handleChange}
                    name="NAM_BAIBAO"
                    value={inputs.NAM_BAIBAO || ""}
                >
                    Ngày công bố
                </TextWithLabel>
                <label htmlFor="keywords">Keywords</label>
                <textarea
                    placeholder="Những từ khoá của bài báo"
                    name="KEYWORD_BAIBAO"
                    value={inputs.KEYWORD_BAIBAO || ""}
                    onChange={handleChange}
                    id="keywords"
                    className=" p-2 w-full border rounded-md h-20"
                ></textarea>
                <label htmlFor="tomtat">Tóm tắt</label>
                <textarea
                    placeholder="Tóm tắt của bài báo"
                    name="TOMTAT_BAIBAO"
                    value={inputs.TOMTAT_BAIBAO || ""}
                    onChange={handleChange}
                    id="tomtat"
                    className="w-full p-2 border rounded-md h-100"
                ></textarea>
                <div className="flex gap-2.5">
                    <TextInput
                        size="large"
                        giangVien={giangVien}
                        setGiangVien={setGiangVien}
                        users={DSGiangVien}
                        fieldName={"Giảng viên tham gia"}
                    ></TextInput>
                    <button
                        onClick={handleAddMember}
                        className="bg-buttonColor flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10"
                    >
                        <HiPlus size={24} />
                    </button>
                </div>

                <Table className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>STT</TableHeadCell>
                            <TableHeadCell>Họ và tên</TableHeadCell>
                            <TableHeadCell>MACB</TableHeadCell>
                            <TableHeadCell>Tuỳ chọn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members
                            .map((member) => member.split(" - "))
                            .map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">{member[1]}</TableCell>
                                    <TableCell className="text-center">{member[0]}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <MyButton
                                                onClick={() => {
                                                    handleRemoveMember(member[0]);
                                                }}
                                                IconLeft={
                                                    <HiTrash
                                                        size={24}
                                                        className="text-redWarning"
                                                    />
                                                }
                                            ></MyButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <div className="flex w-150 items-center gap-2.5">
                    <TextWithLabel
                        className="w-full"
                        onChange={(e) => {
                            setNguonThamKhao(e.target.value);
                        }}
                        placeHolder="Nhập nguồn tham khảo"
                        name="nguonThamKhao"
                        value={nguonThamKhao}
                    >
                        Trích dẫn nguồn tham khảo
                    </TextWithLabel>
                    <button
                        onClick={(e) => {
                            if (!listNguonThamKhao.includes(nguonThamKhao)) {
                                setListNguonThamKhao((prev) => [...prev, nguonThamKhao]);
                            }
                        }}
                        className="bg-buttonColor self-end flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10"
                    >
                        <HiPlus size={24} />
                    </button>
                </div>
                <Table className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="w-[15%]">ID</TableHeadCell>
                            <TableHeadCell>Nguồn</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listNguonThamKhao.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="text-left">{row}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DropDown
                    size="medium"
                    fieldName="Loại bài báo"
                    options={types}
                    select={type}
                    setSelect={setType}
                ></DropDown>
                {type &&
                    (type === "Tạp chí khoa học" ? (
                        <div>
                            <div className="flex gap-10">
                                <TextWithLabel
                                    placeHolder="Tên của tạp chí"
                                    className="w-150"
                                    onChange={handleChange}
                                    name="TEN_TAPCHI"
                                    value={inputs.TEN_TAPCHI || ""}
                                >
                                    Tên tạp chí
                                </TextWithLabel>
                                <TextWithLabel
                                    placeHolder="Đăng tại số, tập"
                                    className="w-50"
                                    onChange={handleChange}
                                    name="SOTAP_TAPCHI"
                                    value={inputs.SOTAP_TAPCHI || ""}
                                >
                                    Số đăng
                                </TextWithLabel>
                            </div>
                        </div>
                    ) : type === "Hội thảo khoa học" ? (
                        <div>
                            <div className="flex gap-10">
                                <TextWithLabel
                                    placeHolder="Tên của hội thảo"
                                    className="w-150"
                                    onChange={handleChange}
                                    name="TEN_HOITHAO"
                                    value={inputs.TEN_HOITHAO || ""}
                                >
                                    Tên hội thảo
                                </TextWithLabel>
                                <TextWithLabel
                                    placeHolder="Địa điểm diễn ra hội thảo"
                                    className="w-50"
                                    onChange={handleChange}
                                    name="DIADIEM_HOITHAO"
                                    value={inputs.DIADIEM_HOITHAO || ""}
                                >
                                    Địa điểm hội thảo
                                </TextWithLabel>
                            </div>
                        </div>
                    ) : (
                        ""
                    ))}
                <div className="flex w-full gap-2.5 justify-between flex-row-reverse  items-center">
                    <MyButton
                        onClick={handleSubmit}
                        size="large"
                        className="bg-primaryColor text-white"
                    >
                        Xác nhận
                    </MyButton>
                    <MyButton
                        onClick={() => {
                            setInputs({});
                            setMembers([]);
                            setType("");
                            setGiangVien("");
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
export function DanhSachPublication() {
    const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const token = getToken();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState({ displayData: [], fetchData: [] });
    const { FetchData } = useContext(PublicationContext);
    const [publicationType, setPublicationType] = useState("");
    const { showToast, ToastResponse } = useContext(AdminContext);
    const [namBD, setNamBD] = useState("");
    const [namKT, setNamKT] = useState("");
    const [giangVien, setGiangVien] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [confirmModal, setDisplayConfirmModal] = useState(false);
    //paginatioon
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState({});
    const { data } = useContext(GlobalContext);
    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/admin/publications/${id}`, {
                method: "delete",
                headers: { Authorization: `Bearer ${token}` },
            });
            ToastResponse(res);
        } catch (error) {
            showToast(error.message, false);
        }
    }
    useEffect(() => {
        async function handleGet() {
            try {
                const { res, json } = FetchData;
                if (res.ok) {
                    setTableData({ displayData: json, fetchData: json });
                    setSelectedRows(Object.fromEntries(json.map((row) => [row.ID_BAIBAO, false])));
                }
            } catch (error) {
                console.log(error.message);
                if (error.message.includes("403")) {
                    navigate("/login");
                }
            }
        }
        handleGet();
    }, []);
    function handleChange(e) {
        setSearchValue(e.target.value);
    }
    async function handleSearch() {
        setCurrentPage(0);
        const query = {
            MACB: giangVien.MACB || null,
            LOAI_BAIBAO: publicationType || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryPublications(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
    }
    async function handleFilters() {
        setCurrentPage(0);
        const query = {
            MACB: giangVien.MACB || null,
            LOAI_BAIBAO: publicationType || null,
            NAM_BD: namBD,
            NAM_KT: namKT,
            Search: searchValue || null,
        };
        const { res, json } = await queryPublications(query);
        setTableData((prev) => ({ ...prev, displayData: json }));
        setFilterIsOpen(false);
    }
    function clearFilters() {
        setCurrentPage(0);
        setPublicationType("");
        setGiangVien({});
        setSearchValue("");
        setNamBD("");
        setNamKT("");
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
            <h1 className="text-h2 font-semibold my-2.5">Danh sách bài báo</h1>
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
                                size="medium"
                                select={publicationType}
                                setSelect={setPublicationType}
                                fieldName="Loại bài báo"
                                open={false}
                                options={data.types}
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
                                fieldName={"Thành viên tham gia"}
                                users={data.giangVien}
                                giangVien={giangVien}
                                setGiangVien={setGiangVien}
                            ></TextInput>
                        </div>
                        <div className="flex gap-2.5">
                            {" "}
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
                            <TableHeadCell className="w-[15%]">Mã bài báo</TableHeadCell>
                            <TableHeadCell className="text-left">Tên bài báo</TableHeadCell>
                            <TableHeadCell className="w-[20%] text-center">
                                Loại bài báo
                            </TableHeadCell>
                            <TableHeadCell className="w-[20%] text-center">
                                Ngày công bố
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.displayData.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No result
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.displayData
                                .slice(
                                    rowPerPage * currentPage,
                                    rowPerPage * currentPage + rowPerPage
                                )
                                .map(({ ID_BAIBAO, TEN_BAIBAO, LOAI_BAIBAO, NAM_BAIBAO }) => (
                                    <TableRow key={ID_BAIBAO}>
                                        <TableCell>
                                            <CheckBox
                                                onChange={() => {
                                                    handleSelectRows(ID_BAIBAO);
                                                }}
                                                checked={selectedRows[ID_BAIBAO]}
                                            ></CheckBox>
                                        </TableCell>
                                        <TableCell className="text-center">{ID_BAIBAO}</TableCell>
                                        <TableCell className="hover:underline hover:cursor-pointer">
                                            <Link to={`edit/${ID_BAIBAO}`}>{TEN_BAIBAO}</Link>
                                        </TableCell>
                                        <TableCell className="text-center">{LOAI_BAIBAO}</TableCell>
                                        <TableCell className="text-center">
                                            {formatToDisplayDate(new Date(NAM_BAIBAO))}
                                        </TableCell>
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
        </>
    );
}
export function AdminPublication() {
    const [loading, setLoading] = useState(true);
    const [DSGiangVien, setDSGiangVien] = useState([]);
    const [types, setTypes] = useState([]);
    const [FetchData, setFetchData] = useState([]);
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
            try {
                const [userData, publications, publicationType] = await Promise.all([
                    getUsers(),
                    getPublications(),
                    getType(),
                ]);
                const { DSUser } = userData;
                setTypes(publicationType.json.map((row) => row.TEN_LOAI));
                setDSGiangVien(GiangVienFromUsers(DSUser));
                setFetchData(publications);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) return <div>Đang tải dữ liệu...</div>;
    return (
        <PublicationContext.Provider value={{ FetchData, DSGiangVien, types }}>
            <Outlet />
            <Toast
                ToastDisplay={ToastDisplay}
                ToastMessage={ToastMessage}
                ToastSuccess={ToastSuccess}
                SetToastDisplay={setToastDisplay}
            ></Toast>
        </PublicationContext.Provider>
    );
}
