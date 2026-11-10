import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

export function SignupForm() {
    const { signup, isPending } = useSignup();
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    function onSubmit({ fullName, email, password }) {
        signup({ fullName, email, password }, { onSettled: () => reset() });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
        >
            <FormRow
                label="Full name"
                id="fullName"
                error={errors.fullName?.message}
            >
                <Input
                    type="text"
                    id="fullName"
                    autoComplete="name"
                    disabled={isPending}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Email address"
                id="email"
                error={errors.email?.message}
            >
                <Input
                    type="email"
                    id="email"
                    autoComplete="email"
                    disabled={isPending}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password"
                id="password"
                error={errors.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    disabled={isPending}
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
                    disabled={isPending}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues("password") ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <div className="flex justify-end gap-3">
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isPending}
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating user..." : "Create new user"}
                </Button>
            </div>
        </form>
    );
}
