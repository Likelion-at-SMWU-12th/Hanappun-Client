import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MealFirst.css";

const MealFirst = () => {
  const navigate = useNavigate();
  const params = useParams();

  const today = new Date(params.date);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mealItems, setMealItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMealItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), name: inputValue.trim() },
      ]);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleRemoveMeal = (id) => {
    setMealItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleNext = () => {
    navigate(`/meal/second/${params.username}/${params.date}`, {
      state: { mealItems },
    });
  };

  const renderMealItems = () => {
    return mealItems.map((item) => (
      <div key={item.id} className="meal-item">
        <span>{item.name}</span>
        <button
          className="remove-button"
          onClick={() => handleRemoveMeal(item.id)}
        >
          x
        </button>
      </div>
    ));
  };

  return (
    <div className="MFbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="MFh2">오늘의 식사</h2>
      </header>
      <div className="MFdate">{formattedDate}</div>
      <main className="MFmain">
        <div className="MFinput">
          <form id="meal-form" onSubmit={handleAddMeal}>
            <input
              type="text"
              placeholder="음식명 입력하기"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit">입력</button>
          </form>
        </div>
        <hr />
        <div className="MFcontents">{renderMealItems()}</div>
        <div className="MFbtns">
          <button className="MFpurpleBtn" onClick={handleNext}>
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealFirst;
