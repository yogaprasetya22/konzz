import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function LaporanPengaduan({ user, kategori_laporan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        deskripsi: "",
        bukti: "",
        kategori: "",
        anonim: "false",
    });
    const textAreaRef = useRef(null);
    const endPath = window.location.pathname.split("/").pop();

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("deskripsi", data.deskripsi);
        formData.append("bukti", data.bukti);
        formData.append("kategori", parseInt(data.kategori));
        formData.append("anonim", data.anonim);
        formData.append("user_id", user.id);
        const res = await axios.post(`/laporan/pengaduan`, formData);
        if (res.status === 200) {
            // Tampilkan toast sukses
            toast.success("Formulir berhasil dikirim!", {
                position: "top-right", // Atur posisi toast
                autoClose: 3000, // Durasi toast ditampilkan (dalam milidetik)
                hideProgressBar: false, // Tampilkan progress bar
                closeOnClick: true, // Tutup toast saat diklik
                pauseOnHover: true, // Jeda toast saat pointer di atasnya
            });
            reset(); // Reset formulir setelah pengiriman berhasil
        } else {
            // Tampilkan toast gagal jika diperlukan
            toast.error("Formulir gagal dikirim.");
        }
    };

    const renderImage = () => {
        if (data.bukti) {
            //    jika file pdf
            if (data.bukti.type === "application/pdf") {
                return (
                    <div className="flex flex-col justify-center items-center w-full  max-h-[15rem]">
                        {/* svg pdf */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="800"
                            height="800"
                            version="1.1"
                            viewBox="0 0 303.188 303.188"
                            xmlSpace="preserve"
                        >
                            <path
                                fill="#E8E8E8"
                                d="M219.821 0L32.842 0 32.842 303.188 270.346 303.188 270.346 50.525z"
                            ></path>
                            <path
                                fill="#FB3449"
                                d="M230.013 149.935c-3.643-6.493-16.231-8.533-22.006-9.451-4.552-.724-9.199-.94-13.803-.936-3.615-.024-7.177.154-10.693.354-1.296.087-2.579.199-3.861.31a93.594 93.594 0 01-3.813-4.202c-7.82-9.257-14.134-19.755-19.279-30.664 1.366-5.271 2.459-10.772 3.119-16.485 1.205-10.427 1.619-22.31-2.288-32.251-1.349-3.431-4.946-7.608-9.096-5.528-4.771 2.392-6.113 9.169-6.502 13.973-.313 3.883-.094 7.776.558 11.594.664 3.844 1.733 7.494 2.897 11.139a165.324 165.324 0 003.588 9.943 171.593 171.593 0 01-2.63 7.603c-2.152 5.643-4.479 11.004-6.717 16.161l-3.465 7.507c-3.576 7.855-7.458 15.566-11.815 23.02-10.163 3.585-19.283 7.741-26.857 12.625-4.063 2.625-7.652 5.476-10.641 8.603-2.822 2.952-5.69 6.783-5.941 11.024-.141 2.394.807 4.717 2.768 6.137 2.697 2.015 6.271 1.881 9.4 1.225 10.25-2.15 18.121-10.961 24.824-18.387 4.617-5.115 9.872-11.61 15.369-19.465l.037-.054c9.428-2.923 19.689-5.391 30.579-7.205 4.975-.825 10.082-1.5 15.291-1.974 3.663 3.431 7.621 6.555 11.939 9.164 3.363 2.069 6.94 3.816 10.684 5.119 3.786 1.237 7.595 2.247 11.528 2.886 1.986.284 4.017.413 6.092.335 4.631-.175 11.278-1.951 11.714-7.57.134-1.72-.237-3.228-.98-4.55zm-110.869 10.31a170.827 170.827 0 01-6.232 9.041c-4.827 6.568-10.34 14.369-18.322 17.286-1.516.554-3.512 1.126-5.616 1.002-1.874-.11-3.722-.937-3.637-3.065.042-1.114.587-2.535 1.423-3.931.915-1.531 2.048-2.935 3.275-4.226 2.629-2.762 5.953-5.439 9.777-7.918 5.865-3.805 12.867-7.23 20.672-10.286-.449.71-.897 1.416-1.34 2.097zm27.222-84.26a38.169 38.169 0 01-.323-10.503 24.858 24.858 0 011.038-4.952c.428-1.33 1.352-4.576 2.826-4.993 2.43-.688 3.177 4.529 3.452 6.005 1.566 8.396.186 17.733-1.693 25.969-.299 1.31-.632 2.599-.973 3.883a121.219 121.219 0 01-1.648-4.821c-1.1-3.525-2.106-7.091-2.679-10.588zm16.683 66.28a236.508 236.508 0 00-25.979 5.708c.983-.275 5.475-8.788 6.477-10.555 4.721-8.315 8.583-17.042 11.358-26.197 4.9 9.691 10.847 18.962 18.153 27.214.673.749 1.357 1.489 2.053 2.22-4.094.441-8.123.978-12.062 1.61zm61.744 11.694c-.334 1.805-4.189 2.837-5.988 3.121-5.316.836-10.94.167-16.028-1.542-3.491-1.172-6.858-2.768-10.057-4.688-3.18-1.921-6.155-4.181-8.936-6.673 3.429-.206 6.9-.341 10.388-.275 3.488.035 7.003.211 10.475.664 6.511.726 13.807 2.961 18.932 7.186 1.009.833 1.331 1.569 1.214 2.207z"
                            ></path>
                            <path
                                fill="#FB3449"
                                d="M227.64 25.263L32.842 25.263 32.842 0 219.821 0z"
                            ></path>
                            <g fill="#A4A9AD">
                                <path d="M126.841 241.152c0 5.361-1.58 9.501-4.742 12.421-3.162 2.921-7.652 4.381-13.472 4.381h-3.643v15.917H92.022v-47.979h16.606c6.06 0 10.611 1.324 13.652 3.971 3.041 2.647 4.561 6.41 4.561 11.289zm-21.856 6.235h2.363c1.947 0 3.495-.546 4.644-1.641 1.149-1.094 1.723-2.604 1.723-4.529 0-3.238-1.794-4.857-5.382-4.857h-3.348v11.027zM175.215 248.864c0 8.007-2.205 14.177-6.613 18.509s-10.606 6.498-18.591 6.498h-15.523v-47.979h16.606c7.701 0 13.646 1.969 17.836 5.907 4.189 3.938 6.285 9.627 6.285 17.065zm-13.455.46c0-4.398-.87-7.657-2.609-9.78-1.739-2.122-4.381-3.183-7.926-3.183h-3.773v26.877h2.888c3.939 0 6.826-1.143 8.664-3.43 1.837-2.285 2.756-5.78 2.756-10.484zM196.579 273.871h-12.766v-47.979h28.355v10.403h-15.589v9.156h14.374v10.403h-14.374v18.017z"></path>
                            </g>
                            <path
                                fill="#D1D3D3"
                                d="M219.821 50.525L270.346 50.525 219.821 0z"
                            ></path>
                        </svg>

                        <p className="text-gray-400">{data.bukti.name}</p>
                    </div>
                );
            } else {
                // jika file gambar
                return (
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <img
                            src={URL.createObjectURL(data.bukti)}
                            alt="bukti"
                            className="w-full max-h-[20rem] object-contain"
                        />
                        <p className="text-gray-400">{data.bukti.name}</p>
                    </div>
                );
            }
        } else {
            return (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM7.293 9.707a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414L11.414 13l1.293 1.293a1 1 0 01-1.414 1.414L10 14.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 13l-1.293-1.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="text-gray-400">Tidak ada file yang dipilih</p>
                </div>
            );
        }
    };

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
    };
    useEffect(() => {
        resizeTextArea();
    }, [data.deskripsi]);

    return (
        <div className="w-full p-5 md:p-10 flex justify-center ">
            <ToastContainer />
            <form
                onSubmit={submit}
                className="px-5 py-5 bg-white rounded-md shadow-md w-full md:w-1/2"
            >
                <h1 className=" text-center underline">
                    <span className="text-2xl font-bold">
                        Laporan Pengaduan
                    </span>
                </h1>
                <div className="flex flex-col justify-center gap-5 pt-3 ">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="deskripsi"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Deskirpsi Aduan
                        </label>
                        <div className="mt-1">
                            <textarea
                                ref={textAreaRef}
                                rows={1}
                                id="deskripsi"
                                name="deskripsi"
                                type="text"
                                value={data.deskripsi}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm overflow-y-hidden"
                                autoComplete="deskripsi"
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                placeholder="Deskirpsi Aduan"
                                required
                            ></textarea>
                        </div>
                    </div>
                    {/* bukti file */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="bukti"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Bukti File
                        </label>
                        <label
                            htmlFor="bukti"
                            className="flex flex-col justify-center items-center w-full border-2 border-gray-300 border-dashed rounded-md"
                        >
                            {renderImage()}
                        </label>
                        <div className="mt-1">
                            <input
                                id="bukti"
                                name="bukti"
                                type="file"
                                accept="image/*,application/pdf"
                                className=" hidden"
                                autoComplete="bukti"
                                onChange={(e) =>
                                    setData("bukti", e.target.files[0])
                                }
                                placeholder="Bukti File"
                                required
                            />
                        </div>
                        {/* buatkan des  accept hanya jpg,png,pdf*/}
                        <div className="text-sm text-gray-500 pl-2">
                            <p>jpg,png,pdf</p>
                        </div>
                    </div>
                    {/* kategori menggunakan select */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="kategori"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Kategori
                        </label>
                        <div className="mt-1">
                            <select
                                id="kategori"
                                name="kategori"
                                type="text"
                                value={data.kategori}
                                className="select select-bordered select-xs w-full h-10 rounded-md"
                                autoComplete="kategori"
                                onChange={(e) =>
                                    setData("kategori", e.target.value)
                                }
                                placeholder="Kategori"
                                required
                            >
                                {
                                    // mapping kategori laporan
                                    kategori_laporan?.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.id}
                                                className="border-b border-gray-300 py-1"
                                            >
                                                {item.deskripsi}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {/* buatkan chackbox anonim */}
                    <div className="flex flex-row items-center justify-start gap-2 mt-1 select-none">
                        <div className="">
                            <input
                                id="anonim"
                                name="anonim"
                                type="checkbox"
                                className="block border-gray-300  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                autoComplete="anonim"
                                value={data.anonim}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData("anonim", "true");
                                    } else {
                                        setData("anonim", "false");
                                    }
                                }}
                                placeholder="Anonim"
                            />
                        </div>
                        <label
                            htmlFor="anonim"
                            className="block text-sm font-medium text-gray-700 select-none"
                        >
                            Anonim
                        </label>
                    </div>
                    <div className="flex items-center justify-end ">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? "Mengirim..." : "Kirim"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
