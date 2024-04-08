import React from "react";
import "./index.scss";
import { IoMdClose } from "react-icons/io";

function SearchUsers(setIsSearch, setSearchInput) {


  return (


    <div className="search-users">
      <input
        placeholder="Search user..."
        onChange={(event) => setIsSearch(event.target.value)}
      />

      
      <IoMdClose
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}

export default SearchUsers;
