import Tabel from "@/Components/mahasiswa/Tabel";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
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

export default function Aproval({ title, auth, laporan_pengaduan }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [dataTabel, setDataTabel] = useState([]);
    const [search, setSearch] = useState("");
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    const dataReverse = () => {
        const res = laporan_pengaduan;
        console.log(res);
        setDataTabel(res);
    };

    useEffect(() => {
        dataReverse();
    }, [laporan_pengaduan]);

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, dataTabel.length);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = dataTabel
            .sort((a, b) => {
                return b.id - a.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(dataTabel.length / page));
        setLoading(false);
    }, [itemOffset, dataTabel, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % dataTabel.length;

        setItemOffset(newOffset);
    };

    return (
        <Layout title={title} user={auth?.user}>
            <div className="bg-white flex flex-col gap-10 rounded-xl mb-20 border">
                <div className="overflow-x-auto">
                    <div className="flex justify-between  w-full">
                        {/* <div className="flex  px-5 py-3 gap-10">
                            <div className="flex flex-row items-center justify-center gap-2 w-full">
                                <input
                                    type="text"
                                    className="input input-bordered w-full rounded-md"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn" onClick={onSearch}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div> */}
                        {/* add member */}
                        <div className="flex items-center gap-2 px-5 py-3">
                            {/* <button
                                className="btn bg-blue-400 text-white"
                                onClick={() => window.my_modal_1.showModal()}
                            >
                                <i className="fas fa-plus"></i>tambah
                            </button> */}
                        </div>
                    </div>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-bold text-lg text-black">
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
                                            href={`/${validateRole(
                                                auth?.user?.role_id
                                            )}/aproval/${
                                                item?.approval_tracker
                                                    .laporan_pengaduan.id
                                            }`}
                                            className="btn btn-ghost btn-md rounded-sm hover:bg-transparent text-blue-500 hover:text-blue-700 hover:scale-105"
                                        >
                                            <i className="text-xl fas fa-edit"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </div>
        </Layout>
    );
}
