import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./MealResult.css";

const MealREResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mealType } = location.state || {};
  const [mealItems, setMealItems] = useState([]);
  const [mealElements, setMealElements] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/getMealData",
          {
            params: { mealType },
          }
        );
        const { mealItems, mealElements } = response.data;
        setMealItems(mealItems);
        setMealElements(mealElements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [mealType]);

  useEffect(() => {
    console.log("가져온 자료:", mealType, mealItems, mealElements);
  }, [mealType, mealItems, mealElements]);

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  const getMealTypeName = (type) => {
    switch (type) {
      case 1:
        return "아침";
      case 2:
        return "점심";
      case 3:
        return "저녁";
      case 4:
        return "간식";
      default:
        return "식사";
    }
  };

  const renderMealItems = () => {
    if (loading) {
      return <p>로딩 중...</p>;
    }

    if (!mealItems.length || !Object.keys(mealElements).length) {
      return <p>식사 정보가 기록되지 않았어요 🥲</p>;
    }

    return mealItems.map((item) => (
      <div key={item.id} className="MRmeal-item">
        <span>
          <p>{item.name}</p>
        </span>
        <ul>
          {mealElements[item.id]?.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </div>
    ));
  };

  const handleSave = () => {
    alert("식사 정보가 저장되었습니다!");
    navigate("/meal/analysis");
  };

  return (
    <div className="MRbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="MRh2">오늘의 식사</h2>
      </header>
      <div className="MRdate">{formattedDate}</div>
      <main className="MRmain">
        <div className="MRmenu">
          <span className="MRpurpleDiv">끼니</span>
          <button value="1" className={mealType === 1 ? "MRselected" : ""}>
            아침
          </button>
          <button value="2" className={mealType === 2 ? "MRselected" : ""}>
            점심
          </button>
          <button value="3" className={mealType === 3 ? "MRselected" : ""}>
            저녁
          </button>
          <button value="4" className={mealType === 4 ? "MRselected" : ""}>
            간식
          </button>
        </div>
        <hr />
        <p className="MRtitle">오늘의 {getMealTypeName(mealType)}</p>

        <div className="MRcontent">{renderMealItems()}</div>
        <div className="MRbtns">
          <button className="MRblackBtn" onClick={() => navigate(-1)}>
            수정
          </button>
          <button className="MRpurpleBtn" onClick={handleSave}>
            확인
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealREResult;
