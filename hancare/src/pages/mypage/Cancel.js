import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { quit } from "../../api/users/quit";

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
  const params = useParams();

  // 이전 페이지도 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setValues((prevValues) => {
      const { name, value } = e.target;
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  // 회원 탈퇴
  const handleQuitSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("확인 버튼을 누르면 회원 탈퇴가 진행됩니다.")) {
      e.preventDefault();

      const data = {
        username: params.username,
        password: values.password,
      };

      const result = await quit(data);

      if (result.status == 200) {
        alert("탈퇴되었습니다. 한케어는 고객님과 함께해서 행복했어요 ☘️");
        navigate("/"); //삭제 후 Startpage로 가게 하기
      } else {
        alert("실패하였습니다. 다시 입력해 주세요.");
      }
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
        <form onSubmit={handleQuitSubmit}>
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
