/* 백엔드 연동
import axios from "axios";
import React, {useEffect, useState} from "react"; */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
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
        <h2>MY</h2>
      </header>
      <main className="blackMain">
        <div className="profile">
          <img alt="myImage" src="/images/myImage.png" />
          <div className="profileText">
            {/* 사용자 이름 / 체질 / 나의 한의원 정보 가져오기*/}
            <h3>숙멋사 님</h3>
            <p>
              <span>토양체질</span> 이에요
            </p>
            <p>
              <span>숙명 한의원</span> 에 다니고 있어요
            </p>
          </div>
        </div>
        <hr />
        <div className="constitution">
          <img alt="constitutionWorld" src="/images/constitutionWorld.png" />
          <span className="purple">체질을 잘못 선택했나요?</span>
          <p>
            체질이 자가진단 결과와 다르거나 잘못 선택한 경우 1회에 한해서 수정이
            가능해요
          </p>
          <button onClick={() => navigate(`/editConstitution`)}>
            {/*체질 수정 페이지 navigate*/}
            체질 수정하기
          </button>
        </div>
        <hr />
        <div className="userInfo">
          <img alt="userInformation" src="/images/userInformation.png" />
          <span className="purple">회원 정보</span>
          <div className="idPw">
            <p>아이디 smwulikelion</p> {/*아이디 연결*/}
            <p>비밀번호 1234****</p> {/*비밀번호 연결*/}
          </div>
          <button onClick={() => navigate(`/cancel`)}>회원 탈퇴하기</button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
