export const useGetUserImage = defineStore("get-user-image", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  let userImage = ref("");

  const getUserImageUrl = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .list(`${user.value?.id}`, {
          limit: 10,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      userImage.value = data[0].name;
    } catch (error) {
      console.log(error);
    }
  };

  return { userImage, getUserImageUrl };
});
