const baseClassName =
    "w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100";

export default function Input({
    as: Component = "input",
    className = "",
    ...props
}) {
    return (
        <Component
            className={`${baseClassName} ${className}`.trim()}
            {...props}
        />
    );
}
