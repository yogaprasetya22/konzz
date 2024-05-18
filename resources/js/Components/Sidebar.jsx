import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const Sidebar = ({ isSidebarOpen, menu: MenuDashboard }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const path = window.location.pathname; // Mendapatkan path dari URL
    let relevantPath; // Variabel untuk menyimpan hasil path yang relevan
    // Memeriksa apakah ada data di path
    if (path.includes("/") && path.split("/").length > 2) {
        const segments = path.split("/"); // Membagi path menjadi segmen menggunakan '/'
        relevantPath = `/${segments[1]}/${segments[2]}`; // Mengambil dua segmen pertama setelah domain
    } else {
        relevantPath = window.location.pathname; // Jika tidak ada data di path, gunakan path utuh
    }

    return (
        <aside
            className={`h-screen lg:w-80 shadow-md  w-[100%] lg:relative absolute z-10 ${
                isSidebarOpen
                    ? "transform translate-x-0 "
                    : "lg:translate-x-0  transform -translate-x-full"
            } lg:flex transition-transform duration-300 ease-in-out`}
        >
            <div className="lg:w-full md:w-[40%] w-[75%] bg-white h-full ">
                <div className="px-5 py-5 flex flex-col justify-between h-full  pb-18">
                    <ul className="flex flex-col gap-4 w-full">
                        <div className="w-full flex justify-center items-center flex-col gap-4 ">
                            <h1 className="font-extrabold text-blue-900 text-4xl">
                                SIAM
                            </h1>
                            <h1 className="font-semibold  text-md text-blue-900">
                                Sistem Informasi Advokasi
                            </h1>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-6 w-full">
                            {MenuDashboard &&
                                MenuDashboard.map((menu, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2"
                                    >
                                        <h1 className=" font-thin opacity-50 text-xs text-blue-700">
                                            {menu.kat}
                                        </h1>
                                        <Link
                                            href={menu.url}
                                            className="cursor-pointer text-blue-900"
                                        >
                                            <li
                                                className={`font-medium text-md w-full rounded-md p-2 flex gap-2 items-center ${
                                                    menu.url ===
                                                    window.location.pathname
                                                        ? "bg-yellow-500 text-black "
                                                        : "hover:text-blue-700 hover:bg-blue-gray-200"
                                                }`}
                                            >
                                                <i
                                                    className={`text-sm ${menu.icon}`}
                                                ></i>
                                                {menu.name}
                                            </li>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                        <hr />
                    </ul>
                    <ul className="flex flex-col gap-3 w-full">
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="cursor-pointer"
                        >
                            <li
                                className={`font-medium text-md w-full rounded-md text-gray-700 p-2 flex gap-2 items-center ${"hover:text-black hover:bg-blue-gray-200"}`}
                            >
                                <i
                                    className={`text-sm fas fa-sign-out-alt`}
                                ></i>
                                Logout
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
