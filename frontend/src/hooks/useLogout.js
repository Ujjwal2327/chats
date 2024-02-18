import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/logout");
      toast.success(data.message);
      localStorage.removeItem("chats-user");
      setAuthUser(null);
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

  return { loading, logout };
};

export default useLogout;
