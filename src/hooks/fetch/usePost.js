import { useState } from "react";
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
