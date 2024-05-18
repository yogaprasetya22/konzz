import React, { useEffect } from "react";
import MineProfileChat from "@/Components/chat/MineProfileChat.jsx";
import SearchChatBar from "@/Components/chat/SearchChatBar.jsx";
import ChatListUser from "@/Components/chat/ChatListUser.jsx";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import Layout from "./Layout";
import LayoutUi from "./LayoutUi";

export default function ({ children }) {
    const { auth } = usePage().props;

    useEffect(() => {
        const debouncedReload = debounce(() => {
            router.reload({
                preserveScroll: true,
                only: ["messages", "users"],
            });
        }, 350);

        Echo.private("message." + auth.user.uuid)
            .listen("ReadMessageEvent", () => {
                debouncedReload();
            })
            .listen("NewMessageEvent", () => {
                debouncedReload();
            });

        return () => {
            Echo.private("message." + auth.user.uuid)
                .stopListening("ReadMessageEvent", () => {
                    debouncedReload();
                })
                .stopListening("NewMessageEvent");
        };
    }, []);

    const renderSidebarScreen = () => {
        const currentPath = route().current();
        let className =
            "px-5 py-2 pb-5 lg:w-1/3 lg:border-r lg:border-gray-700 ";

        if (currentPath === "chat.index") className += "flex flex-col w-full";
        else className += "hidden flex-col lg:flex";

        return className;
    };

    return (
        <LayoutValidation>
            <div className="relative  bg-white bg-dots-lighter selection:bg-red-500 selection:text-white ">
                <div className="px-6 mx-auto max-w-screen-2xl xl:px-0 ">
                    <div className="h-[80vh] py-6 ">
                        <div className="flex h-full overflow-hidden border border-gray-700 rounded-lg shadow">
                            <div className={renderSidebarScreen()}>
                                <MineProfileChat auth={auth} />
                                <SearchChatBar />
                                <ChatListUser />
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutValidation>
    );
}

const LayoutValidation = ({ children }) => {
    const { auth, title } = usePage().props;
    return (
        <>
            {auth.user.role_id !== 2 ? (
                <Layout title={title} user={auth.user}>
                    <div className=" -px-16 -py-5 mb-[7rem] -my-10">
                        {children}
                    </div>
                </Layout>
            ) : (
                <LayoutUi title={title} user={auth.user}>
                    <div className="py-12 px-16 -my-10">{children}</div>
                </LayoutUi>
            )}
        </>
    );
};
