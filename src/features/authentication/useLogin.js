import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);

            toast.success("Login successful");

            navigate("/dashboard", { replace: true });
        },

        onError: (error) => {
            console.error("Login failed:", error);
            toast.error("Unable to sign in. Please try again.");
        },
    });

    return {
        loginUser,
        isLoggingIn,
    };
}
