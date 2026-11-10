function FormRow({ label, id, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-stone-700">
                {label}
            </label>

            {children}

            {error && (
                <span role="alert" className="text-xs font-medium text-red-600">
                    {error}
                </span>
            )}
        </div>
    );
}

export default FormRow;
