import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";

import axios from "axios";
import { baseURL } from "../../api/baseURL";

const Profile = () => {
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

  // 이전 페이지도 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const constitution_8isnull = () => {
    if (userData && userData.constitution_8 === "") {
      return <p>나의 체질을 아직 설정하지 않았어요</p>;
    } else if (userData && userData.constitution_8 !== "") {
      return (
        <p>
          <span>{userData.constitution_8}체질</span> 이에요
        </p>
      );
    } else {
      return null;
    }
  };
  const myclinicisnull = () => {
    if (userData && userData.my_clinic === null) {
      return <p>나의 한의원을 아직 설정하지 않았어요</p>;
    } else if (userData && userData.my_clinic !== null) {
      return (
        <p>
          <span>{userData.my_clinic}</span> 에 다니고 있어요
        </p>
      );
    } else {
      return null; // userData가 아직 로딩되지 않은 경우
    }
  };

  return (
    <div className="MPbackground">
      <header className="MPblackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="Ph2">MY</h2>
      </header>
      <main className="MPblackMain">
        <div className="profile">
          <img alt="myImage" src="/images/myImage.png" />
          <div className="profileText">
            {/* 사용자 이름 / 체질 / 나의 한의원 정보 가져오기*/}
            <h3>{userData.nickname} 님</h3>
            {constitution_8isnull()}
            {myclinicisnull()}
          </div>
        </div>
        <hr />
        <div className="constitution">
          <img alt="constitutionWorld" src="/images/constitutionWorld.png" />
          <span className="purple">체질을 잘못 선택했나요?</span>
          <p>
            체질이 자가진단 결과와 다르거나 잘못 선택한 경우 수정이 가능해요
          </p>
          <button
            onClick={() => navigate(`/myCON/editMyCON/${params.username}`)}
          >
            체질 수정하기
          </button>
        </div>
        <hr />
        <div className="userInfo">
          <img alt="userInformation" src="/images/userInformation.png" />
          <span className="purple">회원 정보</span>
          <div className="idPw">
            <p>
              아이디 <span className="Pbold">{userData.username}</span>
            </p>
          </div>
          <button onClick={() => navigate(`/cancel/${params.username}`)}>
            회원 탈퇴하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
