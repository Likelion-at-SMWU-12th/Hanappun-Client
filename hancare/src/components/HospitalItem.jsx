import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HospitalItem = ({ item }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("소개");

  const handleClick = () => {
    navigate(`/map/${item.id}`, { state: { item } });
  };

  return (
    <Container onClick={handleClick}>
      <Firstbox>
        <HospitalName>{item.name}</HospitalName>
        <HospitalHashtag>{item.hashtag1}</HospitalHashtag>
        <HospitalHashtag>{item.hashtag2}</HospitalHashtag>
        <HospitalHashtag>{item.hashtag3}</HospitalHashtag>
      </Firstbox>
      <HospitalInfo>
        <Bold>위치</Bold> {item.address}
      </HospitalInfo>
      <HospitalInfo>
        <Bold>전화 번호</Bold> {item.call}
      </HospitalInfo>
      <SecondBox>
        <Reviewnum>{item.reviewnum}</Reviewnum>
        <img src="/images/reviewnumimg.png" alt="num"></img>
        <ReviewText>{item.reviewtext}</ReviewText>
      </SecondBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 5px;
  margin: 10px auto;
  box-shadow: 0 0 8px #cecece;
  border-radius: 20px;
  width: 90%;
  cursor: pointer;
`;
const Firstbox = styled.div`
  display: flex;
`;
const HospitalName = styled.h2`
  margin-left: 10px;
  color: #7350ff;
  margin-right: 20px;
  font-size: 20px;
`;
const HospitalHashtag = styled.p`
  display: inline;
  margin: auto;
  background-color: #57595f;
  color: white;
  padding: 1px 7px;
  font-size: 11px;
  border-radius: 20px;
`;

const HospitalInfo = styled.p`
  margin: auto;
  margin-left: 10px;
  color: black;
  font-size: 14px;
`;

const Bold = styled.span`
  font-weight: bolder;
  margin-right: 5px;
`;

const SecondBox = styled.div`
  display: flex;
  position: relative;

  img {
    position: absolute;
    width: 15px;
    top: 22px;
    left: 43px;
  }
`;

const Reviewnum = styled.h3`
  margin-left: 10px;
  font-size: 15px;
  color: #7350ff;
`;

const ReviewText = styled.h3`
  margin: auto 35px;
  font-size: 12px;
`;

export default HospitalItem;
