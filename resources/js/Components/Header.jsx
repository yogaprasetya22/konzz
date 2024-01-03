import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/ui/Dropdown";
// import NavLink from "@/Components/ui/NavLink";
import React, { useState, useEffect, useRef } from "react";

const Header = ({ toggleSidebar, isSidebarOpen, user }) => {
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

    const validateRole = (role) => {
        switch (role) {
            case 1:
                return "superadmin";
            case 2:
                return "";
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

    return (
        <header className="bg-base-100 px-5 md:px-10  h-auto w-full flex flex-row justify-between items-center">
            <div className="w-auto flex h-16 md:h-20 gap-2">
                <button
                    onClick={toggleSidebar}
                    className="text-3xl lg:hidden block"
                >
                    <i
                        className={`bi ${
                            isSidebarOpen ? "bi-x-lg text-2xl" : "bi-list"
                        }`}
                    ></i>
                </button>
                <Link
                    href={`/${validateRole(user.role_id)}`}
                    className="flex flex-row items-center text-3xl "
                >
                    <div className=" text-blue-900 font-extrabold flex flex-col pt-4">
                        <p> Hi, {user.name}</p>
                        <span className="text-lg font-light">
                            {validateRole(user.role_id)}
                        </span>
                    </div>
                </Link>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6 ">
                <div className="ml-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            {/* icons user */}
                            <div className=" select-none">
                                <i className="bi bi-person-circle text-3xl text-blue-900"></i>
                            </div>
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
        </header>
    );
};

export default Header;
