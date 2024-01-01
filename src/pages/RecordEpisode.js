import React, { useRef, useState } from "react";
import Header from "../components/common/Headers";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const RecordEpisode = () => {
  const audioChunk = useRef([]); //keeps track of audio chunk during recording
  const [recordings, setRecordings] = useState([]); //store recoderded files
  const mediaRecorderRef = useRef(null); //store media recorder instance
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const stratRec = async () => {
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); //getting access to microphone
      const mediaRecorder = new MediaRecorder(stream); //getting instance of media recorder
      mediaRecorder.ondataavailable = (e) => { //the above has 2 eventListners ondataavailable and onstop
        if (e.data.size > 0) {
          audioChunk.current.push(e.data);
        }
      };
      // ondataavailable is Triggered when there is new data available (audio chunks).

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunk.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prevRecs) => [...prevRecs, audioUrl]);
      };
      //onstop: Triggered when the recording stops.
      //It creates a blob from the accumulated audio chunks, converts it to a URL

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();//recording starts
    } catch (error) {
      console.log("Error accessing the microphone", error);
    }
  };

  const endRec = () => {
    setLoading(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    // checking if media recorder is recording and if yes then it stops the recording
  };


  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <Button text={loading ?"Recording..." : "Start Recording..."} disabled={loading} onClick={stratRec} />
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
