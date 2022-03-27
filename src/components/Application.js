import React, { useState, useEffect } from "react";
import axios from 'axios';
//needed to install axios >npm install axios

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
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

  const appointmentsArr = dailyAppointments.map(item => { 
    const interview = getInterview(state, dailyAppointments.interview);
    return (
      <Appointment 
        key={item.id} 
        id={item.id}
        time={item.time}
        interview={interview}
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
