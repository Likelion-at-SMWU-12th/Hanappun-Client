import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meal.css";

const MealAnalysis = () => {
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
  const user = {
    name: "홍길동",
    todayMeal: "good",
    breakfast: ["", "오렌지주스"],
    lunch: ["탕수육, 보리차", "짬뽕"],
    dinner: ["돈가츠", "레몬에이드"],
    snack: ["", "커피"],
  };

  // todayMeal에 따른 메시지와 이미지 설정
  const getMealFeedback = (todayMeal) => {
    switch (todayMeal) {
      case "bad":
        return {
          message: "건강이 염려되어요",
          image: "/images/bad.png",
        };
      case "soso":
        return {
          message: "대체로 괜찮아요!",
          image: "/images/soso.png",
        };
      case "good":
        return {
          message: "건강을 잘 챙겼어요!",
          image: "/images/good.png",
        };
      default:
        return {
          message: "오늘의 식사",
          image: "/images/analysis_person.png",
        };
    }
  };

  const mealFeedback = getMealFeedback(user.todayMeal);

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
            <span>오늘 하루도 수고했어요</span>
            <h2>
              오늘의 식사, <br />
              {mealFeedback.message}
            </h2>
            <img
              className="Mback_purple_img2"
              alt="분석 결과"
              src={mealFeedback.image}
            />
          </div>
          <div className="Mback_white2">
            <div className="Mmeal_name">
              <span className="MpurpleDiv">아침</span>
              <span className="MpurpleDiv">점심</span>
              <span className="MpurpleDiv">저녁</span>
              <span className="MpurpleDiv">간식</span>
            </div>
            <div className="Mmeal_one">
              <ul>
                <li className="Mblue">{user.breakfast[0]}</li>
                <li className="Mred">{user.breakfast[1]}</li>
              </ul>

              <ul>
                <li className="Mblue">{user.lunch[0]}</li>
                <li className="Mred">{user.lunch[1]}</li>
              </ul>

              <ul>
                <li className="Mblue">{user.dinner[0]}</li>
                <li className="Mred">{user.dinner[1]}</li>
              </ul>

              <ul>
                <li className="Mblue">{user.snack[0]}</li>
                <li className="Mred">{user.snack[1]}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Mbtns">
          <button
            className="MwhiteBtn"
            onClick={() => navigate("/meal/result")}
          >
            식사 다시보기
          </button>
          <button className="MpurpleBtn2" onClick={() => navigate("/calendar")}>
            확인
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealAnalysis;