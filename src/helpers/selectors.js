export function getAppointmentsForDay(state, day) {
 let selectedDay;
 let appointments = [];
 // console.log(state)
 if (state.days.length === 0) {
  return [];
 }
 //loop through the days looking for a match for day above
 for (const dayy of state.days) {
  if (dayy.name === day) {
   selectedDay = dayy;
  }
 }
 if (!selectedDay) {
  return [];
 }

 for (const id of selectedDay.appointments) {
  if (id === state.appointments[`${id}`].id) {
   appointments.push(state.appointments[`${id}`]);
  }
 }
 return appointments;
}
