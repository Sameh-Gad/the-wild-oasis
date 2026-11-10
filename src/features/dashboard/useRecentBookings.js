import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const raw = Number(searchParams.get("last"));
    const numDays = [7, 30, 90].includes(raw) ? raw : 7;

    const isoDate = useMemo(() => {
        const queryDate = new Date();
        queryDate.setDate(queryDate.getDate() - numDays);
        return queryDate.toISOString();
    }, [numDays]);

    const {
        data: bookings,
        isPending,
        error,
    } = useQuery({
        queryKey: ["recent-bookings", numDays],
        queryFn: () => getBookingsAfterDate(isoDate),
    });

    return { bookings, isPending, error, numDays };
}
