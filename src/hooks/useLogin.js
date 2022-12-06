import { toast } from "react-toastify";
import usePost from "./fetch/usePost";
import useUserContext from "./useUserContext";

const useLogin = () => {
  const { dispatch } = useUserContext();
  const { postRequest, loading, error } = usePost();

  const login = async ({ email, password }) => {
    const payload = { email, password };
    let response;
    // setTimeout(() => {
    //   if (!response) {
    //     toast.info(
    //       "Please wait. We are using the free plan of render.com which is automatically spun down after 15 minutes of inactivity. So it takes some time to start the server again.",
    //       { autoClose: 8000 }
    //     );
    //   }
    // }, 3000);
    response = await postRequest("/user/login", payload);
    // console.log({ response });
    if (response) {
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("habitit-user", JSON.stringify(response.data));
      localStorage.setItem("browsed", JSON.stringify(true));
    }
  };

  return { login, loading, error };
};

export default useLogin;
