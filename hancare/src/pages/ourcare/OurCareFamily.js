import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "./OurCareStart";

const OurCareFamily = () => {
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
    </Container>
  );
};

export default OurCareFamily;
