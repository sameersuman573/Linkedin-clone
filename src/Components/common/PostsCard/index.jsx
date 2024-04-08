import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { getConnections } from "../../../API/FirestoreAPI";

import { IoPencil } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getCurrentUser,
  getAllUsers,
  deletePost,
} from "../../../API/FirestoreAPI";
// based on posts it will generate posts card
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [allUsers, setAllUsers] = useState([]);

  const [imageModal, setImageModal] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  // it caters connections

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  // console.log();
  console.log(posts);
  // console.log(
  //   allUsers.filter((item) => item.id === posts.userID)
  // .map((item) => item.imageLink)[0]
  // );
  console.log(currentUser.id);
  console.log(posts.userID);



  
  return (

    
    // To show post of those with whom we have connections
    // If is connected is true then show the post
    isConnected || currentUser.id === posts.userID ? (
      <div className="posts-card" key={id}>

        <div className="post-image-wrapper">
          {currentUser.id === posts.userID ? (
            <div className="action-container">
        
            {/*POST EDIT BUTTON  */}
              <IoPencil
                size={20}
                className="action-icon"
                onClick={() => getEditData(posts)}
              />


            {/*POST DELETE BUTTON  */}
               <RiDeleteBin6Line
                size={20}
                className="action-icon"
                onClick={() => deletePost(posts.id)}
              />
            </div>
          ) : (
            <></>
          )}

{/* PROFILE IMAGE */}
          <img
            alt="profile-image"
            className="profile-image"
            onClick={() => setImageModal(true)}

            // WE ARE GETTING ALL THE USERID AND WE ARE COMPARING WITH THE POSTID .  WHEN WE MAKE A POST WE ARE SENDING THE USERID TO THAT POST . SO WE ARE COMPARING THE USERID OF THE POST WITH THE USERID OF THE USER AND THEN WE ARE GETTING THE IMAGE LINK OF THAT USER

            src={
              allUsers
                .filter((item) => item.id === posts.userID)
                .map((item) => item.imageLink)[0]
            }
          />

          <div>
            <p
              className="name"
              onClick={() =>
                navigate("/profile", {
                  state: { id: posts?.userID, email: posts.userEmail },
                })
              }
            >
              {/* IF AT ANY TIME IT  GIVES ERROR - CANNOT READ PROPERTIES OF UNDEFINED name 
          THEN ADD A QUESTIONMARK */}
              {/* This allows to get undefined values and load the page */}
              {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
            </p>

            <p className="headline">
              {" "}
              {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
            </p>

            <p className="timestamp">{posts.timeStamp}</p>
          </div>
        </div>


        {posts.postImage ? (
          <img
            onClick={() => setImageModal(true)}
            src={posts.postImage}
            className="post-image"
            alt="post-image"
          />
        ) : (
          <></>
        )}

        <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p> 

        <LikeButton
          userId={currentUser?.id}
          postId={posts.id}
          currentUser={currentUser}
        />

        <Modal
          title="Vertically centered modal dialog"
          centered
          open={imageModal}
          onOk={() => setImageModal(false)}
          onCancel={() => setImageModal(false)}
          footer={[]}
        >
        <img
            onClick={() => setImageModal(true)}
            src={posts.postImage}
            className="post-image"
            alt="post-image"
          />
        </Modal>
      </div>
    ) :
    
    
    (
      <></>
    )


  );
}
