import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Title } from "../hospital/HospitalHome";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";
import "./CalendarMain.css";
import CalendarModal from "../../components/CalendarModal";

import { baseURL } from "../../api/baseURL";

const CalendarMain = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchEventsAndReservations = async () => {
      try {
        const month = format(date, "yyyy-MM");

        const response = await axios.get(
          `${baseURL}/calendars/event/month/${params.username}/${month}/`
        );
        const data = response.data.result;

        const fetchedEvents = data.filter((item) => item.is_condition_or_meal);
        const fetchedReservations = data.filter((item) => item.is_reservation);

        setEvents(
          fetchedEvents.map((event) => ({
            date: new Date(event.date),
            event: "이벤트",
            image: "/images/grayspot.png",
          }))
        );

        setReservations(
          fetchedReservations.map((reservation) => ({
            date: new Date(reservation.date),
            event: "예약",
            image: "/images/purplespot.png",
          }))
        );
      } catch (error) {
        alert("이벤트 및 예약을 가져오는 중 오류 발생:", error);
      }
    };

    fetchEventsAndReservations();
  }, [date]);

  const BackButton = () => {
    navigate(-1);
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

  const renderEvents = (date) => {
    const event = events.find((event) => isSameDay(event.date, date));
    return event ? (
      <img src={event.image} alt={event.event} className="event-image" />
    ) : null;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

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
                  {renderReservation(date)}
                  {renderEvents(date)}
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
        {modalOpen && (
          <CalendarModal
            isOpen={modalOpen}
            closeModal={closeModal}
            selectedDate={selectedDate ? formatDate(selectedDate) : null}
          />
        )}
      </Container>
    </div>
  );
};

export default CalendarMain;
