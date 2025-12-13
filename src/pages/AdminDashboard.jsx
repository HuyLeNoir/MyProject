import { useEffect, useMemo } from "react";
import LineGraph from "../components/LineGraph";
import {
    getStatisticTeachers,
    getUsers,
    getTeacherInformationByID,
} from "../services/Services_Public";
import { getDataByPeriod, GiangVienFromUsers } from "../util/util";
import { useState } from "react";
import Button from "../components/MyButton.jsx";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableHeadCell,
} from "../components/Table.jsx";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { exportReport } from "../util/exportExcel.js";
import { HiDownload } from "react-icons/hi";

export function Dashboard() {
    const navigate = useNavigate();
    const FULL_DATASET = {
        // Năm bắt đầu có xu hướng tăng, nhưng có biến động nhỏ
        2011: { researchs: 6, publications: 2, projects: 1, seminars: 3 },
        2012: { researchs: 7, publications: 4, projects: 2, seminars: 5 },
        2013: { researchs: 11, publications: 5, projects: 3, seminars: 7 },
        2014: { researchs: 10, publications: 6, projects: 5, seminars: 9 }, // <--- Research giảm nhẹ
        // Năm có sự tăng trưởng mạnh mẽ sau đó
        2015: { researchs: 16, publications: 9, projects: 6, seminars: 13 },
        2016: { researchs: 19, publications: 11, projects: 8, seminars: 16 },
        // Năm sụt giảm do yếu tố ngoại cảnh (ví dụ: khủng hoảng/dịch bệnh/thay đổi chính sách)
        2017: { researchs: 18, publications: 8, projects: 6, seminars: 14 }, // <--- Sụt giảm đáng kể ở Research & Publication
        // Phục hồi và tiếp tục xu hướng tăng
        2018: { researchs: 23, publications: 14, projects: 10, seminars: 19 },
        2019: { researchs: 26, publications: 17, projects: 12, seminars: 21 },
        // Năm có sự tăng vọt bất ngờ (ví dụ: đạt được một khoản tài trợ lớn)
        2020: { researchs: 35, publications: 21, projects: 18, seminars: 27 }, // <--- Tăng vọt
        // Ổn định lại và tăng trưởng vừa phải
        2021: { researchs: 37, publications: 24, projects: 16, seminars: 29 }, // <--- Projects giảm sau tăng vọt
        2022: { researchs: 41, publications: 26, projects: 19, seminars: 32 },
        2023: { researchs: 43, publications: 29, projects: 21, seminars: 34 },
        // Dự đoán tương lai
        2024: { researchs: 46, publications: 31, projects: 20, seminars: 36 }, // <--- Projects lại giảm nhẹ
        2025: { researchs: 49, publications: 34, projects: 23, seminars: 40 },
    };
    const [timePeriod, setTimePeriod] = useState(5);
    const chartData = useMemo(() => {
        return getDataByPeriod(FULL_DATASET, timePeriod);
    }, [timePeriod]);
    const timePeriods = [5, 10, 15];
    const [tableData, setTableData] = useState([]);
    const [statistic, setStatistic] = useState({});
    //pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [NofRowPerPage, setNofRowPerPage] = useState(10); //so row hien thi trong 1 table default: 10
    const totalRows = tableData.length;
    const currentRows = tableData.length;
    const NoOfPage = Math.ceil(currentRows / NofRowPerPage);

    useEffect(() => {
        (async () => {
            const { usersRes, DSUser } = await getUsers();
            const { res, json } = await getStatisticTeachers();
            console.log(json);
            setStatistic(json);
            const gv = GiangVienFromUsers(DSUser);
            setTableData(gv);
        })();
    }, []);
    if (!tableData && !statistic) {
        return <div>loading...</div>;
    }
    return (
        <div className="wrapper">
            <h1 className="text-h2 font-semibold my-2.5">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <div className="bg-white p-5 rounded-lg">
                    <Button
                        IconLeft={<HiDownload />}
                        size="medium"
                        className="cursor-pointer px-3 py-2 text-h6 transition-all ease-in-out duration-300 rounded-md bg-green-100 text-green-800"
                        onClick={() => {
                            exportReport(FULL_DATASET, "BaoCaoTheoNam.xlsx");
                        }}
                    >
                        Xuất báo cáo
                    </Button>
                    <div className="flex my-10 justify-between gap-2 w-full">
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-blue-100 text-ctuColor1 inline-flex px-3 py-1 rounded-full mb-3">
                                Tổng số đề tài
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-green-100 text-green-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Tổng số bài báo
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-red-100 text-red-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Tổng số chuyên đề
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-yellow-100 text-yellow-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Tổng số dự án
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                    </div>

                    <div className="flex gap-2.5 justify-center">
                        {timePeriods.map((period) => (
                            <button
                                onClick={() => {
                                    setTimePeriod(period);
                                }}
                                key={period}
                                className={`cursor-pointer px-3 py-2 text-h6 transition-all ease-in-out duration-300 rounded-md
                                    ${
                                        period == timePeriod
                                            ? "bg-ctuColor1 text-white hover:bg-ctuColor1-hover"
                                            : "bg-gray-50 text-textColor1 hover:text-ctuColor1 hover:shadow-md"
                                    }`}
                            >
                                {period} năm gần đây
                            </button>
                        ))}
                    </div>
                    <div></div>
                    <h3 className="my-4 text-h6 text-center font-semibold">
                        Biểu đồ hoạt động nghiên cứu của khoa Khoa học máy tính theo các năm
                    </h3>
                    <LineGraph statisticData={chartData}></LineGraph>
                </div>
                <div className="bg-white p-5 rounded-lg">
                    <h3 className="text-h6 text-center font-semibold mb-4">
                        Hoạt động nghiên cứu của giảng viên theo các năm
                    </h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="w-[40%] text-left">
                                    Giảng viên
                                </TableHeadCell>
                                <TableHeadCell className="text-center">Số đề tài</TableHeadCell>
                                <TableHeadCell className="text-center">Số bài báo</TableHeadCell>
                                <TableHeadCell className="text-center">Số chuyên đề</TableHeadCell>
                                <TableHeadCell className="text-center">Số dự án</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData
                                .slice(
                                    currentPage * NofRowPerPage,
                                    currentPage * NofRowPerPage + NofRowPerPage
                                )
                                .map((row) => (
                                    <TableRow
                                        key={row.MACB}
                                        className="cursor-pointer hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                        onClick={() => {
                                            navigate(`/admin/teachers/${row.MACB}`);
                                        }}
                                    >
                                        <TableCell>
                                            <div className="flex gap-5">
                                                <div className="avatarWrapper aspect-square w-12 rounded-full overflow-hidden">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        alt="GiangVienAvatar"
                                                        src={`/${row.MACB}.jpg`}
                                                    />
                                                </div>
                                                <div className="Name flex flex-col">
                                                    <p className="text-textColor1 text-h6">
                                                        {row.HO_TEN_USER}
                                                    </p>
                                                    <p className="text-small text-textColor2">
                                                        {row.EMAIL}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {Object.values(
                                                getDataByPeriod(
                                                    statistic["Research"][row.MACB],
                                                    timePeriod
                                                )
                                            ).reduce((sum, row) => {
                                                sum += row;
                                                return sum;
                                            }, 0)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {Object.values(
                                                getDataByPeriod(
                                                    statistic["Publication"][row.MACB],
                                                    timePeriod
                                                )
                                            ).reduce((sum, row) => {
                                                sum += row;
                                                return sum;
                                            }, 0)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {Object.values(
                                                getDataByPeriod(
                                                    statistic["Seminar"][row.MACB],
                                                    timePeriod
                                                )
                                            ).reduce((sum, row) => {
                                                sum += row;
                                                return sum;
                                            }, 0)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {Object.values(
                                                getDataByPeriod(
                                                    statistic["Project"][row.MACB],
                                                    timePeriod
                                                )
                                            ).reduce((sum, row) => {
                                                sum += row;
                                                return sum;
                                            }, 0)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        direction="vertical"
                        align="end"
                        setCurrentPage={setCurrentPage}
                        numberOfRows={totalRows}
                        numberOfPage={NoOfPage}
                        select={NofRowPerPage}
                        setSelect={setNofRowPerPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
}
