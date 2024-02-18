import React, { useEffect } from "react";
import Message from "./Message";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const lastMessageRef = React.useRef();
  const { loading, messages } = useGetMessages({ lastMessageRef });
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        [...Array(3)].map((_, i) => <MessagesSkeleton key={i} />)
      ) : messages.length === 0 ? (
        <p className="text-center">Send a message to start the conversation</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
