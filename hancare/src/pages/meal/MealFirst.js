import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MealFirst.css";

const MealFirst = () => {
  const navigate = useNavigate();
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mealType, setMealType] = useState(1); // 기본값: 아침
  const [mealItems, setMealItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleClickMeal = (e) => {
    const { value } = e.target;
    setMealType(Number(value)); // 클릭된 버튼의 값을 상태에 저장
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMealItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), name: inputValue.trim(), type: mealType }, // mealType 추가
      ]);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleRemoveMeal = (id) => {
    setMealItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleNext = () => {
    navigate("/meal/second", { state: { mealType, mealItems } });
  };

  const renderMealItems = () => {
    return mealItems
      .filter((item) => item.type === mealType) // 선택된 mealType에 맞는 항목만 필터링
      .map((item) => (
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
        <div className="MFmenu">
          <span className="MFpurpleDiv">끼니</span>
          <button
            onClick={handleClickMeal}
            value="1"
            className={mealType === 1 ? "selected" : ""}
          >
            아침
          </button>
          <button
            onClick={handleClickMeal}
            value="2"
            className={mealType === 2 ? "selected" : ""}
          >
            점심
          </button>
          <button
            onClick={handleClickMeal}
            value="3"
            className={mealType === 3 ? "selected" : ""}
          >
            저녁
          </button>
          <button
            onClick={handleClickMeal}
            value="4"
            className={mealType === 4 ? "selected" : ""}
          >
            간식
          </button>
        </div>
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
        <div className="MRbtns">
          <button className="MpurpleBtn" onClick={handleNext}>
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealFirst;
