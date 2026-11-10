import {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    useContext,
} from "react";

const TableContext = createContext();

function renderCells(children, role) {
    return Children.map(children, (child) =>
        isValidElement(child) ? (
            cloneElement(child, { role })
        ) : (
            <span role={role}>{child}</span>
        ),
    );
}

function Table({ columns, children }) {
    return (
        <TableContext.Provider value={{ columns }}>
            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                <div role="table" className="min-w-[58rem]">
                    {children}
                </div>
            </div>
        </TableContext.Provider>
    );
}

function Header({ children }) {
    const { columns } = useContext(TableContext);

    return (
        <header
            role="row"
            style={{ gridTemplateColumns: columns }}
            className="grid items-center gap-4 border-b border-stone-200 bg-stone-100 px-6 py-3 text-xs font-semibold tracking-wider text-stone-600 uppercase"
        >
            {renderCells(children, "columnheader")}
        </header>
    );
}

function Row({ children }) {
    const { columns } = useContext(TableContext);

    return (
        <div
            role="row"
            style={{ gridTemplateColumns: columns }}
            className="grid items-center gap-4 border-b border-stone-100 px-6 py-4 last:border-b-0"
        >
            {renderCells(children, "cell")}
        </div>
    );
}

function Footer({ children }) {
    return (
        <footer className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-6 py-3 empty:hidden">
            {children}
        </footer>
    );
}

function Body({ data, render }) {
    if (!data?.length) {
        return (
            <p className="p-6 text-center text-sm text-stone-500">
                No data to show at the moment
            </p>
        );
    }

    return (
        <section className="divide-y divide-stone-100">
            {data.map(render)}
        </section>
    );
}

Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
Table.Body = Body;
export default Table;
