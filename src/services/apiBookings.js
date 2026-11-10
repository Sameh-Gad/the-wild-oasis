import { PAGE_SIZE } from "../utils/paginationUtils";
import supabase from "./supabase";

// Fallback: used only when the requested range is invalid.
async function getBookingsCount({ filter } = {}) {
    let query = supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

    if (filter) {
        query = query.eq(filter.field, filter.value);
    }

    const { count, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings count could not be loaded");
    }

    return count ?? 0;
}

export async function getBookings({ filter, sortBy, page = 1 } = {}) {
    async function fetchPage(pageNumber) {
        let query = supabase
            .from("bookings")
            .select(
                "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
                { count: "exact" },
            );

        if (filter) {
            query = query.eq(filter.field, filter.value);
        }

        if (sortBy) {
            query = query.order(sortBy.field, {
                ascending: sortBy.direction === "asc",
            });
        }

        query = query.order("id", { ascending: true });

        const from = (pageNumber - 1) * PAGE_SIZE;
        return query.range(from, from + PAGE_SIZE - 1);
    }

    const { data, error, count } = await fetchPage(page);

    if (!error) {
        return { data, count: count ?? 0 };
    }

    if (error.code === "PGRST103") {
        const fallbackCount = await getBookingsCount({ filter });
        const lastPage = Math.ceil(fallbackCount / PAGE_SIZE);

        if (lastPage > 0) {
            const fallbackPage = Math.min(page, lastPage);
            const fallback = await fetchPage(fallbackPage);

            if (!fallback.error) {
                return {
                    data: fallback.data,
                    count: fallback.count ?? fallbackCount,
                };
            }

            console.error(fallback.error);
            throw new Error("Bookings could not be loaded");
        }

        return { data: [], count: fallbackCount };
    }

    console.error(error);
    throw new Error("Bookings could not be loaded");
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);

        if (error.code === "PGRST116") {
            throw new Error("Booking not found");
        }

        throw new Error("Could not load booking. Please try again.");
    }

    return data;
}

export async function updateBooking(id, obj) {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Could not update booking. Please try again.");
    }

    return data;
}

export async function deleteBooking(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Could not delete booking. Please try again.");
    }
}

export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extrasPrice")
        .gte("created_at", date)
        .lte("created_at", new Date().toISOString());

    if (error) {
        console.error(error);
        throw new Error("Could not get bookings after date");
    }
    return data;
}

export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("* , guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", new Date().toISOString());

    if (error) {
        console.error(error);
        throw new Error("Could not get stays after date");
    }
    return data;
}

export async function getStaysTodayActivity() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.gte.${todayStart.toISOString()},startDate.lte.${todayEnd.toISOString()}),and(status.eq.checked-in,endDate.gte.${todayStart.toISOString()},endDate.lte.${todayEnd.toISOString()})`,
        )
        .order("created_at");

    if (error) {
        console.error(error);
        throw new Error("Today's activity could not be loaded");
    }

    return data;
}
