import usePost from "./fetch/usePost";
import useUserContext from "./useUserContext";

const useLogin = () => {
  const { dispatch } = useUserContext();
  const { postRequest, loading, error } = usePost();

  const login = async ({ email, password }) => {
    const payload = { email, password };

    const response = await postRequest("/user/login", payload);

    if (response) {
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("habitit-user", JSON.stringify(response.data));
      localStorage.setItem("browsed", JSON.stringify(true));
    }
  };

  return { login, loading, error };
};

export default useLogin;
