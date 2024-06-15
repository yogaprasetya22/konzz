import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import { useRef } from "react";

export default function EditKonsultasi({ value }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: value.id,
        topik_konsultasi: "",
        keterangan: "",
    });

    useEffect(() => {
        setData({
            id: value.id,
            topik_konsultasi: value.topik_konsultasi,
            keterangan: value.keterangan,
        });
    }, [value]);

    const submit = (e) => {
        e.preventDefault();
        post(route("KonsultasiUpdate"), {
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
