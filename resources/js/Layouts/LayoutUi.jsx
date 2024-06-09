import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import React from "react";

export default function LayoutUi({ title, user, children }) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="w-full ">
                <Navbar user={user} />
                {children}
                <footer className="footer footer-center p-4 bg-white text-base-content">
                    <aside>
                        <p>
                            Copyright © {new Date().getFullYear()} - All right
                            reserved by UPJ
                        </p>
                    </aside>
                </footer>
            </div>
        </>
    );
}
