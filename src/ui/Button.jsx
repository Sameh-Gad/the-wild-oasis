const variationStyles = {
    primary:
        "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600",

    secondary:
        "bg-stone-200 text-stone-800 hover:bg-stone-300 focus:ring-stone-400",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",

    dangerOutline:
        "border border-red-300 bg-white text-red-700 hover:bg-red-50 focus:ring-red-600",
};

export default function Button({
    children,
    onClick,
    disabled,
    variation = "primary",
    type = "button",
    className = "",
    ...buttonProps
}) {
    const variationClasses =
        variationStyles[variation] ?? variationStyles.primary;

    return (
        <button
            {...buttonProps}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variationClasses} ${className}`}
        >
            {children}
        </button>
    );
}
