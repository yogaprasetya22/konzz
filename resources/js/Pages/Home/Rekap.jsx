import React from "react";
import moment from "moment/moment";
import "moment/locale/id";
import { validateStatus } from "@/Components/ui/validateStatus";
import { Head } from "@inertiajs/react";
moment.locale("id");

export default function Rekap({ data, title }) {
    return (
        <div className="flex w-full item-center flex-col min-h-screen gap-10 py-5">
            <Head title={title} />
            <h1 className="text-center text-2xl font-semibold">{title}</h1>
            <div className="overflow-x-auto px-5">
                <table className="table bg-white">
                    {/* head */}
                    <thead className="border">
                        <tr>
                            <th>Id</th>
                            <th>Kasus</th>
                            <th>Prodi</th>
                            <th>Bukti</th>
                            <th>Kategori</th>
                            <th>Lama</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {data.map((item, index) => (
                        <tbody key={index}>
                            <tr
                                className={`border-b-2 ${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                                <td className="border">
                                    {
                                        item?.approval_tracker.laporan_pengaduan
                                            .id
                                    }
                                </td>
                                <td className="border">
                                    {
                                        item?.approval_tracker.laporan_pengaduan
                                            .deskripsi
                                    }
                                </td>
                                <td className="border">
                                    {
                                        item?.approval_tracker.laporan_pengaduan
                                            .user.mahasiswa.prodi.name_prodi
                                    }
                                </td>
                                <td className="border">
                                    {
                                        item?.approval_tracker.laporan_pengaduan
                                            .bukti
                                    }
                                </td>
                                <td className="border">
                                    {item?.kategori_laporan.deskripsi}
                                </td>
                                <td className="border">
                                    {moment(
                                        item?.approval_tracker.laporan_pengaduan
                                            .created_at
                                    ).format("DD MMMM YYYY")}
                                </td>
                                <td className="border">
                                    {validateStatus(
                                        item?.approval_tracker?.status_aproval
                                            ?.id
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}
