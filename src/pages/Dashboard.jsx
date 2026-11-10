import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                        Overview
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        Dashboard
                    </h1>
                </div>
                <DashboardFilter />
            </header>
            <DashboardLayout />
        </div>
    );
}
