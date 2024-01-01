import React from "react";
import { useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {signInWithEmailAndPassword} from "firebase/auth";
import { auth, db} from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin");
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // console.log("user", user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        //saving data in redux
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login successful");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        setLoading(false);
        toast.error(e.message);
        setLoading(false);

      }
    }else{
      toast.error("Make sure email and password are not empty");
    }
  };
  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder={"Email"}
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder={"Password"}
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
        type="submit"
      />
    </>
  );
};

export default LoginForm;
