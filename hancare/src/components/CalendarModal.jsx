import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

function CalendarModal({ isOpen, closeModal, selectedDate }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.username);
  const [userinfo, setUserinfo] = useState([]);
  const [fix, setFix] = useState(false);
  const [time, setTime] = useState("");
  const [timeNewReservation, setTimeNewReservation] = useState("");
  const [selectfix, setSelectfix] = useState(false);
  const [friend, setFriend] = useState([]);
  const [myhospital, setMyhospital] = useState([]);

  // 식사 페이지 연결을 위한 코드. (날짜 함수)
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd", { locale: ko });
  };

  const formatReservationDate = (reservationDate) => {
    if (!reservationDate) return ""; // reservationDate가 없으면 빈 문자열 반환
    const [datePart, timePart] = reservationDate.split("T");
    if (!timePart) return datePart; // timePart가 없으면 datePart만 반환
    const [hours, minutes] = timePart.split(":");
    return `${datePart} ${hours}:${minutes}`;
  };

  // 특정 날짜 이벤트 불러오기
  const getReservinfo = () => {
    axios
      .get(
        `${baseURL}/calendars/event/detail/test1/${formatDate(selectedDate)}/`
      )
      .then((response) => {
        setUserinfo(response.data.result); // 수정된 부분
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedDate) {
      getReservinfo();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (userinfo.appointment && userinfo.appointment.length > 0) {
      const initialTime = ReservationTime(userinfo.appointment[0].date);
      setTime(initialTime);
    }
  }, [userinfo]);

  // 친구 목록 불러오는 api
  const getFriendInfo = () => {
    axios
      .get(`${baseURL}/users/ourcare?username=test1`, {
        username: "test1",
      })
      .then((response) => {
        setFriend(response.data.result);
      })
      .catch((error) => {
        alert("사용자를 찾을 수 없습니다.");
        console.log(error);
      });
  };

  useEffect(() => {
    getFriendInfo();
  }, []);

  // test1의 예약이 있는지 확인하는 함수들
  const appointmentMe = userinfo.appointment?.find(
    (appointment) => appointment.client_username === "test1"
  );

  useEffect(() => {
    const getmyHospitalInfo = () => {
      axios
        .get(`${baseURL}/calendars/event/today/test1`)
        .then((response) => {
          setMyhospital(response.data.result.my_clinic);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getmyHospitalInfo();
  }, []);

  // 예약 생성하기
  const formatDateNewReservation = (date) => {
    return format(date, "yyyyMMdd", { locale: ko });
  };

  const WriteBtnClick = () => {
    formatDateNewReservation(selectedDate);
    axios
      .post(`${baseURL}/reservation/`, {
        client: "test1",
        date: `${formatDateNewReservation(selectedDate)} ${timeNewReservation}`,
      })
      .then((response) => {
        console.log(response.data);
        getReservinfo();
        navigate(`/calendar/test1`); // 수정된 부분
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 수정 버튼을 눌렀을 경우 함수들
  const handleFixbtnClick = (appointment) => {
    console.log("appointment", appointment);
    setSelectfix(appointment);
    console.log("selectfix", selectfix);
    setFix(true);
    console.log("fix", fix);
  };

  const ReservationTime = (dateTimeString) => {
    const timePart = dateTimeString.split("T")[1];
    const reservatetime = timePart.split(":").slice(0, 2).join(":");
    return reservatetime;
  };

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  //예약 생성 시 시간 변경
  const handleTimeChange = (e) => {
    setTimeNewReservation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 시간 업데이트 등의 작업을 수행
  };

  if (!isOpen) return null;

  return (
    <div>
      <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
        <Container>
          {fix && selectfix ? (
            <>
              {myhospital ? (
                <>
                  <Purple>
                    <MyFixTitle>
                      <h2>{formatDate(selectedDate)}</h2>
                      <MyFix>{selectfix.client_username}의 예약</MyFix>
                    </MyFixTitle>
                  </Purple>
                  <SubTitle>
                    <img src="/images/purplespot.png" alt="purplespot"></img>
                    <h2>예약 일정</h2>
                  </SubTitle>
                  <HospitalWrapper>
                    <form onSubmit={handleSubmit}>
                      <HospitalBox>
                        <Hospitalimg src="/images/marker.png"></Hospitalimg>
                        <HospitalName>
                          {selectfix.client_my_clinic}
                        </HospitalName>
                        <input
                          type="time"
                          value={time}
                          onChange={handleChange}
                        />
                        <button>예약 삭제</button>
                      </HospitalBox>
                      <BtnWrapper>
                        <SetButton onClick={closeModal}>뒤로가기</SetButton>
                        <CloseButton type="submit">저장</CloseButton>
                      </BtnWrapper>
                    </form>
                  </HospitalWrapper>
                </>
              ) : (
                <>
                  <Purple>
                    <MyFixTitle>
                      <h2>알림</h2>
                    </MyFixTitle>
                  </Purple>
                  <NotWrapper>
                    <Notimg src="/images/nothospital.png"></Notimg>
                    <h3>
                      해당 예약자의 나의 한의원이 설정되어 있지 않습니다
                      <br />
                      설정 후 다시 이용해 주세요
                    </h3>
                    <CloseButton onClick={() => navigate(`/map/test1`)}>
                      나의 한의원 찾기
                    </CloseButton>
                  </NotWrapper>
                </>
              )}
            </>
          ) : (
            <>
              <Purple>
                <h2>{formatDate(selectedDate)}</h2>
              </Purple>
              <SubTitle>
                <img src="/images/purplespot.png" alt="purplespot"></img>
                <h2>예약 일정</h2>
              </SubTitle>
              <OurWrapper>
                {/* "test1" 유저와 친구 목록을 함께 처리하기 위해 배열로 합침 */}
                {userinfo.appointment && userinfo.appointment.length > 0 ? (
                  [{ test1: "김멋사" }, ...friend].map((user, key) => {
                    const userKey = Object.keys(user)[0]; // 유저 ID (test1 또는 친구 ID)
                    const userName = user[userKey]; // 유저 이름 (test1 또는 친구 이름)

                    // 해당 유저가 예약 정보에 포함되어 있는지 확인
                    const appointmentForUser = userinfo.appointment.find(
                      (appointment) => appointment.client_username === userKey
                    );

                    // map() 함수 내에서 JSX를 return
                    return (
                      <OurBox key={key}>
                        <h3>{userName}</h3> {/* 유저 이름 출력 */}
                        {userName === "김멋사" ? (
                          <Myimg src="/images/mycareimg.png"></Myimg>
                        ) : (
                          <Myimg src="/images/calendar_friend.png"></Myimg>
                        )}
                        {appointmentForUser ? (
                          <>
                            <h3>{myhospital}</h3> {/* 예약된 병원 */}
                            <p>
                              {ReservationTime(appointmentForUser.date)}
                            </p>{" "}
                            {/* 예약 시간 */}
                            <Fiximg
                              src="/images/fixreservation.png"
                              onClick={() =>
                                handleFixbtnClick(appointmentForUser)
                              }
                            ></Fiximg>
                          </>
                        ) : (
                          <>
                            <h3>아직 예약이 없어요!</h3>{" "}
                            {/* 예약이 없을 경우 */}
                            <Fiximg src="/images/fixreservation.png"></Fiximg>
                          </>
                        )}
                      </OurBox>
                    );
                  })
                ) : (
                  <>
                    <OurBox>
                      <h3>김멋사</h3>
                      <Myimg src="/images/mycareimg.png"></Myimg>
                      <h3>아직 예약이 없어요!</h3>
                      <Fiximg src="/images/fixreservation.png"></Fiximg>
                    </OurBox>
                    {friend &&
                      friend.map((frienditem, key) => (
                        <OurBox key={key}>
                          <h3>{frienditem[Object.keys(frienditem)[0]]}</h3>
                          <Myimg src="/images/calendar_friend.png"></Myimg>
                          <h3>아직 예약이 없어요!</h3>
                          <Fiximg src="/images/fixreservation.png"></Fiximg>
                        </OurBox>
                      ))}
                  </>
                )}
              </OurWrapper>
              <ConditionWrapper>
                <ConditionBox>
                  <SubTitle>
                    <img src="/images/purplespot.png" alt="purplespot"></img>
                    <h2>식습관</h2>
                  </SubTitle>
                  <p>
                    {userinfo.meal && userinfo.meal.overall_status
                      ? userinfo.meal.overall_status
                      : null}
                  </p>
                  <DetailWrapper>
                    <p
                      onClick={() =>
                        navigate(`/meal/test1/${formatDate(selectedDate)}`)
                      }
                    >
                      자세히 보기
                    </p>
                    <img src="/images/seedetail.png"></img>
                  </DetailWrapper>
                </ConditionBox>
                <ConditionBox>
                  <SubTitle>
                    <img src="/images/purplespot.png" alt="purplespot"></img>
                    <h2>몸상태 및 기분</h2>
                  </SubTitle>
                  <p>
                    {userinfo.condition && userinfo.condition.condition_cate
                      ? userinfo.condition.condition_cate.split(",")[0]
                      : null}
                  </p>
                  <DetailWrapper>
                    <p
                      onClick={() =>
                        navigate(`/condition/test1/${formatDate(selectedDate)}`)
                      }
                    >
                      자세히 보기
                    </p>
                    <img src="/images/seedetail.png"></img>
                  </DetailWrapper>
                </ConditionBox>
              </ConditionWrapper>
              <CloseButton onClick={closeModal}>확인</CloseButton>
            </>
          )}
        </Container>
      </ModalOverlay>
    </div>
  );
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 325px;
  height: auto;
  padding-bottom: 10px;
  background-color: white;
  border-radius: 30px;
  white-space: pre-line;
  z-index: 1000;
  p {
    text-align: center;
    font-size: 15px;
  }
`;

export const Purple = styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #7350ff;
  padding: 5px;
  font-size: 13px;
  color: white;
  text-align: center;
`;
const MyFixTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const MyFix = styled.h2`
  background-color: white;
  color: #7350ff;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  padding: 0 10px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const CloseButton = styled.button`
  background-color: #7350ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  width: 120px;
  font-size: 15px;
  font-weight: bolder;
  display: block;
  margin: 15px auto;
  cursor: pointer;
`;
export const SetButton = styled(CloseButton)`
  background-color: black;
  color: white;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 17px;
  }

  img {
    margin-left: 30px;
    margin-right: 10px;
  }

  &:last-child {
    h2 {
      font-size: auto;
    }

    img {
      width: auto;
    }
  }
`;

const OurWrapper = styled.div`
  display: flex;
  align-items: stretch;
  margin-left: 14px;
  gap: 10px;
  flex-wrap: wrap;
`;

const OurBox = styled.div`
  box-shadow: 0 0 8px #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  position: relative;
  width: 115px;
  height: 100px;

  h3 {
    margin-top: 5px;
    &:first-child {
      font-size: 13px;
      color: #7350ff;
    }
    font-size: 13px;
  }
  img {
    margin-top: -5px;
    width: 95px;
  }
  p {
    font-size: 12px;
    margin-top: -10px;
    text-align: left;
  }
`;
const Myimg = styled.img`
  position: absolute !important;
  display: block !important;
  width: 12px !important;
  top: 20px;
  right: 13px;
`;

const Fiximg = styled.img`
  display: block !important;
  position: absolute !important;
  width: 15px !important;
  top: 80px !important;
  right: 13px !important;
  cursor: pointer;
`;

const HospitalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  gap: 20px;
  flex-wrap: wrap;
  position: relative;
`;

const WriteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  gap: 20px;
  flex-wrap: wrap;
  position: relative;
`;

const HospitalBox = styled.div`
  box-shadow: 0 0 8px #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 10px 25px 50px 25px;
  width: 220px;

  input {
    margin-right: 0.5em;
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    color: black;
  }

  button {
    background-color: black;
    color: white;
    display: block;
    width: 75px;
    font-size: 12px;
    border-radius: 25px;
    text-align: center;
    position: absolute;
    top: 115px;
    right: 30px;
    cursor: pointer;
  }
`;

const WriteBox = styled.div`
  box-shadow: 0 0 8px #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 10px 25px 50px 25px;
  width: 220px;

  input {
    margin-right: 0.5em;
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    color: black;
  }
`;

const Hospitalimg = styled.img`
  width: 20px !important;
  display: block !important;
  position: absolute !important;
  top: 20px;
  left: 15px;
`;
const HospitalName = styled.h2`
  color: #7350ff;
  font-size: 18px;
  margin-left: 25px;
  margin-top: 10px;
`;
const NotWrapper = styled.div`
  padding: 15px;

  button {
    width: 200px;
  }

  h3 {
    font-size: 13px;
    text-align: center;
  }
`;
const Notimg = styled.img`
  width: 230px;
  display: block;
  margin: 20px auto;
`;

const BigBar = styled.img`
  width: 100%;
  text-align: center;
`;

const ConditionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 0;
  gap: 40px;
`;

const ConditionBox = styled.div`
  p {
    margin-left: -15px;
    margin-top: -10px;
    font-size: 13px;
  }

  &:last-child {
    p {
      margin-left: -40px;
    }
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: #7350ff;
  }
  img {
    width: 9px !important;
    margin-top: -20px;
    margin-left: 4px;
  }

  &:last-child {
    p {
      margin-left: 30px;
    }
  }
`;

const Writebtn = styled.button`
  background-color: black;
  color: white;
  border-radius: 25px;
  display: block;
  position: absolute;
  width: 75px;
  font-size: 12px;
  text-align: center;
  top: 65px;
  right: 30px;
  cursor: pointer;
`;

export default CalendarModal;
