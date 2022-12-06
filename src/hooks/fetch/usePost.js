import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUserContext();

  async function postRequest(...rest) {
    const url = rest[0];
    const payload = rest[1];
    const headers = rest[2]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    setLoading(true);
    let response;

    // setTimeout(() => {
    //   if (!response) {
    //     toast.info(
    //       "Please wait. We are using the free plan of render.com which is automatically spun down after 15 minutes of inactivity. So it takes some time to start the server again.",
    //       { autoClose: 8000 }
    //     );
    //   }
    // }, 3000);

    try {
      response = await axiosClient.post(`${url}`, payload, { headers });
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error);
    }
    return response;
  }

  return { postRequest, loading, error };
};

export default usePost;
