export const useGetAllProductsImages = defineStore(
  "get-products-all-images",
  () => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    let productsImages = ref("");

    const getProductAllImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("product-images")
          .list(`${user.value?.id}`, {
            limit: 10,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        productsImages.value = data[0].name;
      } catch (error) {
        console.log(error);
      }
    };

    return { productsImages, getProductAllImages };
  }
);
