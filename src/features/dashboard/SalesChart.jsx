import { useMemo } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";

export function SalesChart({ bookings = [], numDays }) {
    const data = useMemo(
        () =>
            Array.from({ length: numDays }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (numDays - 1 - i));

                const sameDayBookings = bookings.filter(
                    (b) =>
                        new Date(b.created_at).toDateString() ===
                        date.toDateString(),
                );

                return {
                    label: date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                    }),
                    totalSales: sameDayBookings.reduce(
                        (acc, cur) => acc + (Number(cur.totalPrice) || 0),
                        0,
                    ),
                    extrasSales: sameDayBookings.reduce(
                        (acc, cur) => acc + (Number(cur.extrasPrice) || 0),
                        0,
                    ),
                };
            }),
        [bookings, numDays],
    );

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-6 text-lg font-semibold text-stone-800">
                Sales from the last {numDays} days
            </h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid stroke="#e7e5e4" strokeDasharray="4 4" />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: "#78716c", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tickFormatter={formatCurrency}
                            tick={{ fill: "#78716c", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            width={72}
                        />
                        <Tooltip
                            formatter={(value, name) => [
                                formatCurrency(value),
                                name === "totalSales"
                                    ? "Total sales"
                                    : "Extras sales",
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalSales"
                            stroke="#059669"
                            fill="#a7f3d0"
                            fillOpacity={0.45}
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="extrasSales"
                            stroke="#0ea5e9"
                            fill="#bae6fd"
                            fillOpacity={0.35}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-stone-600">
                <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    Total sales
                </span>
                <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                    Extras sales
                </span>
            </div>
        </section>
    );
}
