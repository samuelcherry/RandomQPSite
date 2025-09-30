import supabase from "../../supabaseClient";

export const fetchUser = async () => {
  try {
    const { data: UserData, error: UserError } = await supabase
      .from("Users")
      .select("*");
    console.log(UserData);
    return UserData || [];
  } catch (error) {
    console.error(UserError);
    setError(UserError);
  }
};
