import Pagination from "../../ui/Pagination";
import QueryState from "../../ui/QueryState";
import Table from "../../ui/Table";

import { BookingRow } from "./BookingRow";
import { useBookings } from "./useBookings";

function BookingTable() {
    const { bookings, count, isPending, error } = useBookings();

    if (isPending || error) {
        return (
            <QueryState
                isLoading={isPending}
                error={error}
                loadingMessage="Loading bookings..."
                errorMessage="Error loading bookings"
            />
        );
    }

    if (!bookings.length) {
        return (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-center text-sm text-stone-500">
                No bookings found
            </div>
        );
    }

    return (
        <Table columns="minmax(4.5rem, 0.8fr) minmax(9.5rem, 1.8fr) minmax(10.5rem, 2.1fr) minmax(6.5rem, 1.2fr) minmax(4.5rem, 0.9fr) minmax(14.5rem, 2.8fr)">
            <Table.Header>
                <span>Cabin</span>
                <span>Guest</span>
                <span>Dates</span>
                <span>Status</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Actions</span>
            </Table.Header>

            <Table.Body
                data={bookings}
                render={(booking) => (
                    <BookingRow key={booking.id} booking={booking} />
                )}
            />

            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Table>
    );
}

export default BookingTable;
