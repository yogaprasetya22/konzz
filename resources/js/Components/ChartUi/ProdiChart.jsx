import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    RadialLinearScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function ProdiChart({ data }) {
    const labelProdi = [
        "Manajemen",
        "Akuntansi",
        "Ilmu Komunikasi",
        "Psikologi",
        "Teknik Sipil",
        "Arsitektur",
        "Informatika",
        "Sistem Informasi",
        "Desain Produk",
        "Desain Komunikasi Visual",
    ];

    const dataProdi = labelProdi.map((prodi) => {
        // Gunakan filter untuk menyaring data yang sesuai dengan prodi
        const prodiData = data?.filter((user) => {
            return user.mahasiswa.prodi.name_prodi === prodi;
        });

        // Hitung berapa banyak yang sesuai dengan prodi
        const jumlahProdi = prodiData?.length;

        return jumlahProdi; // Mengembalikan jumlah berapa banyak yang sesuai
    });

    const dataChart = {
        labels: labelProdi,
        datasets: [
            {
                label: "Total",
                data: dataProdi,
                backgroundColor: [
                    "rgba(255, 99, 132, 2)",
                    "rgba(54, 162, 235, 2)",
                    "rgba(255, 206, 86, 2)",
                    "rgba(75, 192, 192, 2)",
                    "rgba(153, 102, 255, 2)",
                    "rgba(255, 159, 64, 2)",
                    "rgba(85, 225, 12, 2)",
                    "rgba(243, 112, 11, 2)",
                    "rgba(2, 255, 122, 2)",
                    "rgba(5, 155, 122, 2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(85, 225, 12, 1)",
                    "rgba(243, 112, 11, 1)",
                    "rgba(2, 255, 122, 1)",
                    "rgba(5, 155, 122, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "right", // Atur posisi legenda di samping kanan
            },
        },
    };

    return <Doughnut data={dataChart} options={option} />;
}
