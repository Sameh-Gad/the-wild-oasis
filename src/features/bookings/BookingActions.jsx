import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/formatCurrency";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

export default function BookingActions({ booking }) {
    const {
        id,
        status,
        numNights,
        numGuests,
        isPaid,
        guests,
        hasBreakfast,
        extrasPrice,
        totalPrice,
    } = booking;
    const { checkin, isCheckingIn } = useCheckin();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const {
        settings,
        isPending: isLoadingSettings,
        error: settingsError,
    } = useSettings();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const navigate = useNavigate();

    const optionalBreakfastPrice =
        (settings?.breakfastPrice ?? 0) * numNights * numGuests;
    const isPaidConfirmed = (isPaid && !addBreakfast) || confirmPaid;

    return (
        <>
            {status === "unconfirmed" && (
                <section className="space-y-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    {!hasBreakfast && (
                        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                            <label
                                htmlFor="add-breakfast"
                                className="flex items-start gap-3 text-sm leading-6 text-stone-700"
                            >
                                <input
                                    type="checkbox"
                                    id="add-breakfast"
                                    disabled={
                                        isCheckingIn ||
                                        isLoadingSettings ||
                                        Boolean(settingsError)
                                    }
                                    checked={addBreakfast}
                                    onChange={(event) => {
                                        setAddBreakfast(event.target.checked);
                                        if (event.target.checked)
                                            setConfirmPaid(false);
                                    }}
                                    className="mt-1 h-4 w-4 accent-emerald-600"
                                />
                                <span>
                                    Want to add breakfast for{" "}
                                    <span className="font-semibold text-stone-900">
                                        {formatCurrency(optionalBreakfastPrice)}
                                    </span>
                                    ?
                                </span>
                            </label>
                            {settingsError && (
                                <p
                                    role="alert"
                                    className="mt-2 text-sm text-red-700"
                                >
                                    Breakfast price could not be loaded:{" "}
                                    {settingsError.message}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <label
                            htmlFor="confirm-paid"
                            className="flex min-w-0 items-start gap-3 text-sm leading-6 text-stone-700"
                        >
                            <input
                                type="checkbox"
                                id="confirm-paid"
                                checked={isPaidConfirmed}
                                disabled={
                                    (isPaid && !addBreakfast) || isCheckingIn
                                }
                                onChange={(event) =>
                                    setConfirmPaid(event.target.checked)
                                }
                                className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                            />
                            <span>
                                I confirm that {guests?.fullName ?? "the guest"}{" "}
                                has paid the total amount of{" "}
                                {formatCurrency(
                                    addBreakfast
                                        ? totalPrice + optionalBreakfastPrice
                                        : totalPrice,
                                )}{" "}
                                for this booking.
                            </span>
                        </label>
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                disabled={isCheckingIn || !isPaidConfirmed}
                                onClick={() => {
                                    if (addBreakfast) {
                                        checkin({
                                            bookingId: id,
                                            breakfast: {
                                                hasBreakfast: true,
                                                extrasPrice:
                                                    extrasPrice +
                                                    optionalBreakfastPrice,
                                                totalPrice:
                                                    totalPrice +
                                                    optionalBreakfastPrice,
                                            },
                                        });
                                    } else {
                                        checkin({ bookingId: id });
                                    }
                                }}
                            >
                                {isCheckingIn
                                    ? "Checking in..."
                                    : `Check in booking #${id}`}
                            </Button>
                            <DeleteButton disabled={isDeleting} />
                        </div>
                    </div>
                </section>
            )}

            {status === "checked-in" && (
                <div className="flex justify-end gap-3 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    <Button
                        disabled={isCheckingOut}
                        onClick={() => checkout(id)}
                    >
                        {isCheckingOut
                            ? "Checking out..."
                            : `Check out booking #${id}`}
                    </Button>
                    <DeleteButton disabled={isDeleting} />
                </div>
            )}

            {status === "checked-out" && (
                <div className="flex justify-end rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    <DeleteButton disabled={isDeleting} />
                </div>
            )}

            <Modal.Window
                name="delete"
                label={`Delete booking #${id}`}
            >
                <ConfirmDelete
                    resourceName={`booking #${id}`}
                    disabled={isDeleting}
                    onConfirm={() =>
                        deleteBooking(id, {
                            onSuccess: () =>
                                navigate("/bookings", { replace: true }),
                        })
                    }
                />
            </Modal.Window>
        </>
    );
}

function DeleteButton({ disabled }) {
    return (
        <Modal.Open opens="delete">
            <Button variation="danger" disabled={disabled}>
                Delete
            </Button>
        </Modal.Open>
    );
}
