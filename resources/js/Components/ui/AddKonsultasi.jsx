import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import { useRef } from "react";

export default function AddKonsultasi() {
    const { kategori_laporan } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        topik_konsultasi: "",
        keterangan: "",
        kategori: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("KonsultasiStore"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    const textAreaRef = useRef(null);
    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
    };
    useEffect(() => {
        resizeTextArea();
    }, [data.keterangan]);

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
                    <form
                        onSubmit={submit}
                        className="w-full flex flex-col gap-3"
                    >
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
                            <InputLabel
                                htmlFor="topik_konsultasi"
                                value="Topik"
                            />
                            <TextInput
                                id="topik_konsultasi"
                                name="topik_konsultasi"
                                value={data.topik_konsultasi}
                                className="mt-1 block w-full"
                                autoComplete="topik_konsultasi"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("topik_konsultasi", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.topik_konsultasi}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="keterangan"
                                value="Keterangan"
                            />
                            <textarea
                                ref={textAreaRef}
                                rows={2}
                                id="keterangan"
                                name="keterangan"
                                type="text"
                                value={data.keterangan}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm overflow-y-hidden"
                                autoComplete="keterangan"
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                placeholder="Keterangan"
                                required
                            ></textarea>

                            <InputError
                                message={errors.keterangan}
                                className="mt-2"
                            />
                        </div>
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
