import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "./OurCareStart";
import OurCareModal from "../../components/OurCareModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseURL } from "../../api/baseURL";

const OurCareFamily = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isModalOpen, setISModalOpen] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [friend, setFriend] = useState([]);
  const username = useSelector((state) => state.username);

  const maxProfiles = 3; // 최대 프로필 수

  // 모달 창 관련..
  const openModal = (profileId) => {
    setCurrentProfileId(profileId);
    setISModalOpen(true);
  };

  const closeModal = () => {
    getInfo();
    setISModalOpen(false);
  };

  const BackButton = () => {
    navigate(-1);
  };

  //  정보 불러오기
  const getInfo = () => {
    axios
      .get(`${baseURL}/users/ourcare?username=test1`, {
        username: username,
      })
      .then((response) => {
        setFriend(response.data.result);
      })
      .catch((error) => {
        alert("사용자를 찾을 수 없습니다.");
        console.log(error);
      });
  };

  useEffect(() => {
    const getInfo = () => {
      axios
        .get(`${baseURL}/users/ourcare?username=test1`, {
          username: username,
        })
        .then((response) => {
          setFriend(response.data.result);
        })
        .catch((error) => {
          alert("사용자를 찾을 수 없습니다.");
          console.log(error);
        });
    };
    getInfo();
  }, []);

  const profileImages = [
    "/images/profile1.png",
    "/images/profile2.png",
    "/images/profile3.png",
    "/images/profile4.png",
    "/images/profile5.png",
    "/images/profile6.png",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  return (
    <Container>
      <Title>
        <img src="/images/back.png" alt="back" onClick={BackButton} />
        <h2>우리 케어</h2>
      </Title>
      <ProfileContainer>
        <ProfileWrapper>
          <Profilebox onClick={() => navigate(`/profile/test1`)}>
            <img src={profileImages[0]} alt="profile" />
          </Profilebox>
          <h2>나</h2>
        </ProfileWrapper>
        {friend &&
          friend.map((otheruser, index) => (
            <ProfileWrapper key={index}>
              {Object.keys(otheruser).map((key) => (
                <React.Fragment key={key}>
                  <Profilebox
                    key={key}
                    onClick={() => {
                      navigate(`/ourcare/family/profile/${key}`, {
                        state: {
                          image: profileImages[index + 1],
                        },
                      });
                    }}
                  >
                    <img src={profileImages[index + 1]} alt="profile" />
                  </Profilebox>
                  <h2>{otheruser[key]}</h2>
                </React.Fragment>
              ))}
            </ProfileWrapper>
          ))}
        {[...Array(maxProfiles - (friend.length || 0))].map((_, index) => (
          <Emptybox
            key={index}
            onClick={() => openModal(friend.length + index + 1 || index + 1)}
          >
            <img src="/images/grayplus.png" alt="grayplus" />
          </Emptybox>
        ))}
      </ProfileContainer>
      {isModalOpen && (
        <OurCareModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          username={username}
        />
      )}
    </Container>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 30%;
  gap: 25px;
`;

const Emptybox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #424242;
  border-radius: 25%;
  width: 150px;
  height: 150px;
  margin-bottom: auto;
  cursor: pointer;
  img {
    width: 70px;
  }
`;

export const Profilebox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #424242;
  border-radius: 25%;
  width: 150px;
  height: 150px;
  margin-bottom: 0;
  img {
    width: 100%;
  }
  cursor: pointer;
`;

export const ProfileWrapper = styled.div`
  h2 {
    color: white;
    margin-top: 10px;
    text-align: center;
  }
`;

export default OurCareFamily;
