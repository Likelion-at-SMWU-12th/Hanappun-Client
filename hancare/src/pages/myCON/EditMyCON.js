import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChooseMyCON.css";

const EditMyCON = () => {
  const [selectedCon, setSelectedCon] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchConstitution = async () => {
      try {
        const response = await axios.get(
          `https://your-backend-api.com/constitution/${id}`
        );
        setSelectedCon(response.data.constitution);
      } catch (error) {
        console.error("Error fetching constitution data:", error);
        alert("체질 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchConstitution();
  }, [id]);

  const handleClick = (e) => {
    const { value } = e.target;
    setSelectedCon(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCon) {
      alert("체질이 선택되지 않았어요");
      return;
    }

    try {
      await axios.put(`https://your-backend-api.com/constitution/${id}`, {
        constitution: selectedCon,
      });
      alert("체질 정보가 수정되었습니다!");
      navigate("/myCON");
    } catch (error) {
      console.error("Error updating constitution data:", error);
      alert("체질 정보 수정에 실패했습니다.");
    }
  };

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
            나의 체질로 수정해주세요
          </p>
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
