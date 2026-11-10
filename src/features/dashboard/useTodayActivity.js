import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const {
        data: activities,
        isPending,
        error,
    } = useQuery({
        queryKey: ["today-activity"],
        queryFn: getStaysTodayActivity,
    });

    return { activities, isPending, error };
}
