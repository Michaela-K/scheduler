function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.appointments[`${interview.interviewer}`]
  const interviewObj ={
    "student": interview.student,
    "interviewer": interviewer
  }
  return interviewObj;
}

function getInterviewersForDay(state, day) {
  let selectedDay;
  let interviewers = [];
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
  //  console.log(state.days)
  for (const id in selectedDay.interviewers) {
    // console.log(selectedDay.interviewers)
    // console.log('id',selectedDay.interviewers[id])
    // console.log(state.interviewers[1])
   if (selectedDay.interviewers[id] === state.interviewers[`${selectedDay.interviewers[id]}`].id) {
    interviewers.push(state.interviewers[`${selectedDay.interviewers[id]}`]);
   }
  }
  return interviewers;
 }

export {getAppointmentsForDay, getInterview, getInterviewersForDay};
