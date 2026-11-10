import { formatDate } from "../../utils/formatDate";
import { formatCount } from "../../utils/formatCount";

export default function BookingInfo({ booking }) {
    const { cabins, startDate, endDate, numNights, numGuests } = booking;

    return (
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-stone-800">
                    Booking information
                </h2>
            </div>
            <dl className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <dt className="text-sm text-stone-500">Cabin</dt>
                    <dd className="font-medium text-stone-800">
                        {cabins?.name ?? "Unknown cabin"}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-sm text-stone-500">Check-in</dt>
                    <dd className="font-medium text-stone-800">
                        {formatDate(startDate)}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-sm text-stone-500">Check-out</dt>
                    <dd className="font-medium text-stone-800">
                        {formatDate(endDate)}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-sm text-stone-500">Duration</dt>
                    <dd className="font-medium text-stone-800">
                        {formatCount(numNights, "night")}
                    </dd>
                </div>
                <div className="space-y-1">
                    <dt className="text-sm text-stone-500">Guests</dt>
                    <dd className="font-medium text-stone-800">
                        {formatCount(numGuests, "guest")}
                    </dd>
                </div>
            </dl>
        </section>
    );
}
