import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import React, { useState, useMemo } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../API/FirestoreAPI";
import { FaRegCommentAlt } from "react-icons/fa";

function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  // IF THE POST IS LIKED OR NOT

  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  // TO STORE THE ALL COMMENTS
  const [comments, setComments] = useState([]);

  // LIKE
  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  // COMMENTS
  const getComment = (event) => {
    setComment(event.target.value);
  };

  console.log(currentUser);

  
  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    // to clear out comment
    setComment(" ");
  };

  console.log(likesCount);
  // when the page loads we will have all the likes

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    
    <div className="like-container">
      <p>{likesCount} people like this post</p>

      <div className="hr-line">
        <hr />
      </div>

      <div>
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <FcLike size={30} color="red" />
          ) : (
            <FcLikePlaceholder size={30} />
          )}

          <p className={liked ? "blue" : "black"}>Like</p>
        </div>





 
{/* COMMENT BOX */}
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FaRegCommentAlt size={20} color="#0a66c2" />

          <p className={showCommentBox ? "blue" : "black"}>comment</p>
        </div>
      </div>

      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a comment"
            className="comment-input"
            name="comment"
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add a comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>
                  <div>
                    <p className="timestamp">{comment.timeStamp}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LikeButton;
