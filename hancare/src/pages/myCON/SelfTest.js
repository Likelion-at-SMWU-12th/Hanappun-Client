import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelfTest.css";

// 질문
const questions = [
  "땀을 많이 낸 뒤에는 몸이 가벼워지는 것을 느낀다",
  "혈압이 높은 편이다",
  "감정 기복이 심한 편이다",
  "불규칙적으로 변비나 설사를 할 때가 있다",
  "매운 것을 먹으면 속이 좋지 않다",
  "조급한 마음이 들 때가 있다",
  "항생제 사용에 부작용이 발생하기도 한다",
  "만성 위경련, 상하복부 소화불량 등이 있다",
  "두통과 소화불량이 잦다",
  "육류를 섭취하면 속이 좋지 않다",
  "땀이 많이 난 뒤에는 소화가 잘 안된다",
  "변비가 자주 있다",
  "차가운 음식을 먹으면 소화가 잘 되지 않는다",
  "식사량이 적은 편이다",
  "화가 많은 편이다",
  "충분한 숙면을 취하지 못했을 대 체력적 타격이 큰 편이다",
  "와인을 마셨을 대 잠을 잘 자지 못하거나 우울감이 든다",
  "강한 소화력을 가진 편이다",
  "알코올을 섭취했을 대 몸이 많이 좋지 않다",
  "일광욕 이후에는 피로감을 느낀다",
  "약성(약재의 성질)이 강한 식품의 효과를 크게 보지 못했다",
  "맵거나 따뜻한 음식을 먹으면 힘이 난다",
  "신중한 편이다",
  "폐나 대장이 약한 편이다",
  "건강이 좋지 않을 때 피부 질환이 잘 일어나는 편이다",
  "시원한 음식을 선호한다",
  "간이 약한 편이다",
  "육류보다는 해산물이 소화가 잘 된다",
  "인내심이 있는 편이다",
  "해산물, 푸른 채소를 먹었을 때 소화장애가 발생하는 편이다",
];

const SelfTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 15;

  // 라디오 버튼 선택을 처리하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 질문에 답변했는지 확인
    const allAnswered = Object.keys(answers).length === questions.length;
    if (!allAnswered) {
      alert("답하지 않은 질문이 있어요");
      return;
    }
    /* 백엔드로 데이터를 보내는 로직
    fetch('/api/self-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    */
    // 제출 후 /myCON 페이지로 이동
    navigate("/myCON/selfTestResult");
  };

  // 현재 페이지의 질문들을 렌더링하는 함수
  const renderQuestions = () => {
    // 시작 인덱스
    const startIndex = (currentPage - 1) * questionsPerPage;
    // 끝 인덱스
    const endIndex = startIndex + questionsPerPage;
    // 현재 페이지의 질문들을 슬라이스
    return questions.slice(startIndex, endIndex).map((question, index) => (
      // 각 질문 블록을 렌더링
      <div className="STquestions" key={startIndex + index}>
        <fieldset className="STfieldset">
          <legend className="STlegend">
            <span>Question {startIndex + index + 1}</span>
          </legend>
          <div className="STq">
            <span className="q">{question}</span>
          </div>
          <div className="STa">
            <img
              className="STdisagree"
              alt="disagree"
              src="/images/triangle.png"
            />
            <div className="radios">
              {[1, 2, 3, 4, 5, 6].map((value) => (
                // 각 라디오 버튼을 렌더링
                <label
                  key={value}
                  htmlFor={`${startIndex + index + 1}_${value}`}
                >
                  <input
                    name={`q${startIndex + index + 1}`}
                    aria-label={`${value}`}
                    id={`${startIndex + index + 1}_${value}`}
                    type="radio"
                    value={value}
                    onChange={handleChange}
                    // 답변이 존재하는 경우 해당 라디오 버튼을 체크
                    checked={
                      answers[`q${startIndex + index + 1}`] === `${value}`
                    }
                  />
                </label>
              ))}
            </div>
            <img className="STagree" alt="agree" src="/images/triangle.png" />
          </div>
        </fieldset>
      </div>
    ));
  };

  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    // 현재 페이지의 시작 인덱스와 끝 인덱스를 계산
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    // 현재 페이지의 답변을 확인
    const currentAnswers = questions
      .slice(startIndex, endIndex)
      .map((_, index) => answers[`q${startIndex + index + 1}`]);
    const allAnswered = currentAnswers.every((answer) => answer !== undefined);

    if (!allAnswered) {
      alert("답하지 않은 질문이 있어요");
      return;
    }

    if (currentPage * questionsPerPage < questions.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 진행 상황을 계산하는 함수
  const getProgress = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  return (
    <div className="background">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
        <div className="progressBack">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </header>
      <main className="STmain">
        <form onSubmit={handleSubmit}>
          {renderQuestions()}
          <div className="STbtns">
            {/*첫페이지에서 '다음' 버튼 */}
            {currentPage * questionsPerPage < questions.length && (
              <button className="STnextBtn" type="button" onClick={nextPage}>
                다음
              </button>
            )}
            {/*두번째 페이지에서 '이전' 버튼 + '결과 확인하기' 버튼*/}
            {currentPage > 1 && (
              <button className="STpreBtn" type="button" onClick={prevPage}>
                이전
              </button>
            )}
            {currentPage * questionsPerPage >= questions.length && (
              <button className="STresultBtn" type="submit">
                결과 확인하기
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default SelfTest;