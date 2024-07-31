import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Mainpage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  return (
    <Container>
      <Guest>
        <CalendarImg
          src="/images/calendar.png"
          alt="calendar"
          onClick={() => navigate("/mainpage/claendar")}
        ></CalendarImg>
        <Name>숙멋사 님</Name>
        <Message>오늘 하루도 힘차게 시작해봐요!</Message>
      </Guest>
      <Box1Wrapper>
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
      </Box1Wrapper>
      <RoundedBox>
        <When>{formattedDate}</When>
        <Box1Wrapper>
          <Box2>
            <FaceImg src="/images/thinking.png" alt="face"></FaceImg>
            <List>
              <ListItem>
                <DetailText>오늘 식사 점수를 알아봐요</DetailText>
              </ListItem>
              <ListItem>
                <TitleText>맞춤형 분석</TitleText>
              </ListItem>
              <ListItem>
                <PlusImg src="/images/plus.png"></PlusImg>
                <EatBtn>아침</EatBtn>
              </ListItem>
              <ListItem>
                <PlusImg src="/images/plus.png"></PlusImg>
                <EatBtn>점심</EatBtn>
              </ListItem>
              <ListItem>
                <PlusImg src="/images/plus.png"></PlusImg>
                <EatBtn>저녁</EatBtn>
              </ListItem>
            </List>
          </Box2>
          <Box2>
            <FaceImg src="/images/family.png" alt="family"></FaceImg>
            <List>
              <ListItem>
                <DetailText>우리 가족 건강도 함께 챙겨요</DetailText>
              </ListItem>
              <ListItem>
                <TitleText>우리 케어</TitleText>
              </ListItem>
              <OurCareStart onClick={() => navigate("/ourcare/")}>
                시작하기
              </OurCareStart>
            </List>
          </Box2>
        </Box1Wrapper>
        <Box3>
          <Leftbox>
            <LeftboxTxt>오늘의 식사</LeftboxTxt>
            <LeftboxBar src="/images/bar.png"></LeftboxBar>
          </Leftbox>
          <RightBox>
            <RightBoxTxt>오늘의 식사를 기록해요</RightBoxTxt>
            <RightBoxImg src="/images/potato.png" alt="potato"></RightBoxImg>
            <WriteBtn>기록하기</WriteBtn>
          </RightBox>
        </Box3>
        <Box3>
          <Leftbox>
            <LeftboxTxt>오늘의 컨디션</LeftboxTxt>
            <LeftboxBar src="/images/bar.png"></LeftboxBar>
          </Leftbox>
          <RightBox>
            <RightBoxTxt>몸 상태와 기분은 어때요?</RightBoxTxt>
            <RightBoxImg
              src="/images/condition.png"
              alt="condition"
            ></RightBoxImg>
            <WriteBtn>기록하기</WriteBtn>
          </RightBox>
        </Box3>
      </RoundedBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
`;

const CalendarImg = styled.img`
  position: relative;
  width: 25px;
  top: 20px;
  left: 300px;
  cursor: pointer;
`;
const Guest = styled.div`
  color: white;
  margin-left: 40px;
`;
const Name = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-top: 17px;
`;
const Message = styled.div`
  font-size: 15px;
  font-weight: bolder;
  margin-top: 10px;
`;

const Box1Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: stretch;
  justify-content: center;
  margin-left: 40px;
  margin-right: 40px;
  gap: 20px;
`;
export const Box1 = styled.div`
  display: flex;
  background-color: white;
  padding: 13px;
  width: 130px;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 12px;
  flex: 1;
`;
export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;
export const Box1Img = styled.img`
  width: 14px;
  margin-right: 10px;
  cursor: pointer;
`;
export const Box1Text = styled.span`
  font-size: 10px;
  color: #7350ff;
  font-weight: 500;
  cursor: pointer;
`;

const RoundedBox = styled.div`
  background-color: #f5f5f5;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: 18px;
  height: 100vh;
`;
const When = styled.div`
  text-align: center;
  margin-top: 13px;
  background-color: #7350ff;
  padding: 10px;
  color: white;
  border-radius: 20px;
  margin-left: 130px;
  margin-right: 130px;
  font-weight: bolder;
`;
const Box2 = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  box-shadow: 0 5px 10px -7px rgba(0, 0, 0, 0.3),
    0 4px 5px -10px rgba(0, 0, 0, 0.3);
  padding: 13px;
  width: 130px;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 12px;
`;
const DetailText = styled.span`
  color: #9f9f9f;
  font-size: 9px;
  font-weight: 600;
`;
const TitleText = styled.span`
  color: black;
  font-size: 15px;
  font-weight: bolder;
`;
const PlusImg = styled.img`
  width: 8px;
  cursor: pointer;
`;
const EatBtn = styled.button`
  color: #9f9f9f;
  font-size: 10px;
  margin-left: 5px;
  border: 1px solid #9f9f9f;
  background-color: white;
  padding: 2px;
  width: 35px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;
const FaceImg = styled.img`
  position: absolute;
  width: 70px;
  top: 60px;
  left: 75px;
`;
const OurCareStart = styled.button`
  color: #9f9f9f;
  font-size: 10px;
  margin-left: 5px;
  margin-top: 50px;
  border: 1px solid #9f9f9f;
  background-color: white;
  padding: 2px;
  width: 55px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

const Box3 = styled.div`
  background-color: white;
  display: flex;
  box-shadow: 0 5px 10px -7px rgba(0, 0, 0, 0.3),
    0 4px 5px -10px rgba(0, 0, 0, 0.3);
  align-items: flex-start;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 20px;
  border-radius: 12px;
  position: relative;
`;
const Leftbox = styled.div`
  background-color: black;
  height: auto;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  width: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 47px 13px 47px 13px;
`;
const LeftboxTxt = styled.span`
  color: white;
  font-size: 15px;
  font-weight: bolder;
`;
const LeftboxBar = styled.img`
  width: 110px;
  margin-top: 7px;
`;
const RightBox = styled.div`
  margin-left: 13px;
`;
const RightBoxTxt = styled.div`
  font-size: 11px;
  color: #9f9f9f;
  font-weight: 600;
  margin-top: 13px;
`;
const RightBoxImg = styled.img`
  position: absolute;
  width: 85px;
  top: 45px;
  left: 235px;
`;
const WriteBtn = styled.button`
  color: #9f9f9f;
  font-size: 10px;
  margin-left: 0px;
  margin-top: 65px;
  border: 1px solid #9f9f9f;
  background-color: white;
  padding: 2px;
  width: 55px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

export default Mainpage;
