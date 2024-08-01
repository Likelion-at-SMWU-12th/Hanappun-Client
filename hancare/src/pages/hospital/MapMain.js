import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MapMain = () => {
  return (
    <Container>
      <h2>한의원</h2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: black;
  height: 100vh;

  h2 {
    color: white;
    margin: 30px auto;
  }
`;
export default MapMain;
