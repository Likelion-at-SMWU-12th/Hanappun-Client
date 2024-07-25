import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 15px;
  font-weight: bolder;
  color: #7350ff;
  margin-bottom: 30px;
`;

const Infobox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 30px;
`;

const Label = styled.label`
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

const Signup = () => {
  const [values, setValues] = useState({
    nickname: "",
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((prevValues) => {
      const { name, value } = e.target;
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };
  return (
    <Container>
      <Title>
        <h1>회원가입</h1>
      </Title>
      <form>
        <Infobox>
          <Label for="nickname">닉네임</Label>
          <Inputbox
            type="text"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
            required
          />
        </Infobox>
        <Infobox>
          <Label for="id">아이디</Label>
          <Inputbox
            type="text"
            name="id"
            value={values.id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </Infobox>
        <Infobox>
          <Label for="password">비밀번호</Label>
          <Inputbox
            type="text"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </Infobox>
      </form>
    </Container>
  );
};

export default Signup;
