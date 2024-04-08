import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

// ref - to create a refrence
//  getdownloadurl - to get the download url of the image
// uploadBytesResumable - to upload the files

export const uploadImage = (
  file,
  id,
  setModalOpen,
  setProgress,
  setCurrentImage
) => {

  // CREATE THE REFERNECE
  // For the syntax you can refer to any of google firebase documentation or any blogs
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);

  // WHICH FILE TO UPLOAD
  const uploadTask = uploadBytesResumable(profilePicsRef, file);


  // UPLOAD THE IMAGE
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        // It can  be used for the progress bar
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // this will run every time we upload an image
      setProgress(progress);
    },
    (error) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {

        editProfile(id, { imageLink: response });
        setModalOpen(false);
        setCurrentImage({}); 
        // it sets as empty object after uploading an image
        setProgress(0);

      });
    }
  );
};









export const uploadPostImage = (file, setPostImage, setProgress) => {
  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setProgress(progress);
    },
    (error) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setPostImage(response);
      });
    }
  );
};
