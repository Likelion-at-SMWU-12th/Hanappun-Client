/* 수음체질 칼럼 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Column.css";

const ColumnPancreotonia = () => {
  const navigate = useNavigate();
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Column">
      <header className="ColumnHeader">
        <h4>체질별 특징을 알고 싶다면?</h4>
        <h2>
          차가운 음식은 안 좋아요 <br /> 수음 체질
        </h2>
        <p>2024년 7월 14일 명순헌 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/moreCON_blue.png" />
        <div className="ColumnContent">
          <p className="ColumnPurple">
            수음체질은 신장과 방광은 강하지만 췌장과 위장이 약해요
          </p>
          <p> 더 자세히 알려드릴게요</p>
          <p>
            <span className="ColumnBold">신장, 방광</span>을 지원하는 음식에는
            대표적으로{" "}
            <span className="ColumnBold">돼지고기, 보리, 참외, 수박</span>
            등이 있어요. 이러한 음식으로{" "}
            <span className="ColumnBold">강장기인 신장, 방광</span>은 기능적으로
            과하게 흥분하게 되는데,{" "}
            <span className="ColumnBold">과해진 신장과 방광</span>은{" "}
            <span className="ColumnPurple">
              그 견제 대상(antagonist)이자 약장기인 췌장과 위장을 더 억제
            </span>
            하게 돼요.
          </p>
          <p>
            본래 약하게 타고난 <span className="ColumnBold">췌장과 위장</span>의
            기력이 더욱 약화되면서, 강장기인
            <span className="ColumnBold">신장-방광</span>과 약장기인{" "}
            <span className="ColumnBold">췌장-위장</span>의 격차가 더욱 심화되는{" "}
            <span className="ColumnBold">'과불균형 상태'</span>가 형성됩니다.
            결과적으로 모든 장기들 간의 상호 교류와 협력의 부정적 변화가
            일어나고 <span className="ColumnBold">'적불균형 상태'</span>에
            이르게 돼요. 그 결과 면역 기능들이 순차적으로 약화되거나 상실되서
            그에 해당하는 병적 증상들을 유발하게 됩니다.
          </p>
          <p>
            그 예로, 강한 <span className="ColumnBold">신장과 방광</span>의
            기능이 과해지면,{" "}
            <span className="ColumnBold">
              신경 쇠약, 심각한 변비, 위경련, 위하수, 관절염, 우울증, 간경화{" "}
            </span>
            등의 증상이 나타나게 돼요. 체질 특성상 불건강의 상태가 지속될 경우,
            <span className="ColumnBold">
              소화 장애로 인한 체중 감소 및 기력 감퇴{" "}
            </span>
            등으로 발전될 수도 있어요
          </p>
          <p>
            수음체질의 경우, 중간 장기인 담과 간은 방광과 신장 다음으로 강한
            장기에요. 따라서 해물과 푸른 채소를 섭취하는 것은 상대적으로 약한
            대장과 위장으로 인한 소화장애와 겹쳐 복합적인 만성 소화장애로
            진행되기 쉬워요. 이럴 때에는 차가운 음료-음식과 과식을 피하는게
            좋아요.
          </p>
          <p className="ColumnBold">
            우리 몸을 위해 차가운 음식은 피하면 어떨까요?
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
          <div className="ColumnMore_images">
            <img
              alt="목양"
              src="/images/c_Hepatonia.png"
              onClick={() => navigate("/column/Hepatonia")}
            />
            <img
              alt="금음"
              src="/images/c_Colonotonia.png"
              onClick={() => navigate("/column/Colonotonia")}
            />
            <img
              alt="토양"
              src="/images/c_Pancreotonia.png"
              onClick={() => navigate("/column/Pancreotonia")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColumnPancreotonia;
