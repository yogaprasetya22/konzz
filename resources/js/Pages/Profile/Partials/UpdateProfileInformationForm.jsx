import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import TextInput from "@/Components/ui/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    user,
}) {
    // const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            prodi: user?.mahasiswa?.prodi?.id,
            angkatan: user?.mahasiswa?.angkatan,
        });

    const validateAngkatan = (() => {
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
        return angkatan;
    })();

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-2">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
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
                        <option value={"10"}>Desain Komunikasi Visual</option>
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
                        onChange={(e) => setData("angkatan", e.target.value)}
                    >
                        <option value={"0"} disabled>
                            Select angkatan
                        </option>
                        {validateAngkatan.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>{" "}
                    <InputError message={errors.angkatan} className="mt-2" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 justify-end py-12">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
