import React from "react";
import "./Constitutions.css";

const Constitutions = ({ selectedId }) => {
  const dummy = [
    {
      id: "Hepatonia",
      korean: "목양체질",
      img: "/images/myCON_Hepatonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>간과 담이 강하고, 폐와 대장이 약한 체질</span>을 말해요. 간과 담의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!</span><br/> 더 자세한 원리는 칼럼을 통해 알려드릴게요",
      sobad: ["바다생선", "조개류", "갑각류", "청포도", "팥"],
      bad: ["복분자", "보리", "메밀", "오이", "모과"],
      soso: ["돼지고기", "시금치", "고추", "딸기", "미역"],
      good: ["민물생선", "오리고기", "닭고기", "토마토", "우유"],
      sogood: ["소고기", "밀가루", "고구마", "감자", "마늘"],
    },
    {
      id: "Cholecystonia",
      korean: "목음체질",
      img: "/images/myCON_Cholecystonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>간과 담이 강하고, 폐와 대장이 약한 체질</span>을 말해요. 간과 담의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!</span> <br/>더 자세한 원리는 칼럼을 통해 알려드릴게요",
      sobad: ["바다생선", "조개류", "청포도", "와인", " "],
      bad: ["복분자", "오이", "생강", "찹쌀", "꿀"],
      soso: ["닭고기", "토마토", "고구마", "현미", "보리"],
      good: ["옥수수", "백미", "가지", "치즈", "콩"],
      sogood: ["돼지고기", "소고기", "밀가루", "감자", "마늘"],
    },
    {
      id: "Pancreotonia",
      korean: "토양체질",
      img: "/images/myCON_Pancreotonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>췌장, 위장이 강하고, 신장과 방광이 약한 체질</span>을 말해요. 췌장과 위장의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장기관이 영향을 받기 때문에 식습관이 중요해요!</span> <br/>더 자세한 원리는 칼럼을 통해 알려드릴게요",
      sobad: ["도라지", "현미", "미역", "망고", "고추"],
      bad: ["참기름", "고구마", "토마토", "녹용", "밤"],
      soso: ["옥수수", "시금치", "감자", "사과", "김"],
      good: ["아보카도", "갑각류", "우유", "백미", "콩"],
      sogood: ["돼지고기", "소고기", "복어", " ", " "],
    },
    {
      id: "Gastrotonia",
      korean: "토음체질",
      img: "/images/myCON_Gastrotonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>췌장, 위장이 강하고, 신장과 방광이 약한 체질</span>을 말해요. 췌장과 위장의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장기관이 영향을 받기 때문에 식습관이 중요해요!</span> <br/>더 자세한 원리는 칼럼을 통해 알려드릴게요",
      sobad: ["오리고기", "도라지", "닭고기", "현미", "밤"],
      bad: ["토마토", "고구마", "도토리", "마늘", "마"],
      soso: ["소고기", "감자", "가지", "김", "콩"],
      good: ["견과류", "조개류", "치즈", "딸기", "팥"],
      sogood: ["돼지고기", "복어", " ", " ", " "],
    },
    {
      id: "Pulmotonia",
      korean: "금양체질",
      img: "/images/myCON_Pulmotonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>폐와 대장이 강하고, 간과 담이 약한 체질</span>을 말해요. 췌장과 위장의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!<br/>더 자세한 원리는 칼럼을 통해 알려드릴게요.",
      sobad: ["소고기", "닭고기", "밀가루", "유제품", "콩"],
      bad: ["돼지고기", "고구마", "치즈", "현미", "호박"],
      soso: ["토마토", "수박", "보리", "미역", "팥"],
      good: ["갑각류", "애호박", "두부", "오이", "굴"],
      sogood: ["바다생선", "조개류", "백미", "배추", "상추"],
    },
    {
      id: "Colonotonia",
      korean: "금음체질",
      img: "/images/myCON_Colonotonia.png",
      info: "일반적으로 내장기관에서 <span className='MCbold'>폐와 대장이 강하고, 간과 담이 약한 체질</span>을 말해요. 췌장과 위장의 기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!<br/>더 자세한 원리는 칼럼을 통해 알려드릴게요.",
      sobad: ["소고기", "바다생선", "조개류", " ", " "],
      bad: ["도라지", "고구마", "현미", "치즈", "호박"],
      soso: ["옥수수", "보리", "깻잎", "굴", "팥"],
      good: ["갑각류", "복어", "된장", "두부", "오이"],
      sogood: ["바다생선", ""],
    },
    {
      id: "Renotonia",
      korean: "수양체질",
      img: "/images/myCON_Renotonia.png",
      info: "일반적으로 내장기관에 <span className='MCbold'>신장과 방광이 강하고, 췌장과 위장이 약한 체질</span>을 말해요. 췌장과 위장의  기능을 더 과하게 만들어서는 안돼요. <span className='MCbold'>섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!</span> <br/>더 자세한 원리는 칼럼을 통해 알려드릴게요",
      sobad: ["돼지고기", "알로에", "복어", "보리", "팥"],
      bad: ["붉은살 생선", "조개류", "참외", "감", " "],
      soso: ["바다생선", "민물생선", "청국장", "유제품", "소고기"],
      good: ["희살생선", "고구마", "백미", "콩", "밤"],
      sogood: ["오리고기", "닭고기", "감자", "사과"],
    },
    {
      id: "Vesicotonia",
      korean: "수음체질",
      img: "/images/myCON_Vesicotonia.png",
      info: '일반적으로 내장기관에 <span className="MCbold">신장과 방광이 강하고, 췌장과 위장이 약한 체질</span>을 말해요. 췌장과 위장의  기능을 더 과하게 만들어서는 안돼요. <span className="MCbold">섭취하는 음식에 내장 기관이 영향을 받기 때문에 식습관이 중요해요!</span> <br/>더 자세한 원리는 칼럼을 통해 알려드릴게요',
      sobad: ["돼지고기", "갑각류", "청포도", "복어", "팥"],
      bad: ["바다생선", "흰살생선", "조개류", "메밀", "오이"],
      soso: ["시금치", "두유", "배추", "상추", "김"],
      good: ["민물생선", "버터", "백미", "콩", "밤"],
      sogood: ["닭고기", "소고기", "감자", "사과", "된장"],
    },
  ];

  // 전달받은 selectedId에 맞는 체질 정보 찾기
  const selectedCON = dummy.find((con) => con.id === selectedId);

  return (
    <div className="CONcontent">
      {selectedCON ? (
        <>
          <div className="CONinfo">
            <img
              className="CONinfo_img"
              src={selectedCON.img}
              alt={selectedCON.korean}
            />
            <div
              className="CONinfo_text"
              dangerouslySetInnerHTML={{ __html: selectedCON.info }}
            />
          </div>
          <div className="CON">
            <p className="">
              {selectedCON.korean}에게 적절한 <br /> 식습관에 대해 알려드릴게요
            </p>
            <div className="conMeal">
              <h3>{selectedCON.korean}</h3>
              <img alt="음식 나쁨-좋음 바" src="/images/conbar.png" />
              <div className="CONmeal_sobad">
                {selectedCON.sobad.map((food, index) => (
                  <p key={index}>{food}</p>
                ))}
              </div>
              <div className="CONmeal_bad">
                {selectedCON.bad.map((food, index) => (
                  <p key={index}>{food}</p>
                ))}
              </div>
              <div className="CONmeal_soso">
                {selectedCON.soso.map((food, index) => (
                  <p key={index}>{food}</p>
                ))}
              </div>
              <div className="CONmeal_good">
                {selectedCON.good.map((food, index) => (
                  <p key={index}>{food}</p>
                ))}
              </div>
              <div className="CONmeal_sogood">
                {selectedCON.sogood.map((food, index) => (
                  <p key={index}>{food}</p>
                ))}
              </div>
            </div>
            <p className="CONps">
              *해당 체질표는 일부를 발췌한 것으로, 더 자세한 것은 칼럼을 통해
              확인할 수 있어요
            </p>
          </div>
        </>
      ) : (
        <p>체질 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Constitutions;
