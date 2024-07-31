import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "./OurCareStart";
import OurCareModal from "../../components/OurCareModal";

const OurCareFamily = () => {
  const navigate = useNavigate();
  const [isModalOpen, setISModalOpen] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [profiles, setProfiles] = useState([
    { id: 1, image: null },
    { id: 2, image: null },
    { id: 3, image: null },
  ]);

  const openModal = (profileId) => {
    setCurrentProfileId(profileId);
    setISModalOpen(true);
  };

  const closeModal = () => setISModalOpen(false);

  const handleAddProfile = (name) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === currentProfileId
          ? { ...profile, name, image: getRandomImage(profile.image) }
          : profile
      )
    );
  };

  const BackButton = () => {
    navigate(-1);
  };

  const profileImages = [
    "/images/profile1.png",
    "/images/profile2.png",
    "/images/profile3.png",
    "/images/profile4.png",
    "/images/profile5.png",
    "/images/profile6.png",
  ];

  const getRandomImage = (currentImage) => {
    if (currentImage) return currentImage;
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
          <Profilebox>
            <img src={getRandomImage("/images/profile1.png")} alt="profile" />
          </Profilebox>
          <h2>나</h2>
        </ProfileWrapper>
        {profiles.map((profile) =>
          profile.name ? (
            <ProfileWrapper key={profile.id}>
              <Profilebox
                onClick={() => {
                  navigate(`/ourcare/family/${profile.id}`, {
                    state: { image: profile.image, type: "이름" },
                  });
                }}
              >
                <img src={profile.image} alt="profile" />
              </Profilebox>
              <h2>이름</h2>
            </ProfileWrapper>
          ) : (
            <Emptybox key={profile.id} onClick={() => openModal(profile.id)}>
              <img src="/images/grayplus.png" alt="grayplus" />
            </Emptybox>
          )
        )}
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
`;

export const ProfileWrapper = styled.div`
  h2 {
    color: white;
    margin-top: 10px;
    text-align: center;
  }
`;

export default OurCareFamily;
