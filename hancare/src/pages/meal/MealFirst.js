import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MealFirst.css";
import MealModal from "../../components/MealModal";

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

  // 음식 삭제 API 호출
  const deleteMealFromDB = async (mealId) => {
    try {
      const response = await fetch(`/api/meals/${mealId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("음식을 삭제하는데 실패했습니다.");
      }
      console.log("삭제 완료");
    } catch (error) {
      console.error(error.message);
    }
  };

  const [mealType, setMealType] = useState(1); // 기본값: 아침
  const [mealItems, setMealItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // 끼니 클릭 함수
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
        { id: Date.now(), name: inputValue.trim() },
      ]);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleRemoveMeal = (id) => {
    setMealItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditMeal = (id) => {
    // 수정하기 버튼 클릭 시 동작
    alert(`수정하기 기능을 구현할 파일을 열겠습니다. 아이디: ${id}`);
    const mealToEdit = mealItems.find((item) => item.id === id);
    navigate(`/meal/second/${params.username}/${params.date}`, {
      state: { mealToEdit },
    });
  };

  // 삭제 modal
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleRemoveMealButton = (id) => {
    setItemToDelete(id);
    setShowModal(true); // 모달창 띄움
  };

  const handleCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleConfirm = async () => {
    if (itemToDelete !== null) {
      // DB에서 삭제
      await deleteMealFromDB(itemToDelete);

      // 상태에서 삭제
      handleRemoveMeal(itemToDelete);
      setShowModal(false); // 모달 닫기
    }
  };

  // JSX에서 조건부 렌더링 수정
  const renderDeleteModal = () =>
    showModal && (
      <MealModal
        title="알림"
        message={<>{selectedMeal.food}를 삭제하시겠습니까?</>}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        confirm="삭제"
      />
    );

  // 추가 modal
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
    if (newMealName.trim()) {
      navigate(`/meal/second/${params.username}/${params.date}`, {
        state: { newMeal: newMealName },
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
                maxlength="5"
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

  // 예시 데이터 mealData
  const mealData = {
    1: {
      meal: "아침",
      foods: [
        {
          name: "쌀국수",
          good_ingredients: ["소고기", "쌀(백미)"],
          bad_ingredients: ["돼지고기"],
        },
        {
          name: "돈가츠",
          good_ingredients: ["쌀", "채소"],
          bad_ingredients: ["밀가루", "튀김옷"],
        },
        {
          name: "레몬에이드",
          good_ingredients: ["레몬"],
          bad_ingredients: ["설탕"],
        },
      ],
    },
    2: {
      meal: "점심",
      foods: [
        {
          name: "치킨샐러드",
          good_ingredients: ["닭가슴살", "야채"],
          bad_ingredients: ["드레싱"],
        },
        {
          name: "스테이크",
          good_ingredients: ["소고기"],
          bad_ingredients: ["버터", "소금"],
        },
      ],
    },
    3: {
      meal: "저녁",
      foods: [
        {
          name: "파스타",
          good_ingredients: ["토마토"],
          bad_ingredients: ["밀가루", "크림"],
        },
        {
          name: "피자",
          good_ingredients: ["치즈"],
          bad_ingredients: ["밀가루", "기름"],
        },
      ],
    },
    4: {
      meal: "간식",
      foods: [
        {
          name: "과일 샐러드",
          good_ingredients: ["과일", "요거트"],
          bad_ingredients: [],
        },
        {
          name: "아이스크림",
          good_ingredients: ["우유"],
          bad_ingredients: ["설탕", "크림"],
        },
      ],
    },
  };

  const selectedMeal = mealData[mealType];

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
          <ul className="MFmealList">
            {selectedMeal.foods.map((food, index) => (
              <div key={index} className="MFmealOne">
                <span className="MFmealDiv">{food.name}</span>
                <div className="MFingredients">
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
                </div>
                <div className="MFmealbtns">
                  <button
                    className="MFedit-button"
                    onClick={() => handleEditMeal(index)}
                  >
                    <img alt="edit" src="/images/edit.png" />
                  </button>
                  <button
                    className="MFremove-button"
                    onClick={() => handleRemoveMealButton(index)}
                  >
                    <img alt="remove" src="/images/remove.png" />
                  </button>
                </div>
              </div>
            ))}
          </ul>
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
