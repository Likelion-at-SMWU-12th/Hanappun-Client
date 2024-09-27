import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SelfTestResult.css";

const SelfTestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state || { results: [] };

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
    name: "설문자",
    results: results,
  };

  // 체질 이름을 이미지 경로로 매핑하는 함수
  const getImagePath = (type) => {
    const typeToImageMap = {
      목양체질: "/images/myCON_Hepatonia.png",
      목음체질: "/images/myCON_Cholecystonia.png",
      토양체질: "/images/myCON_Pancreotonia.png",
      토음체질: "/images/myCON_Gastrotonia.png",
      금양체질: "/images/myCON_Pulmotonia.png",
      금음체질: "/images/myCON_Colonotonia.png",
      수양체질: "/images/myCON_Renotonia.png",
      수음체질: "/images/myCON_Vesicotonia.png",
    };
    return typeToImageMap[type] || "";
  };

  // 콘솔로 results 디버깅
  useEffect(() => {
    console.log("Received results:", results);
    window.scrollTo(0, 0);
  }, [results]);

  const renderResults = () => {
    return (
      <div className="STRbackground">
        <header className="blackHeader">
          <h2 className="STh2_con">나의 체질</h2>
        </header>
        <main className="STRmain">
          <div className="STRresult">
            {/* 결과 글 */}
            <p>
              자기진단 결과,
              <br />
              {userData.name}님은 {userData.results.join(" 또는 ")}
              이에요
            </p>
            {/* 결과 이미지 */}
            {userData.results.map((result, index) => (
              <img
                key={index}
                src={getImagePath(result)}
                alt={`${result} 이미지`}
              />
            ))}
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
            <button
              className="STRwhiteBtn"
              onClick={() => navigate("/myCON/selfTest/test1")}
            >
              다시 검사하기
            </button>
            {/* <button
              className="STRpurpleBtn"
              onClick={() => navigate("/myCON/ChooseMyCON/test1")}
            >
              체질 선택하기
            </button> */}
          </div>
        </main>
      </div>
    );
  };

  return <div className="background">{renderResults()}</div>;
};

export default SelfTestResult;
