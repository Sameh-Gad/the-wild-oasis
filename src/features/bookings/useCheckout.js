import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
    const queryClient = useQueryClient();

    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["today-activity"] });
            queryClient.invalidateQueries({ queryKey: ["stays"] });

            queryClient.invalidateQueries({
                queryKey: ["booking", String(data.id)],
            });

            toast.success(`Checkout successful for booking ${data.id}`);
        },

        onError: (error) => {
            toast.error(`Checkout failed: ${error.message}`);
        },
    });

    return {
        checkout,
        isCheckingOut,
    };
}
