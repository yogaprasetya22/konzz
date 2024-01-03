import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import LayoutUi from "@/Layouts/LayoutUi";
import Layout from "@/Layouts/Layout";

export default function Edit({ auth, mustVerifyEmail, status, user }) {
    return (
        <LayoutValidation user={auth?.user} title="Profile">
            <Head title="Profile" />

            <div className="flex flex-row w-full gap-10">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <UpdateProfileInformationForm
                        user={user}
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />{" "}
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
            </div>
        </LayoutValidation>
    );
}

const LayoutValidation = ({ title, user, children }) => {
    return (
        <>
            {user.role_id !== 2 ? (
                <Layout title={title} user={user}>
                    <div className=" px-16">{children}</div>
                </Layout>
            ) : (
                <LayoutUi title={title} user={user}>
                    <div className="py-12 px-16">{children}</div>
                </LayoutUi>
            )}
            {/* {children} */}
        </>
    );
};
