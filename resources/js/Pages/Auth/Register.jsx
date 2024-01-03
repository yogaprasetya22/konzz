import GuestLayout from "@/Layouts/GuestLayout";
import { useEffect } from "react";
import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import TextInput from "@/Components/ui/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
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

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
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
        <GuestLayout>
            <Head title="Register" />

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
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>{" "}
                <div className="w-full flex flex-row justify-between gap-4">
                    <div className="w-full flex flex-col justify-center gap-1 pt-3">
                        <label
                            htmlFor="prodi"
                            className="block text-sm font-medium text-gray-700"
                        >
                            prodi
                        </label>
                        <select
                            name="prodi"
                            id="prodi"
                            className="select w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.prodi} // Gunakan properti value untuk mengendalikan nilai yang terpilih
                            onChange={(e) => setData("prodi", e.target.value)}
                        >
                            <option value={"0"} disabled>
                                Select prodi
                            </option>
                            <option value={"1"}>Manajemen</option>
                            <option value={"2"}>Akuntansi</option>
                            <option value={"3"}>Ilmu Komunikasi</option>
                            <option value={"4"}>Psikologi</option>
                            <option value={"5"}>Teknik Sipil</option>
                            <option value={"6"}>Arsitektur</option>
                            <option value={"7"}>Informatika</option>
                            <option value={"8"}>Sistem Informasi</option>
                            <option value={"9"}>Desain Produk</option>
                            <option value={"10"}>
                                Desain Komunikasi Visual
                            </option>
                        </select>
                        <InputError message={errors.prodi} className="mt-2" />
                    </div>
                    <div className="w-full flex flex-col justify-center gap-1 pt-3">
                        <label
                            htmlFor="angkatan"
                            className="block text-sm font-medium text-gray-700"
                        >
                            angkatan
                        </label>
                        <select
                            name="angkatan"
                            id="angkatan"
                            className="select w-full p-2.5 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.angkatan} // Gunakan properti value untuk mengendalikan nilai yang terpilih
                            onChange={(e) =>
                                setData("angkatan", e.target.value)
                            }
                        >
                            <option value={"0"} disabled>
                                Select angkatan
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
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
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
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
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
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
