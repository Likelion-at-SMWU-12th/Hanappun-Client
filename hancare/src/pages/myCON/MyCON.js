import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Constitutions from "../../components/Constitutions";
import "./MyCON.css";

const MyCON = () => {
  const navigate = useNavigate();
  //const { id } = useParams();
  const name = "홍길동";
  const myConstitution = "Hepatonia";

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  // 테스트용 데이터
  const userData = {
    name: "홍길동",
    myConstitution: "Gastrotonia",
  };

  // 체질 영어 이름을 한글 이름으로 매핑하는 함수
  const getKoreanTypeName = (type) => {
    const typeToKoreanMap = {
      Hepatonia: "목양체질",
      Cholecystonia: "목음체질",
      Pancreotonia: "토양체질",
      Gastrotonia: "토음체질",
      Pulmotonia: "금양체질",
      Colonotonia: "금음체질",
      Renotonia: "수양체질",
      Vesicotonia: "수음체질",
    };
    return typeToKoreanMap[type] || "";
  };

  return (
    <div className="MCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="MCmain">
        <p className="MCinfo">
          {userData.name}님은 {getKoreanTypeName(userData.myConstitution)}
          이에요
        </p>
        <Constitutions selectedId={userData.myConstitution} />
        <div className="MCbtns">
          <button className="MCwhiteBtn" onClick={() => navigate("/mainpage")}>
            메인 페이지
          </button>
          <button className="MCpurpleBtn" onClick={() => navigate("/column")}>
            칼럼 읽기
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyCON;
