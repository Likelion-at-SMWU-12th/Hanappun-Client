/* 목음체질 칼럼*/
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
          몸을 따뜻하게 해주세요 <br /> 목음 체질
        </h2>
        <p>2024년 7월 14일 명순헌 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/moreCON_green.png" />
        <div className="ColumnContent">
          <p className="ColumnPurple">
            목음체질은 간과 담은 강하지만 폐와 대장이 약해요
          </p>
          <p> 더 자세히 알려드릴게요</p>
          <p>
            <span className="ColumnBold">간과 담</span>을 지원하는 음식에는
            대표적으로{" "}
            <span className="ColumnBold">
              바다 생선 및 해물류, 푸른 잎 채소, 포도
            </span>
            등이 있어요. 이러한 음식으로{" "}
            <span className="ColumnBold">강장기인 간과 담</span>은 기능적으로
            과하게 흥분하게 되는데, 과해진 간과 담은{" "}
            <span className="ColumnPurple">
              그 견제 대상(antagonist)이자 약장기인 폐와 대장을 더 억제
            </span>
            하게 돼요.
          </p>
          <p>
            본래 약하게 타고난 <span className="ColumnBold">폐와 대장</span>의
            기력이 더욱 약화되면서, 강장기인
            <span className="ColumnBold">간과 담</span>과 약장기인{" "}
            <span className="ColumnBold">폐와 대장</span>의 격차가 더욱 심화되는{" "}
            <span className="ColumnBold">'과불균형 상태'</span>가 형성됩니다.
            결과적으로 모든 장기들 간의 상호 교류와 협력의 부정적 변화가
            일어나고 <span className="ColumnBold">'적불균형 상태'</span>에
            이르게 돼요. 그 결과 면역 기능들이 순차적으로 약화되거나 상실되서
            그에 해당하는 병적 증상들을 유발하게 됩니다.
          </p>
          <p>
            그 예로, 강한 <span className="ColumnBold">간과 담</span>의 기능이
            과해지면,{" "}
            <span className="ColumnBold">
              다양한 피부질환, 지방간, 관절염, 비만, 우울증{" "}
            </span>
            등의 증상이 나타나게 돼요. 체질 특성상 불건강의 상태가 지속될 경우,
            이와 같은 증상이 더 발전될 수도 있어요
          </p>
          <p>
            목음체질의 경우 중간 장기인 위장과 췌장은 담과 간 다음으로 강한
            장기에요. 따라서 매운 음식은 위장 장애를, 차가운 음식은 약한 대장에
            장애를 일으켜 전반적으로 복합적 소화계 질환이 될 수 있어요. 식사 때
            마다 바로 배변을 하는 것은 대장이 약해지는 것을 뜻하니 하복부를
            따뜻하게 하도록 해요. 물론 따뜻한 음식-음료로 속도 따뜻하게요!
          </p>
          <p className="ColumnBold">
            우리 몸을 위해 따뜻한 음식을 먹는 건 어떨까요?
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
              alt="토음"
              src="/images/c_Gastrotonia.png"
              onClick={() => navigate("/column/Gastrotonia")}
            />
            <img
              alt="수음"
              src="/images/c_Vesicotonia.png"
              onClick={() => navigate("/column/Vesicotonia")}
            />
            <img
              alt="목양"
              src="/images/c_Hepatonia.png"
              onClick={() => navigate("/column/Hepatonia")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColumnPancreotonia;
