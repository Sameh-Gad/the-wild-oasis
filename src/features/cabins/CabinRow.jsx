import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CabinRow({ cabin }) {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    const { deleteCabin, isDeleting } = useDeleteCabin();
    const { createCabin, isCreating } = useCreateCabin();

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        <Modal>
            <Table.Row>
                <span className="font-semibold text-stone-800">{name}</span>

                <span className="text-sm text-stone-500">
                    {maxCapacity} guests
                </span>

                <span className="text-sm text-stone-500">
                    {formatCurrency(regularPrice)}
                </span>

                <span className="text-sm text-stone-500">
                    {discount > 0 ? (
                        <span className="font-medium text-green-600">
                            {formatCurrency(discount)}
                        </span>
                    ) : (
                        <span>&mdash;</span>
                    )}
                </span>

                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="mx-auto h-12 w-12 rounded-full object-cover ring-2 ring-stone-100"
                    />
                ) : (
                    <span className="text-center text-xs text-stone-400">
                        No image
                    </span>
                )}

                <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <Button
                        type="button"
                        disabled={isCreating}
                        variation="secondary"
                        onClick={handleDuplicate}
                    >
                        {isCreating ? "Copying..." : "Duplicate"}
                    </Button>

                    <Modal.Open opens="cabin-edit">
                        <Button variation="secondary">Edit</Button>
                    </Modal.Open>

                    <Modal.Window name="cabin-edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="cabin-delete">
                        <Button
                            type="button"
                            variation="danger"
                            disabled={isDeleting}
                        >
                            Delete
                        </Button>
                    </Modal.Open>

                    <Modal.Window name="cabin-delete">
                        <ConfirmDelete
                            resourceName={`cabin ${name}`}
                            onConfirm={() => deleteCabin(cabinId)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </div>
            </Table.Row>
        </Modal>
    );
}
