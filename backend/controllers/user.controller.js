import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find().select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(`Error in user controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
