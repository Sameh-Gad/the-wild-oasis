import { Stat } from "./Stat";
import { formatCurrency } from "../../utils/formatCurrency";

export function Stats({
    bookings = [],
    confirmedStays = [],
    numDays,
    cabinCount,
}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce(
        (acc, cur) => acc + (Number(cur.totalPrice) || 0),
        0,
    );
    const checkins = confirmedStays.length;
    const occupancy =
        numDays > 0 && cabinCount > 0
            ? confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
              (numDays * cabinCount)
            : 0;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
                title="Bookings"
                value={numBookings}
                icon="📅"
                color="#3b82f6"
            />
            <Stat
                title="Sales"
                value={formatCurrency(sales)}
                icon="💰"
                color="#10b981"
            />
            <Stat
                title="Check-ins"
                value={checkins}
                icon="🛎️"
                color="#f59e0b"
            />
            <Stat
                title="Occupancy rate"
                value={`${Math.round(occupancy * 100)}%`}
                icon="📈"
                color="#8b5cf6"
            />
        </div>
    );
}
