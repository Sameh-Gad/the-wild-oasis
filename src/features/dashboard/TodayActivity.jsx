import { Link } from "react-router-dom";
import QueryState from "../../ui/QueryState";
import { useCheckout } from "../bookings/useCheckout";
import { useTodayActivity } from "./useTodayActivity";

export function TodayActivity() {
    const { activities = [], isPending, error } = useTodayActivity();
    const { checkout, isCheckingOut } = useCheckout();

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-stone-800">Today</h2>
            {isPending || error ? (
                <QueryState
                    isLoading={isPending}
                    error={error}
                    loadingMessage="Loading today's activity..."
                    errorMessage="Could not load today's activity"
                    variant="inline"
                />
            ) : activities.length > 0 ? (
                <ul className="divide-y divide-stone-100">
                    {activities.map((activity) => {
                        const isArriving = activity.status === "unconfirmed";

                        return (
                            <li
                                key={activity.id}
                                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            isArriving
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {isArriving ? "Arriving" : "Departing"}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-stone-800">
                                            {activity.guests?.fullName ??
                                                "Unknown guest"}
                                        </p>
                                        <p className="text-sm text-stone-500">
                                            {activity.numNights}{" "}
                                            {activity.numNights === 1
                                                ? "night"
                                                : "nights"}
                                        </p>
                                    </div>
                                </div>
                                {isArriving ? (
                                    <Link
                                        to={`/bookings/${activity.id}`}
                                        className="shrink-0 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                                    >
                                        Check in
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={isCheckingOut}
                                        onClick={() => checkout(activity.id)}
                                        className="shrink-0 text-sm font-medium text-blue-700 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isCheckingOut
                                            ? "Checking out..."
                                            : "Check out"}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="py-4 text-sm text-stone-500">
                    No activity today.
                </p>
            )}
        </section>
    );
}
