export function getAppointmentsForDay(state, day) {
  const dayAppointmentsObj = state.days.find((dayObj) => dayObj.name === day);

  if (!dayAppointmentsObj) {
    return [];
  }
  return dayAppointmentsObj.appointments.map((key) => state.appointments[key]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  const student = interview.student;

  return { interviewer, student };
}

export function getInterviewersForDay(state, day) {
  const dayInterviewersObj = state.days.find((dayObj) => dayObj.name === day);

  if (!dayInterviewersObj) {
    return [];
  }
  return dayInterviewersObj.interviewers.map((key) => state.interviewers[key]);
}
