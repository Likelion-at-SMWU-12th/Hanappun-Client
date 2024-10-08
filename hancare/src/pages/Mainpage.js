import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { setUsername } from "../redux/action";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Mainpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [param2, setParam2] = useState(params.username);

  // 내 정보 불러오기
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getInfo = () => {
      axios
        .get(`${baseURL}/calendars/event/today/test1`)
        .then((response) => {
          setUser(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
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

  // meal 객체에서 첫 번째로 존재하는 리스트의 score_evaluation 가져오는 함수
  const getFirstScoreEvaluation = (meal) => {
    // meal 내에서 값이 존재하는 첫 번째 리스트를 찾기
    const firstMealList =
      meal.morning_list?.[0] ||
      meal.lunch_list?.[0] ||
      meal.dinner_list?.[0] ||
      meal.snack_list?.[0];

    // 해당 리스트의 첫 번째 항목의 score_evaluation 반환
    return firstMealList ? firstMealList.score_evaluation : null;
  };

  // meal 데이터에서 score_evaluation을 가져오는 코드
  const mealFeedback = user.meal
    ? getMealFeedback(getFirstScoreEvaluation(user.meal))
    : getMealFeedback(null);

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd", { locale: ko });
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
            <ListItem onClick={() => navigate(`/map/test1`)}>
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
                <Box1Text onClick={() => navigate(`/myCon/test1`)}>
                  {user.my_constitution_8}체질
                </Box1Text>
              ) : (
                <Box1Text onClick={() => navigate(`/q_myCON/test1`)}>
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
              <ListItem
                onClick={() => navigate(`/meal/test1/${formatDate(today)}`)}
              >
                {/* 리스트 아이템 이모지는 렌더링방식으로 각각 처리 */}
                {user.meal && user.meal.morning_list.length > 0 ? (
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
              <ListItem
                onClick={() => navigate(`/meal/test1/${formatDate(today)}`)}
              >
                {user.meal && user.meal.lunch_list.length > 0 ? (
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
              <ListItem
                onClick={() => navigate(`/meal/test1/${formatDate(today)}`)}
              >
                {user.meal && user.meal.dinner_list.length > 0 ? (
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
          <OurCareBox2 onClick={() => navigate(`/ourcare/test1`)}>
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
                  <OurCareStart onClick={() => navigate(`/ourcare/test1`)}>
                    시작하기
                  </OurCareStart>
                </>
              )}
            </List>
          </OurCareBox2>
        </Box1Wrapper>
        <Box3>
          <Leftbox>
            <LeftboxTxt>오늘의 식사</LeftboxTxt>
            <LeftboxBar src="/images/bar.png"></LeftboxBar>
          </Leftbox>
          <RightBox>
            {user.meal ? (
              <>
                <EatRecordWrapper
                  onClick={() => navigate(`/meal/test1/${user.date}`)}
                >
                  <h3>아침</h3>
                  <FoodListWrapper>
                    {user.meal &&
                      user.meal.morning_list &&
                      user.meal.morning_list.map((food, index) => (
                        <div key={index}>
                          <p>{food.name}</p>
                        </div>
                      ))}
                    {/* {user.meal &&
                      user.meal.morning_list &&
                      user.meal.morning_list.length > 2 && <p>..</p>} */}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/meal/test1/${user.date}`)}
                >
                  <h3>점심</h3>
                  <FoodListWrapper>
                    {user.meal &&
                      user.meal.lunch_list &&
                      user.meal.lunch_list.map((food, index) => (
                        <div key={index}>
                          <p>{food.name}</p>
                        </div>
                      ))}
                    {/* {user.meal &&
                      user.meal.lunch_list &&
                      user.meal.lunch_list.length > 2 && <p>..</p>} */}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/meal/test1/${user.date}`)}
                >
                  <h3>저녁</h3>
                  <FoodListWrapper>
                    {user.meal &&
                      user.meal.dinner_list &&
                      user.meal.dinner_list.map((food, index) => (
                        <div key={index}>
                          <p>{food.name}</p>
                        </div>
                      ))}
                    {/* {user.meal &&
                      user.meal.dinner_list &&
                      user.meal.dinner_list.length > 2 && <p>..</p>} */}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/meal/test1/${user.date}`)}
                >
                  <h3>간식</h3>
                  <FoodListWrapper>
                    {user.meal &&
                      user.meal.snack_list &&
                      user.meal.snack_list.map((food, index) => (
                        <div key={index}>
                          <p>{food.name}</p>
                        </div>
                      ))}
                    {/* {user.meal &&
                      user.meal.snack_list &&
                      user.meal.snack_list.length > 2 && <p>..</p>} */}
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
                <WriteBtn onClick={() => navigate(`/meal/test1/${user.date}`)}>
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
                  onClick={() => navigate(`/condition/test1/${user.date}`)}
                >
                  <h3>몸상태</h3>
                  <FoodListWrapper>
                    {user.condition &&
                      user.condition.condition_cate &&
                      user.condition.condition_cate
                        .split(",")
                        .map((food, index) => (
                          <div key={index}>
                            <p>{food}</p>
                          </div>
                        ))}
                    {/* {user.condition &&
                      user.condition.condition_cate &&
                      user.condition.condition_cate.split(",").length > 1 && (
                        <p>..</p>
                      )} */}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/condition/test1/${user.date}`)}
                >
                  <h3>기분</h3>
                  <FoodListWrapper>
                    {user.condition &&
                      user.condition.mood_cate &&
                      user.condition.mood_cate.split(",").map((food, index) => (
                        <div key={index}>
                          <p>{food}</p>
                        </div>
                      ))}
                    {/* {user.condition &&
                      user.condition.mood_cate &&
                      user.condition.mood_cate.split(",").length > 1 && (
                        <p>..</p>
                      )} */}
                  </FoodListWrapper>
                </EatRecordWrapper>
                <EatRecordWrapper
                  onClick={() => navigate(`/condition/test1/${user.date}`)}
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
                  onClick={() => navigate(`/condition/test1/${user.date}`)}
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
  height: 100vh;
  overflow-y: auto;
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
  padding-bottom: 50px;
  min-height: fit-content;
  overflow-y: auto;
  height: 100vh;
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

const OurCareBox2 = styled(Box2)`
  cursor: pointer;
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
  margin-top: -1px;
  cursor: pointer;
  &:first-child {
    margin-top: 12px;
  }

  h3 {
    margin-top: auto;
    font-size: 13px;
    color: black;
    margin-right: 8px;
    white-space: nowrap; /* h3 요소도 줄바꿈 없이 가로로 */
  }
`;
const FoodListWrapper = styled.div`
  display: flex;
  overflow-x: scroll; /* 'scroll' 대신 'auto' 사용도 가능 */
  white-space: nowrap; /* 줄바꿈 없이 가로로 표시되도록 설정 */
  align-items: center;
  width: 110px;

  p {
    font-size: 10px;
    margin-right: 5px;
    margin-top: auto;
    border: 1px solid #9f9f9f;
    border-radius: 10px;
    padding: 1px 5px;
    color: #9f9f9f;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  }
`;

export default Mainpage;
