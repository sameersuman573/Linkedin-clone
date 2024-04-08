import React, { useEffect } from "react";
import { useState } from "react";
import user from "../../../assets/user.png";
import "./index.scss";
import LinkedinLogo from "../../../assets/logo.png";
//  icons imported from react-icons
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";

// import ProfilePopup from "../ProfilePopup"
import { useNavigate } from "react-router-dom";
import SearchUsers from "../SearchUsers";
import { getAllUsers } from "../../../API/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";

export default function Topbar({ currentUser }) {

  const [popupVisible, setpopupVisible] = useState(false);
  // TO SHOW POPUP FOR LOGOUT AND PROFILE
  const [isSearch, setIsSearch] = useState(false);
  // TO SHOW SEARCH BAR
  const [searchInput, setSearchInput] = useState("");
  //  TO STORE VALUE WE TYPE IN SEARCH INPUT

  const [users, setUsers] = useState([]);
  // TO GET ALL USERS FROM FUNCTION IN FIRESTORE
  const [filteredUsers, setFilteredUsers] = useState([]);
  // TO SHOW FILTERD USERS




  let navigate = useNavigate();

  const gotoRoute = (route) => {
    navigate(route);
    // the route is the props that we are passing to the function when you will be using the function pass /home or /profile
  };



  const displayPopup = () => {
    setpopupVisible(!popupVisible);
  };



//  This function will run after one second of typing in search bar  
  const handleSearch = () => {
    if (searchInput !== "") {

      let searched = users.filter((user) => {

        return Object.values(user)
        // convert user values to string from object then to . lowercase
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    }

     else {
      setFilteredUsers(users);
    }
  };



  // Connected with handleSearch function
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);

  }, [searchInput]);



// TO GO TO USER PROFILE
  const openUser = (user) => {
    navigate("/profile",
     {
      state: {
        id: user.id,
        email: user.email,
      },
    }
    );
  };





  useEffect(() => {
    getAllUsers(setUsers);
  }, []);











  return (
    // STRUCTURE OF TOPBAR



    // PROFILE POPUP

    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

 


      {/* <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" /> */}

{/* If search section is open then search otherwise show all topbar options */}
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <IoSearchOutline
            size={25}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={25}
            className="react-icon"
            onClick={() => gotoRoute("/home")}
          />

          <AiOutlineUserSwitch
            size={25}
            className="react-icon"
            onClick={() => gotoRoute("/connections")}
          />

          <BsBriefcase size={25} className="react-icon" />
          <AiOutlineMessage size={25} className="react-icon" />
          <IoIosNotificationsOutline size={25} className="react-icon" />
        </div>
      )}
 
      <img
        src={currentUser.imageLink}
        className="user-logo"
        alt="user"
        onClick={displayPopup}
      />




{/* SEARCH FUNCTIONALITY SECTION */}

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">

          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>

      )}
    </div>
  );
}
