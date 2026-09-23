import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

type ImageFolder = "shop" | "food";

export const GetStoragePathFromUrl = (publicUrl: string) => {
  if (!publicUrl) return null;

  const parts = publicUrl.split("/Shop_img/");
  if (parts.length > 1) {
    return parts[1].split("?")[0];
  }
  return null;
};

export const RemoveImg = async (logoUrl: string) => {
  const filePath = GetStoragePathFromUrl(logoUrl);

  if (!filePath) {
    console.warn("The storage path could not be found from the specified URL.");
    return;
  }

  const { data, error } = await supabase.storage
    .from("Shop_img")
    .remove([filePath]);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return data;
};

export const UploadImg = async (img: File, folder: ImageFolder) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const fileName = `${user.id}/${folder}/${uuidv4()}-${img.name}`;

  const { error } = await supabase.storage
    .from("Shop_img")
    .upload(fileName, img, {
      cacheControl: "3600",
      upsert: false,
      contentType: img.type,
    });

  if (error) {
    console.error("Supabase Storage Error:", error);
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("Shop_img").getPublicUrl(fileName);

  return publicUrl;
};
