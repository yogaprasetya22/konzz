import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function PusInfo({ auth, title, unit }) {
    const [search, setSearch] = useState("");
    const [dataTabel, setDataTabel] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // buatkan filter dataUser sama dengan role_id 2 dan status_id 1
        const res = unit?.filter((user) => {
            return user.role_id !== 1 && user.role_id !== 2;
        });
        setDataTabel(res);
    }, [unit]);

    useEffect(() => {
        setLoading(true);
        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = dataTabel
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(dataTabel.length / page));
        setLoading(false);
    }, [itemOffset, dataTabel, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % dataTabel.length;

        setItemOffset(newOffset);
    };

    const onSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        const response = await axios.post(
            `/search/staf`,
            {
                search: search,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // filter id beruruatan dan juga filter role_id 2 dan status_id 1
        response?.data.sort((a, b) => {
            return a.id - b.id;
        });
        const filterData = response?.data.filter((user) => {
            return user.role_id !== 1 && user.role_id !== 2;
        });
        setDataTabel(filterData);
        setItemOffset(0);
        setLoading(false);
    };

    return (
        <LayoutUi title={title} user={auth?.user}>
            <div className="px-20  pt-10">
                <div className="bg-white flex flex-col gap-10 rounded-xl mb-20 ">
                    <div className="overflow-x-auto">
                        <div className="flex justify-between  w-full">
                            <div className="flex  px-5 py-3 gap-10">
                                {/* search */}
                                <div className="flex flex-row items-center justify-center gap-2 w-full">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full rounded-md"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <button className="btn" onClick={onSearch}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pt-5">
                            <table className="table border-t-2">
                                {/* head */}
                                <thead>
                                    <tr className="text-lg font-extrabold">
                                        <th>urut</th>
                                        <th>Nama Unit</th>
                                        <th>Pic</th>
                                        <th>Kontak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="font-bold text-xs">
                                                {item.id}
                                            </td>
                                            <td className="font-bold text-xs">
                                                {item.role.name_role}
                                            </td>
                                            <td className="font-bold text-xs">
                                                {item.name}
                                            </td>
                                            <td>
                                                <Link
                                                    href={`https://wa.me/${item.unit.kontak}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.unit.kontak}
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
                </div>
            </div>
        </LayoutUi>
    );
}
