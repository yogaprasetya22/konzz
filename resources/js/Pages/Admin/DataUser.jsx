import Tabel from "@/Components/mahasiswa/Tabel";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function DataUser({ title, auth, data }) {
    return (
        <Layout title={title} user={auth?.user}>
            <Tabel dataUser={data} />
        </Layout>
    );
}
