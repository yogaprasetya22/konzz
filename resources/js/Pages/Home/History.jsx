import React from "react";
import { validateStatus } from "@/Components/ui/validateStatus";
import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function History({ auth, title, data }) {
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
        <LayoutUi title={title} user={auth?.user}>
            {currentItems && currentItems.length > 0 ? (
                <div className="px-20 bg-white py-10 min-h-[30rem]">
                    <div className="overflow-x-auto">
                        <table className="table border rounded-md">
                            {/* head */}
                            <thead>
                                <tr className="text-lg font-extrabold">
                                    <th>Id</th>
                                    <th>Kasus</th>
                                    <th>Prodi</th>
                                    <th>Bukti</th>
                                    <th>Kategori</th>
                                    <th>Lama</th>
                                    <th>Status</th>
                                    <th>Tracking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={` border-b-2  ${
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }`}
                                    >
                                        <th className="font-normal text-sm ">
                                            {
                                                item?.approval_tracker
                                                    .laporan_pengaduan.id
                                            }
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="font-bold text-xs truncate max-w-[6rem]">
                                                    {
                                                        item?.approval_tracker
                                                            .laporan_pengaduan
                                                            .deskripsi
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-bold text-xs truncate max-w-[7rem]">
                                                {
                                                    item?.approval_tracker
                                                        .laporan_pengaduan.user
                                                        .mahasiswa.prodi
                                                        .name_prodi
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
                                                {
                                                    item?.kategori_laporan
                                                        .deskripsi
                                                }
                                            </p>
                                        </td>
                                        <td>
                                            <p className="font-bold text-[11px] max-w-xs">
                                                {moment(
                                                    item?.approval_tracker
                                                        .laporan_pengaduan
                                                        .created_at
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
                                        <td>
                                            <Link
                                                href={`tracker/${item?.approval_tracker.laporan_pengaduan.id}`}
                                                className="btn btn-ghost btn-md rounded-sm hover:bg-transparent text-blue-500 hover:text-blue-700 hover:scale-105"
                                            >
                                                <i className="text-xl fas fa-edit"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-normal items-center py-5">
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
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="flex flex-col items-center justify-center">
                        <i className="text-9xl text-blue-900 fas fa-inbox"></i>
                        <p className="text-xl text-blue-900 font-light">
                            Kamu belum memiliki riwayat pengaduan
                        </p>
                        <Link
                            href="/upload-laporan"
                            className="btn btn-primary mt-5"
                        >
                            Buat Pengaduan
                        </Link>
                    </div>
                </div>
            )}
        </LayoutUi>
    );
}
