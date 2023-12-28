import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import FileInput from "../common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreatePodcastFrom = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // make it async bc uploading will take time
  const handleSubmit = async () => {
    toast.success("Handling Form");
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      // 1. Upload files -> get dowloadable links
      // 2. crete a new doc in a new collection called podcasts
      // 3. save this new podcast episodes states in our podcasts

      // 1. Upload
      try {
        // const bannerImageRef = ref(storage,`podcasts-bannerImage`);
        // we can use above but every time we upload it will override the same file again and again
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/banner/${Date.now()}`
        );
        //this will first create a podacast folder in storage inside it another folder with userID and inside it the image with name as date
        // this is how you store your data when the file name is same
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        console.log("banner image", bannerImageUrl);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/display/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        console.log("display image", displayImageUrl);
        toast.success("File Uploaded");

        // 2 . doc in firebase
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        // we dont use setdoc here because the doc is already created while saving the user
        toast.success("Podcast Created");
        setLoading(false);

        setTitle("");
        setDesc("");
        setDisplayImage(null);
        setBannerImage(null);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder={"Title"}
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder={"Description"}
        type="text"
        required={true}
      />

      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />

      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />
      {/* "image/*" we can take any kind of image */}

      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
        type="submit"
      />
    </>
  );
};

export default CreatePodcastFrom;
