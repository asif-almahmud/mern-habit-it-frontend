import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const useGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUserContext();

  async function getRequest(...rest) {
    let response;

    // setTimeout(() => {
    //   if (user && !response) {
    //     toast.info(
    //       "Please wait. We are using the free plan of render.com which is automatically spun down after 15 minutes of inactivity. So it takes some time to start the server again.",
    //       { autoClose: 8000 }
    //     );
    //   }
    // }, 3000);

    try {
      if (!user) {
        setError("User not loggedin");
        return;
      }
      const url = rest[0];
      let headers = rest[1]?.withAuthHeader
        ? {
            Authorization: `Bearer ${user.token}`,
          }
        : {};
      console.log({ headers });

      setLoading(true);
      response = await axiosClient.get(`${url}`, { headers });
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error);
    }
    return response;
  }

  return { getRequest, loading, error };
};

export default useGet;
