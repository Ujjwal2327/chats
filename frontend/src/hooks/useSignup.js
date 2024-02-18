import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async (
    fullName,
    username,
    password,
    confirmPassword,
    gender
  ) => {
    const validInput = validateInputs(
      fullName,
      username,
      password,
      confirmPassword,
      gender
    );
    if (!validInput) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/auth/signup",
        fullName,
        username,
        password,
        confirmPassword,
        gender,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  return { loading, signup };
};

export default useSignup;

function validateInputs({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password should be at least 6 characters long");
    return false;
  }

  return true;
}
