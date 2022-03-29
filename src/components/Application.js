import React, { useState, useEffect } from "react";
import axios from 'axios';
//needed to install axios >npm install axios

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put("/api/appointments/" + id, { interview })
      .then(function (response) {
        setState({...state, appointments});
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };

  const cancelInterview = function (id) {
    return axios.delete("/api/appointments/" + id)
      .then(function (response) {
        const newAppointments = state.appointments;
        newAppointments[id].interview =  null;
        setState({...state, appointments: newAppointments });
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };
  const [state, setState] = useState({ 
      day: "Monday", 
      days: [], 
      appointments:{}, 
      interviewers:{} 
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
      .catch(err => {});    //console.log("err:",err.message)

  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentsArr = dailyAppointments.map(item => { 
    const interview = getInterview(state, item.interview);
    return (
      <Appointment 
        key={item.id} 
        id={item.id}
        time={item.time}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={interviewers}
        //{...item}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
         {appointmentsArr}
         <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
