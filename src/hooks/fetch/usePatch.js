import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const usePatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUserContext();

  async function patchRequest(...rest) {
    const url = rest[0];
    const payload = rest[1];
    const headers = rest[2]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};
    console.log({ headers });

    setLoading(true);
    let response;
    try {
      response = await axiosClient.patch(`${url}`, payload, { headers });
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error);
    }
    return response;
  }

  return { patchRequest, loading, error };
};

export default usePatch;
