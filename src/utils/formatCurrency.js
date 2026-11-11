const euroFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
});
const wholeEuroFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

export function formatCurrency(amount, options = {}) {
    const numericAmount = Number(amount);
    const formatter =
        options.maximumFractionDigits === undefined
            ? euroFormatter
            : options.maximumFractionDigits === 0
              ? wholeEuroFormatter
              : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EUR",
                    ...options,
                });

    return formatter.format(Number.isFinite(numericAmount) ? numericAmount : 0);
}
