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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ProdiLine({ data }) {
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
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "right", // Atur posisi legenda di samping kanan
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Program Studi",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Jumlah",
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={dataChart} options={option} />;
}
