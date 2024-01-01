import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
function Header() {

  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);
  // the above to is used to get the current location of the page
  // using that location we can highlight the Link in navbar as it will get active className

  return <div className="navbar">
    <div className="gradient"></div>
    <div className="links">
      <Link to="/" className={currentPath=="/"?"active":""}>SignUp </Link>
      <Link to="/podcasts" className={currentPath=="/podcasts"?"active":""}>Podcasts </Link>
      <Link to="/create-a-podcast" className={currentPath=="/create-a-podcast"?"active":""}>Start A Podcast </Link>
      <Link to="/profile" className={currentPath=="/profile"?"active":""}>Profile</Link>
    </div>
  </div>;
}

export default Header;
