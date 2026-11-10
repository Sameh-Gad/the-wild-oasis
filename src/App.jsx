import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account.jsx";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                {import.meta.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}

                <Toaster position="top-center" gutter={12} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="account" element={<Account />} />
                        <Route path="users" element={<Users />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route
                            path="bookings/:bookingId"
                            element={<Booking />}
                        />
                    </Route>

                    <Route path="/login" element={<Login />} />

                    <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
