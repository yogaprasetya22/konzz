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
import { Pie } from "react-chartjs-2";

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

export default function KasusKategoriChart({ data, kategori_laporan }) {
    const warna = (() => {
        const rgbaColors = [
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
            "rgba(128, 128, 128, 1)", // gray
            "rgba(0, 0, 0, 1)", // black
            "rgba(255, 255, 255, 1)", // white
            "rgba(0, 255, 255, 1)", // cyan
            "rgba(255, 0, 255, 1)", // magenta
            "rgba(0, 128, 128, 1)", // teal
        ];
        const colors = [];
        for (let i = 0; i < (kategori_laporan || []).length; i++) {
            colors.push(rgbaColors[i]);
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

    return <Pie data={dataChart} options={option} />;
}
