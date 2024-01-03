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
import { Line, PolarArea, Doughnut, Pie } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";

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
export default function TahunChart({ data }) {
    console.log("data", data);
    const dataTahun = data?.map((user) => {
        return user.mahasiswa.angkatan;
    });
    const lable = Array.from(new Set(dataTahun)).sort();

    // ada  berapa banyak data yang sesuai dengan tahun
    const dataTahunChart = lable?.map((tahun) => {
        // Gunakan filter untuk menyaring data yang sesuai dengan tahun
        const tahunData = data?.filter((user) => {
            return user.mahasiswa.angkatan === tahun;
        });
        // return data yang sesuai dengan tahun
        return tahunData.length;
    });

    const dataChart = {
        labels: lable,
        datasets: [
            {
                label: "total",
                data: dataTahunChart,
                backgroundColor: [
                    "rgba(255, 99, 132, .8)",
                    "rgba(54, 162, 235, .8)",
                    "rgba(255, 206, 86, .8)",
                    "rgba(75, 192, 192, .8)",
                    "rgba(243, 112, 11, .8)",
                    "rgba(2, 255, 122, .8)",
                    "rgba(5, 155, 122, .8)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
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
            },
        },
    };

    return <Doughnut data={dataChart} options={option} />;
}
