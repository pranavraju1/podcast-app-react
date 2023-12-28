
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Headers";
import Button from "../components/common/Button";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import Loader from "../components/common/Loader";
import PodcastCard from "../components/common/Podcasts/PodcastCard";
import FileInput from "../components/common/input/FileInput";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import ProfileCard from "../components/common/cards/ProfileCard";
const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const user = useSelector((state) => state.user.user);
    
  // state refers to the global state
  // first .user refers to the userSlice name (user)
  // 2nd .user refers to object in  userSlice (initialState)
  // console.log("My User", user);
  // console.log(uid);
  if (!user) {
    return <Loader />;
  }
  //Loading will be shown when refreshing the page

// cheking if profile pic alredy exists
    const testfunc = async() => {
      try{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data().profilePic);
        setProfilePic(docSnap.data().profilePic);
      }catch(e){
        console.log("were not able to fetch data");
      }
    }
    testfunc();




  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleProfilePic = async(file) => {
    if(file){
      // uploading in firebase storage
      try{
        const profileImageRef = ref(
          storage,
          `profile/${auth.currentUser.uid}/profilePic/${Date.now()}`
        );
        await uploadBytes(profileImageRef,file);
        const profilePicUrl = await getDownloadURL(profileImageRef);
        settingProfile(profilePicUrl);
        console.log("profile pic",profilePicUrl);

        // updating in doc
        const docRef = doc(db,"users",user.uid);
        updateDoc(docRef,{
          profilePic: profilePicUrl
        },{merge:true}).then(()=>{
          console.log("updated profilePic");
        }).catch(()=>{
          console.log("not updated profilePic");
        })

        toast.success("Profile Pic uploaded successfully");
      }catch(e){
        toast.error(e.message);
        console.log(e.message);
      }
    }
  };
 
 


  const settingProfile = (profilePicUrl) => {
    setProfilePic(profilePicUrl);
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>{user.name.toUpperCase()}</h1>
        {/* {profilePic && <PodcastCard displayImage={profilePic} />} */}
        {profilePic && <ProfileCard displayImage={profilePic} />}
        {!profilePic && (
          <FileInput
            accept={"image/*"}
            id="profile-image-input"
            fileHandleFnc={handleProfilePic}
            text={"Profile Image Upload"}
          />
        )}
        <h1>email: {user.email}</h1>
        {/* <h1>User Id {user.uid}</h1> */}
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default ProfilePage;
