import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

export function UpdatePasswordForm() {
    const { updateUser, isUpdating } = useUpdateUser();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    function onSubmit({ password }) {
        updateUser(
            { password },
            {
                onSuccess: () => reset(),
            },
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormRow
                label="Password"
                id="password"
                error={errors.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                        deps: ["passwordConfirm"],
                    })}
                />
            </FormRow>

            <FormRow
                label="Confirm password"
                id="passwordConfirm"
                error={errors.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues("password") ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <div className="flex justify-end">
                <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update password"}
                </Button>
            </div>
        </form>
    );
}
