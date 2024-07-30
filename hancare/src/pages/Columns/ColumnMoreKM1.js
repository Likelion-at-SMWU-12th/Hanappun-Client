import React from "react";
import { useNavigate } from "react-router-dom";
import "./Column.css";

const ColumnMoreKM1 = () => {
  const navigate = useNavigate();

  return (
    <div className="Column">
      <header className="ColumnHeader">
        <h4>한의학 초심자를 위한 가이드북 (1)</h4>
        <h2>
          한의사가 알려주는 <br /> 8체질 Q&A
        </h2>
        <p>2024년 5월 25일 김수련 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/column_eight_consitutions.png" />
        <div className="ColumnContent">
          <p className="ColumnQ">Q. 8체질에서 '음양'은 무엇이 다른가요?</p>
          <p>
            A. 우리에게 친숙한 서양 의학을 들어 설명해볼게요. 8체질 가운데 4개의
            체질은 자율신경 중
            <span className="ColumnPurple">'부교감신경긴장형'</span>이고, 다른
            4개의 체질은 <span className="ColumnPurple">'교감신경긴장형'</span>
            입니다. 여기서
            <span className="ColumnBold">
              불균형이 생겼을 때 우리의 몸에 질환이 발생
            </span>
            하는 거예요. 그래서 에핑거라는 사람이 중심이 되어 연구한 체질론이
            있는데, 그것이 바로 자율신경을 가지고 연구한 것이죠.
          </p>
          <p>한번 예를 들어볼까요?</p>
          <p>
            자율신경 중
            <span className="ColumnBold">
              부교감신경이 항상 흥분해 있는 4체질
            </span>
            은 위병이 났을 대 아트로핀 주사를 하면 위가 조금 좋아져요. 또
            카페인을 먹으면 아주 기분이 좋아집니다. 해당 체질인 분들의 맥을
            짚으면 오른쪽 맥 가운데 맥이 항상 강하게 뛰어요.
          </p>
          <p>
            다른 체질도 살펴볼게요.
            <span className="ColumnBold">
              교감신경이 항상 흥분되어있는 4체질
            </span>
            은 질환도 교감신경이 흥분되어 있는 특성으로 발생합니다. 또 왼쪽 맥의
            끝 맥이 항상 강하게 뛰어요.
          </p>
          <p>
            이런 공통적인 특성은 무엇을 말하는 걸까요?
            <span className="ColumnPurple">
              우리의 맥 속에 우리의 신체의 장기의 흐름을 대표하는 것이 있다는
              사실
            </span>
            을 의미해요.
          </p>
          <p>신기하지 않나요?</p>
        </div>
        <div className="ColumnWriter">
          <img alt="작성자(한의원장)사진" src="/images/columnWriter.png" />
          <p>
            <span className="ColumnBold">김수련 숙명 한의원 새힘실 원장</span>
            <br /> '나의 체질에 대해 알고 싶으신가요?
          </p>
          <button onClick={() => navigate("/map")}>
            숙명 한의원 바로가기
          </button>{" "}
          {/*숙명한의원 링크*/}
        </div>
        <div className="ColumnMore">
          <h3>다른 칼럼도 있어요</h3>
          <button onClick={() => navigate("/column/moreKM2")}>
            <span className="Column11pt">지금까지의 한의학</span>
            <br />
            명순헌 원장
          </button>
          <button onClick={() => navigate("/column/moreKM3")}>
            <span className="Column11pt">방금 먹은 점심이 중요한 이유</span>
            <br />
            김수련 원장
          </button>
          <button onClick={() => navigate("/column/moreKM4")}>
            <span className="Column11pt">고기라고 모두 힘이 나진 않아요</span>
            <br />
            송진리 원장
          </button>
        </div>
      </main>
    </div>
  );
};

export default ColumnMoreKM1;
