import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// import { useRef } from "react";
import { toast } from "react-toastify";

let postRef = collection(firestore, "post");
// postref is the database but in our case it is the firestore that is our database
let userRef = collection(firestore, "users");
// this will contain all our users when we will sign up
let likeRef = collection(firestore, "likes");
// status = post
let commentsRef = collection(firestore, "comments");
// this will contain all the comments on any post
let connectionRef = collection(firestore, "connections");
// this will contain all connections

// using the function we add the data to the database of firestore
export const postStatus = (object) => {
  // adddoc - where we actually pass our data along with the collection name and db refernces
  //  it takes two arguments - > collection or database and data that we want to add to a collection
  addDoc(postRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })

    .catch((err) => {
      console.log(err);
    });
};

// using the function we read the post data
// onsnapshot just display the post instantly
export const getStatus = (setAllStatus) => {
  onSnapshot(postRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

// it stores the data in firebase collection 
// we will use for profile popup
export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})

    .catch((err) => {
      console.log(err);
    });
};

// to get current user -name and email

// if there is no usetate we take a variable then calculate the response if otherwise we use the usetate function
export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
      // as soon as we recive the information we will filter the data to get only email
      // the 0 signifies that email is at the 0th index
    );
  });
};


// FOR PROFILE IMAGES IN POST
// GET INFORMATION OF ALL USERS
export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      // setallusers is basically a usestate
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};




// TO VALIDATE USER EMAIL AND POST ID


// TO GET THE ALL POST OF A PARTICULAR USER 
// HERE WE ARE BASICALLY FETHCJING THE ID OF TEH PARTICULAR USER
export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postRef, where("userID", "==", id));
  // Check the userID for the post is equal to the id of the Currentpost if it macthed then only we will get the staus(post)
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


// HERE WE FETCHING THE EMAIL OF THE PARTICULAR USER
export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};




export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// TO LIKE THE POST
export const likePost = (userId, postId, liked) => {
  // console.log(userId);
  // console.log(postId);
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);

    // system to like and dislike

    if (liked) {
      // after clicking like button if its is liked then reomve like else mark a like
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });

      // here we are passing the props as userid and postid
      // liked is a usetate which changes color if it is true

    }
  } catch (err) {
    console.log(err);
  }
};


// COUNT THE LIKES
export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    // TO GET THE COUNT INSTANTLY
    onSnapshot(likeQuery, (response) => {
      // it calculates the likes count
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      // WHICH USER HAS LIKED
      // It authenticates the like
      const isLiked = likes.some((like) => like.userId === userId);

      // it sets the count
      setLikesCount(likesCount);

      // it sets the like
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

// To send comment to firebase
export const postComment = (postId, comment, timeStamp, name) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

// To show the comment visibility
export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          // we are talking about the single comment so write doc only
        };
      });

      setComments(comments);
    });
  } catch (error) {
    console.log(error);
  }
};

// we had made a function such that it will first map the data with id and if the user make any chnages the changes will be applied to the respected post

export const updatePost = (id, status ,postImage) => {
  let docToUpdate = doc(postRef, id);
  try {
    updateDoc(docToUpdate, { status,postImage });
    // status is the post made by user
    // post image is the image posted by user
    toast.success("Post has been updated successfully");
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => {
  // we are apssing the id here so in posstcard we are passing post.id
  let docToDelete = doc(postRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been deleted successfully");
  } catch (error) {
    console.log(error);
  }
};


// It is same like the likePost method
export const addConnection = (userId, targetId) => {
  // console.log(userId);
  // console.log(postId);
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
    // the set dox will create a connection with these ids and will combine both these ids
    setDoc(connectionToAdd, { userId, targetId });
    toast.success("Connection has been added successfully");
  } catch (err) {
    console.log(err);
  }
};



// It is same as getlike by users
export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(connectionRef, where("targetId", "==", targetId));

     onSnapshot(connectionsQuery, (response) => {
       let connections = response.docs.map((doc) => doc.data());
 
        const isConnected = connections.some((connection) => connection.userId === userId);

        setIsConnected(isConnected);
        
    });
  } catch (err) {
    console.log(err);
  }
};




