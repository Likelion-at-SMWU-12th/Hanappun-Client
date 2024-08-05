import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import Constitutions from "../../components/Constitutions";
import "./MyCON.css";

const MyCON = () => {
  const navigate = useNavigate();
  const params = useParams(); // 유저 아이디
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    <div className="MCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="MCmain">
        {userData && (
          <>
            <p className="MCinfo">
              {userData.nickname}님은 {userData.constitution_8}체질 이에요
            </p>
            <Constitutions selectedId={userData.constitution_8} />
            <div className="MCbtns">
              <button
                className="MCwhiteBtn"
                onClick={() => navigate(`/mainpage/${params.username}`)}
              >
                메인 페이지
              </button>
              <button
                className="MCpurpleBtn"
                onClick={() => navigate("/column")}
              >
                칼럼 읽기
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MyCON;
