import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import QueryState from "../../ui/QueryState";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinTable() {
    const { cabins, isPending, error } = useCabins();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("discount") || "all";
    const validSortOptions = [
        "name-asc",
        "name-desc",
        "regularPrice-asc",
        "regularPrice-desc",
        "maxCapacity-asc",
        "maxCapacity-desc",
    ];
    const requestedSortBy = searchParams.get("sortBy");
    const sortBy = validSortOptions.includes(requestedSortBy)
        ? requestedSortBy
        : "name-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    let filteredCabins;

    if (isPending || error) {
        return (
            <QueryState
                isLoading={isPending}
                error={error}
                loadingMessage="Loading cabins..."
                errorMessage="Error loading cabins"
            />
        );
    }

    if (!cabins?.length) {
        return (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-center text-sm text-stone-500">
                No cabins found
            </div>
        );
    }

    switch (filterValue) {
        case "all":
            filteredCabins = cabins;
            break;
        case "no-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
            break;
        case "with-discount":
            filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
            break;
        default:
            filteredCabins = cabins;
    }

    const sortedCabins = filteredCabins.toSorted((a, b) => {
        const firstValue = a[field];
        const secondValue = b[field];

        if (typeof firstValue === "string") {
            return (
                firstValue.localeCompare(secondValue, undefined, {
                    numeric: true,
                }) * modifier
            );
        }

        return (firstValue - secondValue) * modifier;
    });

    return (
        <Table columns="minmax(8rem, 1.2fr) minmax(6.5rem, 1fr) minmax(5rem, 0.8fr) minmax(5rem, 0.8fr) minmax(4.5rem, 0.65fr) minmax(20rem, 2.7fr)">
            <Table.Header>
                <span>Cabin</span>
                <span>Capacity</span>
                <span>Price</span>
                <span>Discount</span>
                <span className="text-center">Image</span>
                <span className="text-right">Actions</span>
            </Table.Header>

            <Table.Body
                data={sortedCabins}
                render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
            />
        </Table>
    );
}

export default CabinTable;
