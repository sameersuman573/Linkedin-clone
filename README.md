# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# userID - profile 
# POSTID - for posts
# userId - posts(comments,likes) - applicable => attached postId
# id - upload images




<!--
 Install all dependencies
1. Create firebase project and save its data in firebase config
Also take refrence from firebaseconfig file
firebase install
# npm i sass
import toastify after write these things in main
import google button
import fonts

 -->

1. create all pages such as HOME , LOGIN , REGISTER and import all the thier component

2. make each component
   The register and login component will be very much same
   Then make the Home component
   Along with the CSS
   import GoogleButton from "react-google-button";

# Authorization

3. make a authorization for all such pages
   import { signInWithEmailAndPassword , createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup} from "firebase/auth";

4. make a route for all such pages
   export const router = createBrowserRouter([
   <!-- if you want to go to a type directly the put the path as " " -->
   {
   path: "",
   element: <Login/>,
   errorElement: <ErrorPage/>
   },
   {
   path: "/register",
   element: <Register/>,
   errorElement:<ErrorPage/>
   },
   {
   path: "/home",
   element: <Home/>,
   errorElement: <ErrorPage/>
   },
   ]);

5. In the main page

# routing

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

# toast

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

# Loading component

<!-- how onauthstatechanges works from firebase -->
<!-- antdesign - npm install antd -->

1. we will make usestate to make loading component

useEffect(() => {
onAuthStateChanged(auth, (res) => {
if (res?.accessToken) {
<!-- if we have acces token then navigate otherwise go to login page -->
navigate("/home");
} else {
setloading(false);
}
});
}, []);

  <!-- based on the true and false we would return loading component -->

return loading ? <Loader /> : <LoginComponent />;

if we would get token we will navigate other wise loading component will be shown 2. do samething in homecomponent

<!-- for more refer to home profile and login page -->








<!-- topbar -->

1. react icons = npm install react-icons --save
2. recat import command- import { FaBeer } from 'react-icons/fa';
3. add all icons
4. now do routing in the topbar page that if we click on ceratin selected icon we will be able to navigate through them and reach a page

let navigate = useNavigate();
const gotoRoute = (route) => {
navigate(route);
// the route is the props that we are passing to the function when you will be using the function pass /home or /profile
};

5.  in the topbar icon structure
    <!-- <AiOutlineHome
          size={25}
          className="react-icon"
          onClick={() => gotoRoute("/home")}
        /> -->
        routing is done on onclick







<!-- MODAL -->

when we will click on write a post will open up a modal

1. go to antdesign search modal
2. copy the js code not all
   c0py the usestates
3. in the modal component mke the ui and add functinalities

<!-- To add data to the database -->

1. write the function in firestoreapi
2. for syntax od addDoc refer google documentations

<!-- post display -->

npm install momemt --save

# refer to any of the functions of firebase by writing on the google to check its syntax like addD oc

1. in firestore use onsnapshot function to display instantly

2. export const getStatus = (setallStatus) => {
   onSnapshot(dbRef, (response) => {
   setallStatus(
   response.docs.map((docs) => {
   return { ...docs.data(), id: docs.id };
   })
   );
   });
   };
   This will be fetching all posts

3. In post update write a usestate function to displayit
4. To display it beautifully create a postcard function to display each post separately








<!-- logout -->
<!-- for unique id --- npm i react-uuid  -->

1. write the logout function in authapi
2. make a profile popup file and use the logout function there

3. in firestore make a function called => postuser data - that will it stores the data in firebase collection

export const postUserData = (object) => {
addDoc(userRef, object)
.then(() => {})

    .catch((err) => {
      console.log(err);
    });

};

also make a function in firestsore to record username and email

// to get current user -name and email
export const getCurrentUser = (setCurrentUser) => {
// let currEmail = localStorage.getItem("userEmail");
onSnapshot(userRef, (response) => {
setCurrentUser(
response.docs
.map((docs) => {
return { ...docs.data(), userID: docs.id };
})
.filter((item) => {
return item.email === localStorage.getItem("userEmail");
})[0]
// as soon as we recive the information we will filter the data to get only email
// the 0 signifies that email is at the 0th index
);
});
};









<!-- PROFILE EDIT -->

