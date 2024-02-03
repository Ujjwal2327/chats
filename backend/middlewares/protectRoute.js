import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized Access: No token provided" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId)
      return res
        .status(401)
        .json({ message: "Unauthorized Access: Invalid token" });

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized Access: Invalid token" });

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default protectRoute;
