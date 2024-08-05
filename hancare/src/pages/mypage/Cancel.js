/* 백엔드 연동
import axios from "axios";
import React, {useEffect, useState} from "react"; */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./Cancel.css";
import styled from "styled-components";

const Background = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;

const BlackHeader = styled.header`
  padding-top: 30px;
  display: flex;

  & img {
    width: 13px;
    margin: auto 30px;
    cursor: pointer;
  }

  & h2 {
    margin-left: calc(40% - 75px);
    color: white;
  }
`;

const BlackMain = styled.main`
  margin: 10px auto;
  background-color: #f7f7f7;
  width: 90%;
  height: 75vh;
  border-radius: 10px;
  text-align: center;
  overflow-y: scroll;

  & h3 {
    padding-top: 30px;
    color: #7350ff;
  }

  & img {
    width: 170px;
    margin-bottom: 30px;
  }
`;

// 회원가입의 css와 동일하게 입히기
const Infobox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  text-align: left;
  margin-left: 20px;
  font-size: 17px;
  font-weight: bolder;
`;

const Inputbox = styled.input`
  margin-top: 10px;
  margin-right: 50px;
  padding: 15px;
  background-color: #eceef0;
  font-weight: bolder;
  border: none;
  border-radius: 10px;
`;

const SignupBtn = styled.button`
  display: block;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  padding: 12px;
  width: 60%;
  border: none;
  border-radius: 17px;
  background-color: #7350ff;
  color: white;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

const Cancel = () => {
  const [values, setValues] = useState({
    password: "",
  });

  const navigate = useNavigate();

  /* 백엔드 연동 코드
const [name, setName] = useState([]);
const getName = () => {
  axios
  .get("http://127.0.0.1: 8000/?")
  .then((response) => {
    console.log(response);
    setName(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
};

useEffect(() => {
  getName();
}, []);
*/

  // 이전 페이지도 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  /* 백엔드 연동 후 
  // 회원 탈퇴(onRemove) 함수
  const onRemove = (id) => {
    axios.delete(`http://127.0.0.1:8000/?/$(id)/`).then((response) => {
      console.log(response);
      alert("탈퇴되었습니다. 한케어는 고객님과 함께해서 행복했어요 ☘️");
      navigate("/"); //삭제 후 Startpage로 가게 하기
    });
  };
  */

  const handleChange = (e) => {
    setValues((prevValues) => {
      const { name, value } = e.target;
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.repassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (window.confirm("확인 버튼을 누르면 회원 탈퇴가 진행됩니다.") === 1) {
      // 백엔드 연동 후
      // onRemove(id);
      navigate("/");
    } else {
      alert("취소되었습니다. 한케어와 더 함께해요!");
      navigate(-1);
    }
  };

  return (
    <Background>
      <BlackHeader>
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 id="cancelH2">회원 탈퇴</h2>
      </BlackHeader>
      <BlackMain>
        <h3> 숙멋사 님 가지 마세요</h3>
        <img alt="cancelNo" src="/images/cancelNo.png" />
        {/*비밀번호 입력 -> 회원탈퇴 */}
        <form onSubmit={handleSubmit}>
          <Infobox>
            <Label for="password">비밀번호</Label>
            <Inputbox
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </Infobox>
          <SignupBtn type="submit">회원 탈퇴</SignupBtn>
        </form>
      </BlackMain>
    </Background>
  );
};

export default Cancel;
export {
  Background,
  BlackHeader,
  BlackMain,
  Infobox,
  Inputbox,
  Label,
  SignupBtn,
};
