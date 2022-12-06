import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNotificationOnDelay, setShowNotificationOnDelay] = useState(false);
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
        { autoClose: 7000 }
      );
    }
  }, [showNotificationOnDelay]);

  return { postRequest, loading, error };
};

export default usePost;
