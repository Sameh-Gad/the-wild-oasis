import supabase from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
}

async function uploadCabinImage(image) {
    const imageExtension = image.name.split(".").pop();
    const imageName = `${crypto.randomUUID()}.${imageExtension}`;
    const { error } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, image);

    if (error) {
        console.error(error);
        throw new Error("Cabin image could not be uploaded");
    }

    const imagePath = supabase.storage
        .from("cabin-images")
        .getPublicUrl(imageName).data.publicUrl;

    return { imageName, imagePath };
}

export async function createCabin(newCabin) {
    const isImageUrl = typeof newCabin.image === "string";

    let imageName;
    let imagePath = newCabin.image;

    if (!isImageUrl) {
        ({ imageName, imagePath } = await uploadCabinImage(newCabin.image));
    }

    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        if (!isImageUrl) {
            const { error: cleanupError } = await supabase.storage
                .from("cabin-images")
                .remove([imageName]);

            if (cleanupError) {
                console.error(
                    "Uploaded image could not be removed:",
                    cleanupError,
                );
            }
        }

        console.error(error);
        throw new Error("Cabin could not be created");
    }

    return data;
}

export async function updateCabin({ id, image, ...updatedCabin }) {
    const { data: currentCabin, error: currentCabinError } = await supabase
        .from("cabins")
        .select("image")
        .eq("id", id)
        .maybeSingle();

    if (currentCabinError) {
        console.error(currentCabinError);
        throw new Error("Cabin could not be loaded for update");
    }

    if (!currentCabin) {
        throw new Error(
            "Cabin was not found or you do not have permission to update it",
        );
    }

    const isImageUrl = typeof image === "string";
    let imageName = null;
    let imagePath = image;

    if (!isImageUrl) {
        ({ imageName, imagePath } = await uploadCabinImage(image));
    }

    const { data, error } = await supabase
        .from("cabins")
        .update({ ...updatedCabin, image: imagePath })
        .eq("id", id)
        .select();
    if (error || !data?.length) {
        if (!isImageUrl) {
            const { error: cleanupError } = await supabase.storage
                .from("cabin-images")
                .remove([imageName]);

            if (cleanupError) {
                console.error(
                    "Uploaded image could not be removed:",
                    cleanupError,
                );
            }
        }
        if (error) {
            console.error(error);
            throw new Error("Cabin could not be updated");
        }

        console.error("Cabin update did not affect any rows");
        throw new Error(
            "Cabin was not found or you do not have permission to update it",
        );
    }

    const oldImageMarker = "/storage/v1/object/public/cabin-images/";
    const oldImageName = currentCabin.image?.includes(oldImageMarker)
        ? decodeURIComponent(
              currentCabin.image.split(oldImageMarker)[1].split("?")[0],
          )
        : null;

    let oldImageCleanupError = null;

    if (oldImageName && currentCabin.image !== imagePath) {
        const { error: removalError } = await supabase.storage
            .from("cabin-images")
            .remove([oldImageName]);

        if (removalError) {
            console.error(
                "Cabin was updated, but its old image could not be removed:",
                removalError,
            );
            oldImageCleanupError = removalError;
        }
    }

    return { data, oldImageCleanupError };
}
