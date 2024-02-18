export const formatDateAndTime = (date) => {
  const currentDate = new Date();
  const messageDate = new Date(date);
  const timeDifference = currentDate - messageDate;
  console.log(messageDate.toLocaleString());

  if (timeDifference < 10 * 1000) return "Just now";
  else if (timeDifference < 60 * 1000) return "Few seconds ago";
  else if (timeDifference < 60 * 60 * 1000)
    return `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
  else if (timeDifference < 24 * 60 * 60 * 1000)
    return `${Math.floor(timeDifference / (60 * 60 * 1000))} hours ago`;
  else if (timeDifference < 2 * 24 * 60 * 60 * 1000) return "Yesterday";
  else
    return (
      messageDate.toLocaleDateString("en-GB") +
      ", " +
      messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    );
};
