import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";

const role = [
    {
        name_role: "pendidikan",
        id: 3,
    },
    { name_role: "lse", id: 4 },
    { name_role: "lppm", id: 5 },
    { name_role: "bkal", id: 6 },
    { name_role: "perpus", id: 7 },
    { name_role: "sumberdaya-keuangan", id: 8 },
    { name_role: "sdm", id: 9 },
    { name_role: "tik", id: 10 },
    { name_role: "pha", id: 11 },
    { name_role: "kerjasama-humas-internasionalisasi", id: 12 },
    { name_role: "bem", id: 13 },
    { name_role: "rektor", id: 14 },
];

export default function ModalAddStaf() {
    const [angkatan, setAngkatan] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        kontak: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("tambah-staf"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (data.password !== data.confirm_password) {
                    errors.confirm_password = "Password tidak sama";
                }
            },
        });
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
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box relative overflow">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_1.close()}
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
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
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
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
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
                        <div className="w-full flex flex-row justify-between gap-4">
                            <div className="w-full flex flex-col justify-center gap-1 pt-3">
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    role
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    className="select w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.role} // Gunakan properti value untuk mengendalikan nilai yang terpilih
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value={"0"} disabled>
                                        Select role
                                    </option>
                                    {role.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name_role}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.prodi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center gap-1 pt-3">
                                <InputLabel htmlFor="kontak" value="kontak" />
                                <TextInput
                                    id="kontak"
                                    name="kontak"
                                    value={data.kontak}
                                    className="mt-1 block w-full"
                                    autoComplete="kontak"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("kontak", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.kontak}
                                    className="mt-2"
                                />
                            </div>{" "}
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
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
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                            <div className="w-full flex justify-end pt-4">
                                <button className="btn bg-blue-400 text-white rounded-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
