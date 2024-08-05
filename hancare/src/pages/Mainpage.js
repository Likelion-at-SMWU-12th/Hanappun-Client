import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { setUsername } from "../redux/action";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";

const Mainpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [param2, setParam2] = useState(params.username);

  //테스트용 데이터
  const userdata = {
    name: "홍길동",
    todayMeal: "good",
    breakfast: ["오렌지주스"],
    lunch: ["탕수육, 보리차", "짬뽕"],
    dinner: ["돈가츠", "레몬에이드"],
    snack: ["커피"],
  };

  // todayMeal에 따른 메시지와 이미지 설정
  const getMealFeedback = (todayMeal) => {
    switch (todayMeal) {
      case "bad":
        return {
          message: "건강이 염려되어요",
          image: "/images/bad.png",
        };
      case "soso":
        return {
          message: "대체로 괜찮아요!",
          image: "/images/soso.png",
        };
      case "good":
        return {
          message: "건강을 잘 챙겼어요!",
          image: "/images/good.png",
        };
      default:
        return {
          message: "맞춤형 분석",
          image: "/images/analysis_person.png",
        };
    }
  };

  const mealFeedback = getMealFeedback(userdata.todayMeal);

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  // 내 정보 불러오기
  const [user, setUser] = useState([]);

  const getInfo = () => {
    axios
      .get(`${baseURL}/calendars/event/today/${param2}`)
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
    dispatch(setUsername(param2));
  }, []);

  const formatReservationDate = (reservationDate) => {
    if (!reservationDate) return ""; // reservationDate가 없으면 빈 문자열 반환
    const [datePart, timePart] = reservationDate.split("T");
    if (!timePart) return datePart; // timePart가 없으면 datePart만 반환
    const [hours, minutes] = timePart.split(":");
    return `${datePart} ${hours}:${minutes}`;
  };

  return (
    <Container>
      <Guest>
        <CalendarImg
          src="/images/column.png"
          alt="calendar"
          onClick={() => navigate("/column")}
        ></CalendarImg>
        <Name>{user.nickname} 님</Name>
        <Message>오늘 하루도 힘차게 시작해봐요!</Message>
      </Guest>
      <Box1Wrapper>
        <Box1>
          <List>
            <ListItem onClick={() => navigate("/map")}>
              <Box1Img src="/images/hospital.png" alt="map"></Box1Img>
              {user.my_clinic ? (
                <Box1Text>{user.my_clinic}</Box1Text>
              ) : (
                <Box1Text>한의원을 알아볼까요?</Box1Text>
              )}
            </ListItem>
            <ListItem>
              <Box1Img
                src="/images/reservation.png"
                alt="reservation"
              ></Box1Img>
              {user.appointment && user.appointment.length !== 0 ? (
                <DateBox1Text>
                  {formatReservationDate(user.appointment.date)}
                </DateBox1Text>
              ) : (
                <Box1Text>예약 미정</Box1Text>
              )}
            </ListItem>
          </List>
        </Box1>
        <Box1>
          <List>
            <ListItem>
              <Box1Img src="/images/test.png" alt="test"></Box1Img>
              {user.my_constitution_8 &&
              user.my_constitution_8.length !== "" ? (
                <Box1Text onClick={() => navigate(`/myCon/${param2}`)}>
                  {user.my_constitution_8}체질
                </Box1Text>
              ) : (
                <Box1Text onClick={() => navigate(`/q_myCON/${param2}`)}>
                  나의 체질은?
                </Box1Text>
              )}
            </ListItem>
            <ListItem onClick={() => navigate("/column")}>
              <Box1Img src="/images/info.png" alt="info"></Box1Img>
              {user.my_constitution_8 && user.my_constitution_8 !== "" ? (
                <Box1Text>{user.warn_message}</Box1Text>
              ) : (
                <Box1Text>체질별 주의사항</Box1Text>
              )}
            </ListItem>
          </List>
        </Box1>
      </Box1Wrapper>
      <RoundedBox>
        <When>{formattedDate}</When>
        <Box1Wrapper>
          <Box2>
            <FaceImg src={mealFeedback.image} alt="face"></FaceImg>
            {/*이거는 새로 합산 데이터 불러와서 처리 */}
            <List>
              <ListItem>
                <DetailText>오늘의 식단 분석을 알려드려요</DetailText>
              </ListItem>
              <ListItem>
                <TitleText>{mealFeedback.message}</TitleText>
              </ListItem>
              <ListItem onClick={() => navigate(`/meal/${param2}`)}>
                {/* 리스트 아이템 이모지는 렌더링방식으로 각각 처리 */}
                {userdata.breakfast ? (
                  <>
                    <PlusImg src="/images/check.png"></PlusImg>
                    <EatBtn>아침</EatBtn>
                  </>
                ) : (
                  <>
                    <PlusImg src="/images/plus.png"></PlusImg>
                    <NoEatBtn>아침</NoEatBtn>
                  </>
                )}
              </ListItem>
              <ListItem onClick={() => navigate(`/meal/${param2}`)}>
                {userdata.lunch ? (
                  <>
                    <PlusImg src="/images/check.png"></PlusImg>
                    <EatBtn>점심</EatBtn>
                  </>
                ) : (
                  <>
                    <PlusImg src="/images/plus.png"></PlusImg>
                    <NoEatBtn>점심</NoEatBtn>
                  </>
                )}
              </ListItem>
              <ListItem onClick={() => navigate(`/meal/${param2}`)}>
                {userdata.dinner ? (
                  <>
                    <PlusImg src="/images/check.png"></PlusImg>
                    <EatBtn>저녁</EatBtn>
                  </>
                ) : (
                  <>
                    <PlusImg src="/images/plus.png"></PlusImg>
                    <NoEatBtn>저녁</NoEatBtn>
                  </>
                )}
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
              {user.friend_usernames && user.friend_usernames.length !== 0 ? (
                <>
                  {user.friend_usernames.map((item, index) => (
                    <Friend key={index}>
                      <p>{item}</p>
                    </Friend>
                  ))}
                </>
              ) : (
                <>
                  <OurCareStart onClick={() => navigate("/ourcare/")}>
                    시작하기
                  </OurCareStart>
                </>
              )}
            </List>
          </Box2>
        </Box1Wrapper>
        <Box3>
          <Leftbox>
            <LeftboxTxt>오늘의 식사</LeftboxTxt>
            <LeftboxBar src="/images/bar.png"></LeftboxBar>
          </Leftbox>
          <RightBox>
            {userdata.breakfast || userdata.lunch || userdata.dinner ? (
              <>
                <EatRecordWrapper onClick={() => navigate(`/meal/${param2}`)}>
                  <h3>아침</h3>
                  <FoodListWrapper>
                    {userdata.breakfast &&
                      userdata.breakfast.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {userdata.breakfast && userdata.breakfast.length > 2 && (
                      <p>..</p>
                    )}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper onClick={() => navigate(`/meal/${param2}`)}>
                  <h3>점심</h3>
                  <FoodListWrapper>
                    {userdata.lunch &&
                      userdata.lunch.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {userdata.lunch && userdata.lunch.length > 2 && <p>..</p>}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper onClick={() => navigate(`/meal/${param2}`)}>
                  <h3>저녁</h3>
                  <FoodListWrapper>
                    {userdata.dinner &&
                      userdata.dinner.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {userdata.dinner && userdata.dinner.length > 2 && <p>..</p>}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper onClick={() => navigate(`/meal/${param2}`)}>
                  <h3>간식</h3>
                  <FoodListWrapper>
                    {userdata.snack &&
                      userdata.snack.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {userdata.snack && userdata.snack.length > 2 && <p>..</p>}
                  </FoodListWrapper>
                </EatRecordWrapper>
              </>
            ) : (
              <>
                <RightBoxTxt>오늘의 식사를 기록해요</RightBoxTxt>
                <RightBoxImg
                  src="/images/potato.png"
                  alt="potato"
                ></RightBoxImg>
                <WriteBtn onClick={() => navigate(`/meal/${param2}`)}>
                  기록하기
                </WriteBtn>
              </>
            )}
          </RightBox>
        </Box3>
        <Box3>
          <Leftbox>
            <LeftboxTxt>오늘의 컨디션</LeftboxTxt>
            <LeftboxBar src="/images/bar.png"></LeftboxBar>
          </Leftbox>
          <RightBox>
            {user.condition ? (
              <>
                <EatRecordWrapper
                  onClick={() => navigate(`/condition/${param2}`)}
                >
                  <h3>몸상태</h3>
                  <FoodListWrapper>
                    {user.condition_cate &&
                      user.condition_cate.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {user.condition_cate && user.condition_cate.length > 2 && (
                      <p>..</p>
                    )}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/condition/${param2}`)}
                >
                  <h3>기분</h3>
                  <FoodListWrapper>
                    {user.mood_cate &&
                      user.mood_cate.slice(0, 2).map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {user.mood_cate && user.mood_cate.length > 2 && <p>..</p>}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/condition/${param2}`)}
                >
                  <h3>메모</h3>
                  <FoodListWrapper>
                    <p>자세히 보기</p>
                  </FoodListWrapper>
                </EatRecordWrapper>
              </>
            ) : (
              <>
                <RightBoxTxt>몸 상태와 기분은 어때요?</RightBoxTxt>
                <RightBoxImg
                  src="/images/condition.png"
                  alt="condition"
                ></RightBoxImg>
                <WriteBtn
                  onClick={() => navigate(`/condition/${param2}/${user.date}`)}
                >
                  기록하기
                </WriteBtn>
              </>
            )}
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
  height: 100%;
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

const DateBox1Text = styled.span`
  font-size: 11px;
  color: #7350ff;
  font-weight: 500;
  cursor: pointer;
`;

const RoundedBox = styled.div`
  background-color: #f5f5f5;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: 18px;
  padding-bottom: max(50px, calc(100vh - 600px));
  min-height: fit-content;
  overflow-y: auto;
  height: inherit;
`;
const When = styled.div`
  text-align: center;
  margin-top: 16px;
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
const NoEatBtn = styled.button`
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
const EatBtn = styled.button`
  color: white;
  font-size: 10px;
  margin-left: 5px;
  border: 1px solid black;
  background-color: black;
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
const Friend = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 2px;
    background-color: #7350ff;
    font-size: 10px;
    color: white;
    padding: 2px;
    border-radius: 10px;
    width: 35px;
    text-align: center;
  }
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
  resize: none;
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
  position: relative;
  margin-left: 13px;
  flex: 1;
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
  right: 0px;
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
const EatRecordWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: -1px;
  cursor: pointer;
  &:first-child {
    margin-top: 15px;
  }

  h3 {
    margin-top: auto;
    font-size: 13px;
    color: #737373;
    margin-right: 8px;
  }
`;
const FoodListWrapper = styled.div`
  display: flex;

  p {
    font-size: 10px;
    margin-right: 5px;
    margin-top: auto;
    border: 1px solid #9f9f9f;
    border-radius: 10px;
    padding: 1px 2px;
    color: #9f9f9f;
  }
`;

export default Mainpage;
