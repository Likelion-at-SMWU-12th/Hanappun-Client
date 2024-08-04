import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meal.css";

const Mealmain = () => {
  const navigate = useNavigate();
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

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
    <div className="Mbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="Mh2">{user.name} 님의 식단 분석</h2>
      </header>
      <main className="Mmain">
        <div className="Mdate">{formattedDate}</div>
        <div className="Minfo">
          <div className="Mback_purple">
            <span>오늘 식사는 어땠나요?</span>
            <h2>
              오늘의 식사를 <br />
              알려주세요
            </h2>
            <img
              className="Mback_purple_img"
              alt="생각이모지"
              src="/images/thinking.png"
            />
          </div>
          <div className="Mback_white">
            <img alt="분석하는 사람" src="/images/analysis_person.png" />
            <p>
              {" "}
              아직 오늘의 식사가 기록되지 않았어요
              <br />
              식사를 기록하면 한케어의 식단 분석을 통해 <br /> 오늘의 식사
              점수를 알려드려요
            </p>
          </div>
        </div>
        <img className="Marrow" alt="화살표" src="/images/startdirection.png" />
        <div className="Mbtns">
          <button
            className="MpurpleBtn"
            onClick={() => navigate("/meal/first")}
          >
            식사 기록하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Mealmain;
