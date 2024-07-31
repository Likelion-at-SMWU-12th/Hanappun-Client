import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Startpage from "./pages/account/Startpage";
import Signup from "./pages/account/Signup";
import Login from "./pages/account/Login";
import Mainpage from "./pages/Mainpage";
import ColumnMain from "./pages/Columns/ColumnMain";
import Profile from "./pages/mypage/Profile";
import Cancel from "./pages/mypage/Cancel";
import CalendarMain from "./pages/calendar/CalendarMain";
import MapMain from "./pages/hospital/MapMain";
import OurCareStart from "./pages/ourcare/OurCareStart";
import OurCareFamily from "./pages/ourcare/OurCareFamily";
import OurCareProfile from "./pages/ourcare/OurCareProfile";

const Wrapper = styled.div`
  width: 400px;
  height: 100vh;
  min-height: 844px;
  margin: 0 auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);

  & -webkit-scrollbar {
    display: none;
  }
`;

function App() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage/" element={<Mainpage />} />
        <Route path="/column" element={<ColumnMain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/mypage/calendar" element={<CalendarMain />} />
        <Route path="/map" element={<MapMain />} />
        <Route path="/ourcare/" element={<OurCareStart />} />
        <Route path="/ourcare/family/" element={<OurCareFamily />} />
        <Route path="/ourcare/family/:id" element={<OurCareProfile />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
