import supabase from "../../supabaseClient";

export const fetchUser = async () => {
  try {
    const { data: UserData, error: UserError } = await supabase
      .from("Users")
      .select("*");
    return UserData || [];
  } catch (UserError) {
    console.error(UserError);
    setError(UserError);
  }
};
