import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const selfChat = selectedConversation?._id === authUser._id;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoCoversationSelected fullName={authUser.fullName} />
      ) : (
        <>
          {/* header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center gap-1">
            <span className="label-text">To:</span>{" "}
            <div className="text-gray-900 font-bold">
              <span>{selfChat ? "You" : selectedConversation.fullName}</span>
              <span> - {selectedConversation.username}</span>
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoCoversationSelected = ({ fullName }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {fullName} ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
