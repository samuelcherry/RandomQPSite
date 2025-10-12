import supabase from "../../supabaseClient";

export const fetchQuests = async () => {
  try {
    const { data: fetchData, error: fetchError } = await supabase
      .from("Quests")
      .select("*");
    return fetchData || [];
  } catch (error) {
    console.error(error);
    setError(error);
  }
};
