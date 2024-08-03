// MyCON.js와 같게. but 데이터 가져오기
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChooseMyCON.css";

const EditMyCON = () => {
  const [selectedCon, setSelectedCon] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [con, setCon] = useState("");

  const onChangeCon = (e) => {
    setCon(e.target.value);
  };

  const handleClick = (e) => {
    const { value } = e.target;
    setSelectedCon(value);
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCon) {
      alert("체질이 선택되지 않았어요");
      return;
    }
    /* 백엔드로 데이터를 보내는 로직
    axios
    .get(`http://127.0.0.1:8000/??/${id}/`)
    .then((response) => {
        console.log(response);
        setCon(response.data.constitution);
        })
        .catch((error)=> {
            console.log(error);
        });
    }, [id]);

    useEffect(() => {
        getCon();
    }, [getCon]);
    */

    // 제출 후 /myCON 페이지로 이동
    navigate("/myCON");
  };

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  return (
    <div className="MCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="MCmain">
        <div className="MCtext">
          <p>
            한의원/자가진단을 통해 진단한
            <br />
            나의 체질을 선택해주세요
          </p>
          <span> 계정별로 수정 횟수는 1회로 제한되어 있어요</span>
        </div>
        <form onSubmit={handleSubmit} className="MCchoices">
          <div className="MCchoices_btn">
            <button
              type="button"
              value="Hepatonia"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "Hepatonia" ? "selected" : ""
              }`}
            >
              목양
            </button>
            <button
              type="button"
              value="Cholecystonia"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "Cholecystonia" ? "selected" : ""
              }`}
            >
              목음
            </button>
            <button
              type="button"
              value="Renotonia"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "Renotonia" ? "selected" : ""
              }`}
            >
              수양
            </button>
            <button
              type="button"
              value="Vesicotonia"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "Vesicotonia" ? "selected" : ""
              }`}
            >
              수음
            </button>
            <button
              type="button"
              value="Pulmotonia"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "Pulmotonia" ? "selected" : ""
              }`}
            >
              금양
            </button>
            <button
              type="button"
              value="Colonotonia"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "Colonotonia" ? "selected" : ""
              }`}
            >
              금음
            </button>
            <button
              type="button"
              value="Pancreotonia"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "Pancreotonia" ? "selected" : ""
              }`}
            >
              토양
            </button>
            <button
              type="button"
              value="Gastrotonia"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "Gastrotonia" ? "selected" : ""
              }`}
            >
              토음
            </button>
          </div>
          <div className="MCchoices_images">
            <img
              className="MC_moreCON_conTree"
              alt="conTree"
              src="/images/conTree.png"
            />
            <img
              className="MC_moreCON_conWater"
              alt="conWater"
              src="/images/conWater.png"
            />
            <img
              className="MC_moreCON_conGold"
              alt="conGold"
              src="/images/conGold.png"
            />
            <img
              className="MC_moreCON_conGround"
              alt="conGround"
              src="/images/conGround.png"
            />
          </div>
          <button className="CMCsubmitBtn" type="submit">
            체질 선택 완료
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditMyCON;
