import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Guest>
        <Name>숙멋사 님</Name>
        <Message>오늘 하루도 힘차게 시작해봐요!</Message>
      </Guest>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const Guest = styled.div`
  color: white;
  margin-left: 40px;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-top: 15px;
`;

const Message = styled.div`
  font-size: 15px;
  font-weight: bolder;
  margin-top: 10px;
`;

export default Mainpage;
