import Layout from "@/Layouts/Layout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useState } from "react";
import { validateStatus } from "@/Components/ui/validateStatus";

const validateRole = (role) => {
    switch (role) {
        case 3:
            return "pendidikan";
        case 4:
            return "lse";
        case 5:
            return "lppm";
        case 6:
            return "bkal";
        case 7:
            return "perpus";
        case 8:
            return "sdm";
        case 9:
            return "tik";
        case 10:
            return "pha";
        case 11:
            return "kerjasama-humas-internasionalisasi";
        case 12:
            return "bem";
        case 13:
            return "rektor";
    }
};

export default function LaporanKonsultasi({
    title,
    auth,
    laporan_konsultasi,
    status,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        status_aproval_id:
            laporan_konsultasi?.approval_tracker?.status_aproval?.id,
        balasan: "",
    });
    const [dataLaporan, setDataLaporan] = useState([]);

    useEffect(() => {
        setDataLaporan(laporan_konsultasi);
    }, [laporan_konsultasi]);

    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            `/${validateRole(auth?.user?.role_id)}/update/status/konsultasi/${
                dataLaporan?.approval_tracker?.id
            }?id_user=${dataLaporan?.approval_tracker?.konsultasi.user.id}`,
            data
        );
        if (res.status === 200) {
            toast.success("Status berhasil diubah!", {
                position: "top-right", // Atur posisi toast
                autoClose: 3000, // Durasi toast ditampilkan (dalam milidetik)
                hideProgressBar: false, // Tampilkan progress bar
                closeOnClick: true, // Tutup toast saat diklik
                pauseOnHover: true, // Jeda toast saat pointer di atasnya
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    return (
        <Layout title={title} user={auth?.user}>
            <form
                className="bg-white rounded-md shadow-md p-10 mb-[10rem]"
                onSubmit={handleSumbit}
            >
                <div className="flex flex-col gap-3">
                    <ToastContainer />
                    {/* nama */}
                    <div className="flex justify-between">
                        <h2 className="card-title">
                            {dataLaporan?.user?.name}
                        </h2>
                        <h2 className="font-light text-sm ">
                            {moment(
                                dataLaporan && dataLaporan?.created_at
                            ).fromNow()}
                        </h2>
                    </div>
                    {/* nama */}
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="nama"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            id="nama"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={
                                dataLaporan?.approval_tracker?.konsultasi.user
                                    .name
                            }
                            disabled
                        />
                    </div>
                    {/* Tahun Angkatan */}
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="tahun_angkatan"
                            className="text-sm font-medium text-gray-700"
                        >
                            Tahun Angkatan
                        </label>
                        <input
                            type="text"
                            name="tahun_angkatan"
                            id="tahun_angkatan"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={
                                dataLaporan?.approval_tracker?.konsultasi.user
                                    .mahasiswa.angkatan
                            }
                            disabled
                        />
                    </div>
                    {/* Program Studi */}
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="prodi"
                            className="text-sm font-medium text-gray-700"
                        >
                            Program Studi
                        </label>
                        <input
                            type="text"
                            name="prodi"
                            id="prodi"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={
                                dataLaporan?.approval_tracker?.konsultasi.user
                                    .mahasiswa.prodi.name_prodi
                            }
                            disabled
                        />
                    </div>{" "}
                    {/* Kasus */}
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="kasus"
                            className="text-sm font-medium text-gray-700"
                        >
                            Kasus
                        </label>
                        <textarea
                            type="text"
                            name="kasus"
                            id="kasus"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={
                                dataLaporan?.kategori_laporan?.deskripsi
                            }
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="deskripsi"
                            className="text-sm font-medium text-gray-700"
                        >
                            Topik
                        </label>
                        <div className="border border-gray-300 w-full break-words p-2 rounded-lg text-sm">
                            {
                                dataLaporan?.approval_tracker?.konsultasi
                                    .topik_konsultasi
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="deskripsi"
                            className="text-sm font-medium text-gray-700"
                        >
                            Keterangan
                        </label>
                        <div className="border border-gray-300 w-full break-words p-2 rounded-lg text-sm">
                            {
                                dataLaporan?.approval_tracker?.konsultasi
                                    .keterangan
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="status"
                            className="text-sm font-medium text-gray-700"
                        >
                            Status
                        </label>
                        <div className="w-20">
                            {validateStatus(
                                dataLaporan?.approval_tracker?.status_aproval
                                    ?.id
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="action"
                            className="text-sm font-medium text-gray-700"
                        >
                            Action
                        </label>
                        <select
                            id="action"
                            name="action"
                            autoComplete="action"
                            value={
                                data.status_aproval_id ||
                                dataLaporan?.approval_tracker?.status_aproval
                                    ?.id
                            }
                            className="elect w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) =>
                                setData("status_aproval_id", e.target.value)
                            }
                        >
                            {status?.map((item, i) => (
                                <option key={i} value={item.id}>
                                    {item.status}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="grid grid-cols-[150px_minmax(20px,_1fr)_0px] gap-5 items-center w-full">
                        <label
                            htmlFor="balasan"
                            className="text-sm font-medium text-gray-700"
                        >
                            Balasan
                        </label>
                        <textarea
                            type="text"
                            name="balasan"
                            id="balasan"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setData("balasan", e.target.value)}
                            value={
                                dataLaporan?.approval_tracker?.konsultasi
                                    .balasan || data.balasan
                            }
                        />
                    </div> */}
                    <div className="flex justify-end">
                        <div className="flex flex-row gap-2">
                            {/* button back */}
                            <Link
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700"
                                href={`/${validateRole(auth?.user?.role_id)}`}
                            >
                                Back
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
                                disabled={processing}
                            >
                                {processing ? "Loading..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
