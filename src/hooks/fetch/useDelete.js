import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNotificationOnDelay, setShowNotificationOnDelay] = useState(false);
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

  useEffect(() => {
    if (loading && !showNotificationOnDelay) {
      setTimeout(() => {
        setShowNotificationOnDelay(true);
      }, 3000);
    }
  }, [loading]);

  useEffect(() => {
    if (loading && showNotificationOnDelay) {
      toast.info(
        "You might be experiencing some delay due to the 15 minutes inactivity policy applied by render.com for their free plans.",
        { autoClose: 10000 }
      );
    }
  }, [showNotificationOnDelay]);

  return { deleteRequest, loading, error };
};

export default useDelete;
