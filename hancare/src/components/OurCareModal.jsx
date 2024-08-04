import React, { useState } from "react";
import styled from "styled-components";

import { post_ourcare } from "../api/users/post_ourcare";

function OurCareModal({ isOpen, closeModal, username, addProfile }) {
  const [selectedButton, setSelectedButton] = useState("엄마/아빠");
  const [values, setValues] = useState({
    id: "",
  });

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePostOurcare = async (e) => {
    e.preventDefault();
    const data = {
      my_username: username,
      friend_username: values.id,
    };
    const result = await post_ourcare(data);

    if (result.status == 200) {
      alert("우리케어 추가에 성공하였습니다. ");
    } else {
      alert("우리케어 추가에 실패하였습니다. 다시 입력해 주세요.");
    }
  };

  return (
    <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
      <Container>
        <Purple>
          <h2>
            우리 <Who>{selectedButton}</Who> (을)를 위해
            <br />
            우리케어를 이용해요
          </h2>
          <BtnWrapper>
            {["엄마/아빠", "아들/딸", "배우자", "연인", "친구", "기타"].map(
              (buttonName) => (
                <StyledButton
                  key={buttonName}
                  onClick={() => handleButtonClick(buttonName)}
                  isSelected={selectedButton === buttonName}
                >
                  {buttonName}
                </StyledButton>
              )
            )}
          </BtnWrapper>
        </Purple>
        <IdForm>
          <span>추가할 우리케어 이용자의 아이디를 입력해주세요</span>
          <input
            type="text"
            name="id"
            value={values.id}
            onChange={handleChange}
            placeholder="아이디를 입력"
            required
          />
          <CheckBtn type="submit" onClick={handlePostOurcare}>
            확인
          </CheckBtn>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </IdForm>
      </Container>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
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

const Container = styled.div`
  position: relative;
  width: 325px;
  height: 500px;
  background-color: white;
  border-radius: 30px;
  white-space: pre-line;
  z-index: 1000;
`;

const Purple = styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #7350ff;
  padding: 15px;
  font-size: 13px;
  color: white;
  text-align: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.isSelected ? "white" : "black")};
  color: ${(props) => (props.isSelected ? "#7350ff" : "white")};
  border: none;
  border-radius: 30px;
  font-size: 11px;
  font-weight: bolder;
  padding: 8px;
  cursor: pointer;
`;

const Who = styled.span`
  display: inline;
  background-color: white;
  color: #7350ff;
  border-radius: 30px;
  padding: 4px;
  font-size: 16px;
  font-weight: bolder;
`;

const CloseButton = styled.button`
  background: #7350ff;
  border: none;
  font-size: 16px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px;
  width: 100px;
  border-radius: 30px;
`;

const IdForm = styled.form`
  text-align: center;
  span {
    display: block;
    font-size: 13px;
    margin-top: 20px;
    font-weight: bolder;
  }
  input {
    margin-top: 20px;
    background-color: #eceef0;
    border: none;
    border-radius: 30px;
    padding: 10px;
    width: 200px;
    text-align: center;
    font-weight: bolder;
  }
`;

const CheckBtn = styled.button`
  background-color: black;
  color: white;
  border-radius: 30px;
  border: none;
  padding: 7px;
  width: 60px;
  margin-left: 10px;
  cursor: pointer;
`;

export default OurCareModal;
