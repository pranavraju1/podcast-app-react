import React, { useRef, useState } from "react";
import Header from "../components/common/Headers";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const RecordEpisode = () => {
  const audioChunk = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const stratRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunk.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunk.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prevRecs) => [...prevRecs, audioUrl]);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.log("Error accessing the microphone", error);
    }
  };

  const endRec = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };


  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <Button text={"Start Recording..."} onClick={stratRec} />
        {recordings.map((recUrl, index) => {
          return (
            <div key={index}>
              <audio controls src={recUrl} />
              <br/>
              <a className="Download-btn" href={recUrl} download={`recording-${index}.mp3`} onClick={()=>navigate(-1)}>
                Download
              </a>
            </div>
          );
        })}
        <Button text={"Stop Recording..."} onClick={endRec} />
      </div>
    </div>
  );
};

export default RecordEpisode;
