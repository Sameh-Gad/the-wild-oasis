import Button from "./Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-800">
                Delete {resourceName}?
            </h3>

            <p>
                Are you sure you want to delete this {resourceName} permanently?
                This action cannot be undone.
            </p>

            <div className="mt-4 flex justify-end gap-4">
                <Button
                    onClick={onCloseModal}
                    disabled={disabled}
                    variation="secondary"
                    type="button"
                >
                    Cancel
                </Button>

                <Button
                    onClick={onConfirm}
                    disabled={disabled}
                    variation="danger"
                    type="button"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default ConfirmDelete;
