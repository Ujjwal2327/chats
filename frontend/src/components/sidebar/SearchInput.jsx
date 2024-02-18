import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({
  searchInput,
  setSearchInput,
  prevSearchQuery,
  setPrevSearchQuery,
  setSearchQuery,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchInput.trim() === prevSearchQuery.trim()) return;
    setPrevSearchQuery(searchInput.trim());
    setSearchQuery(searchInput.trim());
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() === "") {
      setPrevSearchQuery("");
      setSearchQuery("");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={searchInputHandler}
        className="input input-bordered rounded-full"
        id="search-input"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white ">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
