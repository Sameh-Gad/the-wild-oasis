import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import QueryState from "../../ui/QueryState";
import BookingActions from "./BookingActions";
import BookingInfo from "./BookingInfo";
import GuestInfo from "./GuestInfo";
import PaymentInfo from "./PaymentInfo";
import { useBooking } from "./useBooking";

const statusStyles = {
    unconfirmed: "bg-sky-100 text-sky-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    "checked-out": "bg-stone-200 text-stone-700",
};

function BookingDetail() {
    const { booking, isPending, error } = useBooking();
    const navigate = useNavigate();

    if (isPending || error) {
        return (
            <QueryState
                isLoading={isPending}
                error={error}
                loadingMessage="Loading booking..."
                errorMessage="Could not load booking"
            />
        );
    }

    return (
        <Modal>
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-stone-800">
                            Booking #{booking.id}
                        </h1>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[booking.status]}`}
                        >
                            {booking.status.replace("-", " ")}
                        </span>
                    </div>
                    <Button
                        variation="secondary"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        &larr; Back
                    </Button>
                </div>

                <BookingInfo booking={booking} />
                <GuestInfo
                    guest={booking.guests}
                    observations={booking.observations}
                />
                <PaymentInfo booking={booking} />
                <BookingActions booking={booking} />
            </div>
        </Modal>
    );
}

export default BookingDetail;
