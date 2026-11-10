const statusStyles = {
    unconfirmed: "bg-sky-100 text-sky-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    "checked-out": "bg-stone-200 text-stone-700",
};

export default function StatusBadge({ status }) {
    const normalizedStatus = String(status ?? "unknown");
    const styles =
        statusStyles[normalizedStatus] ?? "bg-stone-200 text-stone-700";

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase ${styles}`}
        >
            {normalizedStatus.replaceAll("-", " ")}
        </span>
    );
}
