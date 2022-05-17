import React, { useState, useEffect } from 'react';
// import React from 'react';
import 'components/Application.scss';
import Appointment from 'components/Appointment';
import DayList from 'components/DayList';
import axios from 'axios';
import {
 getAppointmentsForDay,
 getInterview,
 getInterviewersForDay,
} from 'helpers/selectors';

// const days = [
//  {
//   id: 1,
//   name: 'Monday',
//   spots: 2,
//  },
//  {
//   id: 2,
//   name: 'Tuesday',
//   spots: 5,
//  },
//  {
//   id: 3,
//   name: 'Wednesday',
//   spots: 0,
//  },
// ];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
 //  const [dayList, setDayList] = useState('Monday');
 //  const [days, setDays] = useState([]);
 const [state, setState] = useState({
  day: 'Monday',
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {},
 });
 //prev is holding the current state valueof the application
 //...prev makes a copy and uses day to set
 const setDay = (day) => setState((prev) => ({ ...prev, day }));
 // const setDays = (days) => setState(prev => ({ ...prev, days }));

 // const dailyAppointments = [];
 const dailyAppointments = getAppointmentsForDay(state, state.day);
 const interviewersArr = getInterviewersForDay(state, state.day);

 function bookInterview(id, interview) {
  // console.log("appointment-Id: ", id)
  console.log("Interview Object: ", interview)

  const appointment = {
   ...state.appointments[id], //create a new appointment object starting with the values copied from the existing appointment
   interview: { ...interview },
  };
  const appointments = {
   ...state.appointments,
   [id]: appointment,
  };
  return axios
   .put(`http://localhost:8001/api/appointments/${id}`, { interview })
   .then(() => {
    setState({ ...state, appointments });
    console.log(state);
   });
 }

 useEffect(() => {
  //   const url = `http://localhost:8001/api/days`;
  //   axios  //Axios creates the response based on the data returned by the server.
  // .get(url)
  // .then(response => {
  // console.log("++++++++Response+++++",response.data)
  // setDays(response.data);
  Promise.all([
   axios.get(`http://localhost:8001/api/days`),
   axios.get(`http://localhost:8001/api/appointments`),
   axios.get(`http://localhost:8001/api/interviewers`),
  ])
   .then((all) => {
    // console.log(all[2].data)
    setState((prev) => ({
     ...prev,
     days: all[0].data,
     appointments: all[1].data,
     interviewers: all[2].data,
    }));
   })
   .catch((err) => console.log(err.message));
 }, []);

 //  console.log(dayList);
 return (
  <>
   <main className="layout">
    <section className="sidebar">
     {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
     <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
     />
     <hr className="sidebar__separator sidebar--centered" />
     <nav className="sidebar__menu">
      <DayList days={state.days} value={state.day} onChange={setDay} />
     </nav>
     <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
     />
    </section>
    <section className="schedule">
     {/* convert the appointments object to an array and map over the array to create a list of <Appointment> components. */}
     {dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      //  console.log(appointment)
      return (
       <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArr}
        bookInterview={bookInterview}
        // {...appointment}
       />
      );
     })}
     <Appointment key="last" time="5pm" />
    </section>
   </main>
  </>
 );
}
