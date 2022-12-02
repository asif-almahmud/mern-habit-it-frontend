import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUserContext();

  async function deleteRequest(...rest) {
    const url = rest[0];
    const headers = rest[1]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};
    console.log({ headers });

    setLoading(true);
    let response;
    try {
      response = await axiosClient.delete(`${url}`, { headers });
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error);
    }
    return response;
  }

  return { deleteRequest, loading, error };
};

export default useDelete;
