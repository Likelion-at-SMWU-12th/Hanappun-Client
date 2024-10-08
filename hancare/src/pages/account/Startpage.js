import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Title = styled.div`
  h2 {
    font-size: 14px;
    margin-top: 125px;
    text-align: center;
    font-weight: 900 !important; /* bolder 대신 구체적인 값 사용 */
  }

  img {
    width: 30%;
    display: block;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    font-size: 25px;
    margin-top: 5px;
    text-align: center;
    font-weight: 800 !important;
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
  text-align: center;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bolder;
  color: white;
  border: none;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "black")};
  cursor: pointer;
`;

const Startpage = () => {
  const navigate = useNavigate();
  setTimeout(function () {
    navigate("/mainpage/test1");
  }, 0);
  return (
    <Container>
      <Title>
        <h2>한의학 기반 맞춤형 건강관리 서비스</h2>
        <h1>한케어</h1>
        <img src="/images/logo.png" alt="logo" />
      </Title>
      {/* <div>
        <ButtonBox bgColor="#7350FF" onClick={() => navigate("/signup")}>
          회원가입
        </ButtonBox>
        <ButtonBox bgColor="black" onClick={() => navigate("/login")}>
          로그인
        </ButtonBox>
      </div> */}
    </Container>
  );
};

export default Startpage;
export { Container };
