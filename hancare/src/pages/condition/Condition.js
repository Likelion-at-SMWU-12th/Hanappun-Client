import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Condition.css";

import { baseURL } from "../../api/baseURL";

const Condition = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const today = new Date(params.date);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  const [conditionData, setConditionData] = useState({
    condition_cate: [],
    mood_cate: [],
    memo: "",
  });

  const [payload, setPayload] = useState({
    user: "",
    date: "",
    condition_cate: "",
    mood_cate: "",
    memo: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    initializePayload();
    fetchConditionData();
  }, []);

  const initializePayload = () => {
    setPayload({
      user: params.username,
      date: params.date,
      condition_cate: "",
      mood_cate: "",
      memo: "",
    });
  };

  const fetchConditionData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/condition/${params.username}/${params.date}`
      );
      if (response.data.data.length > 0) {
        const data = response.data.data[0];
        setConditionData({
          condition_cate: data.condition_cate.split(", "),
          mood_cate: data.mood_cate.split(", "),
          memo: data.memo,
        });
        setPayload({
          user: params.username,
          date: params.date,
          condition_cate: data.condition_cate,
          mood_cate: data.mood_cate,
          memo: data.memo,
        });
      }
    } catch (error) {
      console.error("Error fetching condition data:", error);
    }
    setIsLoading(false);
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
      const categoryKey =
        category === "몸 상태" ? "condition_cate" : "mood_cate";
      const updatedCategory = prevData[categoryKey].includes(element)
        ? prevData[categoryKey].filter((item) => item !== element)
        : [...prevData[categoryKey], element];

      setPayload((prev) => ({
        ...prev,
        [categoryKey]: updatedCategory.join(", "),
      }));

      return { ...prevData, [categoryKey]: updatedCategory };
    });
  };

  const handleMemoChange = (e) => {
    setConditionData((prevData) => ({
      ...prevData,
      memo: e.target.value,
    }));
    setPayload((prev) => ({
      ...prev,
      memo: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const checkResponse = await axios.get(
        `${baseURL}/condition/${params.username}/${params.date}`
      );
      console.log("Check response:", checkResponse);
      let response;
      if (checkResponse.data.data && checkResponse.data.data.length > 0) {
        // 기존 데이터가 있으면 수정
        response = await axios.put(
          `${baseURL}/condition/${params.username}/${payload.date}/`,
          payload
        );
        console.log("Save/Update response:", response);
      } else {
        // 기존 데이터가 없으면 생성
        response = await axios.post(`${baseURL}/condition/`, payload);
        console.log("Save/Update response:", response);
      }

      if (response.status === 201) {
        alert(`${formattedDate}의 컨디션이 저장되었습니다`);
        navigate(-1);
      } else if (response.status === 200) {
        alert(`${formattedDate}의 컨디션이 수정되었습니다`);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);

      if (error.response) {
        // 서버가 응답을 반환했지만 2xx 범위를 벗어난 상태 코드
        console.error("Error response:", error.response);
        const errorMessage =
          error.response.data.message ||
          error.response.data ||
          "알 수 없는 서버 오류";
        alert(`서버 오류: ${errorMessage}`);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못함
        console.error("Error request:", error.request);
        alert("네트워크 오류: 서버에 연결할 수 없습니다.");
      } else {
        // 요청을 설정하는 중에 문제가 발생
        console.error("Error", error.message);
        alert("오류 발생: " + error.message);
      }
    }
  };

  const renderElements = (category) => {
    return elementCategories[category].map((element) => (
      <button
        key={element}
        onClick={() => handleElementClick(category, element)}
        className={
          conditionData[
            category === "몸 상태" ? "condition_cate" : "mood_cate"
          ].includes(element)
            ? "Cselected"
            : ""
        }
      >
        {element}
      </button>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Cbackground">
      <header className="blackHeader">
        <img alt="back" onClick={() => navigate(-1)} src="/images/back.png" />
        <h2 className="Ch2">오늘의 컨디션</h2>
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
          <button className="CpurpleBtn" onClick={handleSave}>
            저장하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Condition;
