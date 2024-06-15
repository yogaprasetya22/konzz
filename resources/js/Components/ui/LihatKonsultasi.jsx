import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import { useRef } from "react";

export default function LihatKonsultasi({ value }) {
    const validateTracker = (status) => {
        switch (status?.approval_tracker?.status_aproval_id) {
            case 1:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: false,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: false,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 2:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: false,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 3:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: true,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: false,
                    },
                ];
            case 4:
                return [
                    {
                        id: 1,
                        name: "Panding",
                        status: true,
                    },
                    {
                        id: 2,
                        name: "Approved",
                        status: true,
                    },
                    {
                        id: 3,
                        name: "On Progress",
                        status: true,
                    },
                    {
                        id: 4,
                        name: "Success",
                        status: true,
                    },
                ];
            case 5:
                return [
                    {
                        id: 1,
                        name: "Rejected",
                        status: true,
                    },
                ];
            default:
                return [];
        }
    };

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box w-full max-w-2xl overflow bg-white">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_3.close()}
                        className="p-5 text-xl font-extrabold absolute top-0 right-10 text-white bg-red-500 hover:bg-red-600 transition-all"
                        aria-label="close modal"
                    >
                        x
                    </button>
                </div>
                <div className="w-full">
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
                    <div className="items-center font-extrabold text-md text-blue-900 flex pt-4  flex-row gap-16">
                        <p>Kasus:</p>
                        <p className=" p-2 border text-justify text-gray-600 font-light ">
                            {value?.topik_konsultasi}
                        </p>
                    </div>
                    <div className="items-center font-extrabold text-md text-blue-900 flex pt-4 gap-5">
                        keterangan :{" "}
                        <p className=" p-2 border text-justify text-gray-600 font-light max-w-[30rem] break-words">
                            {value?.keterangan}
                        </p>
                    </div>
                    {/* keterangan warna */}
                    <div className="flex flex-row gap-4 justify-center pt-5">
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-4 h-4 bg-warning rounded-full"></div>
                            <p>Status</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-4 h-4 bg-error rounded-full"></div>
                            <p>Rejected</p>
                        </div>
                    </div>
                    <div className="m-4 bg-gray-100 flex justify-center rounded-md">
                        <ul className="steps steps-vertical ">
                            {validateTracker(value).map((item, index) => {
                                return (
                                    <>
                                        {item.name === "Rejected" ? (
                                            <li
                                                key={index}
                                                data-content="?"
                                                className={`step text-xl font-extrabold text-gray-500 ${
                                                    item.status
                                                        ? "step-error"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}
                                            </li>
                                        ) : (
                                            <li
                                                key={index}
                                                className={`step text-xl font-extrabold text-gray-500 ${
                                                    item.status
                                                        ? "step-warning"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}
                                            </li>
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
