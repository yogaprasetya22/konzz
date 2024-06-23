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

export default function KasusKategoriLine({ data, kategori_laporan }) {
    const warna = (() => {
        const rgbaColors = [
            "rgba(128, 128, 128, 1)", // gray
            "rgba(255, 0, 0, 1)", // red
            "rgba(255, 165, 0, 1)", // orange
            "rgba(255, 255, 0, 1)", // yellow
            "rgba(0, 128, 0, 1)", // green
            "rgba(0, 0, 255, 1)", // blue
            "rgba(75, 0, 130, 1)", // indigo
            "rgba(238, 130, 238, 1)", // violet
            "rgba(128, 0, 128, 1)", // purple
            "rgba(255, 192, 203, 1)", // pink
            "rgba(165, 42, 42, 1)", // brown
            "rgba(0, 0, 0, 1)", // black
            "rgba(25, 311,25, 1)", // white
            "rgba(0, 255, 255, 1)", // cyan
            "rgba(255, 0, 255, 1)", // magenta
            "rgba(0, 128, 128, 1)", // teal
        ];
        const colors = [];
        for (let i = 0; i < (kategori_laporan || []).length; i++) {
            colors.push(rgbaColors[i % rgbaColors.length]);
        }
        return colors;
    })();

    const labelsCharacter = (() => {
        const labels = [];
        for (let i = 0; i < (kategori_laporan || []).length; i++) {
            labels.push(
                (kategori_laporan || [])[i].deskripsi.substring(0, 10) + "..."
            );
        }
        return labels;
    })();

    const dataChart = {
        labels: labelsCharacter,
        datasets: [
            {
                label: "Total",
                data: (kategori_laporan || []).map((kategori) => {
                    return (
                        data?.filter((laporan) => {
                            return laporan.kategori_laporan_id === kategori.id;
                        }).length || 0
                    );
                }),
                backgroundColor: warna,
                borderColor: warna,
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
                position: "right",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Kategori",
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
