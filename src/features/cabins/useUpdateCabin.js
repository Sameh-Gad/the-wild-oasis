import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { mutate: updateCabin, isPending: isUpdating } = useMutation({
        mutationFn: updateCabinApi,

        onSuccess: ({ oldImageCleanupError }) => {
            toast.success("Cabin successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });

            if (oldImageCleanupError) {
                toast.error(
                    "Cabin was updated, but its previous image could not be removed",
                );
            }
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateCabin, isUpdating };
}
