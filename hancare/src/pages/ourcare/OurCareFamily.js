import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "./OurCareStart";
import OurCareModal from "../../components/OurCareModal";
import axios from "axios";

const OurCareFamily = () => {
  const navigate = useNavigate();
  const [isModalOpen, setISModalOpen] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [friend, setFriend] = useState([]);

  const maxProfiles = 3; // 최대 프로필 수

  // 모달 창 관련..
  const openModal = (profileId) => {
    setCurrentProfileId(profileId);
    setISModalOpen(true);
  };

  const closeModal = () => setISModalOpen(false);

  const BackButton = () => {
    navigate(-1);
  };

  // 사용자 정보 불러오기
  const getInfo = () => {
    axios
      .get("http://localhost:8003/friends")
      .then((response) => {
        setFriend(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleAddProfile = async (id, name) => {
    try {
      await axios.post("http://localhost:8003/friends", {
        id,
        name,
      });
      getInfo();
    } catch (error) {
      console.log(error);
    }
  };

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
          <Profilebox onClick={() => navigate("/profile")}>
            <img src={getRandomImage()} alt="profile" />
          </Profilebox>
          <h2>나</h2>
        </ProfileWrapper>
        {friend &&
          friend.map((otheruser) => (
            <ProfileWrapper key={otheruser.id}>
              <Profilebox
                onClick={() => {
                  navigate(`/ourcare/family/${otheruser.id}`, {
                    state: { image: getRandomImage() },
                  });
                }}
              >
                <img src={getRandomImage()} alt="profile" />
              </Profilebox>
              <h2>{otheruser.name}</h2>
            </ProfileWrapper>
          ))}
        {[...Array(maxProfiles - (friend?.length || 0))].map((_, index) => (
          <Emptybox
            key={index}
            onClick={() => openModal(friend?.length + index + 1 || index + 1)}
          >
            <img src="/images/grayplus.png" alt="grayplus" />
          </Emptybox>
        ))}
      </ProfileContainer>
      {isModalOpen && (
        <OurCareModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          addProfile={handleAddProfile}
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
