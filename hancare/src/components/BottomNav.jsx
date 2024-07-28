import React, { useState } from "react";
import "./BottomNav.css";
import { Link } from "react-router-dom";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//사용할 아이콘 import
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const BottomNav = () => {
  //현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);
  return (
    <nav className="wrapper">
      {/*하단 네비게이션 최상위 태그*/}
      {/* 나의 케어 */}
      <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
        <div>
          <FontAwesomeIcon
            icon={faShieldHeart}
            className={activeNav === 1 ? "nav-item active" : "nav-item"}
          />
        </div>
      </Link>
      {/* 우리 케어 */}

      <Link to="/login" className="nav-link" onClick={() => setActiveNav(2)}>
        <div>
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className={activeNav === 2 ? "nav-item active" : "nav-item"}
          />
        </div>
      </Link>
      {/* 한의원 (지도) */}
      <Link to="/map" className="nav-link" onClick={() => setActiveNav(3)}>
        <div>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={activeNav === 3 ? "nav-item active" : "nav-item"}
          />
        </div>
      </Link>
      {/* 칼럼 */}
      <Link to="/column" className="nav-link" onClick={() => setActiveNav(4)}>
        <div>
          <FontAwesomeIcon
            icon={faFileLines}
            className={activeNav === 4 ? "nav-item active" : "nav-item"}
          />
        </div>
      </Link>
      {/* MY */}
      <Link to="/profile" className="nav-link" onClick={() => setActiveNav(5)}>
        <div>
          <FontAwesomeIcon
            icon={faUser}
            className={activeNav === 5 ? "nav-item active" : "nav-item"}
          />
        </div>
      </Link>
    </nav>
  );
};

export default BottomNav;
