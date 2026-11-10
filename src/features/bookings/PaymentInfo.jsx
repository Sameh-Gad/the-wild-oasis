import { formatCurrency } from "../../utils/formatCurrency";

export default function PaymentInfo({ booking }) {
    const { cabinPrice, extrasPrice, totalPrice, isPaid, hasBreakfast } =
        booking;

    return (
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-stone-800">
                    Payment information
                </h2>
            </div>
            <dl className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-stone-500">Cabin price</dt>
                    <dd className="font-medium text-stone-800">
                        {formatCurrency(cabinPrice)}
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-stone-500">Extras price</dt>
                    <dd className="font-medium text-stone-800">
                        {formatCurrency(extrasPrice)}
                    </dd>
                </div>
                <div className="flex items-center justify-between border-t border-stone-100 pt-5">
                    <dt className="font-semibold text-stone-800">
                        Total price
                    </dt>
                    <dd className="text-xl font-bold text-stone-800">
                        {formatCurrency(totalPrice)}
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-stone-500">
                        Breakfast included
                    </dt>
                    <dd className="font-medium text-stone-800">
                        {hasBreakfast ? "Yes" : "No"}
                    </dd>
                </div>
                <div
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                        isPaid
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                    }`}
                >
                    <span className="text-sm font-medium">Payment status</span>
                    <span className="text-sm font-bold">
                        {isPaid ? "Paid" : "Will pay at property"}
                    </span>
                </div>
            </dl>
        </section>
    );
}
