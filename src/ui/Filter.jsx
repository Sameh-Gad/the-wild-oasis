import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options[0].value;

    function handleClick(value) {
        const nextParams = new URLSearchParams(searchParams);

        nextParams.set(filterField, value);
        nextParams.delete("page");

        setSearchParams(nextParams, { replace: true });
    }
    return (
        <div className="flex gap-1 rounded-lg border border-stone-200 bg-white p-1 shadow-xs">
            {options.map(({ value, label }) => (
                <button
                    key={value}
                    type="button"
                    disabled={currentFilter === value}
                    onClick={() => handleClick(value)}
                    className={`rounded px-2 py-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm ${
                        currentFilter === value
                            ? "bg-emerald-600 text-white"
                            : "text-stone-800 hover:bg-stone-100"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
