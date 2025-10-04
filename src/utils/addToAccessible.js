import supabase from "../../supabaseClient";

export default async function updateAccessible(userId, tempArray) {
  console.log("updated triggered");
  try {
    const { data, error } = await supabase
      .from("Users")
      .update({ accessible: tempArray })
      .eq("id", userId)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return null;
    }
    console.log("Supabase update result:", data);
    return data;
  } catch (error) {
    console.error("Error updating accessible:", error);
    return null;
  }
}
