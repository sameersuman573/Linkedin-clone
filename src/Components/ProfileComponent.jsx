import React from "react";
import ProfileEdit from "../Components/common/ProfileEdit";
import { useState } from "react";
import ProfileCard from "./common/ProfileCard";

export default function ProfileComponent({ currentUser }) {
  const [isEdit, setisEdit] = useState(false);

  // we have a made a function and have passed the state is edit so when the button is clicked the state will be changed and the edit component will be shown

  const onEdit = () => {
    setisEdit(!isEdit);
    // we have reversed isedit state so that we always see the profile card first then edit option for editing
  };
  return (

    <div>
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>

  );
}
