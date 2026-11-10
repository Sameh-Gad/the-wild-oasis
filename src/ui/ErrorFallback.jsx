import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
            <div className="w-full max-w-xl rounded-lg bg-white p-8 text-center shadow-md">
                <h1 className="mb-4 text-2xl font-semibold text-stone-800">
                    Something went wrong
                </h1>

                <p className="mb-6 text-stone-600">
                    {error?.message || "An unexpected error occurred"}
                </p>

                <Button onClick={resetErrorBoundary}>Try again</Button>
            </div>
        </main>
    );
}

export default ErrorFallback;
