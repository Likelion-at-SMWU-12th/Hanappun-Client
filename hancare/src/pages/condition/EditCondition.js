import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Condition.css";

const EditCondition = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 컨디션 ID를 가져옵니다

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchConditionData();
  }, []);

  const [conditionData, setConditionData] = useState({
    bodyCondition: [],
    moodChange: [],
    memo: "",
  });

  const fetchConditionData = async () => {
    try {
      const response = await axios.get(
        `https://your-backend-api.com/condition/${id}`
      );
      setConditionData(response.data);
    } catch (error) {
      console.error("Error fetching condition data:", error);
      alert("컨디션 정보를 불러오는데 실패했습니다.");
    }
  };

  // 카테고리별 요소들
  const elementCategories = {
    "몸 상태": [
      "활력 가득",
      "피로 누적",
      "두통",
      "복통",
      "허리통증",
      "변비",
      "설사",
      "소화 정상",
      "소화불량",
      "근육통",
      "메스꺼움/구토",
      "발열",
      "오한",
      "충분한 수면",
      "수면 부족",
      "과호흡",
      "손발저림",
      "어지러움",
    ],
    "기분 변화": [
      "상쾌함",
      "긍정적 마음",
      "불안/초조",
      "예민/짜증",
      "우울/무기력",
      "기억력/집중력 저하",
      "수면장애",
    ],
  };

  const handleElementClick = (category, element) => {
    setConditionData((prevData) => {
      const updatedCategory = prevData[category].includes(element)
        ? prevData[category].filter((item) => item !== element)
        : [...prevData[category], element];

      return { ...prevData, [category]: updatedCategory };
    });
  };

  const handleMemoChange = (e) => {
    setConditionData((prevData) => ({
      ...prevData,
      memo: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://your-backend-api.com/condition/${id}`,
        conditionData
      );
      if (response.status === 200) {
        alert("컨디션 정보가 수정되었습니다!");
        navigate("/mainpage"); // 홈 페이지로 이동
      }
    } catch (error) {
      console.error("Error updating condition data:", error);
      alert("컨디션 정보 수정에 실패했습니다.");
    }
  };

  const renderElements = (category) => {
    return elementCategories[category].map((element) => (
      <button
        key={element}
        onClick={() =>
          handleElementClick(
            category === "몸 상태" ? "bodyCondition" : "moodChange",
            element
          )
        }
        className={
          conditionData[
            category === "몸 상태" ? "bodyCondition" : "moodChange"
          ].includes(element)
            ? "selected"
            : ""
        }
      >
        {element}
      </button>
    ));
  };

  return (
    <div className="Cbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="Ch2">컨디션 수정</h2>
      </header>
      <div className="Cdate">{formattedDate}</div>
      <main className="Cmain">
        <div className="Ccontents">
          <div className="condition_category">
            <h3>몸 상태</h3>
            <hr />
            {renderElements("몸 상태")}
          </div>
          <div className="condition_category">
            <h3>기분 변화</h3>
            <hr />
            {renderElements("기분 변화")}
          </div>
          <div className="condition_category">
            <h3>메모</h3>
            <hr />
            <input
              type="text"
              value={conditionData.memo}
              onChange={handleMemoChange}
              placeholder="메모를 자유롭게 남겨보세요!"
              rows="4"
            />
          </div>
        </div>
        <div className="Cbtns">
          <button className="CpurpleBtn" onClick={handleUpdate}>
            수정하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditCondition;
