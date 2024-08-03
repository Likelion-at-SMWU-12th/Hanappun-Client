import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Column.css";

const ColumnMoreKM1 = () => {
  const navigate = useNavigate();
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Column">
      <header className="ColumnHeader">
        <h4>한의학 초심자를 위한 가이드북</h4>
        <h2>
          지금까지의 한의학 <br />
        </h2>
        <p>2024년 6월 18일 명순헌 원장</p>
      </header>
      <main className="ColumnMain">
        <img alt="" src="/images/nowdays.png" />
        <div className="ColumnContent">
          <p className="ColumnQ">Q. 지금까지의 한의학에 대해서 알고 싶어요</p>
          <p>
            A. 우리나라에서 한의학의 기원은{" "}
            <span className="ColumnBold">단순 신화의 쑥과 마늘</span>에서도 찾을
            수 있어요. 이를 통해 볼 때{" "}
            <span className="ColumnPurple">
              한민족 고유의 본초(本草)에 대한 독자적인 전통
            </span>
            이 있었음을 알 수 있죠.
          </p>
          <p>
            <span className="ColumnBold">삼국시대</span>에는 에는
            한토의학(韓土醫學)과 불교의학의 전통 속에서 한의학의 이론적 기틀이
            형성되었어요. <br />
            <br />
            <span className="ColumnBold">고구려 평원왕(561년)</span>때 중국
            의학서가 유입되었으며, <span className="ColumnBold">백제시대</span>
            에는 의ㆍ약이 최초로 분화되었고, 독자적인 백제 의학을 형성하여
            「백제신집방(百濟新集方)라는 우리 민족 최초의 의서(醫書)가
            편집되었다고 해요.
          </p>
          <p>
            <span className="ColumnBold">통일신라 시대</span>에는 수ㆍ당 의학과
            인도 의술의 영향을 받으면서 독자적으로 발전했다는 것을
            「신라법사방(新羅法師方)」을 통해 알 수 있답니다.
          </p>
          <p>
            <span className="ColumnBold">고려 초기</span>에는 당나라의 의학적
            기초 위에 아라비아인을 통하여 서구와 남방의 의약품과 다양한 의학
            지식이 유입되었다. <span className="ColumnBold">고려 중기</span>
            송(宋)나라 의학이 유입되었으며, 후기로 갈수록 자주의학(自主醫學)으로
            정립되었어요.
          </p>
          <p>
            <span className="ColumnBold">조선 태종 시대</span>에는 최초의
            의녀(醫女) 제도가 창시되었고,{" "}
            <span className="ColumnBold">세종 시대</span>에는
            「향약집성방(鄕藥集成方)」과 「의방유취(醫方類聚)」가 편집되었어요.{" "}
            <span className="ColumnBold">조선 중기</span>에는{" "}
            <span className="ColumnPurple">
              허준의 「동의보감(東醫寶鑑)」이 편찬되어 동양의학의 커다 란
              업적으로 평가
            </span>{" "}
            받고 있죠. 또 허임의 침구법과 사암도인의 새로운
            침구보사법(鍼灸補瀉法)이 창시되었어요.{" "}
            <span className="ColumnBold">19세기</span>에는 실증적인 학문이
            생겨났는데, 특히{" "}
            <span className="ColumnPurple">
              이제마의 「동의수세보원(東醫壽世保元)」은 사상의학(四象醫學)의
              창시
            </span>
            로서 우리나라 한의학의 새로운 지평을 열었어요.
          </p>
          <p>
            그러나, <span className="ColumnBold">일제강점기</span>의 한의학은
            일제의 강한 정치적 규제를 받아 침체기를 맞았어요. 해방과 동시에
            분단된 상태에서 남한의 차별적 의료정책 속에서도 1947년 동양의학관이
            세워졌으며, 1952년 한의사 제도의 부활, 1955년 동양의학대학이
            설립되며 한의학은 맥을 이어왔답니다.
          </p>
          <p>이 모든 것이 지금까지의 한의학이에요!</p>
        </div>
        <div className="ColumnWriter">
          <img alt="작성자(한의원장)사진" src="/images/columnWriter.png" />
          <p>
            <span className="ColumnBold">명순헌 숙명 한의원 명신실 원장</span>
            <br />
            '나의 체질에 대해 알고 싶으신가요?'
          </p>
          <button onClick={() => navigate("/map/4")}>
            숙명 한의원 바로가기
          </button>{" "}
          {/*숙명한의원 링크*/}
        </div>
        <div className="KMColumnMore">
          <h3>다른 칼럼도 있어요</h3>
          <button onClick={() => navigate("/column/moreKM4")}>
            <span className="Column11pt">지금까지의 한의학</span>
            <br />
            명순헌 원장
          </button>
          <button onClick={() => navigate("/column/moreKM2")}>
            <span className="Column11pt">방금 먹은 점심이 중요한 이유</span>
            <br />
            김수련 원장
          </button>
          <button onClick={() => navigate("/column/moreKM3")}>
            <span className="Column11pt">
              보양식이라고 모두 힘이 나진 않아요
            </span>
            <br />
            송진리 원장
          </button>
        </div>
      </main>
    </div>
  );
};

export default ColumnMoreKM1;
