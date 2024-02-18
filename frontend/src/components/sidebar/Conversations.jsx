import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = ({ searchQuery }) => {
  const { authUser } = useAuthContext();
  const { loading, conversations } = useGetConversations();
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = conversations.filter(
        (conversation) =>
          conversation.fullName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          conversation.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.length === 0 && !loading && (
        <div className="text-center text-gray-300 mt-4">
          No conversations found
        </div>
      )}

      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          selfChat={authUser._id == conversation._id}
        />
      ))}

      {loading && <span className="loading loading-spinner mx-auto" />}
    </div>
  );
};

export default Conversations;
