import supabase from "../../supabaseClient";

export const fetchItems = async () => {
  try {
    const batchSize = 1000;
    let allItems = [];
    let start = 0;
    let moreData = true;

    while (moreData) {
      const { data, error } = await supabase
        .from("ItemList")
        .select("id,title,icon,requires", { count: "exact" })
        .range(start, start + batchSize - 1);

      if (error) {
        console.error("Supabase fetch error:", error);
        break;
      }

      if (data.length === 0) {
        moreData = false;
      } else {
        allItems = allItems.concat(data);
        start += batchSize;
        if (data.length < batchSize) moreData = false;
      }
    }
    return allItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};
