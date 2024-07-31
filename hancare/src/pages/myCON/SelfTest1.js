/* 백엔드 연동
import axios from "axios";
import React, {useEffect, useState} from "react"; */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelfTest.css";

const SelfTest1 = () => {
  const navigate = useNavigate();

  /* 백엔드 연동 코드
const [name, setName] = useState([]);
const getName = () => {
  axios
  .get("http://127.0.0.1: 8000/?")
  .then((response) => {
    console.log(response);
    setName(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
};

useEffect(() => {
  getName();
}, []);
*/

  // 이전 페이지도 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  return (
    <div className="background">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2>나의 체질</h2>
      </header>
      <main className="STmain">
        <div></div>
      </main>
    </div>
  );
};

export default SelfTest1;
