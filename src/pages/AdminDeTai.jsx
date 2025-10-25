import MyButton from "./components/MyButton";
import { HiPlus, HiSearch, HiArrowLeft, HiAdjustments, HiDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import DropDown from "./components/NewDropdown";
import { Outlet, useParams, Link } from "react-router-dom";
import { TextWithLabel, OnlyText } from "./components/Form";
import {
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    TableHead,
    TableBody,
    CheckBox,
} from "./components/TableOverhaul";
import NewDropDown from "./components/NewDropdown";
import TextInput from "./components/InputGiangVien";

export function EditDeTai() {
    const { id } = useParams();
    return <div></div>;
}
export function NewDeTai() {
    const [giangVien, setGiangVien] = useState({ Name: "", MSCB: "" });
    const [linhVuc, setLinhVuc] = useState();
    const [capDeTai, setCapDeTai] = useState();
    const giangVienKHMT = [
        { Name: "Mã Trường Thành", MSCB: "002937" },
        { Name: "Võ Trí Thức", MSCB: "002483" },
        { Name: "Trần Nguyễn Minh Thư", MSCB: "002635" },
        { Name: "Trần Việt Châu", MSCB: "002692" },
        { Name: "Phạm Nguyên Khang", MSCB: "001348" },
        { Name: "Lê Quyết Thắng", MSCB: "000509" },
        { Name: "Lưu Tiến Đạo", MSCB: "002805" },
        { Name: "Phạm Xuân Hiền", MSCB: "001707" },
        { Name: "Trần Nguyễn Dương Chi", MSCB: "002684" },
        { Name: "Phan Bích Chung", MSCB: "002265" },
        { Name: "Nguyễn Bá Diệp", MSCB: "002484" },
        { Name: "Phạm Nguyên Hoàng", MSCB: "002640" },
        { Name: "Huỳnh Ngọc Thái Anh", MSCB: "002854" },
    ];
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
                <TextWithLabel name={"tenDeTai"} className="w-200" id="tenDeTai">
                    Tên đề tài
                </TextWithLabel>
                <div className="flex gap-2.5">
                    <NewDropDown size="medium" fieldName={"Lĩnh vực"}>
                        <li>Y tế</li>
                        <li>Kinh tế</li>
                        <li>Văn hoá</li>
                        <li>Giáo dục</li>
                    </NewDropDown>
                    <NewDropDown size="medium" fieldName={"Cấp đề tài"}>
                        <li>Cấp sinh viên</li>
                        <li>Cấp trường</li>
                        <li>Cấp địa phương</li>
                        <li>Cấp nhà nước</li>
                    </NewDropDown>
                </div>
                <TextInput
                    giangVien={giangVien}
                    setGiangVien={setGiangVien}
                    users={giangVienKHMT}
                    fieldName={"Giảng viên hướng dẫn"}
                ></TextInput>
                <div className="flex gap-2.5 items-center justify-center">
                    <TextWithLabel id="chuNhiem" placeHolder="Nhập MSSV để thêm">
                        Chủ nhiệm đề tài
                    </TextWithLabel>
                    {/* FIX THIS */}
                    <button className="bg-buttonColor flex items-center justify-center rounded-true aspect-square cursor-pointer hover:shadow-xs h-10">
                        <HiPlus size={24} />
                    </button>
                </div>
                <ul>
                    <label htmlFor=""></label>
                </ul>
                <label htmlFor="tomtat">Tóm tắt đề tài</label>
                <textarea
                    name="tomtat"
                    id="tomtat"
                    className="w-full border rounded-md h-100"
                ></textarea>
            </div>
        </>
    );
}
export function DanhSachDeTai() {
    const [searchValue, setSearchValue] = useState("");
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [capDeTai, setCapDeTai] = useState();
    const [selectedRows, setSelectedRows] = useState({ DT01: false, DT02: false });
    const [linhVuc, setLinhVuc] = useState();
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
    useEffect(() => {
        console.log("testHere");
    }, [selectedRows]);

    return (
        <>
            <h1 className="text-h2 font-semibold my-2.5">Danh sách đề tài</h1>
            <div className="relative bg-white p-5 rounded-lg">
                <div className="TableControl grid grid-cols-8 gap-5">
                    <div className="col-span-3 flex justify-center items-center">
                        <span className=" h-[42px] bg-buttonColor aspect-square flex justify-center items-center rounded-bl-md rounded-tl-md text-textColor2">
                            <HiSearch size={24}></HiSearch>
                        </span>
                        <OnlyText
                            type={"text"}
                            name={"searchBar"}
                            id={"searchBar"}
                            onChange={handleChange}
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
                            className="min-w-40"
                            select={capDeTai}
                            setSelect={setCapDeTai}
                            fieldName={"Cấp đề tài"}
                        >
                            <li>Cấp sinh viên</li>
                            <li>Cấp địa phương</li>
                            <li>Cấp trường</li>
                        </DropDown>
                        <DropDown
                            className="min-w-40"
                            select={linhVuc}
                            setSelect={setLinhVuc}
                            fieldName={"Lĩnh vực đề tài"}
                        >
                            <li>Kinh tế</li>
                            <li>Y tế</li>
                            <li>Giáo dục</li>
                        </DropDown>
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
                            <TableHeadCell>Mã đề tài</TableHeadCell>
                            <TableHeadCell className="text-left">Tên</TableHeadCell>
                            <TableHeadCell className="text-center">Cấp</TableHeadCell>
                            <TableHeadCell className="text-center">Lĩnh vực</TableHeadCell>
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
                                <Link to="/Admin/DeTai/Edit/DT01">
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
            </div>
        </>
    );
}
export function DeTai() {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
}
