import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import "./QmyCON.css";

const QmyCON = () => {
  const navigate = useNavigate();
  const params = useParams(); // 유저 아이디
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 맨 위로 스크롤
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/users/profile?username=${params.username}`
        );
        setUserData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("사용자 정보를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.username]);

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="QmCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="QmCmain">
        {userData && (
          <>
            <p>{userData.nickname} 님의 체질을 알려주세요</p>
            <div className="QmCinfo">
              <img alt="myImage" src="/images/myImage.png" />
              <p>
                <span className="QmCpurple">나의 체질을 입력하면,</span>
                <br /> 맞춤형 식습관 개선 플랜, 건강 관리 플랜에 대해 더 자세히
                알려드릴 수 있어요
              </p>
            </div>
            <img
              className="Qmcarrow"
              alt="화살표"
              src="/images/startdirection.png"
            />
            <div className="QmCbtns">
              <button
                className="QmCwhiteBtn"
                onClick={() =>
                  navigate(`/myCON/chooseMyCON/${params.username}`)
                }
              >
                이미 알고 있어요
              </button>
              <button
                className="QmCpurpleBtn"
                onClick={() => navigate(`/myCON/SelfTest/${params.username}`)}
              >
                자가진단으로 알아볼래요
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default QmyCON;
