import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
    const [searchParams] = useSearchParams();
    const raw = Number(searchParams.get("last"));
    const numDays = [7, 30, 90].includes(raw) ? raw : 7;

    const isoDate = useMemo(() => {
        const queryDate = new Date();
        queryDate.setDate(queryDate.getDate() - numDays);
        return queryDate.toISOString();
    }, [numDays]);

    const {
        data: stays,
        isPending,
        error,
    } = useQuery({
        queryKey: ["stays", numDays],
        queryFn: () => getStaysAfterDate(isoDate),
    });

    const confirmedStays =
        stays?.filter(
            (stay) =>
                stay.status === "checked-in" || stay.status === "checked-out",
        ) ?? [];

    return { stays, confirmedStays, isPending, error, numDays };
}
