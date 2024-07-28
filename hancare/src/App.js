import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Startpage from "./pages/account/Startpage";
import Signup from "./pages/account/Signup";
import Login from "./pages/account/Login";
import ColumnMain from "./pages/Columns/ColumnMain";
import Profile from "./pages/mypage/Profile";
import Cancel from "./pages/mypage/Cancel";

const Wrapper = styled.div`
  width: 400px;
  height: 100vh;
  min-height: 844px;
  margin: 0 auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
  /*display: flex;
  justify-content: center;*/
`;

function App() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/column" element={<ColumnMain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
