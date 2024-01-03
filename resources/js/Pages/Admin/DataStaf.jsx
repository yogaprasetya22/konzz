import TabelStaf from "@/Components/mahasiswa/TabelStaf";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function DataStaf({ title, auth, data }) {
    console.log(data);
    return (
        <Layout title={title} user={auth?.user}>
            <TabelStaf dataUser={data} />
        </Layout>
    );
}