1. make the profile edit page first it is easy


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



  //   to fetch the input - function
  const getInput = (event) => {
    let { name, value } = event.target;
    // we recieved the name with the values
    let input = { [name]: value };
    // we assigned the values to their respective feild names
    setEditInputs({ ...editInputs, ...input });
  };



  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };


<!-- <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          <!-- The importance of passsing the name is that we can get the value of the input field so check get input function  -->
          value={editInputs.name}
        /> -->







<!-- PROFILE CARD -->
1. make the post update page which consist of the componenet through we posts a new post
2. make the postcard


<!-- PROFILE POPUP -->
1. make the profile page 
2. integrate with topbar























<!-- like system -->

1. deploy the like component in the postcard
2. now make a component called like button make its structure
3. then make usestates to handle like and usememo to save and momize the likes count
4. now the main part
   in the firestore create a collection of likes as there is a collection of post and users
5. then make a function called likepost in firestore api to manage like and dislikes

// TO LIKE THE POST
export const likePost = (userId, postId, liked) => {
console.log(userId);
console.log(postId);
try {
let docToLike = doc(likeRef, `${userId}_${postId}`);
if (liked) {
// after clicking like button if its is liked then reomve like else mark a like
deleteDoc(docToLike);
} else {
setDoc(docToLike, { userId, postId });
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
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });

} catch (err) {
console.log(err);
}
};






<!-- COMMENT section -->

1. make the commment system in like componenet
2. write the ustetates and structure of the comments
3. now make the function in authapi

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
        };
      });

      setComments(comments);
    });

} catch (error) {
console.log(error);
}
};





<!-- UPLOAD IMAGES TO THE FIREBASE -->
setup storage in firebase - default bucket will be created
make a images upload file in api

1. import {getstorage } and create a varible in firebase config
2. in the profile card page make a input with file type
3. so create a function to get the image 

 const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
 4 now create a api for image upload in api - imageUpload

<!-- The imageUpload api will call this function -->

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







<!-- MAKING A MODAL FOR IMAGE UPLOADING -->
1. get the design from ant design
-vertically centerd modal
so for that make state called modalopen in profile card
2. create a custom footer
just copy and paste the code
3. just take a design of progress from antdesign - in fileupload
and set the progress in the image upload
take refrence- 
1.fileuploadmodal
2.profilecard
3.imageupload

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




<!-- [PROFILE IMAGES IN POST] -->






<!-- TO UPDATE THE POST -->

export const updatePost = (id, status) => {
let docToUpdate = doc(postRef, id);
try {
updateDoc(docToUpdate, { status });
toast.success("Post has been updated successfully");

} catch (error) {
console.log(error);
}
};

<!-- all are usestates -->

<!-- also change status(usestate) in modal - as we have closed the modal the previous data must not be present there -->

const getEditData = (posts) => {
setModalOpen(true);
setStatus(posts?.status);
setCurrentPost(posts);
// when edit button is triggered
setIsEdit(true);
};

if edit is true then update otherwise post the data
#update only when chenging the posted post otherwise post a new post
            {isEdit ? "Update" : "post"}


const updateStatus = () => {
console.log(status);
updatePost(currentPost.id, status);
<!-- status is the data you type in modal -->
setModalOpen(false);
};






<!-- TO DELETE THE POST -->

export const deletePost = (id) => {
// we are passing the id here so in posstcard we are passing post.id

let docToDelete = doc(postRef,id)
try {
deleteDoc(docToDelete)
toast.success("Post has been deleted successfully");

} catch (error) {
console.log(error);
}
}




<!-- MAke the home page profile card -->
design the page simply





<!-- Connections -->
1 Make a connection page layout  and componenet and copy and paste from home componenet
2. Make the connecteduser component
3. write function to get connection in firestore

// It is same like the likePost method -> add to connection
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



// It is same as getlike by users -> get connected
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

4. utilize all other function of firestore
1. getalluser - to show card for diffetrnt persons with whom we are not connected
2. getcurrentuser -to get the connection so that we can view their posts

5. write changes in postupdate and postcard to get post from those users with whom we arre connected only





<!-- UPLOADING POST IMAGES -->
#   L i n k e d i n - c l o n e  
 