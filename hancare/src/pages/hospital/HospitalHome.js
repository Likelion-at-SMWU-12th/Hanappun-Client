import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SetMyModal from "../../components/SetMyModal";
import ReservateModal from "../../components/ReservateModal";
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import { useSelector } from "react-redux";

const HospitalHome = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("소개");
  const [pickhospital, setPickhospital] = useState([]);
  const [user, setUser] = useState([]);
  const username = useSelector((state) => state.username);
  const [doctorBtn, setDoctorBtn] = useState(false);
  const [review, setReview] = useState([]);
  const [reviewDetail, setReviewDetail] = useState([]);

  const getInfo = () => {
    axios
      .get(`${baseURL}/clinic/info/${id}/`)
      .then((response) => {
        setPickhospital(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getmyInfo = () => {
    axios
      .get(`${baseURL}/users/profile?username=${username}`)
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getmyInfo();
  }, []);

  // 리뷰 카테고리 합산 api 연결
  const getReview = () => {
    axios
      .get(`${baseURL}/review/cate/${id}/`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        alert("리뷰실패");
        console.log(error);
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  // 리뷰 api 연결
  const getReviewDetail = () => {
    axios
      .get(`${baseURL}/review?clinic=${id}`)
      .then((response) => {
        alert("리뷰디테일성공");
        setReviewDetail(response.data);
      })
      .catch((error) => {
        alert("리뷰디테일실패");
        console.log(error);
      });
  };

  useEffect(() => {
    getReviewDetail();
  }, []);

  // 나의 한의원 모달창 관련
  const [isMyModalOpen, setISMyModalOpen] = useState(false);
  const [isSetmy, setIsmy] = useState(false);
  const openModal = () => {
    setISMyModalOpen(true);
  };
  const closeModal = () => {
    setISMyModalOpen(false);
    getmyInfo();
  };
  const handleSetMy = () => {
    setIsmy(!isSetmy);
    closeModal();
  };

  // 예약 모달 창 관련
  const [ReservateOpen, setReservateOpen] = useState(false);
  const openReservateModal = () => {
    setReservateOpen(true);
  };
  const closeReservateModal = () => setReservateOpen(false);

  // 더보기 버튼 관련, 돌아가기 버튼 관련
  const [MorebtnClick, setMorebtnClick] = useState(false);
  const handleMorebtnClick = () => {
    setMorebtnClick(!MorebtnClick);
  };

  // 체크박스 피드백 관련
  const [feedback, setFeedback] = useState({
    clean: false,
    medicine: false,
    manage: false,
    doctor: false,
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: checked,
    }));
  };

  // 리뷰 코멘트 작성 관련
  const [comment, setComment] = useState("");
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const BackButton = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const ReviewSubmit = (e) => {
    e.preventDefault();
  };

  const doctorImages = [
    "/images/doctor1.png",
    "/images/doctor2.png",
    "/images/doctor2.png",
  ];

  // 닥터 버튼
  const handleDoctorBtnClick = () => {
    setDoctorBtn(!doctorBtn);
  };

  return (
    <Container>
      <Title>
        <img src="/images/back.png" alt="back" onClick={BackButton}></img>
        <h2>나의 한의원</h2>
      </Title>
      <Name>{pickhospital.name}</Name>
      <Wrapper>
        <Hashtag>{pickhospital.clinic_cate_1}</Hashtag>
        <Hashtag>{pickhospital.clinic_cate_2}</Hashtag>
        <Hashtag>{pickhospital.clinic_cate_3}</Hashtag>
        <MyHospital onClick={openModal}>
          {user.my_clinic &&
          pickhospital.id &&
          user.my_clinic === pickhospital.id
            ? "V 나의 한의원"
            : "나의 한의원"}
        </MyHospital>
      </Wrapper>
      <Info>
        <Bold>위치</Bold>
        {pickhospital.location}
      </Info>
      <Info>
        <Bold>전화번호</Bold>
        {pickhospital.call}
      </Info>
      <ReservateBtn onClick={openReservateModal}>예약</ReservateBtn>
      <Detail>
        <DetailMenu>
          <TabButton
            isActive={activeTab === "소개"}
            onClick={() => handleTabClick("소개")}
          >
            소개
          </TabButton>
          <TabButton
            isActive={activeTab === "후기"}
            onClick={() => handleTabClick("후기")}
          >
            후기
          </TabButton>
        </DetailMenu>
        {activeTab === "소개" ? (
          <>
            <SubTitle>{pickhospital.name}</SubTitle>
            <Information>{pickhospital.detail}</Information>
            <SubTitle>의료진</SubTitle>
            <DoctorWrapper>
              {pickhospital.doctor_list &&
                pickhospital.doctor_list.map((item, index) => (
                  <DoctorBox key={index} onClick={handleDoctorBtnClick}>
                    <h3>{item.name} 원장</h3>
                    {doctorBtn ? (
                      <p>
                        {item.profile[1]}
                        <br />
                        {item.profile[2]}
                        <br />
                        {item.profile[3]}
                        <br />
                        {item.profile[4]}
                        <br />
                        {item.profile[5]}
                        <br />
                        {item.profile[6]}
                      </p>
                    ) : (
                      <img src={doctorImages[index]} alt="doctor" />
                    )}
                  </DoctorBox>
                ))}
            </DoctorWrapper>
            <SubTitle>사진</SubTitle>
            <PhotoWrapper>
              <img src={pickhospital.image_1}></img>
              <img src={pickhospital.image_2}></img>
            </PhotoWrapper>
          </>
        ) : (
          <>
            {!MorebtnClick ? (
              <>
                <SubTitle2>이런 점이 좋았어요</SubTitle2>
                <ReviewWrapper>
                  <ReviewOption>
                    <img src="/images/review_clean.png"></img>
                    <p>시설이 쾌적해요</p>
                  </ReviewOption>
                  <Reviewnum>
                    <p>{review.facility_count}</p>
                    <img src="/images/reviewnumimg.png" alt="num"></img>
                  </Reviewnum>
                </ReviewWrapper>
                <ReviewWrapper>
                  <ReviewOption>
                    <img src="/images/review_medicine.png"></img>
                    <p>약 처방이 잘 맞아요</p>
                  </ReviewOption>
                  <Reviewnum>
                    <p>{review.prescription_count}</p>
                    <img src="/images/reviewnumimg.png" alt="num"></img>
                  </Reviewnum>
                </ReviewWrapper>
                <ReviewWrapper>
                  <ReviewOption>
                    <img src="/images/review_heart.png"></img>
                    <p>건강 관리에 철저해요</p>
                  </ReviewOption>
                  <Reviewnum>
                    <p>{review.health_count}</p>
                    <img src="/images/reviewnumimg.png" alt="num"></img>
                  </Reviewnum>
                </ReviewWrapper>
                <ReviewWrapper>
                  <ReviewOption>
                    <img src="/images/review_nice.png"></img>
                    <p>의료진, 직원이 친절해요</p>
                  </ReviewOption>
                  <Reviewnum>
                    <p>{review.kindness_count}</p>
                    <img src="/images/reviewnumimg.png" alt="num"></img>
                  </Reviewnum>
                </ReviewWrapper>
                <SubTitle2>더 많은 이야기</SubTitle2>
                {reviewDetail &&
                  reviewDetail.slice(0, 2).map((item) => (
                    <StoryBox key={item.id}>
                      <p>
                        <Bold>{item.reviewer_nickname.nickname}</Bold>
                        <br />
                        {item.content}
                        <br />
                        <Bold>
                          {item.is_selected_Facility && "#시설이 쾌적해요 "}
                          {item.is_selected_Prescription &&
                            "#약 처방이 잘 맞아요 "}
                          <br />
                          {item.is_selected_Health && "#건강관리에 철저해요 "}
                          {item.is_selected_Kindness &&
                            "#의료진, 직원이 친절해요 "}
                        </Bold>
                      </p>
                    </StoryBox>
                  ))}
                <MoreBtn onClick={handleMorebtnClick}>더보기</MoreBtn>
                <SubTitle2>나의 이야기</SubTitle2>
                <form>
                  <ReviewQuest>
                    <img src="/images/puplespot.png"></img>
                    <h3>어떤 점이 좋았나요?</h3>
                  </ReviewQuest>
                  <CheckboxWrapper>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        name="clean"
                        checked={feedback.clean}
                        onChange={handleCheckboxChange}
                      />
                      시설이 쾌적해요
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  <CheckboxWrapper>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        name="medicine"
                        checked={feedback.medicine}
                        onChange={handleCheckboxChange}
                      />
                      약 처방이 잘 맞아요
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  <CheckboxWrapper>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        name="manage"
                        checked={feedback.manage}
                        onChange={handleCheckboxChange}
                      />
                      건강 관리에 철저해요
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  <CheckboxWrapper>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        name="doctor"
                        checked={feedback.doctor}
                        onChange={handleCheckboxChange}
                      />
                      의료진, 직원이 친절해요
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  <ReviewQuest>
                    <img src="/images/puplespot.png"></img>
                    <h3>숙멋사님의 이야기를 들려주세요</h3>
                  </ReviewQuest>
                  <CommentWrapper>
                    <CommentBox
                      type="text"
                      placeholder="나의 이야기 남기기"
                      value={comment}
                      onChange={onChangeComment}
                    />
                    <ReviewSubmitBtn type="submit" onClick={ReviewSubmit}>
                      입력
                    </ReviewSubmitBtn>
                  </CommentWrapper>
                </form>
              </>
            ) : (
              <>
                <SubTitle2>더 많은 이야기</SubTitle2>
                {reviewDetail &&
                  reviewDetail.map((item) => (
                    <StoryBox key={item.id}>
                      <p>
                        <Bold>{item.reviewer_nickname.nickname}</Bold>
                        <br />
                        {item.content}
                        <br />
                        <Bold>
                          {item.is_selected_Facility && "#시설이 쾌적해요 "}
                          {item.is_selected_Prescription &&
                            "#약 처방이 잘 맞아요 "}{" "}
                          <br />
                          {item.is_selected_Health && "#건강관리에 철저해요 "}
                          {item.is_selected_Kindness &&
                            "#의료진, 직원이 친절해요 "}
                        </Bold>
                      </p>
                    </StoryBox>
                  ))}
                <MoreBtn onClick={handleMorebtnClick}>돌아가기</MoreBtn>
              </>
            )}
          </>
        )}
      </Detail>
      {isMyModalOpen && (
        <SetMyModal
          isOpen={isMyModalOpen}
          closeModal={closeModal}
          handleSetMy={handleSetMy}
          myClinic={user.my_clinic}
          clinicName={pickhospital}
        />
      )}
      {ReservateOpen && (
        <ReservateModal
          isReservateOpen={setReservateOpen}
          closeReesrvateModal={closeReservateModal}
        />
      )}
    </Container>
  );
};

export const Container = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled.div`
  display: flex;
  padding-top: 15px;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 13px;
    position: absolute;
    left: 30px;
    cursor: pointer;
  }

  h2 {
    color: white;
  }
`;

const Name = styled.h2`
  color: white;
  font-size: 18px;
  background-color: #7350ff;
  padding: 10px;
  width: 290px;
  margin: 3px auto 13px auto;
  text-align: center;
  border-radius: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 50px;
  margin-bottom: 10px;
  position: relative;
`;
const Hashtag = styled.p`
  background-color: #57595f;
  color: white;
  margin: 0 5px;
  padding: 1px 7px;
  display: inline;
  border-radius: 20px;
  font-size: 12px;
`;
const MyHospital = styled.button`
  margin: 0 auto;
  margin-left: 40px;
  background-color: #7350ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 7px;
  font-size: 12px;
  font-weight: bolder;
  cursor: pointer;
  display: block;
  position: absolute;
  top: 0px;
  right: 5px;
`;
const Info = styled.p`
  color: white;
  margin: 1px 60px;
  font-size: 11px;
`;
const Bold = styled.span`
  font-weight: bolder;
  margin-right: 10px;
`;

const ReservateBtn = styled.button`
  position: absolute;
  top: 192px;
  right: 55px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 4px;
  width: 68px;
  text-align: center;
  font-size: 13px;
  font-weight: bolder;
  cursor: pointer;
`;

const Detail = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: 15px;
  text-align: center;
  white-space: pre-line;
  overflow-y: auto;
  height: 100vh;
  padding-bottom: 70px; /* 아래쪽 여백 추가 */
  flex: 1;
`;
const DetailMenu = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  border: none;
  width: 100%;
  font-size: 18px;
  padding: 10px;
  background-color: ${(props) => (props.isActive ? "#f7f7f7" : "#7350ff")};
  color: ${(props) => (props.isActive ? "#7350ff" : "white")};
  font-weight: bolder;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 25px;
  }

  &:last-child {
    border-top-right-radius: 25px;
  }
`;
const SubTitle = styled.h3`
  margin-top: 30px;
  font-size: 17px;
`;
const Information = styled.p`
  font-size: 12px;
  margin: -7px 20px;
`;

const DoctorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;
const DoctorBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  align-items: center;
  border-radius: 20px;
  width: 120px;
  height: 170px;
  cursor: pointer;
  h3 {
    color: white;
    font-size: 14px;
  }

  img {
    justify-content: space-between;
    width: auto;
    height: 70%;
    margin-top: 3px;
  }

  p {
    color: white;
    font-size: 8px;
  }
`;
const Doctor2 = styled.img`
  width: 80px !important;
`;

const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  img {
    width: 170px;
    height: 150px;
  }
`;

const SubTitle2 = styled.h3`
  color: #7350ff;
  margin-top: 30px;
`;

const ReviewWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ReviewOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 0 8px #cecece;
  width: 250px;
  border-radius: 20px;
  position: relative;
  margin-right: 18px;
  margin-left: 30px;

  p {
    font-size: 13px;
    margin-left: 70px;
  }
  img {
    width: 12%;
    position: absolute;
    left: 20px;
  }
`;
const Reviewnum = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  p {
    font-size: 15px;
    color: #7350ff;
  }
  img {
    display: block;
    text-align: right;
    width: 18px;
    height: auto;
    margin-left: 8px;
    position: absolute;
    left: 35px;
  }
`;
const StoryBox = styled.div`
  box-shadow: 0 0 8px #cecece;
  width: 330px;
  margin: 10px auto;
  padding: 5px 15px;
  border-radius: 10px;
  p {
    font-size: 13px;
    text-align: left;
  }
`;

const MoreBtn = styled.button`
  background: none;
  border: none;
  color: #7c7c7c;
  cursor: pointer;
  margin: 0 auto;
  font-size: 15px;
  font-weight: 600;
`;

const ReviewQuest = styled.div`
  display: flex;
  align-items: center;
  h3 {
    text-align: left;
    margin-left: -10px;
    font-size: 15px;
  }
  img {
    width: 15px;
    margin: 22px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: black;
  font-size: 14px;

  input {
    margin-right: 10px;
    zoom: 1.5;
    border-color: #7350ff;
  }
`;

const Checkbox = styled.input`
  accent-color: #7350ff;
`;
const CommentWrapper = styled.div`
  position: relative;
`;
const CommentBox = styled.textarea`
  background-color: #eceef0;
  border: none;
  border-radius: 30px;
  width: 320px;
  height: 80px;
  padding: 20px;
  resize: none;
  &::placeholder {
  }
`;

const ReviewSubmitBtn = styled.button`
  background: none;
  border: none;
  color: #7350ff;
  display: block;
  position: absolute;
  top: 75px;
  right: 50px;
  font-weight: bolder;
  cursor: pointer;
`;

export default HospitalHome;
