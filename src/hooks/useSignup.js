import usePost from "./fetch/usePost";
import useUserContext from "./useUserContext";

const useSignup = () => {
  const { dispatch } = useUserContext();
  const { postRequest, loading, error } = usePost();

  const signup = async ({ name, email, password }) => {
    const payload = { name, email, password };

    const response = await postRequest("/user/signup", payload);

    if (response) {
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("habitit-user", JSON.stringify(response.data));
      localStorage.setItem("browsed", JSON.stringify(true));
    }
  };

  return { signup, loading, error };
};

export default useSignup;
