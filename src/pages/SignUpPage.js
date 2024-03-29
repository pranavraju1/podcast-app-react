import React, { useState } from "react";
import Header from "../components/common/Headers";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";

const SignUpPage = () => {
  const [flag, setFlag] = useState(false);
  // the above flag is for the last p tag where the user may already have an account or login
  // if flag is false then SignUp else Login
  return (
    <div className="big-container">
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm/>}
        {!flag ? (
          <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account? Click here to Login.</p>
        ) : (
          <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Don't have an account? Click here to signup</p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
