import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  h2 {
    font-size: 17px;
    margin-top: 120px;
    text-align: center;
    font-weight: bolder; /* bolder 대신 구체적인 값 사용 */
  }

  img {
    width: 60%;
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    font-size: 35px;
    margin-top: 35px;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 50px;
  }
`;

const ButtonBox = styled.button`
  display: block;
  padding: 15px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bolder;
  color: white;
  border: none;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "black")};
`;

const Startpage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>
        <h2>한의학 기반 맞춤형 건강관리 서비스</h2>
        <img src="/images/logo.png" alt="logo" />
        <h1>한케어</h1>
      </Title>
      <div>
        <ButtonBox bgColor="#7350FF" onClick={() => navigate("/signup")}>
          회원가입
        </ButtonBox>
        <ButtonBox bgColor="black" onClick={() => navigate("/login")}>
          로그인
        </ButtonBox>
      </div>
    </Container>
  );
};

export default Startpage;
