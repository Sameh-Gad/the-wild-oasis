import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import QueryState from "../../ui/QueryState";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

export default function UpdateSettingsForm() {
    const { settings, isPending, error } = useSettings();
    const { updateSettings, isUpdating } = useUpdateSettings();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        values: settings
            ? {
                  minBookingLength: settings.minBookingLength,
                  maxBookingLength: settings.maxBookingLength,
                  maxGuestsPerBooking: settings.maxGuestsPerBooking,
                  breakfastPrice: settings.breakfastPrice,
              }
            : undefined,
    });

    if (isPending || error) {
        return (
            <QueryState
                isLoading={isPending}
                error={error}
                loadingMessage="Loading settings..."
                errorMessage="Could not load settings"
            />
        );
    }

    function onSubmit(data) {
        updateSettings({ id: settings.id, ...data });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
        >
            <FormRow
                label="Minimum booking length"
                id="minBookingLength"
                error={errors.minBookingLength?.message}
            >
                <Input
                    type="number"
                    id="minBookingLength"
                    min="1"
                    disabled={isUpdating}
                    {...register("minBookingLength", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: { value: 1, message: "Must be at least 1" },
                        deps: ["maxBookingLength"],
                        validate: (value) =>
                            Number.isInteger(value) || "Must be a whole number",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum booking length"
                id="maxBookingLength"
                error={errors.maxBookingLength?.message}
            >
                <Input
                    type="number"
                    id="maxBookingLength"
                    min="1"
                    disabled={isUpdating}
                    {...register("maxBookingLength", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: { value: 1, message: "Must be at least 1" },
                        validate: {
                            wholeNumber: (value) =>
                                Number.isInteger(value) ||
                                "Must be a whole number",
                            minimumLength: (value) =>
                                value >= getValues("minBookingLength") ||
                                "Must be at least the minimum booking length",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum guests per booking"
                id="maxGuestsPerBooking"
                error={errors.maxGuestsPerBooking?.message}
            >
                <Input
                    type="number"
                    id="maxGuestsPerBooking"
                    min="1"
                    disabled={isUpdating}
                    {...register("maxGuestsPerBooking", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: { value: 1, message: "Must be at least 1" },
                        validate: (value) =>
                            Number.isInteger(value) || "Must be a whole number",
                    })}
                />
            </FormRow>

            <FormRow
                label="Breakfast price"
                id="breakfastPrice"
                error={errors.breakfastPrice?.message}
            >
                <Input
                    type="number"
                    id="breakfastPrice"
                    min="0"
                    step="0.01"
                    disabled={isUpdating}
                    {...register("breakfastPrice", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Cannot be negative" },
                    })}
                />
            </FormRow>

            <Button
                type="submit"
                disabled={isUpdating || !isDirty}
                className="self-start"
            >
                {isUpdating ? "Saving..." : "Save settings"}
            </Button>
        </form>
    );
}
