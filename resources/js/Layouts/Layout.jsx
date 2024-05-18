import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Layout({ user, children, title }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const menu = MenuDashbordValidator(user);
    return (
        <>
            {title && <Head title={title} />}
            <div className="h-screen w-full overflow-hidden">
                <div className="w-full h-full  flex flex-row">
                    <Sidebar isSidebarOpen={isSidebarOpen} menu={menu} />
                    <div className="w-full">
                        <Header
                            user={user}
                            toggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                        />
                        <div className="w-full px-10 pt-8">
                            <hr />
                        </div>
                        <main
                            className={` h-full overflow-auto bg-blue-gray-50 w-full p-4 md:p-8  ${
                                isSidebarOpen ? "blur-sm  brightness-50 " : ""
                            }`}
                        >
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

const MenuDashbordValidator = (user) => {
    const validateRole = (role) => {
        switch (role) {
            case 1:
                return "admin";
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
    const menu = [
        {
            kat: "REGISTY",
            name: "List Laporan ",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-clipboard-list",
        },
        {
            kat: "CHAT",
            name: "Chat",
            url: `/chat`,
            icon: "fas fa-comment-dots",
        },
    ];
    const menuAdmin = [
        {
            kat: "DASHBOARD",
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            kat: "ACCOUNT",
            name: "Manajemen Staf",
            url: `/${validateRole(user?.role_id)}/data/staf`,
            icon: "fas fa-user-check",
        },
        {
            name: "Manajemen User",
            url: `/${validateRole(user?.role_id)}/data/user`,
            icon: "fas fa-user-check",
        },
    ];
    const menuBem = [
        {
            kat: "DASHBOARD",
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            kat: "ACCOUNT",
            name: "Manajemen Staf",
            url: `/${validateRole(user?.role_id)}/data/staf`,
            icon: "fas fa-user-check",
        },
        {
            name: "Manajemen User",
            url: `/${validateRole(user?.role_id)}/data/user`,
            icon: "fas fa-user-check",
        },
        {
            kat: "CHAT",
            name: "Chat",
            url: `/chat`,
            icon: "fas fa-comment-dots",
        },
    ];
    const menuRektor = [
        {
            kat: "DASHBOARD",
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return menuAdmin;
        case 2:
            return menu;
        case 3:
            return menu;
        case 4:
            return menu;
        case 5:
            return menu;
        case 6:
            return menu;
        case 7:
            return menu;
        case 8:
            return menu;
        case 9:
            return menu;
        case 10:
            return menu;
        case 11:
            return menu;
        case 12:
            return menuBem;
        case 13:
            return menuRektor;
    }
};
