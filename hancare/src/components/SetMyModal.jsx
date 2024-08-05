import axios from "axios";
import React from "react";
import styled from "styled-components";
import { baseURL } from "../api/baseURL";
import { useSelector } from "react-redux";

function SetMyModal({ isOpen, closeModal, myClinic, clinicName }) {
  const username = useSelector((state) => state.username);

  const ChangeHospital = () => {
    const newClinic = myClinic === clinicName.id ? null : clinicName.id;
    axios
      .patch(`${baseURL}/users/profile/`, {
        username: username,
        my_clinic: newClinic,
      })
      .then((response) => {
        console.log(response);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
        <Container>
          <Purple>
            {myClinic === clinicName.id ? (
              <>
                <h2>나의 한의원을 취소하시겠어요?</h2>
              </>
            ) : (
              <>
                <h2>나의 한의원으로 설정할까요?</h2>
              </>
            )}
          </Purple>
          <img src="/images/setmyhospital.png" alt="file"></img>
          <p>
            나의 한의원으로 설정하면
            <br />
            한의원 예약 및 정보를 빠르게 볼 수 있어요
          </p>
          <BtnWrapper>
            <CloseButton onClick={closeModal}>뒤로가기</CloseButton>
            <SetButton onClick={ChangeHospital}>
              {myClinic === clinicName.id ? <>취소하기</> : <>설정하기</>}
            </SetButton>
          </BtnWrapper>
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
  height: 400px;
  background-color: white;
  border-radius: 30px;
  white-space: pre-line;
  z-index: 1000;

  img {
    width: 180px;
    display: block;
    margin-left: 90px;
    margin-top: 20px;
  }

  p {
    text-align: center;
    font-size: 15px;
  }
`;

export const Purple = styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #7350ff;
  padding: 15px;
  font-size: 13px;
  color: white;
  text-align: center;
`;
export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const CloseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 15px;
  font-weight: bolder;
  cursor: pointer;
`;
export const SetButton = styled(CloseButton)`
  background-color: #7350ff;
  color: white;
`;

export default SetMyModal;
