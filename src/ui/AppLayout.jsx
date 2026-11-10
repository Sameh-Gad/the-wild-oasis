import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import QueryState from "./QueryState";
import Sidebar from "./Sidebar";

function AppLayout() {
    return (
        <div className="min-h-screen bg-stone-50 md:grid md:grid-cols-[16rem_1fr]">
            <Sidebar />

            <div className="flex min-w-0 flex-col">
                <Header />
                <main className="min-w-0 px-4 py-8 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-7xl">
                        <Suspense
                            fallback={
                                <QueryState
                                    isLoading
                                    loadingMessage="Loading page..."
                                />
                            }
                        >
                            <Outlet />
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
