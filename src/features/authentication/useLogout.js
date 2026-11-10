import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,

        onSuccess: () => {
            queryClient.clear();

            toast.success("Logged out successfully");

            navigate("/login", { replace: true });
        },

        onError: (error) => {
            console.error("Logout error:", error);

            // Local session may already be cleared by Supabase
            queryClient.clear();

            toast.error(
                "Signed out locally, but server revocation could not be confirmed.",
            );

            navigate("/login", { replace: true });
        },
    });

    return {
        logout,
        isPending,
    };
}
