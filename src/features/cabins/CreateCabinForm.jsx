import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
    const isEditSession = Boolean(cabinToEdit);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            discount: 0,
            ...(isEditSession && {
                name: cabinToEdit.name,
                maxCapacity: cabinToEdit.maxCapacity,
                regularPrice: cabinToEdit.regularPrice,
                discount: cabinToEdit.discount,
                description: cabinToEdit.description,
            }),
        },
    });

    const { createCabin, isCreating } = useCreateCabin();
    const { updateCabin, isUpdating } = useUpdateCabin();

    const isWorking = isCreating || isUpdating;

    function onSubmit(data) {
        const image = data.image?.[0] || cabinToEdit?.image;

        if (isEditSession) {
            updateCabin(
                {
                    ...data,
                    id: cabinToEdit.id,
                    image,
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                },
            );
        } else {
            createCabin(
                {
                    ...data,
                    image,
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                },
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-bold text-stone-800">
                {isEditSession ? "Edit cabin" : "Create new cabin"}
            </h2>

            <FormRow label="Cabin name" id="name" error={errors.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                id="maxCapacity"
                error={errors.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                        validate: (value) =>
                            Number.isInteger(value) ||
                            "Capacity must be a whole number",
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                id="regularPrice"
                error={errors.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        valueAsNumber: true,
                        deps: ["discount"],
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Discount"
                id="discount"
                error={errors.discount?.message}
            >
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "Discount cannot be negative",
                        },
                        validate: (value) => {
                            const regularPrice = getValues("regularPrice");

                            if (!Number.isFinite(regularPrice)) {
                                return true;
                            }

                            return (
                                value < regularPrice ||
                                "Discount should be less than regular price"
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Description"
                id="description"
                error={errors.description?.message}
            >
                <Input
                    as="textarea"
                    id="description"
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Cabin photo"
                id="image"
                error={errors.image?.message}
            >
                <Input
                    type="file"
                    id="image"
                    disabled={isWorking}
                    accept="image/*"
                    className="file:mr-3 file:rounded file:border-0 file:bg-stone-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />

                {isEditSession && (
                    <p className="text-sm text-stone-500">
                        If you want to change the image, please upload a new one
                    </p>
                )}
            </FormRow>

            <Button
                type="submit"
                disabled={isWorking}
                className="mt-2 self-start"
            >
                {isWorking
                    ? isEditSession
                        ? "Updating..."
                        : "Creating..."
                    : isEditSession
                      ? "Update cabin"
                      : "Create cabin"}
            </Button>
        </form>
    );
}

export default CreateCabinForm;
