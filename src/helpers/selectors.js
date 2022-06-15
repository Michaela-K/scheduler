function getAppointmentsForDay(state, day) {
 let selectedDay;
 let appointments = [];
 if (state.days.length === 0) {
  return [];
 }

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
  const interviewer = state.interviewers[`${interview.interviewer}`]
  const interviewObj ={
    "student": interview.student,
    "interviewer": interviewer
  }
  return interviewObj;
}

function getInterviewersForDay(state, day) {
  let selectedDay;
  let interviewers = [];

  if (state.days.length === 0) {
   return [];
  }

  for (const dayy of state.days) {
   if (dayy.name === day) {
    selectedDay = dayy;
   }
  }
  if (!selectedDay) {
   return [];
  }
 
  for (const id in selectedDay.interviewers) {
  
   if (selectedDay.interviewers[id] === state.interviewers[`${selectedDay.interviewers[id]}`].id) {
    interviewers.push(state.interviewers[`${selectedDay.interviewers[id]}`]);
   }
  }
  return interviewers;
 }

 function getDay(state, appointments, id, updateSpots){
  let day;
  let realIndex;
    state.days.forEach(d => {
      if(d.name === state.day){
      realIndex = state.days.indexOf(d);
      day = {
        ...d,
        spots: updateSpots(state, appointments,id),
      }
    }
  });

  state.days.splice(realIndex,1,day);
    const days = [
    ...state.days,
  ];

  return days;
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay, getDay};
