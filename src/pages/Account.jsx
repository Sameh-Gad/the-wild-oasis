import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { UpdatePasswordForm } from "../features/authentication/UpdatePasswordForm";

export default function Account() {
    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <header className="border-b border-stone-200 pb-5">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                    Profile
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    Account settings
                </h1>
                <p className="mt-2 text-sm text-stone-500">
                    Manage your profile information and password.
                </p>
            </header>

            <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Profile information
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                        Update your name and avatar.
                    </p>
                </div>
                <div className="p-6">
                    <UpdateUserDataForm />
                </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Change password
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                        Choose a strong password to keep your account secure.
                    </p>
                </div>
                <div className="p-6">
                    <UpdatePasswordForm />
                </div>
            </section>
        </div>
    );
}
