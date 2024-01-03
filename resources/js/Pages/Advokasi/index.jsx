import Chats from "@/Components/Chats";
import Tabel from "@/Components/mahasiswa/Tabel";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function index({ title, auth, data, user }) {
    return (
        <Layout title={title} user={auth?.user}>
            <Chats data={data} user={user} />
        </Layout>
    );
}
