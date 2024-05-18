import React from "react";
import ProfilePictureOnChat from "./ProfilePictureOnChat.jsx";
import { Link } from "@inertiajs/react";

export default function MineProfileChat({ auth }) {
    return (
        <>
            <div className="flex flex-row items-center justify-between px-3 py-2 pt-5">
                <div className="flex items-center w-full pb-3">
                    <div className="flex flex-row min-w-0 items-center justify-between space-x-3.5">
                        <i className="fas fa-user-circle text-3xl"></i>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-gray-700 truncate">
                                {auth.user.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
