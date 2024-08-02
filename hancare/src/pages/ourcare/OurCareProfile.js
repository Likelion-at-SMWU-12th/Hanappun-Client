import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "./OurCareStart";
import { Profilebox } from "./OurCareFamily";
import {
  Box1 as MainBox1,
  Box1Img,
  Box1Text,
  List,
  ListItem,
} from "../Mainpage";

const OurCareProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, type } = location.state;

  const BackButton = () => {
    navigate(-1);
  };

  // 카카오톡 공유 기능
  // const reservationShare = () => {
  //   if (window.Kakao){
  //     const kakao=window.Kakao

  //     if (!kakao.isInitialized()){
  //       kakao.init('60c004dfae745dd8f45c124a54557159')
  //     }

  //     kakao.Share.sendDefault({
  //       objectType: 'feed',
  //       content:{
  //         title: "한의원 예약 정보",
  //         description: "한의원 예약 정보를 지금 확인해보세요!",
  //         imageUrl:"/images/logo.png",
  //         link:{
  //         },
  //       },
  //       buttons: [{title:"지금 바로 보기", link:{webUrl:,},},],
  //     });
  //   }
  // }

  // const testShare = () => {
  //   if (window.Kakao){
  //     const kakao=window.Kakao

  //     if (!kakao.isInitialized()){
  //       kakao.init('60c004dfae745dd8f45c124a54557159')
  //     }

  //     kakao.Share.sendDefault({
  //       objectType: 'feed',
  //       content:{
  //         title: "나의 체질 검사하기",
  //         description: "8체질 중 나의 체질은? 지금 바로 검사해요",
  //         imageUrl:"/images/logo.png",
  //         link:{
  //         },
  //       },
  //       buttons: [{title:"지금 바로 검사하기", link:{webUrl:,},},],
  //     });
  //   }
  // }

  return (
    <div>
      <Container>
        <Title>
          <img src="/images/back.png" alt="back" onClick={BackButton} />
          <h2>우리 케어</h2>
        </Title>
        <ProfileWrapper>
          <LeftWrapper>
            <Profilebox>
              <img src={image} alt="profile" />
            </Profilebox>
            <NameWrapper>
              <h2>{type}</h2>
              <img src="/images/delete.png"></img>
            </NameWrapper>
          </LeftWrapper>
          <BoxWrapper>
            <Box1>
              <List>
                <ListItem>
                  <Box1Img src="/images/test.png" alt="test"></Box1Img>
                  <Box1Text>나의 체질은?</Box1Text>
                </ListItem>
                <ListItem>
                  <Box1Img src="/images/info.png" alt="info"></Box1Img>
                  <Box1Text>체질별 주의사항</Box1Text>
                </ListItem>
              </List>
            </Box1>
            <Box1>
              <List>
                <ListItem onClick={() => navigate("/map")}>
                  <Box1Img src="/images/hospital.png" alt="hospital"></Box1Img>
                  <Box1Text>한의원을 알아볼까요?</Box1Text>
                </ListItem>
                <ListItem>
                  <Box1Img
                    src="/images/reservation.png"
                    alt="reservation"
                  ></Box1Img>
                  <Box1Text>예약 미정</Box1Text>
                </ListItem>
              </List>
            </Box1>
            <ShareBtn>예약 내역 공유하기</ShareBtn>
          </BoxWrapper>
        </ProfileWrapper>
        <BarImg src="/images/ourcarebar.png"></BarImg>
        <Body>
          <h2>아직 체질이 기록되지 않았어요!</h2>
          <img src="/images/ourcareyet.png"></img>
          <ShareBtn>자가진단 링크 공유하기</ShareBtn>
        </Body>
      </Container>
    </div>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  margin-top: 5px;

  h2 {
    color: white;
    font-size: 20px;
  }
  img {
    width: 25px;
    cursor: pointer;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: auto;
  gap: 17px;
`;
const Box1 = styled(MainBox1)``;
const ShareBtn = styled.button`
  background-color: #7350ff;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bolder;
  padding: 9px;
  cursor: pointer;
`;

const BarImg = styled.img`
  width: 80%;
  display: block;
  margin: 20px auto;
`;

const Body = styled.div`
  margin: auto 40px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: 18px;
    text-align: center;
  }

  img {
    display: block;
    width: 70%;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;
export default OurCareProfile;
