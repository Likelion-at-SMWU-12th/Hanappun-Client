import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import { useSelector } from "react-redux";

const OurCareProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state;
  const params = useParams();
  const username = useSelector((state) => state.username);
  const [friendInfo, setFriendInfo] = useState([]); // 초기 상태를 null로 설정

  const getFriendInfo = () => {
    axios
      .get(`${baseURL}/users/profile?username=${params.id}`)
      .then((response) => {
        console.log(response);
        setFriendInfo(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFriendInfo();
  }, []);

  const onBtnDel = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(`${baseURL}/users/ourcare/`, {
          data: {
            my_username: username,
            friend_username: friendInfo.username,
          },
        })
        .then((response) => {
          console.log(response);
          alert("삭제되었습니다.");
          navigate(`/ourcare/family/list/${username}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("취소");
    }
  };

  const BackButton = () => {
    navigate(-1);
  };

  return (
    <Container>
      {friendInfo && (
        <>
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
                <h2>{friendInfo.nickname}</h2>
                <img src="/images/delete.png" onClick={onBtnDel}></img>
              </NameWrapper>
            </LeftWrapper>
            <BoxWrapper>
              <Box1>
                <List>
                  <ListItem>
                    <Box1Img src="/images/test.png" alt="test"></Box1Img>
                    {friendInfo.constitution_8 ? (
                      <Box1Text>{friendInfo.constitution_8}</Box1Text>
                    ) : (
                      <Box1Text>나의 체질은?</Box1Text>
                    )}
                  </ListItem>
                  <ListItem onClick={() => navigate("/column")}>
                    <Box1Img src="/images/info.png" alt="info"></Box1Img>
                    <Box1Text>체질별 주의사항</Box1Text>
                  </ListItem>
                </List>
              </Box1>
              <Box1>
                <List>
                  <ListItem onClick={() => navigate("/map")}>
                    <Box1Img src="/images/hospital.png" alt="map"></Box1Img>
                    {friendInfo.my_clinic ? (
                      <Box1Text>{friendInfo.my_clinic}</Box1Text>
                    ) : (
                      <Box1Text>한의원을 알아볼까요?</Box1Text>
                    )}
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
            {friendInfo.constitution_8 ? (
              <>
                <BodyInfoimg
                  src={`/images/${friendInfo.constitution_8}.png`}
                  alt="body"
                ></BodyInfoimg>
              </>
            ) : (
              <>
                <h2>아직 체질이 기록되지 않았어요!</h2>
                <img src="/images/ourcareyet.png"></img>
                <ShareBtn>자가진단 링크 공유하기</ShareBtn>
              </>
            )}
          </Body>
        </>
      )}
    </Container>
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

const BodyInfoimg = styled.img`
  width: 100% !important;
`;

export default OurCareProfile;
