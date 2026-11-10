import { useState } from "react";

function GuestFlag({ countryFlag }) {
    const [hasError, setHasError] = useState(false);

    if (!countryFlag || hasError) {
        return <span aria-hidden="true">🌍</span>;
    }

    return (
        <img
            src={countryFlag}
            alt="Guest's country flag"
            className="h-6 w-8 object-contain"
            onError={() => setHasError(true)}
        />
    );
}

export default function GuestInfo({ guest, observations }) {
    const { fullName, email, countryFlag, nationalID } = guest ?? {};

    return (
        <>
            <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Guest information
                    </h2>
                </div>
                <div className="space-y-5 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-2xl">
                            <GuestFlag
                                key={countryFlag}
                                countryFlag={countryFlag}
                            />
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-stone-800">
                                {fullName ?? "Unknown guest"}
                            </p>
                            <p className="text-sm text-stone-500">Guest</p>
                        </div>
                    </div>
                    <div className="grid gap-5 border-t border-stone-100 pt-5 sm:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-sm text-stone-500">
                                Email address
                            </p>
                            <p className="font-medium text-stone-800">
                                {email ?? "No email available"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-stone-500">
                                National ID
                            </p>
                            <p className="font-medium text-stone-800">
                                {nationalID ?? "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Additional information
                    </h2>
                </div>
                <dl className="space-y-5 p-6">
                    <div className="space-y-1">
                        <dt className="text-sm text-stone-500">
                            Guest observations
                        </dt>
                        <dd className="text-sm leading-relaxed text-stone-700">
                            {observations?.trim() || "No special requests"}
                        </dd>
                    </div>
                </dl>
            </section>
        </>
    );
}
