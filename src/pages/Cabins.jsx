import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

export default function Cabins() {
    return (
        <div className="p-4 space-y-8">
            <header className="text-center">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                    Cabin management
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    The Wild Oasis <span aria-hidden="true">🌲</span>
                </h1>
            </header>

            <section className="mx-auto w-full max-w-6xl space-y-4">
                <div className="flex justify-end">
                    <AddCabin />
                </div>
                <CabinTableOperations />
                <CabinTable />
            </section>
        </div>
    );
}
