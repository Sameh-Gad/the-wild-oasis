import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const startData = [
    { duration: "1 night", value: 0, color: "#ef4444" },
    { duration: "2 nights", value: 0, color: "#f97316" },
    { duration: "3 nights", value: 0, color: "#eab308" },
    { duration: "4-5 nights", value: 0, color: "#84cc16" },
    { duration: "6-7 nights", value: 0, color: "#22c55e" },
    { duration: "8+ nights", value: 0, color: "#14b8a6" },
];

function getDurationLabel(nights) {
    if (nights === 1) return "1 night";
    if (nights === 2) return "2 nights";
    if (nights === 3) return "3 nights";
    if (nights <= 5) return "4-5 nights";
    if (nights <= 7) return "6-7 nights";
    return "8+ nights";
}

export function DurationChart({ confirmedStays = [] }) {
    const data = confirmedStays
        .reduce(
            (counts, stay) => {
                const nights = Number(stay.numNights);
                if (!Number.isInteger(nights) || nights < 1) return counts;

                const duration = getDurationLabel(nights);

                const category = counts.find(
                    (item) => item.duration === duration,
                );
                category.value += 1;
                return counts;
            },
            startData.map((item) => ({ ...item })),
        )
        .filter((item) => item.value > 0);

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-stone-800">
                Stay duration summary
            </h2>
            {data.length > 0 ? (
                <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="duration"
                                cx="35%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={3}
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.duration}
                                        fill={entry.color}
                                        stroke={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="middle"
                                align="right"
                                layout="vertical"
                                iconSize={10}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex h-60 items-center justify-center text-sm text-stone-500">
                    No confirmed stays to summarize yet.
                </div>
            )}
        </section>
    );
}
