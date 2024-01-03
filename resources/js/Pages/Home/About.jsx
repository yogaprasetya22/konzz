import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import React from "react";

export default function About({ auth, title }) {
    const whatAndWhoData = [
        {
            title: "Visi",
            text: "Menjadi garda terdepan dalam advokasi mahasiswa, menciptakan lingkungan universitas yang inklusif, adil, dan memberikan dukungan optimal untuk pengembangan akademik dan non-akademik.",
        },
        {
            title: "Misi",
            text: "Memperkuat struktur pengaduan yang transparan. Memberikan respons cepat terhadap masalah mahasiswa. Mengimplementasikan sistem informasi untuk advokasi yang optimal.",
        },
    ];
    return (
        <LayoutUi title={title} user={auth?.user}>
            <header className="hero-page h-[50vh] w-full px-[5vw] flex items-center mobile:px-4">
                <div className="breadcrumbs text-black">
                    <ul>
                        <li>
                            <Link href="/" className="flex gap-2">
                                <i className="fas fa-home"></i>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/about"}>About</Link>
                        </li>
                    </ul>
                    <ul className="pl-10 pt-2">
                        <li>
                            <Link href={"/upload-laporan"}>Upload-Laporan</Link>
                        </li>
                        <li>
                            <Link href={"/pusat-informasi"}>
                                Pusat-Informasi
                            </Link>
                        </li>
                        <li>
                            <Link href={"/history-laporan"}>
                                History-Laporan
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <section className="what-and-who w-[80vw] mx-auto my-20 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
                <div className="info flex gap-4 mobile:flex-col"> 
                    <div className="item w-full flex flex-col gap-4 border bg-white py-4 px-2 rounded-md">
                        <div className="title text-2xl font-bold">Visi</div>
                        <div className="text text-black/[.7] text-justify">
                            Menjadi garda terdepan dalam advokasi mahasiswa,
                            menciptakan lingkungan universitas yang inklusif,
                            adil, dan memberikan dukungan optimal untuk
                            pengembangan akademik dan non-akademik.
                        </div>
                    </div>
                    <div className="item w-full flex flex-col gap-4 border bg-white py-4 px-2 rounded-md">
                        <div className="title text-2xl font-bold">Misi</div>
                        <div className="text text-black/[.7] flex flex-col">
                            <p>
                                - Memperkuat struktur pengaduan yang transparan.
                            </p>
                            <p>
                                - Memberikan respons cepat terhadap masalah
                                mahasiswa.
                            </p>
                            <p>
                                - Mengimplementasikan sistem informasi untuk
                                advokasi yang optimal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutUi>
    );
}
