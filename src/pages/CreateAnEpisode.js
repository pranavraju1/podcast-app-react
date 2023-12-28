import React, { useState } from "react";
import Header from "../components/common/Headers";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/common/input";
import FileInput from "../components/common/input/FileInput";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

const CreateAnEpisodePage = () => {
  const { id } = useParams();   
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if ((title, desc, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        // Uploading
        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioUrl,
        };

        // creating document
        // podcasts > Userid > episodes > epidodeId > details of audio files 
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Successfully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile(null);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All Files Should Be There");
      setLoading(false);
    }
  };

  const handleRecord = () => {
    navigate(`/record-episode`);
  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create an Episode</h1>

        <Button
          text={loading ? "Loading..." : "Record Episode"}
          disabled={loading}
          onClick={handleRecord}
        />

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
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileHandle}
          text={"Upload Audio File"}
        />

        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAnEpisodePage;
