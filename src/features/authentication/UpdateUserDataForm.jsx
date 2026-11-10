import { useRef, useState } from "react";

import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
    const { user } = useUser();
    const email = user?.email ?? "";
    const currentFullName = user?.user_metadata?.fullName ?? "";

    const [fullName, setFullName] = useState(currentFullName || "");
    const [avatar, setAvatar] = useState(null);

    const formRef = useRef(null);

    const { updateUser, isUpdating } = useUpdateUser();

    function handleSubmit(e) {
        e.preventDefault();

        updateUser(
            { fullName: fullName.trim(), avatar },
            {
                onSuccess: () => {
                    setAvatar(null);
                    formRef.current?.reset();
                },
            },
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >
            <FormRow label="Email address" id="email">
                <Input id="email" type="email" value={email} disabled />
            </FormRow>

            <FormRow label="Full name" id="fullName">
                <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Avatar image" id="avatar">
                <Input
                    id="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
                    disabled={isUpdating}
                    className="file:mr-4 file:rounded-md file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:font-medium"
                />
            </FormRow>

            <div className="flex justify-end">
                <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update account"}
                </Button>
            </div>
        </form>
    );
}

export default UpdateUserDataForm;
