import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Meal.css";

import axios from "axios";
import { baseURL } from "../../api/baseURL";
import { getuserData } from "../../api/getuserData";

const MealAnalysis = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [userNickname, setUserNickname] = useState("");

  const getUserNickname = async () => {
    const result = await getuserData(params.username);

    if (result.status == 200) {
      setUserNickname(result.data.result.nickname);
    } else {
    }
  };

  useEffect(() => {
    getUserNickname();
  }, [params.username]);

  const today = new Date(params.date);
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

  // 식사 기록 조회
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/date/meal/${params.username}/${params.date}`
        );
        setMealData(response.data.data[0]);
      } catch (error) {
        console.error("식사 기록 조회 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealData();
  }, [params.date]);

  //테스트용 데이터
  const user = {
    name: userNickname,
    todayMeal: mealData.overall_status,
    breakfast: [mealData.morning_good_foods, mealData.morning_bad_foods],
    lunch: [mealData.lunch_good_foods, mealData.lunch_bad_foods],
    dinner: [mealData.dinner_good_foods, mealData.dinner_bad_foods],
    snack: [mealData.snack_good_foods, mealData.snack_bad_foods],
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
            <div className="Mmeal_one">
              <ul className="MA_ulblue">
                {Array.isArray(user.breakfast[0]) &&
                  user.breakfast[0].length > 0 &&
                  (user.breakfast[0] + "").split(",").map((item, index) => (
                    <li key={`breakfast-good-${index}`} className="Mblue">
                      {item.trim()}
                    </li>
                  ))}
              </ul>
              <div className="vertical-divider"></div>
              <ul>
                {Array.isArray(user.breakfast[1]) &&
                  user.breakfast[1].length > 0 &&
                  (user.breakfast[1] + "").split(",").map((item, index) => (
                    <li key={`breakfast-bad-${index}`} className="Mred">
                      {item.trim()}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="Mbtns">
          <button
            className="MwhiteBtn"
            onClick={() =>
              navigate(`/meal/first/${params.username}/${params.date}`)
            }
          >
            수정
          </button>
          <button
            className="MpurpleBtn2"
            onClick={() => navigate(`/mainpage/${params.username}`)}
          >
            확인
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealAnalysis;
