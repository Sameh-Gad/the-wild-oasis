import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { formatCurrency } from "../../utils/formatCurrency";

const statusStyles = {
    unconfirmed: "bg-sky-100 text-sky-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    "checked-out": "bg-stone-200 text-stone-700",
};

export function BookingRow({ booking }) {
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const {
        id,
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests,
        cabins,
    } = booking;

    const guestName = guests?.fullName ?? "Unknown guest";
    const email = guests?.email ?? "No email";
    const cabinName = cabins?.name ?? "Unknown cabin";

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <Modal>
            <Table.Row>
                <div className="font-bold text-stone-800">{cabinName}</div>

                <div className="flex flex-col gap-1">
                    <span className="font-medium text-stone-700">
                        {guestName}
                    </span>
                    <span className="text-sm text-stone-500">{email}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm text-stone-700">
                        {numNights} night stay
                    </span>
                    <span className="text-xs text-stone-500">
                        {formatDate(startDate)} &ndash; {formatDate(endDate)}
                    </span>
                </div>

                <div>
                    <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[status]}`}
                    >
                        {status.replace("-", " ")}
                    </span>
                </div>

                <div className="font-semibold text-stone-800 text-right">
                    {formatCurrency(totalPrice)}
                </div>

                <div className="flex items-center justify-end gap-2">
                    {status === "checked-in" && (
                        <Button
                            disabled={isCheckingOut}
                            onClick={() => checkout(id)}
                            className="whitespace-nowrap px-3 text-sm"
                        >
                            {isCheckingOut ? "Checking out..." : "Check out"}
                        </Button>
                    )}

                    <Link
                        to={`/bookings/${id}`}
                        className="whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        See details
                    </Link>

                    <Modal.Open opens="delete">
                        <Button
                            variation="danger"
                            disabled={isDeleting}
                            className="whitespace-nowrap"
                        >
                            Delete
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName={`booking #${id}`}
                            disabled={isDeleting}
                            onConfirm={() => deleteBooking(id)}
                        />
                    </Modal.Window>
                </div>
            </Table.Row>
        </Modal>
    );
}
