import Button from "../../ui/Button";
import { useLogout } from "./useLogout";

export function Logout() {
    const { logout, isPending } = useLogout();

    return (
        <Button
            variation="secondary"
            disabled={isPending}
            onClick={() => logout()}
        >
            {isPending ? "Logging out..." : "Log out"}
        </Button>
    );
}
