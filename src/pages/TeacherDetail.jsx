import { useParams } from "react-router-dom";
import colorsTw from "tailwindcss/colors";
import { Fragment, useContext, useMemo, useState } from "react";
import { Tooltip as Ttip } from "react-tooltip";
import { FaInstagram, FaFacebookF, FaTwitter, FaGooglePlusG, FaLaptop } from "react-icons/fa";
import { GiMicroscope } from "react-icons/gi";
import Dropdown from "../components/Dropdown";
import { FaRegNewspaper } from "react-icons/fa6";
import { useEffect } from "react";
import { getStatisticTeachers, getTeacherInformationByID } from "../services/Services_Public";
import { formatToDisplayDate, getDataByPeriod } from "../util/util";
import { GlobalContext } from "../context/Context";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);
export default function Teacher() {
    const [TeacherData, setTeacherData] = useState();
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("Tất cả");
    const [chartType, setChartType] = useState("Research");
    const { data } = useContext(GlobalContext);
    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState(15);
    const [statistic, setStatistic] = useState({});
    const fakeData = {
        2011: 15,
        2012: 18,
        2013: 11,
        2014: 14,
        2015: 19,
        2016: 12,
        2017: 17,
        2018: 10,
        2019: 16,
        2020: 20,
        2021: 13,
        2022: 15,
        2023: 18,
        2024: 11,
        2025: 14,
    };
    const colors = {
        Publication: {
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        Research: {
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        Seminar: {
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132,0.5)",
        },
        Project: {
            borderColor: "rgb(255, 205, 86)",
            backgroundColor: "rgba(255, 205, 86,0.5)",
        },
    };
    const charts = ["Research", "Publication", "Seminar", "Project"];
    const titles = {
        Publication: "Biểu đồ số bài báo đã tham gia qua các năm",
        Research: "Biểu đồ số đề tài đã hướng dẫn qua các năm",
        Seminar: "Biểu đề số chuyên đề đã báo cáo qua các năm",
        Project: "Biểu đồ số dự án đã tham gia qua các năm",
    };
    const chartData = useMemo(() => {
        if (!loading) {
            // const rawData = statistic[chartType][id];
            const rawData = fakeData;
            const filteredData = getDataByPeriod(rawData, timePeriod);
            return {
                labels: Object.keys(filteredData),
                datasets: [
                    {
                        label: chartType,
                        data: Object.values(filteredData),
                        borderColor: colors[chartType].borderColor,
                        backgroundColor: colors[chartType].backgroundColor,
                    },
                ],
            };
        }
    }, [statistic, chartType, timePeriod]);
    const chartOptions = useMemo(() => {
        if (!loading) {
            const maxValue = Math.max(...chartData.datasets[0].data);
            return {
                responsive: true,
                animation: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: titles[chartType],
                        font: {
                            size: 20,
                            family: "K2D",
                        },
                    },
                },

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Năm",
                        },
                    },
                    y: {
                        suggestedMax: 1.2 * maxValue,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Số lượng",
                        },
                    },
                },
            };
        }
    }, [chartData]);
    //graph

    useEffect(() => {
        (async () => {
            try {
                const { res, json } = await getTeacherInformationByID(id);
                setTeacherData(json);
                const statisticData = await getStatisticTeachers();
                setLoading(false);
                setStatistic(statisticData.json);
                console.log(statisticData.json);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    const { basicInformation, Researchs, Publications, Projects } = TeacherData || {};
    const [activeTab, setActiveTab] = useState({ tab: "publications", index: 0 });
    if (loading) {
        return <div className="h-screen w-screen flex justify-center itmes-center">Loading</div>;
    }
    const tabsContent = {
        publications: (
            <div className="px-5 w-[100%] min-h-200">
                <h1 className="text-h4 uppercase font-semibold mb-4">Bài báo:</h1>
                <Dropdown
                    className="mb-4"
                    size="large"
                    defaultValue={"Tất cả"}
                    select={type}
                    fieldName={"Loại bài báo"}
                    direction="vertical"
                    align="start"
                    setSelect={setType}
                    options={["Tất cả", ...data.types]}
                ></Dropdown>
                <ol className="px-5 flex flex-col font-light gap-2.5 list-decimal list-inside text-h6">
                    {Publications.filter(
                        (elements) => type == "Tất cả" || elements.LOAI_BAIBAO == type
                    ).map(({ TRICHDAN_BAIBAO }, index) => (
                        <li key={index}>{TRICHDAN_BAIBAO}</li>
                    ))}
                </ol>
            </div>
        ),
        researchs: (
            <div className="px-5 w-[100%]">
                <h1 className="text-h4 uppercase font-semibold mb-4">đề tài:</h1>
                <ol className="px-5 flex flex-col font-light gap-2.5 list-decimal list-inside text-h6">
                    {Researchs.map(({ TEN_DETAI }, index) => (
                        <li key={index}>{TEN_DETAI}</li>
                    ))}
                </ol>
            </div>
        ),
        projects: (
            <div className="px-5 w-[100%]">
                <h1 className="text-h4 uppercase font-semibold mb-4">dự án:</h1>
                <ol className="px-5 flex flex-col font-light gap-2.5 list-decimal list-inside text-h6">
                    {Projects.map(({ TEN_PROJECT }, index) => (
                        <li key={index}>{TEN_PROJECT}</li>
                    ))}
                </ol>
            </div>
        ),
    };
    const icons = {
        publications: <FaRegNewspaper size={24}></FaRegNewspaper>,
        researchs: <GiMicroscope size={24}></GiMicroscope>,
        projects: <FaLaptop size={24}></FaLaptop>,
    };

    return (
        <div className="wrapper">
            <div className="flex justify-center bg-white flex-col p-10 mx-10 rounded-3xl shadow-md items-center">
                <div className="avatarWrapper hover:shadow-lg aspect-square w-40 hover:scale-105 transition-all duration-300 ease-in-out rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        alt="GiangVienAvatar"
                        src={`/${id}.jpg`}
                    />
                </div>
                <h1 className="text-h1 font-semibold mt-4">{basicInformation.HO_TEN_USER}</h1>
                <h2 className="text-h5">
                    {basicInformation.HOC_VAN}, giảng viên chính tại{" "}
                    <a
                        className="text-ctuColor1 cursor-pointer border-b-2 border-transparent hover:border-b-ctuColor1 hover:border-b-2 origin-center transition-all ease-in-out duration-100"
                        href="https://ctu.edu.vn"
                        target="_blank"
                    >
                        Đại Học Cần Thơ
                    </a>
                </h2>
                <div className="flex gap-2.5 mt-5 justify-center">
                    <a
                        data-tooltip-id="fb"
                        data-tooltip-content="Theo dõi trên Facebook"
                        data-tooltip-place="top"
                        className=" text-ctuColor1 cursor-pointer cursor:pointer w-15 flex justify-center items-center aspect-square rounded-full hover:shadow-lg shadow-md transition-all ease-in-out duration-200 bg-secondaryColor"
                    >
                        <FaFacebookF size={36}></FaFacebookF>
                    </a>
                    <a
                        data-tooltip-id="in"
                        data-tooltip-content="Theo dõi trên Instagram"
                        data-tooltip-place="top"
                        className=" text-ctuColor1 cursor-pointer cursor:pointer w-15 flex justify-center items-center aspect-square rounded-full hover:shadow-lg shadow-md transition-all ease-in-out duration-200 bg-secondaryColor"
                    >
                        <FaInstagram size={36}></FaInstagram>
                    </a>
                    <a
                        data-tooltip-id="tw"
                        data-tooltip-content="Theo dõi trên Twitter"
                        data-tooltip-place="top"
                        className=" text-ctuColor1 cursor-pointer cursor:pointer w-15 flex justify-center items-center aspect-square rounded-full hover:shadow-lg shadow-md transition-all ease-in-out duration-200 bg-secondaryColor"
                    >
                        <FaTwitter size={36}></FaTwitter>
                    </a>
                    <a
                        data-tooltip-id="g+"
                        data-tooltip-content="Theo dõi trên Google+"
                        data-tooltip-place="top"
                        className=" text-ctuColor1 cursor-pointer cursor:pointer w-15 flex justify-center items-center aspect-square rounded-full hover:shadow-lg shadow-md transition-all ease-in-out duration-200 bg-secondaryColor"
                    >
                        <FaGooglePlusG size={36}></FaGooglePlusG>
                    </a>
                    <Ttip id="fb" />
                    <Ttip id="tw" />
                    <Ttip id="in" />
                    <Ttip id="g+" />
                </div>
            </div>
            <div className="bg-white shadow-lg overflow-hidden p-10 mx-10 mt-25 rounded-3xl">
                <h3 className="text-h3 uppercase font-semibold">Thông tin cơ bản</h3>
                <div className="content flex flex-col items-start mt-5">
                    <table className="w-200 text-h5">
                        <tbody>
                            <tr>
                                <td className="w-100 py-2 font-semibold text-ctuColor1:">
                                    Họ tên:
                                </td>
                                <td className="w-100 text-textColor2">
                                    {basicInformation.HO_TEN_USER}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-100 py-2  font-semibold text-ctuColor1:">
                                    Học vị:
                                </td>
                                <td className="w-100 text-textColor2">
                                    {basicInformation.HOC_VAN}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-100 py-2  font-semibold text-ctuColor1:">
                                    Ngày sinh:
                                </td>
                                <td className="w-100 text-textColor2">
                                    {formatToDisplayDate(new Date(basicInformation.NGAYSINH_USER))}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-100 py-2  font-semibold text-ctuColor1:">
                                    Giới tính:
                                </td>
                                <td className="w-100 text-textColor2">
                                    {basicInformation.GIOITINH_USER}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-100 py-2  font-semibold text-ctuColor1:">
                                    Email:
                                </td>
                                <td className="w-100 text-textColor2">{basicInformation.EMAIL}</td>
                            </tr>
                            <tr>
                                <td className="w-100 py-2  font-semibold text-ctuColor1:">
                                    Số điện thoại:
                                </td>
                                <td className="w-100 text-textColor2">{basicInformation.SDT}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white shadow-lg overflow-hidden p-10 mx-10 mt-25 rounded-3xl">
                <h3 className="text-h3 uppercase font-semibold">Thống kê</h3>
                <div className="content flex flex-col items-start mt-5">
                    <div className="flex justify-between gap-2 w-full">
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-blue-100 text-ctuColor1 inline-flex px-3 py-1 rounded-full mb-3">
                                Số đề tài đã hướng dẫn
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-green-100 text-green-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Số bài báo đã tham gia
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-red-100 text-red-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Số chuyên đề đã báo cáo
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                        <div className="bg-white w-1/4 px-6 py-3 rounded-xl shadow-md border-l-5 border-l-gray-400">
                            <div className="text-p font-medium bg-yellow-100 text-yellow-800 inline-flex px-3 py-1 rounded-full mb-3">
                                Số dự án đã tham gia
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                    </div>
                    <div className="bg-white px-6 w-1/3 mt-2.5 py-3 rounded-xl flex flex-col gap-2.5 items-center shadow-md border-l-5 border-l-gray-400">
                        <div className=" w-full flex gap-2.5 items-center justify-between">
                            <div className="text-p font-medium bg-indigo-100 text-indigo-800 inline-flex px-3 py-1 rounded-full">
                                Số sinh viên đã hướng dẫn:
                            </div>
                            <p className="text-h3 font-bold text-gray-900">23</p>
                        </div>
                        <div className="w-full flex gap-2.5 items-center justify-between">
                            <div className="text-p font-medium bg-orange-100 text-orange-800 inline-flex px-3 py-1 rounded-full">
                                Số thạc sĩ đã hướng dẫn:
                            </div>
                            <p className="text-h3 font-bold text-gray-900">20</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center mt-10">
                        {/* <Dropdown
                            size="medium"
                            select={chartType}
                            setSelect={setChartType}
                            options={["Research", "Seminar", "Publication", "Project"]}
                        ></Dropdown> */}
                        <div className="flex gap-2.5">
                            {charts.map((chart) => (
                                <button
                                    onClick={() => {
                                        setChartType(chart);
                                    }}
                                    key={chart}
                                    className={`cursor-pointer px-3 py-2 text-h6 transition-all ease-in-out duration-300 rounded-md
                                    ${
                                        chart == chartType
                                            ? "bg-ctuColor1 text-white hover:bg-ctuColor1-hover"
                                            : "bg-gray-50 text-textColor1 hover:text-ctuColor1 hover:shadow-md"
                                    }`}
                                >
                                    {chart}
                                </button>
                            ))}
                        </div>
                        <div className="w-full h-150 flex justify-self-center justify-center">
                            <Bar options={chartOptions} data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg mx-10 py-10 mt-25 overflow-hidden rounded-3xl">
                <h3 className="text-h3 text-center uppercase font-semibold">Các nghiên cứu</h3>
                <div className="flex gap-2.5 justify-center mt-4">
                    {Object.keys(tabsContent).map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab({ tab: tab, index: index });
                            }}
                            className={`${
                                activeTab.tab == tab
                                    ? "text-white bg-ctuColor1"
                                    : "text-textColor3 bg-secondaryColor"
                            } cursor-pointer cursor:pointer w-15 flex justify-center items-center aspect-square rounded-full hover:shadow-lg shadow-md transition-all ease-in-out duration-200`}
                        >
                            {icons[tab]}
                        </button>
                    ))}
                </div>

                <div
                    style={{
                        transform: `translateX(${(-activeTab.index * 100) / 3}%)`,
                    }}
                    className={`tab transition-all ease-in-out duration-300 flex overflow-hidden w-[300%]`}
                >
                    {tabsContent["publications"]}
                    {tabsContent["researchs"]}
                    {tabsContent["projects"]}
                </div>
            </div>
        </div>
    );
}
