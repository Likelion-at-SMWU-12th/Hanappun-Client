import React from "react";
import { useNavigate } from "react-router-dom";
import "./ColumnMain.css";

const ColumnMain = () => {
  const navigate = useNavigate();

  return (
    <div className="CMContent">
      <header className="CMheader">
        <img
          alt=""
          onClick={() => navigate("/Column/moreKM1")}
          src="/images/columnBackground.png"
        />
        <h4>칼럼 읽기</h4>
        <h2>
          한의사가 알려주는 <br /> 8체질 Q&A
        </h2>
        <p>한의학 초심자를 위한 가이드북(1)</p>
      </header>
      <main className="CMmain">
        <div className="CM_moreKM">
          <h3>한의학에 대해 알아볼까요?</h3>
          <div className="row_moreKM">
            <figure
              className="one_moreKM"
              onClick={() => navigate("/column/moreKM1")}
            >
              <img
                alt="eight constitutions"
                src="/images/column_eightQnA.png"
              />
              <figcaption>한의사가 알려주는 8체질 Q&A</figcaption>
            </figure>
            {/*한의학 관련 정보 칼럼 추가*/}
            <figure
              className="one_moreKM"
              onClick={() => navigate("/column/moreKM2")}
            >
              <img alt="moreKM2" src="/images/Column_eightQnA.png" />
              <figcaption>2번째 한의학 정보</figcaption>
            </figure>
            {/*한의학 관련 칼럼 추가할 위치*/}
          </div>
        </div>
        <div className="CM_moreCON">
          <h3> 체질별 설명을 알고 싶다면?</h3>
          <div className="CM_moreCON_btn">
            <button
              className="CM_leftBtn"
              onClick={() => navigate("/colum/Hepatonia")}
            >
              목양
            </button>
            <button
              className="CM_rightBtn"
              onClick={() => navigate("/column/Cholecystonia")}
            >
              목음
            </button>
            <button
              className="CM_leftBtn"
              onClick={() => navigate("/column/Renotonia")}
            >
              수양
            </button>
            <button
              className="CM_rightBtn"
              onClick={() => navigate("/column/Vesicotonia")}
            >
              수음
            </button>
            <button
              className="CM_leftBtn"
              onClick={() => navigate("/column/Pulmotonia")}
            >
              금양
            </button>
            <button
              className="CM_rightBtn"
              onClick={() => navigate("/column/Colonotonia")}
            >
              금음
            </button>
            <button
              className="CM_leftBtn"
              onClick={() => navigate("/column/Pancreotonia")}
            >
              토양
            </button>
            <button
              className="CM_rightBtn"
              onClick={() => navigate("/column/Gastrotonia")}
            >
              토음
            </button>
          </div>
          <div className="CM_moreCON_images">
            <img
              className="CM_moreCON_conTree"
              id="CM_moreCON_tree"
              alt="conTree"
              src="/images/conTree.png"
            />
            <img
              className="CM_moreCON_conWater"
              alt="conWater"
              src="/images/conWater.png"
            />
            <img
              className="CM_moreCON_conGold"
              alt="conGold"
              src="/images/conGold.png"
            />
            <img
              className="CM_moreCON_conGround"
              alt="conGround"
              src="/images/conGround.png"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColumnMain;
