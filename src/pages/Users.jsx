import { SignupForm } from "../features/authentication/SignupForm";

export default function Users() {
    return (
        <div className="space-y-8 p-4">
            <header className="text-center">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                    Team
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    Create a new user
                </h1>
            </header>

            <section className="mx-auto w-full max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-stone-800">
                    Create a staff account
                </h2>
                <SignupForm />
            </section>
        </div>
    );
}
