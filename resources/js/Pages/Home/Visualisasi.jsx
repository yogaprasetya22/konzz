import Chats from "@/Components/Chats";
import Layout from "@/Layouts/Layout";
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
import { useState } from "react";
import { useEffect } from "react";
import KasusKategoriChart from "@/Components/ChartUi/KasusKategoriChart";
import ProdiChart from "@/Components/ChartUi/ProdiChart";
import { validateStatus } from "@/Components/ui/validateStatus";
import { Link } from "@inertiajs/react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

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

const Visualisasi = ({ title, auth, data, user, kategori_laporan }) => {
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

    console.log(dataLaporan);

    return (
        <Layout title={title} user={auth?.user}>
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
                <TableRekap data={dataLaporan} />
            </div>
        </Layout>
    );
};

export default Visualisasi;

const TableRekap = ({ data }) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, data.length);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = data
            .sort((a, b) => {
                return b.id - a.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data.length / page));
        setLoading(false);
    }, [itemOffset, data, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data.length;

        setItemOffset(newOffset);
    };
    return (
        <div className="bg-white">
            <div className="flex justify-between items-center p-5">
                <button
                    className="bg-blue-800 text-white p-2 rounded-md"
                    onClick={() =>
                        window.open(window.location.origin + "/rekap", "_blank")
                    }
                >
                    Rekap
                </button>
                <ReactPaginate
                    className="flex flex-row gap-1 w-full justify-end items-center select-none pr-10"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName=" text-sm border  p-2 rounded-md "
                    pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                    previousClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                    previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                    nextClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                    nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                    breakLabel="..."
                    breakClassName=" p-2 rounded-md text-blue-800"
                    breakLinkClassName="text-sm font-semibold font-roboto "
                    containerClassName="pagination"
                    activeClassName="bg-transparan border border-blue-800 text-blue-800"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table border rounded-md">
                    {/* head */}
                    <thead className="bg-white">
                        <tr className="text-lg font-extrabold">
                            <th>Id</th>
                            <th>Kasus</th>
                            <th>Prodi</th>
                            <th>Bukti</th>
                            <th>Kategori</th>
                            <th>Lama</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr
                                key={index}
                                className={` border-b-2  ${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                                <th className="font-normal text-sm ">
                                    {
                                        item?.approval_tracker.laporan_pengaduan
                                            .id
                                    }
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="font-bold text-xs truncate max-w-[6rem]">
                                            {
                                                item?.approval_tracker
                                                    .laporan_pengaduan.deskripsi
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="font-bold text-xs truncate max-w-[7rem]">
                                        {
                                            item?.approval_tracker
                                                .laporan_pengaduan.user
                                                .mahasiswa.prodi.name_prodi
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold text-xs truncate max-w-[6rem]">
                                        {
                                            item?.approval_tracker
                                                .laporan_pengaduan.bukti
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold text-xs max-w-[25rem] ">
                                        {item?.kategori_laporan.deskripsi}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold text-[11px] max-w-xs">
                                        {moment(
                                            item?.approval_tracker
                                                .laporan_pengaduan.created_at
                                        ).fromNow()}
                                    </p>
                                </td>
                                <td>
                                    <div className="font-bold text-xs max-w-xs">
                                        {validateStatus(
                                            item?.approval_tracker
                                                ?.status_aproval?.id
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
