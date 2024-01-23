export const useGetUserData = defineStore("get-user-data", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  let userData = ref([]);

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.value.id);

    if (error) {
      throw error;
    }

    console.log(user.value.id);

    userData.value.push(data[0]);
    return userData;
  };

  return { userData, getUserData };
});
