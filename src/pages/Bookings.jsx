import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

export default function Bookings() {
    return (
        <div className="space-y-8">
            <header className="border-b border-stone-200 pb-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                    Reservations
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    Bookings
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
                    Review guest details, stay dates, and the status of each
                    reservation.
                </p>
            </header>

            <section aria-label="All bookings" className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">
                        All reservations
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                        Booking details and payment amounts
                    </p>
                </div>
                <BookingTableOperations />
                <BookingTable />
            </section>
        </div>
    );
}
