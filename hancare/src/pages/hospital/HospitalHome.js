import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HospitalHome = () => {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("소개");

  const BackButton = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Title>
        <img src="/images/back.png" alt="back" onClick={BackButton}></img>
        <h2>나의 한의원</h2>
      </Title>
      <Name>{item.name}</Name>
      <Wrapper>
        <Hashtag>{item.hashtag1}</Hashtag>
        <Hashtag>{item.hashtag2}</Hashtag>
        <Hashtag>{item.hashtag3}</Hashtag>
        <MyHospital>나의 한의원</MyHospital>
      </Wrapper>
      <Info>
        <Bold>위치</Bold>
        {item.address}
      </Info>
      <Info>
        <Bold>전화번호</Bold>
        {item.call}
      </Info>
      <ReservateBtn>예약</ReservateBtn>
      <Detail>
        <DetailMenu>
          <TabButton
            isActive={activeTab === "소개"}
            onClick={() => handleTabClick("소개")}
          >
            소개
          </TabButton>
          <TabButton
            isActive={activeTab === "후기"}
            onClick={() => handleTabClick("후기")}
          >
            후기
          </TabButton>
        </DetailMenu>
        {activeTab === "소개" ? (
          <>
            <SubTitle>{item.name}</SubTitle>
            <Information>
              {item.name}은 슈바이처를 본받고자 했던 김명숙 원장에 의해
              설립되었습니다. 1966년 5월 17일 개원하여 1979년 5월 현 위치로 옮겨
              진료를 하고 있습니다. {item.name}은 권OO박사의 8체질 의학에
              근거해서 진료합니다.
            </Information>
            <SubTitle>의료진</SubTitle>
            <DoctorWrapper>
              <DoctorBox>
                <h3>송진리 원장</h3>
                <img src="/images/doctor1.png" alt="doctor1"></img>
              </DoctorBox>
              <DoctorBox>
                <h3>명순헌 원장</h3>
                <Doctor2 src="/images/doctor2.png" alt="doctor1"></Doctor2>
              </DoctorBox>
              <DoctorBox>
                <h3>김수련 원장</h3>
                <p>
                  숙명여대 한의과대학 졸업
                  <br />
                  숙명의료원 일반의료원 수료
                  <br />
                  숙명여대 경락의과학과 석박사
                  <br />
                  전 숙명여대 한의학융합연구정보센터 연구원
                  <br />
                  현 대한학의학회 정회원
                  <br />현 {item.name} 새힘관실 원장
                </p>
              </DoctorBox>
            </DoctorWrapper>
            <SubTitle>사진</SubTitle>
          </>
        ) : (
          <h2>후기</h2>
        )}
      </Detail>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  padding-top: 15px;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 13px;
    position: absolute;
    left: 30px;
    cursor: pointer;
  }

  h2 {
    color: white;
  }
`;

const Name = styled.h2`
  color: white;
  font-size: 18px;
  background-color: #7350ff;
  padding: 10px;
  width: 290px;
  margin: 3px auto 13px auto;
  text-align: center;
  border-radius: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
  margin-bottom: 10px;
`;
const Hashtag = styled.p`
  background-color: #57595f;
  color: white;
  margin: -5px 7px;
  padding: 6px;
  display: inline;
  border-radius: 20px;
  font-size: 12px;
`;
const MyHospital = styled.button`
  margin: 0 auto;
  background-color: #7350ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 7px;
  font-size: 12px;
  font-weight: bolder;
  cursor: pointer;
`;
const Info = styled.p`
  color: white;
  margin: 1px 60px;
  font-size: 11px;
`;
const Bold = styled.span`
  font-weight: bolder;
  margin-right: 10px;
`;

const ReservateBtn = styled.button`
  position: absolute;
  top: 195px;
  right: 65px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 4px;
  width: 68px;
  text-align: center;
  font-size: 13px;
  font-weight: bolder;
  cursor: pointer;
`;

const Detail = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
  width: 100%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: 15px;
  text-align: center;
  white-space: pre-line;
`;
const DetailMenu = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  border: none;
  width: 100%;
  font-size: 18px;
  padding: 10px;
  background-color: ${(props) => (props.isActive ? "#f7f7f7" : "#7350ff")};
  color: ${(props) => (props.isActive ? "#7350ff" : "white")};
  font-weight: bolder;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 25px;
  }

  &:last-child {
    border-top-right-radius: 25px;
  }
`;
const SubTitle = styled.h3`
  margin-top: 30px;
  font-size: 17px;
`;
const Information = styled.p`
  font-size: 12px;
  margin: -7px 20px;
`;

const DoctorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;
const DoctorBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  align-items: center;
  border-radius: 20px;
  width: 120px;
  height: 170px;
  h3 {
    color: white;
    font-size: 14px;
  }

  img {
    width: 80%;
  }

  p {
    color: white;
    font-size: 8px;
  }
`;
const Doctor2 = styled.img`
  width: 80px !important;
`;

export default HospitalHome;
