import { useCabins } from "../cabins/useCabins";
import { DurationChart } from "./DurationChart";
import { TodayActivity } from "./TodayActivity";
import { Stats } from "./Stats";
import { SalesChart } from "./SalesChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import QueryState from "../../ui/QueryState";

export default function DashboardLayout() {
    const {
        bookings,
        isPending: isLoadingBookings,
        error: bookingsError,
        numDays,
    } = useRecentBookings();
    const {
        confirmedStays,
        isPending: isLoadingStays,
        error: staysError,
    } = useRecentStays();
    const {
        cabins,
        isPending: isLoadingCabins,
        error: cabinsError,
    } = useCabins();

    const error = bookingsError || staysError || cabinsError;
    if (isLoadingBookings || isLoadingStays || isLoadingCabins || error) {
        return (
            <QueryState
                isLoading={
                    isLoadingBookings || isLoadingStays || isLoadingCabins
                }
                error={error}
                loadingMessage="Loading dashboard..."
                errorMessage="Could not load dashboard"
            />
        );
    }

    return (
        <div className="space-y-6">
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DurationChart confirmedStays={confirmedStays} />
                <TodayActivity />
            </div>
            <SalesChart bookings={bookings} numDays={numDays} />
        </div>
    );
}
