import React from "react";
import "./index.scss";
import { editProfile } from "../../../API/FirestoreAPI";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ProfileEdit({ onEdit, currentUser }) 
{


  const [editInputs, setEditInputs] = useState(currentUser);
// WE WILL EDIT THE CURRENT USER


  //   to fetch the input - function
  const getInput = (event) => {
    let { name, value } = event.target;
    // we recieved the name with the values
    let input = { [name]: value };
    // we assigned the values to their respective feild names
    setEditInputs({ ...editInputs, ...input });
  };

  // editinput sconsit of various things like name, headline, country, city, company, industry, college, website, aboutme, skills



  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };




  return (

    <div className="profile-card">

{/* EDIT BUTTON */}
      <div className="edit-btn">
        <AiOutlineClose 
        className="close-icon" 
        onClick={onEdit} 
        size={25} />
      </div>



{/* PROFILE INPUTS */}
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          // The importance of passsing the name is that we can get the value of the input field so check get input function
          value={editInputs.name}
        />

        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />

        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />

        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />

        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />

        <label>Industry </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />

        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />

        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />

        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />

        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
      </div>

{/* SAVE BUTTON */}
      <div className="save-container">

        <button className="save-btn" 
        onClick={updateProfileData}>
          Save
        </button>

      </div>
    </div>
  );
}
