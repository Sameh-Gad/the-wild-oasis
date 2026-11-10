export const PAGE_SIZE = 10;

export function getCurrentPage(searchParams, pageCount = Infinity) {
    const pageParam = searchParams.get("page");
    const parsedPage = Number(pageParam);

    if (pageParam === null || !Number.isInteger(parsedPage) || parsedPage < 1) {
        return 1;
    }

    return Math.min(parsedPage, pageCount);
}
