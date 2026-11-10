export default function QueryState({
    isLoading,
    error,
    loadingMessage = "Loading...",
    errorMessage = "Could not load data",
    className = "",
    variant = "card",
}) {
    const loadingStyles = {
        card: "rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-500 shadow-sm",
        inline: "py-4 text-sm text-stone-500",
        centered:
            "flex min-h-screen items-center justify-center bg-stone-50 text-stone-500",
    };
    const errorStyles = {
        card: "rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700",
        inline: "py-4 text-sm text-red-700",
        centered:
            "flex min-h-screen items-center justify-center bg-stone-50 text-red-600",
    };

    if (isLoading) {
        return (
            <div
                role="status"
                className={`${loadingStyles[variant]} ${className}`}
            >
                {loadingMessage}
            </div>
        );
    }

    if (error) {
        return (
            <div
                role="alert"
                className={`${errorStyles[variant]} ${className}`}
            >
                {errorMessage}: {error.message}
            </div>
        );
    }

    return null;
}
