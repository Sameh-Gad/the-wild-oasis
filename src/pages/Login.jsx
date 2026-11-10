import { LoginForm } from "../features/authentication/LoginForm";

function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 p-4">
            <img
                src="/logo-light.png"
                alt="The Wild Oasis"
                className="mb-8 h-16 w-auto"
            />

            <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
                <h1 className="mb-6 text-center text-2xl font-semibold text-stone-800">
                    Log in to your account
                </h1>

                <LoginForm />
            </div>
        </main>
    );
}

export default Login;
