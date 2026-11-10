import { useUser } from "./useUser";

function UserAvatar() {
    const { user } = useUser();

    const { fullName, avatar } = user?.user_metadata ?? {};

    return (
        <div className="flex items-center gap-3">
            <img
                src={avatar || "/default-user.jpg"}
                alt={fullName || "User avatar"}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-stone-100"
            />

            <span className="text-sm font-medium text-stone-700">
                {fullName || user?.email}
            </span>
        </div>
    );
}

export default UserAvatar;
