import Chats from "@/Components/Chats";
import Tabel from "@/Components/mahasiswa/Tabel";
import Layout from "@/Layouts/Layout";
import React from "react";

const Admin = ({ title, auth, data, user, kategori_laporan }) => {
    return (
        <Layout title={title} user={auth?.user}>
            <Chats
                data={data}
                user={user}
                kategori_laporan={kategori_laporan}
            />
        </Layout>
    );
};

export default Admin;
