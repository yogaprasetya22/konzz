import LayoutUi from "@/Layouts/LayoutUi";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, title }) {
    const servicesData = [
        {
            title: "Reynaldi Wicaksono",
            text: "Integrator",
            img: "rey.jpg",
        },
        {
            title: "Adinda Putri Nareswari",
            text: "Pengaduan",
            img: "dinda.jpg",
        },
        {
            title: "Iffat Dwi Ananto",
            text: "Penyelesaian",
            img: "iffat.jpg",
        },
    ];

    const plansData = [
        {
            title: "Choose Any Time For Delivery",
            svg: (
                <i className="text-6xl text-blue-700 rounded-full bg-blue-200 p-4 fas fa-clock"></i>
            ),
            text: "Select a convenient delivery time that fits your schedule.",
        },
        {
            title: "We Wash And Dry Dirty Laundry",
            svg: (
                <i className="text-6xl text-blue-700 rounded-full bg-blue-200 p-4 fas fa-tshirt"></i>
            ),
            text: "Our expert team takes care of washing and drying your soiled garments with precision.",
        },
        {
            title: "We Return Your Clean Laundry",
            svg: (
                <i className="text-6xl text-blue-700 rounded-full bg-blue-200 p-4 fas fa-truck"></i>
            ),
            text: "We'll promptly return your laundry, fresh, clean, and ready to wear.",
        },
        {
            title: "Relax And Enjoy Clean Clothes",
            svg: (
                <i className="text-6xl text-blue-700 rounded-full bg-blue-200 p-4 fas fa-umbrella-beach"></i>
            ),
            text: "Sit back, relax, and relish the luxury of clean, crisp clothes without the hassle.",
        },
    ];

    return (
        <LayoutUi title={title} user={auth?.user}>
            <header className="home-hero  ">
                <div className="w-full  h-[100vh] flex flex-col gap-4 justify-center items-center text-white">
                    <div className="h-[20vh] shadow-sm backdrop-blur-sm bg-[#ffffff99] p-[10rem] rounded-md flex flex-col gap-4 justify-center items-center">
                        <div className="tagline font-bold text-5xl text-center mobile:text-3xl text-yellow-400">
                            Sistem Informasi Advokasi
                        </div>
                        <div className="text-md text-black text-center mobile:px-4 max-w-lg">
                            Sistem Informasi Advokasi yang bertujuan untuk
                            membantu para mahasiswa dalam proses advokasi yang
                            optimal, transparan, dan memberikan solusi tepat
                            bagi mahasiswa
                        </div>
                        <div className="btns flex items-center gap-4 mobile:flex-col">
                            <Link
                                href="/upload-laporan"
                                className="bg-white w-fit hover:bg-gray-200 flex gap-2 items-center px-4 py-2 text-black rounded-md"
                            >
                                <span>Upload Laporan</span>
                            </Link>
                            <Link
                                href="/about"
                                className=" bg-yellow-400 shadow-md w-fit flex gap-2 items-center text-white px-4 py-2 rounded-md"
                            >
                                <span className="text-white">About</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className="plans w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
                <div className="title text-3xl font-bold text-center">
                    Advokasi UPJ
                </div>
                <div className="text-center px-20">
                    Advokasi Mahasiswa UPJ berupaya meningkatkan layanan,
                    struktur pengaduan, dan respons cepat untuk mahasiswa.
                    Sistem informasi diterapkan untuk kualitas advokasi yang
                    lebih baik, mendukung pengambilan keputusan efektif terhadap
                    masalah akademik dan non-akademik di Universitas
                    Pembangunan Jaya.
                </div>
            </section>{" "}
            <section className="our-services w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
                <div className="title text-3xl font-bold text-center">
                    Researcher Team
                </div>
                <div className="services-items w-full flex gap-4 mobile:flex-col">
                    {servicesData.map((item, index) => {
                        return (
                            <div
                                className="card w-full shadow-xl bg-white"
                                key={index}
                            >
                                <figure>
                                    <img
                                        className="w-full object-cover h-[30rem]"
                                        src={`/assets/${item.img}`}
                                        alt="Image"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title ">
                                        {item.title}
                                    </h2>
                                    <p>{item.text}</p>
                                    <div className="card-actions justify-end">
                                        <Link
                                            to="/services"
                                            className="px-4 py-2 bg-boldPurple text-white rounded-md"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </LayoutUi>
    );
}
