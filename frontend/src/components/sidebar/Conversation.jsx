import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, selfChat }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-600 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          if (!isSelected) setSelectedConversation(conversation);
        }}
      >
        {/* avatar */}
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        {/* username */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-bold text-gray-200">
                {selfChat ? "Chat Yourself" : conversation.fullName}
              </p>
              <p className="text-xs">{conversation.username}</p>
            </div>
            {/* <span className="text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>

      {/* divider */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
