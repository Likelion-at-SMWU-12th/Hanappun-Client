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
          방금 먹은 점심이 <br /> 중요한 이유
        </h2>
        <p>2024년 5월 25일 김수련 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/lunch.png" />
        <div className="ColumnContent">
          <p className="ColumnQ">
            Q. 한의학에서는 식습관을 강조하는 이유가 무엇인가요?
          </p>
          <p>
            A. 8체질의 경우,
            <span className="ColumnPurple">
              {" "}
              각 체질이 갖고 있는 장기의 강약 배열에 따라 음식의 영향력이 매우
              예민하고 치명적일 수 있음
            </span>
            을 발견했어요. <br />
            직접 강장기와 약장기에 영향을 주는 음식을 주는 음식은 물론이고,
            중간장기에 영향을 주는 음식이라 할지라도 그 영향력은 결국
            최강-약장기에 영향을 미치게 되어 과불균형인 질병상태의 원인이 된다는
            것이죠.
          </p>
          <p>
            8체질 섭생에서는 어떤 특정한 음식을 섭취해을 때 마다 그로 인한
            정해진
            <span className="ColumnBold">특정 증상이 동일하게 나타나는 것</span>
            을 발견하게 되었어요. 예를 들어, 위장 증상, 대장 증상들이 정해진
            음식에 따라 구별되어 나타나고, 불면, 부정맥, 불안증 등의 증상들 역시
            각각 정해진 음식과 연관됨을 경험하게 되었답니다.
            <br />
            <span className="ColumnBold">
              각 체질 장기들의 강약배열구조에 미치는 음식의 영향력
            </span>
            이 얼마나 구체적이고 일관된 것인지 알 수 있었죠!
          </p>
          <p>
            따라서 8체질의학은
            <span className="ColumnBold">먼저 체질을 진단</span>
            해서 병을 8체질장부론적 생리와 병리에 입각해서 구분한 뒤, 치료하는
            것이에요.
          </p>
          <p>오늘 우리가 먹었던 점심이 중요한 이유! 이제 알 수 있겠죠?</p>
        </div>
        <div className="ColumnWriter">
          <img alt="작성자(한의원장)사진" src="/images/columnWriter.png" />
          <p>
            <span className="ColumnBold">김수련 숙명 한의원 새힘실 원장</span>
            <br /> '쉽게 한의학을 알려드려요'
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
          <button onClick={() => navigate("/column/moreKM3")}>
            <span className="Column11pt">
              보양식이라고 모두 힘이 나진 않아요
            </span>
            <br />
            송진리 원장
          </button>
        </div>
      </main>
    </div>
  );
};

export default ColumnMoreKM1;
