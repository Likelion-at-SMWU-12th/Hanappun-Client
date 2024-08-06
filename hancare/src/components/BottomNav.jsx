import React, { useState, useEffect } from "react";
import "./BottomNav.css";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHeart,
  faHandHoldingHeart,
  faLocationDot,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  const username = useSelector((state) => state.username);

  useEffect(() => {
    // 현재 경로에 따라 activeNav 상태 업데이트
    if (
      location.pathname.startsWith("/mainpage") ||
      location.pathname === "/"
    ) {
      setActiveNav(1);
    } else if (location.pathname.startsWith("/ourcare")) {
      setActiveNav(2);
    } else if (location.pathname.startsWith("/map")) {
      setActiveNav(3);
    } else if (location.pathname.startsWith("/calendar")) {
      setActiveNav(4);
    } else if (location.pathname.startsWith("/profile")) {
      setActiveNav(5);
    }
  }, [location]);

  if (
    location.pathname !== "/" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/login" &&
    location.pathname !== "/myCON/selfTest"
  ) {
    return (
      <nav className="wrapper">
        <Link to={`/mainpage/${username}`} className="nav-link">
          <div>
            <FontAwesomeIcon
              icon={faShieldHeart}
              size="lg"
              className={activeNav === 1 ? "nav-item active" : "nav-item"}
            />
          </div>
        </Link>
        <Link to={`/ourcare/${username}`} className="nav-link">
          <div>
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              size="lg"
              className={activeNav === 2 ? "nav-item active" : "nav-item"}
            />
          </div>
        </Link>
        <Link to={`/map/${username}`} className="nav-link">
          <div>
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              className={activeNav === 3 ? "nav-item active" : "nav-item"}
            />
          </div>
        </Link>
        <Link to={`/calendar/${username}`} className="nav-link">
          <div>
            <FontAwesomeIcon
              icon={faCalendar}
              size="lg"
              className={activeNav === 4 ? "nav-item active" : "nav-item"}
            />
          </div>
        </Link>
        <Link to={`/profile/${username}`} className="nav-link">
          <div>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className={activeNav === 5 ? "nav-item active" : "nav-item"}
            />
          </div>
        </Link>
      </nav>
    );
  } else {
    return null;
  }
};

export default BottomNav;
