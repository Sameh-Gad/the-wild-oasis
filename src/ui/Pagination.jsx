import { useSearchParams } from "react-router-dom";

import Button from "./Button";

import { getCurrentPage, PAGE_SIZE } from "../utils/paginationUtils";

export default function Pagination({ count }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (pageCount <= 1) return null;

    const currentPage = getCurrentPage(searchParams, pageCount);

    const from = (currentPage - 1) * PAGE_SIZE + 1;

    const to = currentPage === pageCount ? count : currentPage * PAGE_SIZE;

    function nextPage() {
        if (currentPage < pageCount) {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set("page", String(currentPage + 1));
            setSearchParams(nextParams);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set("page", String(currentPage - 1));
            setSearchParams(nextParams);
        }
    }

    return (
        <>
            <p className="text-sm text-stone-600">
                Showing{" "}
                <span className="font-semibold text-stone-800">{from}</span> to{" "}
                <span className="font-semibold text-stone-800">{to}</span> of{" "}
                <span className="font-semibold text-stone-800">{count}</span>{" "}
                results
            </p>

            <div className="flex items-center gap-2">
                <Button disabled={currentPage === 1} onClick={prevPage}>
                    Back
                </Button>

                <Button disabled={currentPage === pageCount} onClick={nextPage}>
                    Next
                </Button>
            </div>
        </>
    );
}
