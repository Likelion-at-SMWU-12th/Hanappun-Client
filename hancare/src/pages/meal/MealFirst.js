import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MealFirst.css";
import MealModal from "../../components/MealModal";

import axios from "axios";
import { baseURL } from "../../api/baseURL";

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

  const [mealType, setMealType] = useState(1); // 기본값: 아침
  const [mealItems, setMealItems] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 특정 날짜 식사 기록 조회 API ---------------------------------------
  const fetchMealData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}meal/${params.username}/date/?date=${params.date}`
      );
      setMealData(response.data);
    } catch (error) {
      console.error("식사 기록 조회 중 오류 발생: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealData();
  }, []);

  // 예시 데이터 mymealData
  const myMealData = {
    1: {
      meal: "아침",
      foods: [],
    },
    2: {
      meal: "점심",
      foods: [],
    },
    3: {
      meal: "저녁",
      foods: [],
    },
    4: {
      meal: "간식",
      foods: [],
    },
  };

  const extractMealInfo = (mealData) => {
    const result = {
      morning: [],
      lunch: [],
      dinner: [],
      snack: [],
    };

    const extractFromList = (list, key) => {
      if (list && Array.isArray(list)) {
        list.forEach((meal) => {
          if (result[key] != null) {
            result[key].push({
              name: meal.name,
              good_ingredients: meal.ingredient_details?.likes || [],
              bad_ingredients: meal.ingredient_details?.dislikes || [],
              soso_ingredients: meal.ingredient_details?.soso || [],
              foodId: meal.id,
            });
          }
        });
      }
    };

    extractFromList(mealData?.morning_list, "morning");
    extractFromList(mealData?.lunch_list, "lunch");
    extractFromList(mealData?.dinner_list, "dinner");
    extractFromList(mealData?.snack_list, "snack");

    return result;
  };

  const mealInfo = extractMealInfo(mealData);

  myMealData[1].foods = mealInfo.morning; // 1 is breakfast
  myMealData[2].foods = mealInfo.lunch; // 2 is lunch
  myMealData[3].foods = mealInfo.dinner; // 3 is dinner
  myMealData[4].foods = mealInfo.snack; // 4 is snack

  const selectedMeal = myMealData[mealType];

  // 특정 날짜 식사 기록 삭제 API -----------------------------------------
  const deleteMealFromDB = async (name, id) => {
    try {
      const response = await axios.delete(
        `${baseURL}/meal/${params.username}/${id}`
      );
      if (response.status !== 200 && response.status !== 204) {
        throw new Error("음식을 삭제하는데 실패했습니다.");
      }
      alert(`${name} 을/를 삭제되었습니다. 🧹🧹`);

      // 상태에서 식사 삭제
      handleRemoveMeal(name);
    } catch (error) {
      console.error(error.message);
    }
  };

  // 끼니 클릭 함수
  const handleClickMeal = (e) => {
    const { value } = e.target;
    setMealType(Number(value)); // 클릭된 버튼의 값을 상태에 저장
  };

  const handleRemoveMeal = (name) => {
    setMealItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  // 수정하기 버튼 함수
  const handleEditMeal = (id) => {
    const selectedFood = selectedMeal.foods[id];
    navigate(`/meal/second_edit/${params.username}/${params.date}`, {
      state: {
        foodId: id,
      },
    });
  };

  // 삭제 modal ---------------------------------------------
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [foodId, setFoodId] = useState(null);

  const handleRemoveMealButton = (name, id) => {
    setItemToDelete(name);
    setFoodId(id);
    setShowModal(true); // 모달창 띄움
  };

  const handleCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
    setFoodId(null);
  };

  const handleConfirm = async () => {
    if (itemToDelete !== null) {
      // DB에서 삭제
      await deleteMealFromDB(itemToDelete, foodId);

      // 모달 닫기
      setShowModal(false);
      setItemToDelete(null);
      setFoodId(null);
      fetchMealData();
    }
  };

  const renderDeleteModal = () =>
    showModal && (
      <MealModal
        title="알림"
        message={`${itemToDelete} 을/를 삭제하시겠습니까?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        confirm="삭제"
      />
    );

  // 추가 modal ---------------------------------------------
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMealName, setNewMealName] = useState("");

  const handleAddMealButton = () => {
    setShowAddModal(true);
  };

  const handleAddMealCancel = () => {
    setShowAddModal(false);
    setNewMealName("");
  };

  const handleAddMealNext = () => {
    let mealTypeToString;
    switch (mealType) {
      case 1:
        mealTypeToString = "morning";
        break;
      case 2:
        mealTypeToString = "lunch";
        break;
      case 3:
        mealTypeToString = "dinner";
        break;
      case 4:
        mealTypeToString = "snack";
        break;
    }
    if (newMealName.trim()) {
      navigate(`/meal/second_new/${params.username}/${params.date}`, {
        state: { newMeal: newMealName, mealType: mealTypeToString },
      });
      setShowAddModal(false);
    } else {
      alert("메뉴 이름을 입력하세요.");
    }
  };

  const renderAddModal = () =>
    showAddModal && (
      <MealModal
        title="식사 입력하기"
        message={
          <>
            {selectedMeal.meal}
            <div className="MFinput">
              <input
                type="text"
                placeholder="메뉴를 5자 이내로 입력해주세요"
                value={newMealName}
                maxLength="5"
                onChange={(e) => setNewMealName(e.target.value)}
              />
            </div>
          </>
        }
        onCancel={handleAddMealCancel}
        onConfirm={handleAddMealNext}
        confirm="다음"
      />
    );

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
            className={mealType === 1 ? "MFselected" : ""}
          >
            아침
          </button>
          <button
            onClick={handleClickMeal}
            value="2"
            className={mealType === 2 ? "MFselected" : ""}
          >
            점심
          </button>
          <button
            onClick={handleClickMeal}
            value="3"
            className={mealType === 3 ? "MFselected" : ""}
          >
            저녁
          </button>
          <button
            onClick={handleClickMeal}
            value="4"
            className={mealType === 4 ? "MFselected" : ""}
          >
            간식
          </button>
        </div>
        <hr />
        <div className="MFcontents">
          <div className="MFmealList">
            {selectedMeal &&
            selectedMeal.foods &&
            selectedMeal.foods.length > 0 ? (
              selectedMeal.foods.map((food, index) => (
                <div key={index} className="MFmealOne">
                  <div className="MFmealDiv" value={food.name}>
                    {food.name}
                  </div>
                  <ul className="MFingredients">
                    <li className="MFgoodIngredients">
                      {food.good_ingredients.map((ingredient, i) => (
                        <span key={i}>
                          {ingredient}
                          {"  "}
                        </span>
                      ))}
                    </li>
                    <li className="MFbadIngredients">
                      {food.bad_ingredients.map((ingredient, i) => (
                        <span key={i}>
                          {ingredient}
                          {"  "}
                        </span>
                      ))}
                    </li>
                    <li className="MFsosoIngredients">
                      {food.soso_ingredients.map((ingredient, i) => (
                        <span key={i}>
                          {ingredient}
                          {"  "}
                        </span>
                      ))}
                    </li>
                  </ul>
                  <div className="MFmealbtns">
                    <button
                      className="MFedit-button"
                      onClick={() => handleEditMeal(food.foodId)}
                    >
                      <img alt="edit" src="/images/edit.png" />
                    </button>
                    <button
                      className="MFremove-button"
                      onClick={() =>
                        handleRemoveMealButton(food.name, food.foodId)
                      }
                    >
                      <img alt="remove" src="/images/remove.png" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span></span>
            )}
          </div>
        </div>

        {/* 모달 렌더링 */}
        {renderDeleteModal()}
        {renderAddModal()}

        <div className="MFbtns">
          <button className="MFaddMealBtn" onClick={handleAddMealButton}>
            추가하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default MealFirst;
