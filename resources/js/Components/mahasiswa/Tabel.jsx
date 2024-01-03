import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import ModalAddUser from "../ui/ModalAddUser";
import ModalEditUser from "../ui/ModalEditUser";

export default function Tabel({ dataUser }) {
    const [dataEdit, setDataEdit] = useState({});
    const [search, setSearch] = useState("");
    const [dataTabel, setDataTabel] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        // buatkan filter dataUser sama dengan role_id 2 dan status_id 1
        const res = dataUser?.filter((user) => {
            return user.role_id !== 1 && user.role_id !== 3;
        });
        // console.log(res);
        setDataTabel(res);
    }, [dataUser]);

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, dataTabel.length);

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

    // Invoke when user click to request another page.
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
            `/search/user`,
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
            return user.role_id == 2;
        });
        // console.log(response?.data);
        setDataTabel(filterData);
        setItemOffset(0);
        setLoading(false);
    };

    const handleDelete = (id) => async (e) => {
        e.preventDefault();
        const response = await axios.delete(`/delete-user/${id}`);
        if (response.status === 200) {
            window.location.reload();
        }
    };
    return (
        <>
            <ModalAddUser />
            <ModalEditUser data={dataEdit} />
            <div className="bg-white flex flex-col gap-10 rounded-xl mb-20">
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
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn" onClick={onSearch}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        {/* add member */}
                        <div className="flex items-center gap-2 px-5 py-3">
                            <button
                                className="btn bg-blue-400 text-white"
                                onClick={() => window.my_modal_1.showModal()}
                            >
                                {/* icons member */}
                                <i className="fas fa-plus"></i>tambah
                            </button>
                        </div>
                    </div>
                    <div className="px-5 pt-10">
                        <table className="table border-t-2">
                            {/* head */}
                            <thead>
                                <tr className="font-bold text-lg text-black">
                                    <th>id</th>
                                    <th>Name Mahasiswa</th>
                                    <th>Email</th>
                                    <th>Prodi</th>
                                    <th>Tahun Ajaran</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {currentItems.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={` border-b-2 ${
                                            index % 2 === 0
                                                ? "bg-gray-100"
                                                : "bg-white"
                                        }`}
                                    >
                                        <th>{item?.id}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold text-xs">
                                                        {item?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-bold text-xs">
                                                {item?.email}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="font-bold text-xs">
                                                {
                                                    item?.mahasiswa?.prodi
                                                        .name_prodi
                                                }
                                            </p>
                                        </td>
                                        <td>
                                            <p className="font-bold text-xs">
                                                {item?.mahasiswa?.angkatan}
                                            </p>
                                        </td>
                                        <th className="flex gap-2 flex-row">
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
                                            <button
                                                onClick={handleDelete(item.id)}
                                                className="btn btn-ghost btn-md rounded-sm hover:bg-transparent text-red-500 hover:text-red-700 hover:scale-105"
                                            >
                                                <i className="text-xl fas fa-trash-alt"></i>
                                            </button>
                                        </th>
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
        </>
    );
}
