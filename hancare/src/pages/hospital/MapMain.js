import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HospitalItem from "../../components/HospitalItem";

const { kakao } = window;

const MapMain = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredHospital, setFilteredHospital] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const mapcontainer = useRef(null);

  // 검색 기능
  useEffect(() => {
    const getHospital = async () => {
      try {
        const response = await axios.get("http://localhost:8000/hospital");
        setHospital(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getHospital();
  }, []);

  useEffect(() => {
    if (keyword) {
      const cleanedKeyword = keyword.replace(/\s+/g, "");
      const filtered = hospital.filter((item) => {
        const cleanedName = item.name.replace(/\s+/g, "");
        const cleanedhashtag1 = item.hashtag1.replace(/\s+/g, "");
        const cleanedhashtag2 = item.hashtag2.replace(/\s+/g, "");
        const cleanedhashtag3 = item.hashtag3.replace(/\s+/g, "");
        return (
          cleanedName.includes(cleanedKeyword) ||
          cleanedhashtag1.includes(cleanedKeyword) ||
          cleanedhashtag2.includes(cleanedKeyword) ||
          cleanedhashtag3.includes(cleanedKeyword)
        );
      });
      setFilteredHospital(filtered);
    }
  }, [keyword]);

  const myKeywordInput = useRef();

  const onButtonClick = () => {
    setKeyword(myKeywordInput.current.value);
    setIsSearched(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onButtonClick();
    }
  };

  // 지도 기능
  useEffect(() => {
    if (mapcontainer.current) {
      const options = {
        center: new kakao.maps.LatLng(37.54445537179708, 126.9712695039339),
        level: 3,
      };
      const kakaomap = new kakao.maps.Map(mapcontainer.current, options);

      var imageSrc = "/images/marker.png";
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const markers = hospital.map((item) => {
        const marker = new kakao.maps.Marker({
          map: kakaomap,
          position: new kakao.maps.LatLng(item.Lat, item.Lng),
          title: item.name,
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          setSelectedHospital(item);
        });

        return marker;
      });

      return () => {
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [hospital]);

  return (
    <Container>
      <Title>한의원</Title>
      <Form>
        <img src="/images/search.png" alt="search" />
        <input
          type="text"
          name="keyword"
          ref={myKeywordInput}
          placeholder="진료 분야, 병원명으로 검색"
          onKeyDown={handleEnter}
        />
        <button type="button" onClick={onButtonClick}>
          검색
        </button>
      </Form>
      {isSearched ? (
        <>
          <MyHospitalBox>
            <h2>나의 한의원</h2>
            <MyHospital>아직 없어요!</MyHospital>
          </MyHospitalBox>
          {filteredHospital.length > 0 ? (
            <HospitalList>
              {filteredHospital.map((item) => (
                <HospitalItem key={item.id} item={item}></HospitalItem>
              ))}
            </HospitalList>
          ) : (
            <>
              <HospitalList>
                <NoResult>검색 결과가 없습니다</NoResult>
              </HospitalList>
            </>
          )}
        </>
      ) : (
        <>
          <MapBox ref={mapcontainer}></MapBox>
          {selectedHospital && (
            <SelectedHospitalBox>
              <HospitalItem item={selectedHospital} />
            </SelectedHospitalBox>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  position: relative;
`;
const Title = styled.h2`
  color: white;
  margin: 30px auto;
`;
const Form = styled.form`
  margin: 0 auto;
  position: relative;
  input {
    background-color: #eceef0;
    border: none;
    border-radius: 20px;
    padding: 15px;
    width: 290px;
    text-indent: 40px;
  }
  img {
    display: block;
    position: absolute;
    width: 30px;
    top: 8px;
    left: 10px;
  }
  button {
    display: block;
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    color: #7350ff;
    font-weight: bolder;
    font-size: 15px;
    cursor: pointer;
  }
`;

const MyHospitalBox = styled.div`
  background-color: white;
  display: flex;
  margin-left: 40px;
  margin-top: 20px;
  width: 200px;
  height: auto;
  border-radius: 20px;
  position: relative;
  h2 {
    color: black;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const MyHospital = styled.span`
  background-color: #7350ff;
  color: white;
  font-size: 12px;
  padding: 5px 7px;
  height: 17px;
  border-radius: 20px;
  text-align: right;
  position: absolute;
  right: 10px;
  top: 5px;
`;

const HospitalList = styled.div`
  margin-top: 20px;
  height: 100%;
  padding: 10px;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow-y: auto;
  padding-bottom: 70px;
`;
const NoResult = styled.p`
  text-align: center;
`;

const MapBox = styled.div`
  width: 100%;
  margin-top: 40px;
  height: 70vh;
  width: 100%;
  border-radius: 25px;
  z-index: 0;
`;

const SelectedHospitalBox = styled.div`
  position: absolute;
  background-color: white;
  bottom: 50px;
  left: 0;
  right: 0;
  border-radius: 25px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow-y: auto;
  flex: 1;
`;

export default MapMain;
