import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const queryClient = useQueryClient();

    const { mutate: checkin, isPending: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast = {} }) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
                ...breakfast,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["today-activity"] });
            queryClient.invalidateQueries({ queryKey: ["stays"] });
            queryClient.invalidateQueries({
                queryKey: ["booking", String(data.id)],
            });

            toast.success(`Check-in successful for booking ${data.id}`);
        },
        onError: (error) => {
            toast.error(`Check-in failed: ${error.message}`);
        },
    });

    return {
        checkin,
        isCheckingIn,
    };
}
