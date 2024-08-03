import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QmyCON.css";

const QmyCON = () => {
  const navigate = useNavigate();

  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  //테스트용 데이터
  const user = { name: "홍길동" };

  return (
    <div className="QmCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="QmCmain">
        <p>{user.name} 님의 체질을 알려주세요</p>
        <div className="QmCinfo">
          <img alt="myImage" src="/images/myImage.png" />
          <p>
            <span className="QmCpurple">나의 체질을 입력하면,</span>
            <br /> 맞춤형 식습관 개선 플랜, 건강 관리 플랜에 대해 더 자세히
            알려드릴 수 있어요
          </p>
        </div>
        <img
          className="Qmcarrow"
          alt="화살표"
          src="/images/startdirection.png"
        />
        <div className="QmCbtns">
          <button
            className="QmCwhiteBtn"
            onClick={() => navigate("/myCON/chooseMyCON")}
          >
            이미 알고 있어요
          </button>
          <button
            className="QmCpurpleBtn"
            onClick={() => navigate("/myCON/SelfTest")}
          >
            자가진단으로 알아볼래요
          </button>
        </div>
      </main>
    </div>
  );
};

export default QmyCON;
