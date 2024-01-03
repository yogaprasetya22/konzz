import LayoutUi from "@/Layouts/LayoutUi";
import React from "react";
import { Link } from "@inertiajs/react";
import LaporanPengaduan from "@/Components/mahasiswa/LaporanPengaduan";

export default function Lapor({ auth, title, kategori_laporan }) {
    return (
        <LayoutUi title={title} user={auth?.user}>
            {auth?.user ? (
                <LaporanPengaduan
                    user={auth?.user}
                    kategori_laporan={kategori_laporan}
                />
            ) : (
                <div className="w-full p-10 flex justify-center">
                    <div className="px-5 py-5 bg-white rounded-md shadow-md w-[25rem]">
                        <h1 className="text-center">
                            <span className="text-2xl font-bold">
                                Laporan Pengaduan
                            </span>
                        </h1>
                        <div className=" pt-10 w-full">
                            <h1 className="font-semibold">
                                Silahkan login terlebih dahulu untuk pengaduan
                                laporan
                            </h1>
                            <div className="flex justify-end">
                                <Link
                                    href={route("login")}
                                    className="text-blue-500 hover:text-blue-700 btn"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </LayoutUi>
    );
}
