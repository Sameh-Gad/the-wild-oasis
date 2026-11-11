import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const raw = Number(searchParams.get("last"));
    const numDays = [7, 30, 90].includes(raw) ? raw : 7;

    const {
        data: recentBookings,
        isPending,
        error,
    } = useQuery({
        queryKey: ["recent-bookings", numDays],
        queryFn: async () => {
            const referenceTime = new Date();
            const queryDate = new Date(referenceTime);
            queryDate.setHours(0, 0, 0, 0);
            queryDate.setDate(queryDate.getDate() - numDays);

            const bookings = await getBookingsAfterDate(
                queryDate.toISOString(),
            );

            return { bookings, referenceTime: referenceTime.toISOString() };
        },
    });

    const { bookings, referenceTime } = recentBookings ?? {};

    return { bookings, referenceTime, isPending, error, numDays };
}
