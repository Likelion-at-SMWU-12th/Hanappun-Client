import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./MealResult.css";
import axios from "axios";
import { baseURL } from "../../api/baseURL";

const MealResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mealType, mealItems, mealElements } = location.state || {};
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date(params.date);
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const displayDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  const getMealTypeName = (type) => {
    switch (type) {
      case 1:
        return "morning";
      case 2:
        return "lunch";
      case 3:
        return "dinner";
      case 4:
        return "snack";
      default:
        return "";
    }
  };

  const MealKorean = (type) => {
    switch (type) {
      case "morning":
        return "아침";
      case "lunch":
        return "점심";
      case "dinner":
        return "저녁";
      case "snack":
        return "간식";
      default:
        return "";
    }
  };

  const renderMealItems = () => {
    if (!mealItems || !mealElements) {
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

  const prepareMealData = () => {
    const mealData = {
      username: params.username,
      date: formattedDate,
      morning: [],
      lunch: [],
      dinner: [],
      snack: [],
    };

    const mealTypeName = getMealTypeName(mealType);
    mealData[mealTypeName] = mealItems.map((item) => {
      const elements = mealElements[item.id] || [];
      return {
        menu_name: item.name,
        animal_protein:
          elements
            .filter((el) => el.type === "animal_protein")
            .map((el) => ({ name: el.name })) || [],
        vegetable_protein:
          elements
            .filter((el) => el.type === "vegetable_protein")
            .map((el) => ({ name: el.name })) || [],
        carbohydrate:
          elements
            .filter((el) => el.type === "carbohydrate")
            .map((el) => ({ name: el.name })) || [],
        root_vegetables:
          elements
            .filter((el) => el.type === "root_vegetables")
            .map((el) => ({ name: el.name })) || [],
        vegetables:
          elements
            .filter((el) => el.type === "vegetables")
            .map((el) => ({ name: el.name })) || [],
        herb:
          elements
            .filter((el) => el.type === "herb")
            .map((el) => ({ name: el.name })) || [],
        seaweed:
          elements
            .filter((el) => el.type === "seaweed")
            .map((el) => ({ name: el.name })) || [],
        fruit:
          elements
            .filter((el) => el.type === "fruit")
            .map((el) => ({ name: el.name })) || [],
      };
    });

    return mealData;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const mealData = prepareMealData();

      // 식사 기록 조회
      const response = await axios.get(`${baseURL}/meal/`);
      const existingRecord = response.data.data.find(
        (record) => record.date === formattedDate
      );
      console.log("결과", existingRecord);

      let saveResponse;
      if (existingRecord) {
        // 기존 기록 수정 (PUT 요청 사용)
        saveResponse = await axios.put(`${baseURL}/meal/`, mealData);
      } else {
        // 새 기록 생성 (POST 요청 사용)
        saveResponse = await axios.post(`${baseURL}/meal/`, mealData);
      }

      console.log("서버 응답:", saveResponse.data);
      alert(
        existingRecord
          ? "식사 정보가 수정되었습니다!"
          : "식사 정보가 저장되었습니다!"
      );
      navigate(`/meal/analysis/${params.username}/${params.date}`);
    } catch (error) {
      console.error("식사 정보 저장 중 오류 발생:", error);
      console.error("에러 상세 정보:", error.response?.data);
      alert(`식사 정보 저장에 실패했습니다. 오류: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mealType || !mealItems || !mealElements) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="MRbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="MRh2">오늘의 식사</h2>
      </header>
      <div className="MRdate">{displayDate}</div>
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
        <p className="MRtitle">
          오늘의 {MealKorean(getMealTypeName(mealType))}
        </p>
        <div className="MRcontent">{renderMealItems()}</div>
        <div className="MRbtns">
          <button className="MRblackBtn" onClick={() => navigate(-1)}>
            수정
          </button>
          <button
            className="MRpurpleBtn"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "확인"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealResult;
