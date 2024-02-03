export const useGetProductById = defineStore("get-product-by-id", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  let productDate: any[] = [];

  const getProductById = async (id: string | null) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", id);

    if (error) throw error;

    productDate.push(data[0]);
  };

  return { productDate, getProductById };
});
