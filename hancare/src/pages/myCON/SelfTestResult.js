import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelfTestResult.css";

// 백엔드 연동 시
// const SelfTestResult = ({ results }) => {
const SelfTestResult = () => {
  const navigate = useNavigate();

  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  // 테스트용 데이터
  const userData = {
    name: "홍길동",
    results: ["Hepatonia", "Cholecystonia", "Pancreotonia"],
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

  // 체질 이름을 이미지 경로로 매핑하는 함수
  const getImagePath = (type) => {
    const typeToImageMap = {
      Hepatonia: "/images/myCON_Hepatonia.png",
      Cholecystonia: "/images/myCON_Cholecystonia.png",
      Pancreotonia: "/images/myCON_Pancreotonia.png",
      Gastrotonia: "/images/myCON_Gastrotonia.png",
      Pulmotonia: "/images/myCON_Pulmotonia.png",
      Colonotonia: "/images/myCON_Colonotonia.png",
      Renotonia: "/images/myCON_Renotonia.png",
      Vesicotonia: "/images/myCON_Vesicotonia.png",
    };
    return typeToImageMap[type] || "";
  };

  const renderResults = () => {
    return (
      <div className="STRbackground">
        <header className="blackHeader">
          <img alt="back" onClick={BackButton} src="/images/back.png" />
          <h2 className="STh2">나의 체질</h2>
        </header>
        <main className="STRmain">
          <div className="STRresult">
            {/* 결과 글 */}
            <p>
              자기진단 결과,
              <br />
              {userData.name}님은{" "}
              {userData.results
                .map((result) => getKoreanTypeName(result))
                .join(" 또는 ")}
              이에요
            </p>
            {/* 결과 이미지 */}
            {userData.results.map((result, index) => {
              const koreanTypeName = getKoreanTypeName(result);
              return (
                <img
                  key={index}
                  src={getImagePath(result)}
                  alt={`${koreanTypeName} 이미지`}
                />
              );
            })}
            {userData.results.length > 1 && <p>앗! 중복 결과가 나왔어요</p>}
          </div>
          <div className="STRinfo">
            <img alt="myImage" src="/images/myImage.png" />
            <p>
              자가진단 결과는{" "}
              <span className="STRpurple">
                실제 검진 결과 체질과 차이가 있을 수 있어요.
              </span>{" "}
              꼭 전문가의 진맥을 통해 진단받기를 추천해요.{" "}
            </p>
          </div>
          <div className="STRbtns">
            <button className="STRwhiteBtn" onClick={() => navigate("/map")}>
              한의원 찾아보기
            </button>
            <button
              className="STRpurpleBtn"
              onClick={() => navigate("/myCON/ChooseMyCON")}
            >
              체질 선택하기
            </button>
          </div>
        </main>
      </div>
    );
  };

  return <div className="background">{renderResults()}</div>;
};

export default SelfTestResult;
