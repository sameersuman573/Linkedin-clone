import React, { useState, useMemo } from "react";


import { postStatus, getStatus, updatePost , getConnections} from "../../../API/FirestoreAPI";


import { getCurrentTimeStamp } from "../../../helpers/useMoment";

import ModalComponent from "../Modal";
import { uploadPostImage } from "../../../API/ImageUpload";
import PostsCard from "../PostsCard";
import { getUniqueID } from "../../../helpers/getUniqueid";
import "./index.scss";

export default function PostStatus({ currentUser }) {
  // let userEmail = localStorage.getItem("userEmail");

  const [modalOpen, setModalOpen] = useState(false);
  // TO OPEN MODAL

  const [status, setStatus] = useState("");
  // STORE THE DATA YOU TYPE IN MODAL

  const [allStatus, setallStatus] = useState([]);
  //  IT TAKES INTO ACCOUNT ALL THE POSTS

  const [isEdit, setIsEdit] = useState(false);
  // TO EDIT THE POST

  const [currentPost, setCurrentPost] = useState({});
// IT CATERS ABOUT THE CURRENT POST

const [currentImage, setCurrentImage] = useState({})


const [postImage, setPostImage] = useState(" ")



  // for sending the posts
  const sendstatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp(" LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };

    // console.log(currentUser.email );
    // console.log(userName);

    // poststatus is the main function written in firestore to add data in database
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };



  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    // when edit button is triggered
    setIsEdit(true);
  };


  
  const updateStatus = () => {
    // we need to send data to firestore to get updated
    console.log(status);
    updatePost(currentPost.id, status);
    setModalOpen(false);
  };


  


  useMemo(() => {
    getStatus(setallStatus);
  }, []);
  console.log(currentUser);

  return (
    <div className="post-status-main">
    
      <div className="user-details">
        <img src={currentUser.imageLink} alt="imageLink" />
        <p className="name">{currentUser.name}</p>
        <p className="headline">{currentUser.headline}</p>
      </div>

      <div className="post-status">

        <img
          className="post-image"
          src={currentUser.imageLink}
          alt="imageLink"
        />

        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a post
        </button>
        
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendstatus={sendstatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        // setCurrentImage={setCurrentImage}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}

      />

      <div>
        {allStatus.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts}
               getEditData={getEditData} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}
