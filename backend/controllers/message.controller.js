import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);

    // SOCKET IO FUNCTIONALITY

    await Promise.all([newMessage.save(), conversation.save()]); // Save both the new message and the conversation in parallel

    res.status(201).json({ newMessage });
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).json({ message: "Invalid Message" });

    console.log(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, userToChatId] },
    }).populate("messages", "message senderId receiverId createdAt");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
