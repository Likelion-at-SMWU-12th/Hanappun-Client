import React from "react";
import { useNavigate } from "react-router-dom";
import "./Column.css";

const ColumnPancreotonia = () => {
  const navigate = useNavigate();

  return (
    <div className="Column">
      <header className="ColumnHeader">
        <h4>체질별 특징을 알고 싶다면?</h4>
        <h2>
          매운 음식은 그만! <br /> 토양 체질
        </h2>
        <p>2024년 7월 14일 명순헌 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/column_Pulmotonia.png" />
        <div className="ColumnContent">
          <p className="ColumnPurple">
            토양체질은 췌장과 위장은 강하지만 신장과 방광이 약해요
          </p>
          <p> 더 자세히 알려드릴게요</p>
          <p>
            췌장, 위장을 지원하는 음식에는 대표적으로{" "}
            <span className="ColumnBold">
              닭고기와 사과, 인삼, 오렌지, 꿀, 매운 향신료
            </span>
            등이 있어요. 이러한 음식으로 강장기인 췌장과 위장은 기능적으로
            과하게 흥분하게 되는데, 과해진 췌장과 위장은{" "}
            <span className="ColumnPurple">
              그 견제 대상(antagonist)이자 약장기인 신장과 방광을 더 억제
            </span>
            하게 돼요.
          </p>
          <p>
            본래 약하게 타고난 신장과 방광의 기력이 더욱 약화되면서, 강장기인
            췌장-위장과 약장기인 신장-방광의 격차가 더욱 심화되는{" "}
            <span className="ColumnBold">'과불균형 상태'</span>가 형성됩니다.
            결과적으로 모든 장기들 간의 상호 교류와 협력의 부정적 변화가
            일어나고 <span className="ColumnBold">'적불균형 상태'</span>에
            이르게 돼요. 그 결과 면역 기능들이 순차적으로 약화되거나 상실되서
            그에 해당하는 병적 증상들을 유발하게 됩니다.
          </p>
          <p>
            그 예로, 강한 췌장과 위장의 기능이 과하여 지면, 지방간, 관절염,
            세균- 바이러스감염, 알러지성 피부염, 위궤양, 통풍, 고혈압, 우울증
            등의 증상이 나타나게 돼요. 체질 특성상 불건강의 상태가 지속될 경우,
            당뇨병과 그에 관련된 합병증, 심혈관계질환 공황장애 등으로 발전될
            수도 있어요
          </p>
          <p className="ColumnBold">
            우리 몸을 위해 매운 음식을 줄여보면 어떨까요?
          </p>
        </div>
        <div className="ColumnWriter">
          <img alt="작성자(한의원장)사진" src="/images/columnWriter.png" />
          <p>
            {" "}
            <span className="ColumnBold">
              명순헌 숙명 한의원 명신실 원장
            </span>{" "}
            <br /> '나의 체질에 대해 알고 싶으신가요?
          </p>
          <button onClick={() => navigate("/map")}>숙명 한의원 바로가기</button>{" "}
          {/*숙명한의원 링크*/}
        </div>
        <div className="ColumnMore">
          <h3>다른 체질도 알아봐요</h3>
          <button onClick={() => navigate("/column/Renotonia")}>
            시원함이 필요해요 <br />
            <span className="Column11pt">수양체질</span>
          </button>
          <button onClick={() => navigate("/column/Cholecystonia")}>
            몸을 따뜻하게 해주세요
            <br />
            <span className="Column11pt">목음체질</span>
          </button>
          <button onClick={() => navigate("/column/Colonotonia")}>
            육류보다는 생선!
            <br />
            <span className="Column11pt">금음체질</span>
          </button>
          <div className="ColumnMore_img">
            <img alt="수양" src="/images/conWater.png" />
            <img alt="목음" src="/images/conTree.png" />
            <img
              className="ColumnMore_img_Gold"
              alt="금음"
              src="/images/conGold.png"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColumnPancreotonia;
