export const usePutUpdateUserData = defineStore("update-user-data", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const updateUserAuth = async (newEmail?: string, newPassword?: string) => {
    if (newEmail) {
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) {
        throw error;
      }
      return;
    }

    if (newPassword) {
      const { error } = await supabase.auth.updateUser({ email: newPassword });

      if (error) {
        throw error;
      }
      return;
    }

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
      password: newPassword,
    });

    if (error) {
      throw error;
    }
  };

  const updateUserTable = async (
    userId?: string,
    userName?: string,
    userEmail?: string,
    userPassword?: string
  ) => {
    if (userName) {
      const { data, error } = await supabase
        .from("users")
        .update({ user_name: userName })
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return;
    }

    if (userEmail) {
      const { data, error } = await supabase
        .from("users")
        .update({ user_email: userEmail })
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return;
    }

    if (userPassword) {
      const { data, error } = await supabase
        .from("users")
        .update({ user_password: userPassword })
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return;
    }

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
