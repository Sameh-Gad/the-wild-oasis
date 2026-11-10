const euroFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
});

export function formatCurrency(amount) {
    const numericAmount = Number(amount);
    return euroFormatter.format(
        Number.isFinite(numericAmount) ? numericAmount : 0,
    );
}
