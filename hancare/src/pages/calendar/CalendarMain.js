import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Container, Title } from "../hospital/HospitalHome";
import Calendar from "react-calendar";
import { format, isSameDay, set } from "date-fns";
import { ko } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";
import "./CalendarMain.css";
import CalendarModal from "../../components/CalendarModal";

const events = [
  {
    date: new Date(2024, 7, 1),
    event: "이벤트 1",
    image: "/images/grayspot.png",
  },
  {
    date: new Date(2024, 7, 26),
    event: "이벤트 1",
    image: "/images/grayspot.png",
  },
];
// 기록한 날 다 불러와서 저거 적용하기

const reservations = [
  {
    date: new Date(2024, 7, 1),
    event: "이벤트 1",
    image: "/images/purplespot.png",
  },
  {
    date: new Date(2024, 7, 16),
    event: "이벤트 1",
    image: "/images/purplespot.png",
  },
];

// 예약 날짜 불러와서 적용하기

const CalendarMain = () => {
  const navigate = useNavigate();

  const BackButton = () => {
    navigate(-1);
  };

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const renderEvents = (date) => {
    const event = events.find((event) => isSameDay(event.date, date));
    return event ? (
      <img src={event.image} alt={event.event} className="event-image" />
    ) : null;
  };

  const renderReservation = (date) => {
    const reservation = reservations.find((reservation) =>
      isSameDay(reservation.date, date)
    );
    return reservation ? (
      <img
        src={reservation.image}
        alt={reservation.event}
        className="reservation-image"
      />
    ) : null;
  };

  // 모달 창 관련
  const [modalopen, setModalopen] = useState(false);
  const openModal = () => {
    setModalopen(true);
  };
  const closeModal = () => setModalopen(false);

  const DateClick = (date) => {
    setSelectedDate(date);
    openModal();
  };

  const formatDate = (date) => {
    return format(date, "M월 d일 EEEE", { locale: ko });
  };

  return (
    <div>
      <Container>
        <Title>
          <img src="/images/back.png" alt="back" onClick={BackButton}></img>
          <h2>캘린더</h2>
        </Title>
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            locale="ko-KR"
            onClickDay={DateClick}
            tileContent={({ date, view }) =>
              view === "month" && (
                <>
                  {renderEvents(date)}
                  {renderReservation(date)}
                </>
              )
            }
            tileClassName={({ date, view }) => {
              if (view === "month") {
                if (isSameDay(date, new Date())) {
                  return "today";
                }
                if (isSameDay(date, date)) {
                  return "selected";
                }
              }
              return null;
            }}
          />
        </div>
        {modalopen && (
          <CalendarModal
            isOpen={setModalopen}
            closeModal={closeModal}
            selectedDate={selectedDate ? formatDate(selectedDate) : null}
          />
        )}
      </Container>
    </div>
  );
};

export default CalendarMain;
