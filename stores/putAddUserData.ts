export const usePutAddUserDate = defineStore("add-user-data", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  let userObj = reactive({
    name: "",
    email: "",
    password: "",
  });

  const saveUserData = (name: string, email: string, password: string) => {
    userObj = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(toRaw(userObj)));
  };

  const addUserData = async () => {
    try {
      if (user.value) {
        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);

        const { data, error } = await supabase.from("users").insert([
          {
            user_id: user.value?.id,
            user_name: userData.name,
            user_email: userData.email,
            user_password: userData.password,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addUserData, saveUserData };
});
