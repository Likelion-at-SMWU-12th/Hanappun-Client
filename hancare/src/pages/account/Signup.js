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

const SignupBtn = styled.button`
  display: block;
  margin-top: 60px;
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

const Signup = () => {
  const [values, setValues] = useState({
    nickname: "",
    id: "",
    password: "",
    repassword: "",
  });

  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <Container>
      <Title>
        <h1>회원가입</h1>
      </Title>
      <form onSubmit={handleSubmit}>
        <Infobox>
          <Label for="nickname">닉네임</Label>
          <Inputbox
            type="text"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
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
            placeholder="아이디를 입력해주세요"
            required
          />
        </Infobox>
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
        <Infobox>
          <Label for="repassword">비밀번호 확인</Label>
          <Inputbox
            type="password"
            name="repassword"
            value={values.repasswordpassword}
            onChange={handleChange}
            placeholder="비밀번호를 재입력해주세요"
            required
          />
        </Infobox>
        <SignupBtn type="submit">다음</SignupBtn>
      </form>
    </Container>
  );
};

export default Signup;
export { Container, Title, Infobox, Inputbox, Label, SignupBtn };
