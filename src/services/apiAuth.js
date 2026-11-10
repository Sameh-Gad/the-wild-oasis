import supabase from "./supabase";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    if (!sessionData.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw error;
}

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw error;
    return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Get current authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);

    let user = userData.user;

    if (!user) {
        throw new Error("You must be logged in to update your account.");
    }

    // 2. Upload avatar if provided
    let avatarUrl;

    if (avatar) {
        const fileName = `avatar-${user.id}-${crypto.randomUUID()}`;

        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(fileName, avatar, {
                contentType: avatar.type,
            });

        if (uploadError) throw new Error(uploadError.message);

        const {
            data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);

        avatarUrl = publicUrl;
    }

    // 3. Prepare user data
    const updateData = {};

    if (password) updateData.password = password;

    if (fullName || avatarUrl) {
        updateData.data = {
            ...(user.user_metadata ?? {}),
            ...(fullName ? { fullName } : {}),
            ...(avatarUrl ? { avatar: avatarUrl } : {}),
        };
    }

    // 4. Update user in Supabase Auth
    if (Object.keys(updateData).length === 0) {
        return { user };
    }

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    return data;
}
