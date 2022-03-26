
export function getAppointmentsForDay(state, day) {
  
  //... returns an array of appointments for that day
  const dayAppointmentsObj = state.days.find(dayObj => dayObj.name === day);

  if (state.days.length === 0 || !dayAppointmentsObj) {
    return [];
  }
  return dayAppointmentsObj.appointments.map(key => state.appointments[key]);
}
