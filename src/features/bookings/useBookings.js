import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

import { getCurrentPage } from "../../utils/paginationUtils";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const rawFilterValue = searchParams.get("status");
    const filterValue = ["unconfirmed", "checked-in", "checked-out"].includes(
        rawFilterValue,
    )
        ? rawFilterValue
        : null;

    const filter = useMemo(
        () =>
            !filterValue || filterValue === "all"
                ? null
                : { field: "status", value: filterValue },
        [filterValue],
    );

    const rawSortBy = searchParams.get("sortBy");
    const sortByRaw = [
        "startDate-asc",
        "startDate-desc",
        "totalPrice-asc",
        "totalPrice-desc",
    ].includes(rawSortBy)
        ? rawSortBy
        : "startDate-desc";

    const sortBy = useMemo(() => {
        const [field, direction] = sortByRaw.split("-");
        return { field, direction };
    }, [sortByRaw]);

    const page = getCurrentPage(searchParams);

    const {
        data: queryData,
        isPending,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
        placeholderData: keepPreviousData,
    });

    const bookings = queryData?.data ?? [];

    return {
        bookings,
        count: queryData?.count ?? 0,
        isPending,
        error,
    };
}
