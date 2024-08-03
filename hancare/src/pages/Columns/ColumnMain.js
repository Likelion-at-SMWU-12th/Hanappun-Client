import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ColumnMain.css";

const ColumnMain = () => {
  const navigate = useNavigate();
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                src="/images/eight_consitutions.png"
              />
              <figcaption>한의사가 알려주는 8체질 Q&A</figcaption>
            </figure>
            <figure
              className="one_moreKM"
              onClick={() => navigate("/column/moreKM4")}
            >
              <img alt="moreKM4" src="/images/nowdays.png" />
              <figcaption>지금까지의 한의학</figcaption>
            </figure>
            <figure
              className="one_moreKM"
              onClick={() => navigate("/column/moreKM2")}
            >
              <img alt="moreKM2" src="/images/lunch.png" />
              <figcaption>방금 먹은 점심이 중요한 이유</figcaption>
            </figure>
            <figure
              className="one_moreKM"
              onClick={() => navigate("/column/moreKM3")}
            >
              <img alt="moreKM3" src="/images/healthFood.png" />
              <figcaption>보양식이라고 모두 힘이 나진 않아요</figcaption>
            </figure>
          </div>
        </div>
        <div className="CM_moreCON">
          <h3> 체질별 설명을 알고 싶다면?</h3>
          <div className="CM_moreCON_btn">
            <button
              className="CM_leftBtn"
              onClick={() => navigate("/column/Hepatonia")}
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
