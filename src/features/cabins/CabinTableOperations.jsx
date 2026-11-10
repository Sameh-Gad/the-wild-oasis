import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <div className="flex items-center gap-4">
            <Filter
                filterField="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />
            <SortBy
                options={[
                    { value: "name-asc", label: "Name (A-Z)" },
                    { value: "name-desc", label: "Name (Z-A)" },
                    {
                        value: "regularPrice-asc",
                        label: "Regular price (low-high)",
                    },
                    {
                        value: "regularPrice-desc",
                        label: "Regular price (high-low)",
                    },
                    {
                        value: "maxCapacity-asc",
                        label: "Max capacity (low-high)",
                    },
                    {
                        value: "maxCapacity-desc",
                        label: "Max capacity (high-low)",
                    },
                ]}
            />
        </div>
    );
}

export default CabinTableOperations;
