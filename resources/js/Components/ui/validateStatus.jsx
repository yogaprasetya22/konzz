export const validateStatus = (status) => {
    switch (status) {
        case 1:
            return (
                <p className=" p-2 text-white rounded-lg  bg-yellow-700">
                    Pending
                </p>
            );
        case 2:
            return (
                <p className=" p-2 text-white rounded-lg bg-blue-600">
                    Aproved
                </p>
            );
        case 3:
            return (
                <p className=" p-2 text-white rounded-lg bg-amber-400">
                    On Progress
                </p>
            );
        case 4:
            return (
                <p className=" p-2 text-white rounded-lg bg-green-500">
                    Success
                </p>
            );
        case 5:
            return (
                <p className=" p-2 text-white rounded-lg bg-red-500">
                    Rejected
                </p>
            );
    }
};
