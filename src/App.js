import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcast from "./pages/CreateAPodcast";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import { doc } from "firebase/firestore";
import PodcastPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisode";
import RecordEpisode from "./pages/RecordEpisode";

function App() {
  const dispatch = useDispatch();

  // we are using useEffect here so that when we reload or load the page again the state remain the same
  useEffect(() => {
    // the user over here is a current authenticated user
    // auth is the current authentication
    // onAuthStateChanged is triggered when the user authentication state changes (creating,logging in,logging out)
    const unsbscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          // triggered whenever something changes in the document
          // we will get the doc from our db
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetching user data: ", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsbscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
            <Route path="/podcasts" element={<PodcastPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route path="/record-episode" element={<RecordEpisode/>} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisodePage />}
            />
          </Route>
          {/* all the routes inside profile will now become private */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
