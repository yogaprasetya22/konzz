import React from "react";
import { validateStatus } from "@/Components/ui/validateStatus";
import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import AddKonsultasi from "@/Components/ui/AddKonsultasi";
import EditKonsultasi from "@/Components/ui/EditKonsultasi";
import LihatKonsultasi from "@/Components/ui/LihatKonsultasi";
moment.locale("id");

export default function Konsultasi({ auth, title, data }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [itemOffset, setItemOffset] = useState(0);

    const [dataEdit, setDataEdit] = useState([]);

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
            <AddKonsultasi />
            <EditKonsultasi value={dataEdit} />
            <LihatKonsultasi value={dataEdit} />
            <div className="px-20 bg-white py-10 min-h-[30rem]">
                <div className="w-full flex justify-between pb-2">
                    <h1 className="text-2xl font-bold text-center">
                        Konsultasi
                    </h1>
                    {/* button tambah */}
                    <button
                        onClick={() => {
                            window.my_modal_1.showModal();
                        }}
                        className="btn btn-primary text-white btn-sm rounded-md hover:bg-blue-700"
                    >
                        <i className="fas fa-plus"></i> Tambah
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table border rounded-md">
                        {/* head */}
                        <thead>
                            <tr className="text-lg font-extrabold">
                                <th>Id</th>
                                <th>Tanggal</th>
                                <th>Topik</th>
                                <th>Status</th>
                                <th>Aksi</th>
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
                                    <td className="font-normal text-sm ">
                                        {item.id}
                                    </td>
                                    <td className="font-normal text-sm ">
                                        {moment(item.created_at).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </td>
                                    <td className="font-normal text-sm ">
                                        {item.topik_konsultasi}
                                    </td>
                                    <td className="font-normal text-sm ">
                                        {validateStatus(
                                            item?.approval_tracker
                                                ?.status_aproval?.id
                                        )}
                                    </td>
                                    <td className="flex gap-2 flex-row">
                                        <button
                                            onClick={() => {
                                                window.my_modal_3.showModal(
                                                    item
                                                );
                                                setDataEdit(item);
                                            }}
                                            className="btn btn-ghost btn-md rounded-sm hover:bg-transparent text-blue-500 hover:text-blue-700 hover:scale-105"
                                        >
                                            <i className="text-xl fas fa-eye"></i>
                                        </button>
                                        <button
                                            onClick={() => {
                                                window.my_modal_2.showModal(
                                                    item
                                                );
                                                setDataEdit(item);
                                            }}
                                            className="btn btn-ghost btn-md rounded-sm hover:bg-transparent text-blue-500 hover:text-blue-700 hover:scale-105"
                                        >
                                            <i className="text-xl fas fa-edit"></i>
                                        </button>
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
        </LayoutUi>
    );
}
