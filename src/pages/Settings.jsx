import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";

export default function Settings() {
    return (
        <div className="p-4 space-y-8">
            <header className="text-center">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                    Settings
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    General Settings
                </h1>
            </header>

            <section className="mx-auto w-full max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-stone-800">
                    Settings
                </h2>
                <UpdateSettingsForm />
            </section>
        </div>
    );
}
