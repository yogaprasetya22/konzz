import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import React from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function Riwayat({ title, auth, riwayat_laporan }) {
    riwayat_laporan = riwayat_laporan?.sort((a, b) => {
        return b.id - a.id;
    });
     const validateStatus = (status) => {
         switch (status) {
             case 1:
                 return <p className="text-yellow-500">Tertunda</p>;
             case 2:
                 return <p className="text-yellow-500">Diterima</p>;
             case 3:
                 return <p className="text-yellow-500">Diproses</p>;
             case 4:
                 return <p className="text-yellow-500">Menuju ke lokasi</p>;
             case 5:
                 return <p className="text-green-500">Selesai</p>;
             case 6:
                 return <p className="text-red-500">Ditolak</p>;
             default:
                 return <p className="text-red-500">Ditolak</p>;
         }
     };

    return (
        <LayoutUi title={title} user={auth?.user}>
            <div className="w-full  flex flex-wrap gap-6  items-center justify-center py-10 px-[5rem]">
                {riwayat_laporan?.map((item, index) => (
                    <div
                        key={index}
                        className="card w-96 bg-gray-300 text-primary-content"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{item.user.name}</h2>
                            <div className="text-sm flex items-center gap-1">
                                pengaduan :
                                <p className="text-lg font-light">
                                    {item.pengaduan}
                                </p>
                            </div>
                            <div className=" flex justify-between gap-1">
                                <span className="text-sm flex items-center">
                                    approved :
                                    <span className="text-lg font-light">
                                        {validateStatus(item.status_aproval_id)}
                                    </span>
                                </span>
                                <span className="text-sm flex items-center">
                                    {moment(item && item?.created_at).fromNow()}
                                </span>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutUi>
    );
}
