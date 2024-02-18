import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { formatDateAndTime } from "../../utils/formatDateAndTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isSent = message.senderId === authUser._id;
  const chatClassName = isSent ? "chat-end" : "chat-start";
  const bubbleClassName = isSent ? "bg-slate-500" : "";
  const profilePic = isSent
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const formatedDateAndTime = formatDateAndTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleClassName}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedDateAndTime}
      </div>
    </div>
  );
};

export default Message;
