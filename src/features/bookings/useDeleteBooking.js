import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
            queryClient.invalidateQueries({ queryKey: ["stays"] });
            queryClient.invalidateQueries({ queryKey: ["today-activity"] });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { deleteBooking, isDeleting };
}
