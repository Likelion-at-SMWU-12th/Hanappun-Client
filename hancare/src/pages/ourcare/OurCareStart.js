import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OurCareStart = () => {
  const navigate = useNavigate();
  const BackButton = () => {
    navigate(-1);
  };
  return (
    <Container>
      <Title>
        <img src="/images/back.png" alt="back" onClick={BackButton}></img>
        <h2>우리 케어</h2>
      </Title>
      <Content>
        <h2>우리 케어는</h2>
        <p>
          <Bold>우리 가족을 위한 맞춤형 케어 서비스에요.</Bold> 디지털 기기에
          친숙하지 않은 가족이나 미성년자인 자녀를 위해 추천해요.
          <br />
          혹은 가족이 아니더라도, 서로의 건강을 챙기고 싶은 소중한 연인들 간에도
          추천해요.
        </p>
      </Content>
      <BoxContainer>
        <Box>
          <img src="/images/phone.png" alt="phone"></img>
          <p>
            대신해서 <Bold>한의원에 예약</Bold>하거나
          </p>
        </Box>
        <Box>
          <img src="/images/light.png" alt="light"></img>
          <p>
            체질에 <Bold>적절한 음식을 알려드려요</Bold>
          </p>
        </Box>
        <Box>
          <img src="/images/talk.png" alt="talk"></img>
          <p>
            이 내용은 상대에게 <Bold>카카오톡</Bold>으로 <Bold>공유</Bold>해서
            알려줄 수 있어요
          </p>
        </Box>
      </BoxContainer>
      <Start>
        <h2>
          우리 가족을 위한 맞춤형 케어 서비스,
          <br />
          우리케어로 함께 해요
        </h2>
        <img src="/images/startdirection.png"></img>
        <button onClick={() => navigate("/ourcare/family/")}>시작하기</button>
      </Start>
    </Container>
  );
};

export const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100%;
  white-space: pre-line;
`;

export const Title = styled.div`
  display: flex;
  padding-top: 30px;
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

const Content = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  color: white;
  h2 {
    margin-top: 30px;
    font-size: 20px;
  }
  p {
    font-size: 13px;
    font-weight: 400;
  }
`;

const Bold = styled.span`
  font-weight: bolder;
  display: inline;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 30px;
  gap: 10px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 13px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: calc(50% - 21px);
  height: 110px;

  img {
    width: 50px;
    margin-top: auto;
    margin-bottom: auto;
  }
  p {
    font-size: 10px;
  }
`;
const Start = styled.div`
  h2 {
    color: white;
    font-size: 17px;
    text-align: center;
  }
  img {
    display: block;
    margin: 30px auto;
    width: 50px;
  }
  button {
    display: block;
    margin: auto;
    background-color: #7350ff;
    border: none;
    border-radius: 20px;
    font-size: 18px;
    font-weight: bolder;
    padding: 10px;
    width: 160px;
    color: white;
    cursor: pointer;
  }
`;

export default OurCareStart;
