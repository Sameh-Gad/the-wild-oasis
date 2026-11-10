import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <button
                    type="button"
                    className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                    Add new cabin
                </button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddCabin;
