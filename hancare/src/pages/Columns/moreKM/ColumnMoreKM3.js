import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Column.css";

const ColumnMoreKM1 = () => {
  const navigate = useNavigate();
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Column">
      <header className="ColumnHeader">
        <h4>한의학 초심자를 위한 가이드북</h4>
        <h2>
          보양식이라고 <br /> 모두 힘이 나진 않아요
        </h2>
        <p>2024년 5월 14일 송진리 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/healthFood.png" />
        <div className="ColumnContent">
          <p className="ColumnQ">Q. 보양식은 모두에게 좋은 음식이 아닌가요?</p>
          <p>
            A. <span className="ColumnPurple">그렇지 않아요!</span> 8체질의
            시각에서 접근해 알려드릴게요
          </p>
          <p>인삼으로 예를 들어볼까요?</p>
          <p>
            <span className="ColumnBold">
              췌장과 위장이 강장기인 토양체질과 토음체질은 인삼이 체질에 좋지
              않아요.
            </span>
            기능적으로 강장기인 췌장과 위장의 열을 강하게 하거든요. 그 결과,
            약한 신장과 방광과의 불균형으로 몸은
            <span className="ColumnBold">'과불균형 상태'</span>, 그리고 나이가
            <span className="ColumnBold">'적불균형 상태'</span>로 면역 긴으들이
            순차적으로 약화되거나 상실되어요.
          </p>
          <p>
            뿐만 아니에요.
            <span className="ColumnBold">녹용의 효과도 체질마다 달라요.</span>
            목양, 목음 체질의 경우 녹용의 섭취가 좋을 수 있지만 수양과 수음
            체질의 경우 자주 섭취하는 것은 좋지 않아요. 나머지 토양, 토음, 금양,
            금음 체질에는 매우 안좋은 것이 녹용이에요!
          </p>
          <p>보양식이라고 모두에게 좋지는 않은 이유, 다들 알 수 있겠죠?</p>
          <p>
            <span className="ColumnPurple">체질에 맞게 섭취하도록 해요!</span>
          </p>
        </div>
        <div className="ColumnWriter">
          <img alt="작성자(한의원장)사진" src="/images/columnWriter.png" />
          <p>
            <span className="ColumnBold">송진리 숙명 한의원 진리실 원장</span>
            <br />
            '한의학에 대한 올바른 접근!'
          </p>
          <button onClick={() => navigate("/map/4")}>
            숙명 한의원 바로가기
          </button>{" "}
          {/*숙명한의원 링크*/}
        </div>
        <div className="KMColumnMore">
          <h3>다른 칼럼도 있어요</h3>
          <button onClick={() => navigate("/column/moreKM4")}>
            <span className="Column11pt">지금까지의 한의학</span>
            <br />
            명순헌 원장
          </button>
          <button onClick={() => navigate("/column/moreKM1")}>
            <span className="Column11pt">한의사가 알려주는 8체질 Q&A</span>
            <br />
            김수련 원장
          </button>
          <button onClick={() => navigate("/column/moreKM2")}>
            <span className="Column11pt">방금 먹은 점심이 중요한 이유</span>
            <br />
            김수련 원장
          </button>
        </div>
      </main>
    </div>
  );
};

export default ColumnMoreKM1;
