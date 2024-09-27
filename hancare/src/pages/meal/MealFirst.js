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

  // State variables
  const [mealData, setMealData] = useState({
    1: { meal: "아침", foods: [] },
    2: { meal: "점심", foods: [] },
    3: { meal: "저녁", foods: [] },
    4: { meal: "간식", foods: [] },
  });

  const [mealType, setMealType] = useState(1); // Default: Breakfast

  // Delete modal state
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMealName, setNewMealName] = useState("");

  // Fetch meal data from the backend
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.fetch(
          `${baseURL}/meal/?date=${params.date}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meal data");
        }
        const data = await response.json();
        // Transform data into mealData structure
        const newMealData = {
          1: { meal: "아침", foods: [] },
          2: { meal: "점심", foods: [] },
          3: { meal: "저녁", foods: [] },
          4: { meal: "간식", foods: [] },
        };

        data.forEach((meal) => {
          let timing = meal.timing; // e.g., 'morning'
          let mealType;
          switch (timing) {
            case "morning":
              mealType = 1;
              break;
            case "lunch":
              mealType = 2;
              break;
            case "dinner":
              mealType = 3;
              break;
            case "snack":
              mealType = 4;
              break;
            default:
              mealType = 0;
          }

          if (mealType && newMealData[mealType]) {
            const good_ingredients = meal.ingredient_details.likes;
            const bad_ingredients = meal.ingredient_details.dislikes;
            newMealData[mealType].foods.push({
              id: meal.id,
              name: meal.name,
              good_ingredients: good_ingredients,
              bad_ingredients: bad_ingredients,
            });
          }
        });

        setMealData(newMealData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMealData();
  }, [params.date]);

  // Delete meal from DB
  const deleteMealFromDB = async (mealId) => {
    try {
      const response = await fetch(`/meal/${mealId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }
      console.log("Meal deleted");
    } catch (error) {
      console.error(error.message);
    }
  };

  // Meal type selection handler
  const handleClickMeal = (e) => {
    const { value } = e.target;
    setMealType(Number(value));
  };

  // Delete modal handlers
  const handleRemoveMealButton = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleRemoveMeal = (mealId) => {
    setMealData((prevData) => {
      const newData = { ...prevData };
      Object.keys(newData).forEach((mealType) => {
        newData[mealType].foods = newData[mealType].foods.filter(
          (meal) => meal.id !== mealId
        );
      });
      return newData;
    });
  };

  const handleConfirm = async () => {
    if (itemToDelete !== null) {
      await deleteMealFromDB(itemToDelete);
      handleRemoveMeal(itemToDelete);
      setShowModal(false);
    }
  };

  const renderDeleteModal = () =>
    showModal && (
      <MealModal
        title="알림"
        message={`삭제하시겠습니까?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        confirm="삭제"
      />
    );

  // Add modal handlers
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
        state: { newMeal: newMealName, mealType: mealType },
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
            {mealData[mealType].meal}
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

  // Edit meal handler
  const handleEditMeal = (mealId) => {
    const mealToEdit = getMealById(mealId);
    navigate(`/meal/second/${params.username}/${params.date}`, {
      state: { mealItem: mealToEdit },
    });
  };

  const getMealById = (mealId) => {
    for (const mealTypeKey in mealData) {
      const mealType = mealData[mealTypeKey];
      const meal = mealType.foods.find((m) => m.id === mealId);
      if (meal) {
        return {
          ...meal,
          timing: mealTypeKey,
        };
      }
    }
    return null;
  };

  // Selected meal
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
            {selectedMeal.foods.map((food) => (
              <div key={food.id} className="MFmealOne">
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
                    onClick={() => handleEditMeal(food.id)}
                  >
                    <img alt="edit" src="/images/edit.png" />
                  </button>
                  <button
                    className="MFremove-button"
                    onClick={() => handleRemoveMealButton(food.id)}
                  >
                    <img alt="remove" src="/images/remove.png" />
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>

        {/* Modal Rendering */}
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
