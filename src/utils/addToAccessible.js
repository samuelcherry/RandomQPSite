import supabase from "../../supabaseClient";

export async function updateAccessible(userId, tempArray) {
  try {
    const { data, error } = await supabase
      .from(users)
      .update({ accessible: tempArray })
      .eq("id", userId)
      .select();
  } catch (error) {
    console.error("Error updating accessible:", error);
    return null;
  }

  return data;
}
