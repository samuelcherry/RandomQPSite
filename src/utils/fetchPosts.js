import supabase from "../../supabaseClient";

export const fetchItems = async () => {
  try {
    const { data: fetchData, error: fetchError } = await supabase
      .from("ItemList")
      .select("*");
    return fetchData || [];
  } catch (error) {
    console.error(error);
    setError(error);
  }
};
