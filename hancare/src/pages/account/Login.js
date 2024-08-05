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

import { login } from "../../api/users/login";
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/action";

const Login = () => {
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: values.id,
      password: values.password,
    };
    const result = await login(data);

    if (result.status == 200) {
      alert("로그인에 성공하였습니다. ");
      dispatch(setUsername(values.id));
      navigate(`/mainpage/${values.id}`);
    } else {
      alert("로그인에 실패하였습니다. 다시 입력해 주세요.");
    }
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
