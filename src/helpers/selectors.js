
export function getAppointmentsForDay(state, day) {
  
  //... returns an array of appointments for that day
  const dayAppointmentsObj = state.days.find(dayObj => dayObj.name === day);

  if (state.days.length === 0 || !dayAppointmentsObj) {
    return [];
  }
  return dayAppointmentsObj.appointments.map(key => state.appointments[key]);
}

export  function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer]; 
  const student = interview.student;
  
  return {interviewer, student};
};
