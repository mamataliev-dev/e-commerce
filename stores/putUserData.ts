export const usePutUserData = defineStore("put-user-data", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const updateUserAuth = async (newEmail: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
      password: newPassword,
    });

    if (error) {
      throw error;
    }
  };

  const updateUserTable = async (
    userId: string,
    userName: string,
    userEmail: string,
    userPassword: string
  ) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        user_name: userName,
        user_email: userEmail,
        user_password: userPassword,
      })
      .eq("user_id", userId);

    if (error) {
      throw error;
    }
  };

  return { updateUserAuth, updateUserTable };
});
