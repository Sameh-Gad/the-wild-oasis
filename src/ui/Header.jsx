import { Link } from "react-router-dom";
import { Logout } from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";

export default function Header() {
    return (
        <header className="flex items-center justify-end gap-4 border-b border-stone-200 bg-white px-6 py-3">
            <UserAvatar />
            <Link
                to="/account"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
            >
                Account
            </Link>
            <Logout />
        </header>
    );
}
