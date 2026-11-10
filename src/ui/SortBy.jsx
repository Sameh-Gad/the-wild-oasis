import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || options[0].value;

    function handleChange(event) {
        searchParams.set("sortBy", event.target.value);
        searchParams.delete("page");
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <select
            className="rounded-lg border border-stone-200 bg-white p-1 shadow-xs"
            value={sortBy}
            onChange={handleChange}
        >
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}
