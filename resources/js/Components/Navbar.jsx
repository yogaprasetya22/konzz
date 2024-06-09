import { Link } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import Dropdown from "./ui/Dropdown";
import { useState } from "react";
import { useRef } from "react";

export default function Navbar({ user }) {
    const [open, setOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Menutup dropdown ketika pengguna mengklik di luar area dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav
            className={`w-full bg-white shadow-sm  lg:px-[10rem] px-0 mt-0 sticky top-0 z-50 transition-all duration-180 ease-in-out `}
        >
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] py-2 px-6 shadow bg-gray-400 rounded-sm w-[15rem]"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={`font-medium text-xl ${
                                        "/" === window.location.pathname
                                            ? "text-yellow-500"
                                            : "text-yellow-500"
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={`font-medium text-xl ${
                                        "/about" === window.location.pathname
                                            ? "bg-yellow-300 text-white"
                                            : "text-gray-700"
                                    }`}
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <span
                                    className=" font-medium text-xl flex items-center"
                                    onClick={() => setOpen(!open)}
                                >
                                    Type{" "}
                                    {!open ? (
                                        <i className="fas fa-sort-down"></i>
                                    ) : (
                                        <i className="fas fa-sort-up pt-2"></i>
                                    )}
                                </span>
                                {open && (
                                    <ul className="p-2 ">
                                        <li>
                                            <Link
                                                href={`/non-akademik`}
                                                className=" font-medium text-xl p-0 py-1"
                                            >
                                                Non Akademik
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/akademik`}
                                                className=" font-medium text-xl p-0 py-1"
                                            >
                                                Akademik
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/seksual`}
                                                className=" font-medium text-xl p-0 py-1"
                                            >
                                                Seksusal
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                    <Link href="/">
                        <span className="text-black font-extrabold text-lg md:text-2xl ">
                            Advokasi
                        </span>
                    </Link>
                </div>{" "}
                {user ? (
                    <div className="sm:hidden flex sm:items-center sm:ml-6 p-0 navbar-end">
                        <div className=" relative p-0">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.webp" />
                                        </div>
                                    </label>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <Link
                        href={route("login")}
                        className="sm:hidden flex text-lg font-semibold"
                    >
                        Login
                    </Link>
                )}
                <div className="navbar-end hidden  lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li>
                            <Link
                                href="/"
                                className={`font-medium text-xl ${
                                    "/" === window.location.pathname
                                        ? "bg-yellow-300 text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={`font-medium text-xl ${
                                    "/about" === window.location.pathname
                                        ? "bg-yellow-300 text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                About
                            </Link>
                        </li>
                        <li tabIndex={0}>
                            <details>
                                <summary className=" font-medium text-xl">
                                    Type
                                </summary>
                                <ul className="p-2 z-[1200] bg-wgite shadow-lg rounded-lg w-[12rem] ">
                                    <li>
                                        <Link
                                            href={`/upload-laporan`}
                                            className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                                "/upload-laporan" ===
                                                window.location.pathname
                                                    ? "bg-yellow-300 text-white"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Upload Laporan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/pusat-informasi`}
                                            className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                                "/pusat-informasi" ===
                                                window.location.pathname
                                                    ? "bg-yellow-300 text-white"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Pusat Informasi
                                        </Link>
                                    </li>{" "}
                                    <li>
                                        <Link
                                            href={`/history-laporan`}
                                            className={`font-medium text-xl px-1 py-2 rounded-sm ${
                                                "/history-laporan" ===
                                                window.location.pathname
                                                    ? "bg-yellow-300 text-white"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            History Laporan
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            {user ? (
                                <div className="hidden sm:flex sm:items-center sm:ml-6 p-0">
                                    <div className=" relative p-0">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <label
                                                    tabIndex={0}
                                                    className="btn btn-ghost btn-circle avatar"
                                                >
                                                    <div className="w-10 rounded-full">
                                                        <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.webp" />
                                                    </div>
                                                </label>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("Visualisasi")}
                                                >
                                                    Visualisasi
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="ml-5 hidden sm:flex text-lg font-semibold text-gray-700 border-4 rounded-lg underline"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
