import "components/Application.scss";
import useApplicationData from "../hooks/useApplicationData";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const {state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
};
