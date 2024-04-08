import React from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
  setProgress
}) {
  return (
    <div>
    
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}


        // CUSTOMIZED FOOTER
        footer={[
          <Button
          // if the name of image is undefined we can dsiable the button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >

        <div className="image-upload-main">
{/* LABEL SECTION */}
          <p>{currentImage.name}</p>

          <label className="upload-btn" for="image-upload">
            Add an Image
          </label>


{/* PROGRESS SECTION */}
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}

{/* INPUT SECTION */}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />

        </div>
      </Modal>
    </div>
  );
}
