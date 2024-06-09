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
import ProdiChart from "./ChartUi/ProdiChart";
import KasusKategoriChart from "./ChartUi/KasusKategoriChart";
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

export default function Chats({ data, user, kategori_laporan }) {
    const [dataTabel, setDataTabel] = useState([]);
    const [dataLaporan, setDataLaporan] = useState([]);
    useEffect(() => {
        // buatkan filter dataUser sama dengan role_id 2 dan status_id 1
        const res = user?.filter((users) => {
            return users.role_id === 2;
        });
        setDataTabel(res);
    }, [user]);

    useEffect(() => {
        setDataLaporan(data);
    }, [data]);


    const filterStatusAprovalPandding = dataLaporan
        ?.map((user) => {
            return user.approval_tracker.status_aproval_id;
        })
        .filter((user) => {
            return user === 1;
        }).length;
    const filterStatusAprovalApproved = dataLaporan
        ?.map((user) => {
            return user.approval_tracker.status_aproval_id;
        })
        .filter((user) => {
            return user === 2;
        }).length;
    const filterStatusAprovalOnProgres = dataLaporan
        ?.map((user) => {
            return user.approval_tracker.status_aproval_id;
        })
        .filter((user) => {
            return user === 3;
        }).length;
    const filterStatusAprovalSuccess = dataLaporan
        ?.map((user) => {
            return user.approval_tracker.status_aproval_id;
        })
        .filter((user) => {
            return user === 4;
        }).length;

    const filterStatusAprovalRejected = dataLaporan
        ?.map((user) => {
            return user.approval_tracker.status_aproval_id;
        })
        .filter((user) => {
            return user === 5;
        }).length;

    const filterFTD = user
        ?.filter((user) => {
            return user.role_id === 2;
        })
        .filter((user) => [5, 6, 7, 8, 9, 10].includes(user.mahasiswa.prodi.id))
        .map((user) => {
            return user;
        });
    const filterFHB = user
        ?.filter((user) => {
            return user.role_id === 2;
        })
        .filter((user) => [1, 2, 3, 4].includes(user.mahasiswa.prodi.id))
        .map((user) => {
            return user;
        });

    return (
        <div className="w-full flex flex-col gap-5 pb-[10rem]">
            <div className="w-full flex flex-col gap-2">
                <h1>Laporan</h1>
                <div className="w-full flex flex-row gap-5">
                    <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                        <p className="text-xl font-semibold">
                            {dataLaporan?.length}
                        </p>
                        <p className="text-xs">Total Laporan</p>
                    </div>
                    <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                        <p className="text-xl font-semibold">
                            {filterFTD?.length}
                        </p>
                        <p className="text-xs">FTD</p>
                    </div>
                    <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                        <p className="text-xl font-semibold">
                            {filterFHB?.length}
                        </p>
                        <p className="text-xs">FHB</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1>Daftar Progres</h1>
                <div className="w-full flex flex-row  gap-5">
                    <div className="w-full flex flex-row gap-5">
                        <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                            <p className="text-xl font-semibold">
                                {filterStatusAprovalPandding}
                            </p>
                            <p className="text-xs">Panding</p>
                        </div>
                        <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                            <p className="text-xl font-semibold">
                                {filterStatusAprovalApproved}
                            </p>
                            <p className="text-xs">Approved</p>
                        </div>
                        <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                            <p className="text-xl font-semibold">
                                {filterStatusAprovalOnProgres}
                            </p>
                            <p className="text-xs">On Progress</p>
                        </div>
                        <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                            <p className="text-xl font-semibold">
                                {filterStatusAprovalSuccess}
                            </p>
                            <p className="text-xs">Success</p>
                        </div>
                        <div className="p-5 w-full max-w-xs flex flex-col gap-2 bg-white rounded-md">
                            <p className="text-xl font-semibold">
                                {filterStatusAprovalRejected}
                            </p>
                            <p className="text-xs">Rejected</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1>Daftar Kasus</h1>
                <div className="w-full flex flex-row gap-5">
                    <div className="w-1/2 py-1 px-10 bg-white border-2 border-gray-200 h-[17rem]">
                        <KasusKategoriChart
                            data={dataLaporan}
                            kategori_laporan={kategori_laporan}
                        />
                    </div>
                    <div className="w-1/2 py-1 px-10 bg-white border-2 border-gray-200 h-[17rem]">
                        <ProdiChart data={dataTabel} />
                    </div>
                </div>
            </div>
        </div>
    );
}
