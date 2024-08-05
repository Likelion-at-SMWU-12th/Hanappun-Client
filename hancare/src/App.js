import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import ColumnPancreotonia from "./pages/Columns/eight_CON/ColumnPancreotonia";
import ColumnHepatonia from "./pages/Columns/eight_CON/ColumnHepatonia";
import ColumnCholecystonia from "./pages/Columns/eight_CON/ColumnCholecystonia";
import ColumnGastrotonia from "./pages/Columns/eight_CON/ColumnGastrotonia";
import ColumnPulmotonia from "./pages/Columns/eight_CON/ColumnPulmotonia";
import ColumnColonotonia from "./pages/Columns/eight_CON/ColumnColonotonia";
import ColumnRenotonia from "./pages/Columns/eight_CON/ColumnRenotonia";
import ColumnVesicotonia from "./pages/Columns/eight_CON/ColumnVesicotonia";
import ColumnMoreKM1 from "./pages/Columns/moreKM/ColumnMoreKM1";
import ColumnMoreKM2 from "./pages/Columns/moreKM/ColumnMoreKM2";
import ColumnMoreKM3 from "./pages/Columns/moreKM/ColumnMoreKM3";
import ColumnMoreKM4 from "./pages/Columns/moreKM/ColumnMoreKM4";
import QmyCON from "./pages/myCON/QmyCON";
import MyCON from "./pages/myCON/MyCON";
import ChooseMyCON from "./pages/myCON/ChooseMyCON";
import SelfTest from "./pages/myCON/SelfTest";
import SelfTestResult from "./pages/myCON/SelfTestResult";
import EditMyCON from "./pages/myCON/EditMyCON";
import OurCareFamily from "./pages/ourcare/OurCareFamily";
import OurCareProfile from "./pages/ourcare/OurCareProfile";
import HospitalHome from "./pages/hospital/HospitalHome";
import MealMain from "./pages/meal/Mealmain";
import MealAnalysis from "./pages/meal/MealAnalysis";
import MealFirst from "./pages/meal/MealFirst";
import MealSecond from "./pages/meal/MealSecond";
import MealResult from "./pages/meal/MealResult";
import MealREResult from "./pages/meal/MealREResult";
import Condition from "./pages/condition/Condition";

import BottomNav from "./components/BottomNav";

const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);

  & -webkit-scrollbar {
    display: none;
  }
`;

function App() {
  // const navigate = useNavigate();
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage/:username" element={<Mainpage />} />
        <Route path="/calendar/:username" element={<CalendarMain />} />
        <Route path="/ourcare/" element={<OurCareStart />} />
        {/*마이페이지*/}
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/cancel/:username" element={<Cancel />} />
        {/*칼럼 -- 더 추가 예정 ... */}
        <Route path="/column" element={<ColumnMain />} />
        <Route path="/column/Pancreotonia" element={<ColumnPancreotonia />} />
        <Route path="/column/Hepatonia" element={<ColumnHepatonia />} />
        <Route path="/column/Cholecystonia" element={<ColumnCholecystonia />} />
        <Route path="/column/Gastrotonia" element={<ColumnGastrotonia />} />
        <Route path="/column/Pulmotonia" element={<ColumnPulmotonia />} />
        <Route path="/column/Colonotonia" element={<ColumnColonotonia />} />
        <Route path="/column/Renotonia" element={<ColumnRenotonia />} />
        <Route path="/column/Vesicotonia" element={<ColumnVesicotonia />} />
        <Route path="/column/moreKM1" element={<ColumnMoreKM1 />} />
        <Route path="/column/moreKM2" element={<ColumnMoreKM2 />} />
        <Route path="/column/moreKM3" element={<ColumnMoreKM3 />} />
        <Route path="/column/moreKM4" element={<ColumnMoreKM4 />} />
        {/*나의 체질*/}
        <Route path="/q_myCON/:username" element={<QmyCON />} />
        <Route path="/myCON/:username" element={<MyCON />} />
        <Route path="/myCON/selfTest/:username" element={<SelfTest />} />
        <Route
          path="/myCON/selfTestResult/:username"
          element={<SelfTestResult />}
        />
        <Route path="/myCON/ChooseMyCON/:username" element={<ChooseMyCON />} />
        <Route path="/myCON/editMyCON/:username" element={<EditMyCON />} />
        <Route
          path="/ourcare/family/list/:username"
          element={<OurCareFamily />}
        />
        <Route
          path="/ourcare/family/profile/:id"
          element={<OurCareProfile />}
        />
        {/* 한의원 */}
        <Route path="/map/:username" element={<MapMain />} />
        <Route path="/map/:username/:id" element={<HospitalHome />} />
        {/* 식단 */}
        <Route path="/meal/:username" element={<MealMain />} />
        <Route path="/meal/analysis/:username" element={<MealAnalysis />} />
        <Route path="/meal/first/:username" element={<MealFirst />} />
        <Route path="/meal/second/:username" element={<MealSecond />} />
        <Route path="/meal/result/:username" element={<MealResult />} />
        <Route path="/meal/re_result/:username" element={<MealREResult />} />
        {/* 컨디션 */}
        <Route path="/condition/:username/:date" element={<Condition />} />
      </Routes>
      <BottomNav />
    </Wrapper>
  );
}

export default App;
