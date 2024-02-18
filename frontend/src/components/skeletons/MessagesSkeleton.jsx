const MessagesSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center opacity-50">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-5 w-40"></div>
          <div className="skeleton h-5 w-40"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end opacity-50">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-5 w-40"></div>
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </>
  );
};
export default MessagesSkeleton;