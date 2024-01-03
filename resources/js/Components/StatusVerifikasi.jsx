import React from "react";

const StatusVerifikasi = () => {
    const lastData = ceklis[0].id;

    return (
        <div className="bg-white flex flex-col gap-10 rounded-xl mb-20  pb-10">
            <div className="flex">
                <h1 className="p-5 bg-green-600 text-2xl font-semibold text-black rounded-ss-xl">
                    Status Verifikasi
                </h1>
            </div>
            <div className="flex flex-row p-10 w-full  pr-32">
                {ceklis.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-row items-center w-full justify-center"
                        >
                            {item.id !== lastData ? (
                                <div
                                    className={`border-2 ${
                                        item?.status
                                            ? "border-green-400"
                                            : "border-gray-600  "
                                    } w-full `}
                                ></div>
                            ) : (
                                <div
                                    className={`border-2 border-white w-full`}
                                ></div>
                            )}
                            <div className=" relative">
                                {item?.status ? (
                                    <img
                                        src="/storage/images/content/ceklis.png"
                                        className="w-[5rem]  bg-white"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src="/storage/images/content/ceklis.png"
                                        className="w-[5rem] invert-[55%]"
                                        alt=""
                                    />
                                )}
                                <div className="absolute w-[8rem] -left-[2.5rem] top-[120%] px-2 font-extrabold">
                                    <p className=" text-center">
                                        {item?.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatusVerifikasi;

const ceklis = [
    {
        id: 1,
        status: true,
        title: "Data 1",
    },
    {
        id: 2,
        status: false,
        title: "Data 2",
    },
    {
        id: 3,
        status: false,
        title: "Data 3",
    },
    {
        id: 4,
        status: false,
        title: "Data 4",
    },
    {
        id: 5,
        status: false,
        title: "Data 5",
    },
];
