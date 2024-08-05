import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ModalOverlay,
  Purple,
  BtnWrapper,
  CloseButton,
  SetButton,
} from "./SetMyModal";

function ReservateModal({ isReservateOpen, closeReservateModal, cliniccall }) {
  // 수정된 부분
  const navigate = useNavigate();

  const [ButtonClick, setButtonClick] = useState(true);
  const handleButtonclick = () => {
    setButtonClick(false);
  };
  return (
    <div>
      <ModalOverlay style={{ display: isReservateOpen ? "flex" : "none" }}>
        <Container>
          {ButtonClick ? (
            <>
              <Purple>
                <h2>예약하시겠어요?</h2>
              </Purple>
              <img src="/images/call.png" alt="call"></img>
              <p>
                한의원 예약은 전화로 이루어져요.
                <br />
                예약을 원하신다면 바로 전화를 연결해드릴게요
              </p>
              <BtnWrapper>
                <CloseButton onClick={closeReservateModal}>
                  {" "}
                  {/* 수정된 부분 */}
                  뒤로가기
                </CloseButton>
                <a href={`tel:${cliniccall}`}>
                  <SetButton onClick={handleButtonclick}>전화 연결</SetButton>
                </a>
              </BtnWrapper>
            </>
          ) : (
            <>
              <Purple>
                <h2>예약하셨나요?</h2>
              </Purple>
              <img src="/images/call.png" alt="call"></img>
              <p>
                한의원 예약 내역을 캘린더에 기록해요
                <br />
                메인 페이지에서 예약 일정을 알려드릴게요
              </p>
              <BtnWrapper>
                <CloseButton onClick={closeReservateModal}>
                  {" "}
                  {/* 수정된 부분 */}
                  뒤로가기
                </CloseButton>
                <SetButton onClick={() => navigate("/calendar")}>
                  예약 기록하기
                </SetButton>
              </BtnWrapper>
            </>
          )}
        </Container>
      </ModalOverlay>
    </div>
  );
}

const Container = styled.div`
  position: relative;
  width: 325px;
  height: 400px;
  background-color: white;
  border-radius: 30px;
  white-space: pre-line;
  z-index: 1000;

  img {
    width: 160px;
    display: block;
    margin-left: 90px;
    margin-top: 20px;
  }

  p {
    text-align: center;
    font-size: 15px;
  }
`;

export default ReservateModal;
