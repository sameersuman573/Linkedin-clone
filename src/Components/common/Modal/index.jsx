import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";

const ModalComponent = ({
  // getting as props
  modalOpen,
  setModalOpen,
  sendstatus,
  setStatus,
  status,

  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      {/* UI OF MODAL */}

      <Modal
        title="Create a Awesome Post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus(" ");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus(" ");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        // footer
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendstatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            // IF YOU DONT WRITE ANYTHING IT WILL NOT SHOW SEND POST BUTTON
          >
            {isEdit ? "Update" : "post"}
          </Button>,
        ]}
      >
        <div className="posts-body">
        <ReactQuill
          className="modal-input"
          theme="snow"
          placeholder="Share Something Useful.."
          value={status}
          onChange={setStatus}
        />
        ; // STATUS STORE THE VALUE YOU TYPE IN MODAL
        {/* if progress is 0 then dont show it else show it also we need to hide this when it reaches zero*/}
        {progress === 0 || progress === 100 ? (
          <></>
        ) : (
          <div className="progress-bar">
            <Progress type="circle" percent={progress} />
          </div>
        )}
        {/* if we will have then we will see that image otherwise we will not see that image */}
        {postImage?.length > 0 || currentPost?.postImage?.length ? (
          <img
            className="preview-image"
            src={postImage || currentPost?.postImage}
            alt="postImage"
          />
        ) : (
          <></>
        )}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={30} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
