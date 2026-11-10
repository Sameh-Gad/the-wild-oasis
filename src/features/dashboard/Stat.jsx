export function Stat({ title, value, icon, color }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-stone-500">{title}</p>
                <p className="text-2xl font-bold text-stone-800">{value}</p>
            </div>
        </div>
    );
}
