import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./MealSecond.css";
import { baseURL } from "../../api/baseURL";
import axios from "axios";

const MealSecond = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { foodId } = location.state || {}; // foodId 추가

  const [mealElements, setMealElements] = useState({});
  const [mealName, setMealName] = useState("");
  const [mealItem, setMealItem] = useState(null);

  // 카테고리별 요소들
  const elementCategories = {
    "동물성 단백질": [
      "쇠고기",
      "돼지고기",
      "닭고기",
      "오리고기",
      "우유",
      "유제품",
      "버터",
      "치즈",
      "바다 생선",
      "민물 생선",
      "조개류",
      "굴",
      "갑각류",
      "흰살생선",
      "붉은살 생선",
      "복어",
      "녹용",
    ],
    "식물성 단백질": [
      "콩",
      "팥",
      "밤",
      "청국장",
      "견과류",
      "도토리",
      "된장",
      "두부",
    ],
    "탄수화물(곡류)": [
      "백미",
      "현미",
      "찹쌀",
      "보리",
      "메밀",
      "옥수수",
      "밀가루",
    ],
    "근채류(뿌리채소)": ["감자", "고구마", "생강", "도라지", "마"],
    "채소(잎, 줄기채소)": [
      "배추",
      "상추",
      "깻잎",
      "오이",
      "호박",
      "가지",
      "토마토",
      "시금치",
      "아보카도",
    ],
    "허브 및 양념류": ["고추", "마늘", "설탕", "꿀"],
    해조류: ["미역", "김"],
    과일: [
      "와인",
      "알로에",
      "사과",
      "망고",
      "수박",
      "청포도",
      "참외",
      "딸기",
      "모과",
      "복분자",
      "감",
    ],
  };

  // 특정 날짜 식사 기록 수정 API
  const putMealItem = async (name, timing, ingredients) => {
    alert(
      JSON.stringify({
        name: name,
        date: params.date,
        timing: timing,
        ingredients: ingredients,
      })
    );

    axios.put(
      `${baseURL}/meal/${params.username}/date/?date=${params.date}/`,
      JSON.stringify({
        name: name,
        date: params.date,
        timing: timing,
        ingredients: ingredients,
      })
    );
  };

  // 특정 날짜 식사 기록 조회 API
  useEffect(() => {
    const fetchMealItem = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/meal/${params.username}/${foodId}`
        );

        const data = response.data;

        // 데이터가 유효한지 체크
        if (data != null) {
          setMealItem(data);
          setMealElements((prevElements) => ({
            ...prevElements,
            [foodId]: data.ingredients.map((ingredient) => ingredient.name),
          }));
          setMealName(data.name);
        } else {
          alert("식사 정보가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("식사 정보를 가져오는 중 오류가 발생했습니다.");
      }
    };

    if (foodId) {
      // foodId가 유효한 경우에만 호출
      fetchMealItem();
    }
  }, [params.username, foodId]); // username과 foodId 변경될 때마다 호출
  const handleElementClick = (element) => {
    setMealElements((prevElements) => {
      const updatedElements = { ...prevElements };
      const currentElements = updatedElements[foodId] || [];

      if (currentElements.includes(element)) {
        updatedElements[foodId] = currentElements.filter((e) => e !== element);
      } else if (currentElements.length < 4) {
        updatedElements[foodId] = [...currentElements, element];
      }

      return updatedElements;
    });
  };

  const handleSave = async () => {
    const currentMealElements = mealElements[foodId];

    if (!currentMealElements || currentMealElements.length === 0) {
      alert("한 개 이상의 요소를 선택해주세요");
      return;
    } else {
      const dataToSave = {
        name: mealName,
        date: params.date,
        timing: mealItem?.timing, // 기존 식사의 timing 사용
        ingredients: currentMealElements.map((element) => ({ name: element })),
      };

      putMealItem(dataToSave.name, dataToSave.timing, dataToSave.ingredients);
    }
  };

  return (
    <div className="MSbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="MSh2">오늘의 식사</h2>
      </header>
      <div className="MSdate">{formattedDate}</div>
      <main className="MSmain">
        <div className="MSmenu">
          <button className="MSselected">{mealName}</button>
          <hr />
        </div>

        <div className="MScontents">
          <p>
            <span className="MSbold">음식의 구성요소를 선택해주세요</span>
            <br /> 높은 비중을 차지한 순으로{" "}
            <span className="MSbold">최대 4개</span>를 선택할 수 있어요
          </p>
          {Object.keys(elementCategories).map((category) => (
            <div key={category} className="meal_category">
              <h3>{category}</h3>
              <hr />
              {elementCategories[category].map((element) => (
                <button
                  key={element}
                  onClick={() => handleElementClick(element)}
                  className={
                    mealElements[foodId]?.includes(element) ? "MSselected" : ""
                  }
                >
                  {element}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="MSbtns">
          <button className="MSpurpleBtn" onClick={handleSave}>
            저장하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealSecond;
