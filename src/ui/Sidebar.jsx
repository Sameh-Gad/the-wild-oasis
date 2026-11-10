import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/bookings", label: "Bookings" },
    { to: "/cabins", label: "Cabins" },
    { to: "/settings", label: "Settings" },
    { to: "/users", label: "Users" },
];

export default function Sidebar() {
    return (
        <aside className="flex flex-col gap-8 border-r border-stone-200 bg-white px-4 py-6">
            <img
                src="/logo-light.png"
                alt="The Wild Oasis"
                className="mx-auto h-20 w-auto"
            />

            <nav className="flex flex-col gap-2">
                {navItems.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center rounded-md px-4 py-3 text-sm transition-colors ${
                                isActive
                                    ? "bg-emerald-50 font-semibold text-emerald-700"
                                    : "text-stone-600 hover:bg-stone-100"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
