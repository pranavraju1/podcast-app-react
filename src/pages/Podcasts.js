import React, { useEffect, useState } from "react";
import Header from "../components/common/Headers";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../components/common/Podcasts/PodcastCard";
import InputComponent from "../components/common/input";

const PodcastPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search,setSearch] = useState("");

  // every time this page is loaded we want to fetch the data from the firebase
  useEffect(() => {
    // data will be stored in querySnapshot then we are puch the data in podcastData
    // with id bc we have not stored the id in podcast firebase
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  console.log(podcasts);

  var filteredPodcasts = podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <InputComponent
        state={search}
        setState={setSearch}
        placeholder={"Search By Title"}
        type="text"
      />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{marginTop:"1.5rem"}}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                 key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{ search?"Podcast Not Found":"No Podcasts On The Platform"}</p>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
