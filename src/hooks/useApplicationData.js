import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initialMode) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then(([days, appointments, interviewers]) => {
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .catch((err) => {}); //console.log("err:",err.message)
  }, []);
  const updateSpotsForDay = function (increment) {
    const newDayArr = [...state.days];
    for (let i = 0; i < newDayArr.length; i++) {
      if (newDayArr[i].name === state.day) {
        newDayArr[i].spots += increment;
      }
    }
    return newDayArr;
  };

  const bookInterview = function (id, interview) {
    const days = updateSpotsForDay(-1);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put("/api/appointments/" + id, { interview })
      .then(function (response) {
        setState({ ...state, appointments, days });
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };

  const cancelInterview = function (id) {
    return axios
      .delete("/api/appointments/" + id)
      .then(function (response) {
        const newAppointments = state.appointments;
        newAppointments[id].interview = null;
        const days = updateSpotsForDay(1);
        setState({ ...state, appointments: newAppointments, days });
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
