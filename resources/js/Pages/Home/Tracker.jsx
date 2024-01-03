import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Tracker({ auth, title, data }) {
    console.log(data);

    // buatkan validation untuk tracker swicth case berdasarkan status
    const validateTracker = (status) => {
        switch (status.approval_tracker.status_aproval_id) {
            case 1:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: false,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: false,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 2:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: false,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 3:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: true,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 4:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: true,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: true,
                    },
                ];
            case 5:
                return [
                    {
                        id: 1,
                        name: "Rejected",
                        status: true,
                    },
                ];
            default:
                return [];
        }
    };

    return (
        <LayoutUi title={title} user={auth?.user}>
            <div className="w-full p-5 md:p-10 flex justify-center ">
                <div className="px-5 py-5 bg-white rounded-md shadow-md w-full md:w-1/2 flex flex-col gap-5">
                    <h1 className="text-center font-extrabold text-3xl text-blue-900 ">
                        TRACKING LAPORAN
                    </h1>
                    <hr />
                    <div className="font-extrabold text-md text-blue-900 flex pt-4  flex-row gap-5">
                        <p>Kasus:</p>
                        <p className=" p-2 border text-justify text-gray-600 font-light">
                            {data?.approval_tracker.laporan_pengaduan.deskripsi}
                        </p>
                    </div>
                    <div className="font-extrabold text-md text-blue-900 flex pt-4">
                        Penanganan :{" "}
                        <span className=" pl-2">
                            "{data?.kategori_laporan.role.name_role}"
                        </span>
                    </div>
                    {/* keterangan warna */}
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-4 h-4 bg-warning rounded-full"></div>
                            <p>Status</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-4 h-4 bg-error rounded-full"></div>
                            <p>Rejected</p>
                        </div>
                    </div>
                    <div className="m-4 bg-gray-100 flex justify-center rounded-md">
                        <ul className="steps steps-vertical ">
                            {validateTracker(data).map((item, index) => {
                                return (
                                    <>
                                        {item.name === "Rejected" ? (
                                            <li
                                                key={index}
                                                data-content="?"
                                                className={`step text-xl font-extrabold text-gray-500 ${
                                                    item.status
                                                        ? "step-error"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}
                                            </li>
                                        ) : (
                                            <li
                                                key={index}
                                                className={`step text-xl font-extrabold text-gray-500 ${
                                                    item.status
                                                        ? "step-warning"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}
                                            </li>
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                    {/* button back */}
                    <div className="w-full flex justify-end">
                        <Link
                            href="/history-laporan"
                            className="p-2 rounded-lg bg-blue-400 text-white font-extrabold"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutUi>
    );
}
