import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineGraph({ statisticData }) {
    const options = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                position: "bottom",
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
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Số lượng",
                },
            },
        },
    };
    // const colors = [
    //     { border: "rgb(255, 99, 132)", bg: "rgba(255, 99, 132, 0.5)" },
    //     { border: "rgb(53, 162, 235)", bg: "rgba(53, 162, 235, 0.5)" },
    //     { border: "rgb(255, 222, 89)", bg: "rgba(255, 222, 89,0.5)" },
    //     { border: "rgb(125, 218, 88)", bg: "rgba(125, 218, 88,0.5)" },
    // ];
    const data = {
        labels: Object.keys(statisticData),
        datasets: [
            {
                label: "Researchs",
                data: Object.values(statisticData).map((row) => row.researchs),
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Publications",
                data: Object.values(statisticData).map((row) => row.publications),
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Seminars",
                data: Object.values(statisticData).map((row) => row.seminars),
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: "rgb(255, 222, 89)",
                backgroundColor: "rgba(255, 222, 89,0.5)",
            },
            {
                label: "Project",
                data: Object.values(statisticData).map((row) => row.projects),
                pointRadius: 5,
                pointHoverRadius: 7,
                borderColor: "rgb(125, 218, 88)",
                backgroundColor: "rgba(125, 218, 88,0.5)",
            },
        ],
    };
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}
