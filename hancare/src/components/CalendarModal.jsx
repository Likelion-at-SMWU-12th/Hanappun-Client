import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import OurCareFamily from "../pages/ourcare/OurCareFamily";

function CalendarModal({ isOpen, closeModal, selectedDate }) {
  // 수정 버튼 상태
  const [fix, setFix] = useState(false);
  const handleFixbtnClick = () => {
    setFix(true);
  };

  const userinfo = {
    name: "나",
    reservation: "17:30",
  };
  const friendinfo = {
    name: "나",
    reservation: "오후 05시 30분",
  };
  const foodinfo = {
    result: "건강이 염려되는걸요?",
  };
  const feelinginfo = {
    result: "소화불량, 고혈압",
  };

  // 시간 input
  const initialTime = userinfo.reservation ? userinfo.reservation : "";
  const [time, setTime] = useState(initialTime);
  const handleChange = (e) => {
    setTime(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
        <Container>
          {fix ? (
            <>
              {userinfo.hospital ? (
                <>
                  <Purple>
                    <MyFixTitle>
                      <h2>{selectedDate.toString()}</h2>
                      <MyFix>{userinfo.name}의 예약</MyFix>
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
                        <HospitalName>{userinfo.hospital}</HospitalName>
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
                  <Notimg src="/images/nothospital.png"></Notimg>
                </>
              )}
            </>
          ) : (
            <>
              <Purple>
                <h2>{selectedDate.toString()}</h2>
              </Purple>
              <SubTitle>
                <img src="/images/purplespot.png" alt="purplespot"></img>
                <h2>예약 일정</h2>
              </SubTitle>
              <OurWrapper>
                <OurBox>
                  <h3>{userinfo.name}</h3>
                  <Myimg src="/images/mycareimg.png"></Myimg>
                  <img src="images/whitebar.png"></img>
                  {userinfo.hospital ? (
                    <>
                      <h3>{userinfo.hospital}</h3>
                      <p>{userinfo.reservation}</p>
                    </>
                  ) : (
                    <>
                      <h3>아직 예약이 없어요!</h3>
                    </>
                  )}
                  <Fiximg
                    src="/images/fixreservation.png"
                    onClick={handleFixbtnClick}
                  ></Fiximg>
                </OurBox>
                <OurBox>
                  <h3>{friendinfo.name}</h3>
                  <Myimg src="/images/ourcareimg.png"></Myimg>
                  <img src="images/whitebar.png"></img>
                  {friendinfo.hospital ? (
                    <>
                      <h3>{friendinfo.hospital}</h3>
                      <p>{friendinfo.reservation}</p>
                    </>
                  ) : (
                    <>
                      <h3>아직 예약이 없어요!</h3>
                    </>
                  )}
                  <Fiximg
                    src="/images/fixreservation.png"
                    onClick={handleFixbtnClick}
                  ></Fiximg>
                </OurBox>
                <OurBox>
                  <h3>{userinfo.name}</h3>
                  <Myimg src="/images/ourcareimg.png"></Myimg>
                  <img src="images/whitebar.png"></img>
                  {friendinfo.hospital ? (
                    <>
                      <h3>{friendinfo.hospital}</h3>
                      <p>{friendinfo.reservation}</p>
                    </>
                  ) : (
                    <>
                      <h3>아직 예약이 없어요!</h3>
                    </>
                  )}
                  <Fiximg
                    src="/images/fixreservation.png"
                    onClick={handleFixbtnClick}
                  ></Fiximg>
                </OurBox>
              </OurWrapper>
              <BigBar src="images/whitebar.png"></BigBar>
              <ConditionWrapper>
                <ConditionBox>
                  <SubTitle>
                    <img src="/images/purplespot.png" alt="purplespot"></img>
                    <h2>식습관</h2>
                  </SubTitle>
                  <p>{foodinfo.result}</p>
                  <DetailWrapper>
                    <p>자세히 보기</p>
                    <img src="/images/seedetail.png"></img>
                  </DetailWrapper>
                </ConditionBox>
                <ConditionBox>
                  <SubTitle>
                    <img src="/images/purplespot.png" alt="purplespot"></img>
                    <h2>몸상태 및 기분</h2>
                  </SubTitle>
                  <p>{feelinginfo.result}</p>
                  <DetailWrapper>
                    <p>자세히 보기</p>
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
  z-index: 1000; /* Ensure the modal is above other content */
`;

export const Container = styled.div`
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
  margin-left: 25px;
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
  width: 108px;
  height: 80px;

  h3 {
    margin-top: 5px;
    &:first-child {
      font-size: 13px;
      color: #7350ff;
    }
    font-size: 13px;
  }
  img {
    margin-top: -10px;
    width: 95px;
  }
  p {
    font-size: 12px;
    margin-top: -15px;
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
  top: 72px;
  right: 13px;
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

const HospitalBox = styled.div`
  box-shadow: 0 0 8px #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 10px 20px 50px 20px;
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
const Notimg = styled.img`
  width: 250px;
  display: block;
  margin: 20px auto;
`;

const BigBar = styled.img`
  width: 100%;
  text-align: center;
`;

const ConditionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;
  gap: auto;
`;

const ConditionBox = styled.div`
  p {
    margin-left: 30px;
    margin-top: -10px;
    font-size: 13px;
  }

  &:last-child {
    p {
      margin-left: 0;
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
export default CalendarModal;
