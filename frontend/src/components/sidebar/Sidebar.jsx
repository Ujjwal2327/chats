import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  const searchProps = {
    searchInput,
    setSearchInput,
    prevSearchQuery,
    setPrevSearchQuery,
    searchQuery,
    setSearchQuery,
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput {...searchProps} />
      <div className="divider px-3" />
      <Conversations searchQuery={searchQuery} />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
