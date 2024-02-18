import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users");
        setConversations(data);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
