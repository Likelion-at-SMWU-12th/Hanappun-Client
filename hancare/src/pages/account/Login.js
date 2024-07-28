import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Infobox,
  Inputbox,
  Label,
  SignupBtn,
} from "./Signup";

const Login = () => {
  const [values, setValues] = useState({
    id: "",
    password: "",
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
    navigate("/mainpage/");
  };

  return (
    <div>
      <Container>
        <Title>
          <h1>로그인</h1>
        </Title>
        <form onSubmit={handleSubmit}>
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
          <SignupBtn type="submit">로그인</SignupBtn>
        </form>
      </Container>
    </div>
  );
};

export default Login;
