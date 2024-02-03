export const useGetAllProducts = defineStore("get-all-products", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  let productsList = ref([]);

  const getAllProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    productsList.value.push(data[0]);

    console.log("Store value");
    console.log(productsList.value);
  };

  return { productsList, getAllProducts };
});
