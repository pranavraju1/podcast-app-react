import React, { useEffect, useState } from "react";
import Header from "../components/common/Headers";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import EpisodeDetails from "../components/common/Podcasts/EpisodeDetails";
import AudioPlayer from "../components/common/Podcasts/AudioPlayer";

const PodcastDetailsPage = () => {
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [playingFile, setPlayingFile] = useState("");
  console.log("ID", id);
  // we can now fetch all the data abt the podcast from firebase using id
  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  // frtching details of episodes
  useEffect(() => {
    const unscubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.log("Error fetching episodes:", error);
      }
    );
    return () => {
      unscubscribe();
    };
  }, [id]);
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>

              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  style={{ width: "200px !important", margin: 0 }}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {/* <Button
        text={"create new episode"}
        style={{ width: "100px", position: "fixed", right: "0", bottom: "0" }}
        onClick={() => {
          navigate(`/podcast/${id}/create-episode`);
        }}
      /> */}
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetailsPage;
