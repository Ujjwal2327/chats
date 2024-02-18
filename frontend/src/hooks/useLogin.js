import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    const validInput = validateInputs(username, password);
    if (!validInput) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", username, password, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("chats-user", JSON.stringify(data.user));
      setAuthUser(data.user);
      toast.success(data.message);
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

  return { loading, login };
};

export default useLogin;

function validateInputs({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
