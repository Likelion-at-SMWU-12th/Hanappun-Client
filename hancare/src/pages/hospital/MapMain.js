import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import HospitalItem from "../../components/HospitalItem";

const MapMain = () => {
  const [hospital, setHospital] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredHospital, setFilteredHospital] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

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
        />
        <button type="button" onClick={onButtonClick}>
          검색
        </button>
      </Form>
      <MyHospitalBox>
        <h2>나의 한의원</h2>
        <MyHospital>아직 없어요!</MyHospital>
      </MyHospitalBox>
      {filteredHospital.length > 0 && (
        <HospitalList>
          {filteredHospital.map((item) => (
            <HospitalItem key={item.id} item={item}></HospitalItem>
          ))}
        </HospitalList>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
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
  height: 100vh;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  overflow-y: auto;
`;

export default MapMain;
