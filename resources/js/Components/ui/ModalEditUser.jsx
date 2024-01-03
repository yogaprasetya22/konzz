import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import axios from "axios";

export default function ModalEditUser({ data: item }) {
    const [angkatan, setAngkatan] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        prodi: "0",
        angkatan: "0",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (data.password !== data.password_confirmation) {
            alert("password tidak sama");
            return;
        }
        const res = await axios.post(`/edit-user/${item.id}`, {
            name: data.name || item.name,
            email: data.email || item.email,
            prodi: data.prodi === "0" ? item.mahasiswa.prodi.id : data.prodi,
            angkatan:
                data.angkatan === "0" ? item.mahasiswa.angkatan : data.angkatan,
            password: data.password,
        });
        if (res.status === 200) {
            window.location.reload();
        }
        window.my_modal_2.close();
    };

    const validateAngkatan = () => {
        // buatkan tahun sebelumnya pada mulan agustus
        const tahunSebelumnya =
            new Date().getMonth() < 7
                ? new Date().getFullYear() - 1
                : new Date().getFullYear();
        const limaTahunSebelumnya = tahunSebelumnya - 5;
        // buatkan array angkatan dari tahun sebelumnya sampai 5 tahun sebelumnya
        const angkatan = [];
        for (let i = tahunSebelumnya; i >= limaTahunSebelumnya; i--) {
            angkatan.push(i);
        }
        setAngkatan(angkatan);
    };

    useEffect(() => {
        validateAngkatan();
    }, []);
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box relative overflow">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_2.close()}
                        className="p-5 text-xl font-extrabold absolute top-0 right-10 text-white bg-red-500 hover:bg-red-600 transition-all"
                        aria-label="close modal"
                    >
                        x
                    </button>
                </div>
                <div className="w-full">
                    <form onSubmit={submit}>
                        <div className=" pb-4">
                            <div className="w-full flex justify-center items-center flex-col py-2 gap-4">
                                <h1 className="font-extrabold text-blue-900 text-2xl">
                                    SIAM
                                </h1>
                                <h1 className="font-semibold  text-sm text-blue-900">
                                    Sistem Informasi Advokasi
                                </h1>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <InputLabel htmlFor="name_1" value="Name" />
                            <TextInput
                                id="name_1"
                                name="name"
                                value={data.name || item.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>{" "}
                        <div className="w-full flex flex-row justify-between gap-4">
                            <div className="w-full flex flex-col justify-center gap-1 pt-3">
                                <label
                                    htmlFor="prodi_1"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    prodi
                                </label>
                                <select
                                    name="prodi"
                                    id="prodi_1"
                                    className="select w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data?.prodi} // Gunakan properti value untuk mengendalikan nilai yang terpilih
                                    onChange={(e) =>
                                        setData("prodi", e.target.value)
                                    }
                                >
                                    <option value={"0"} disabled>
                                        {item?.mahasiswa?.prodi.name_prodi}
                                    </option>
                                    <option value={"1"}>Manajemen</option>
                                    <option value={"2"}>Akuntansi</option>
                                    <option value={"3"}>Ilmu Komunikasi</option>
                                    <option value={"4"}>Psikologi</option>
                                    <option value={"5"}>Teknik Sipil</option>
                                    <option value={"6"}>Arsitektur</option>
                                    <option value={"7"}>Informatika</option>
                                    <option value={"8"}>
                                        Sistem Informasi
                                    </option>
                                    <option value={"9"}>Desain Produk</option>
                                    <option value={"10"}>
                                        Desain Komunikasi Visual
                                    </option>
                                </select>
                                <InputError
                                    message={errors.prodi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center gap-1 pt-3">
                                <label
                                    htmlFor="angkatan_1"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    angkatan
                                </label>
                                <select
                                    name="angkatan"
                                    id="angkatan_1"
                                    className="select w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data?.angkatan} // Gunakan properti value untuk mengendalikan nilai yang terpilih
                                    onChange={(e) =>
                                        setData("angkatan", e.target.value)
                                    }
                                >
                                    <option value={"0"} disabled>
                                        {item?.mahasiswa?.angkatan}
                                    </option>
                                    {angkatan.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>{" "}
                                <InputError
                                    message={errors.angkatan}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email_1" value="Email" />

                            <TextInput
                                id="email_1"
                                type="email"
                                name="email"
                                value={data.email || item.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password_1" value="Password" />

                            <TextInput
                                id="password_1"
                                type="password"
                                name="password"
                                value={data.password || item.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation_1"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation_1"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full flex justify-end pt-4">
                            <button className="btn bg-blue-400 text-white rounded-md">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
