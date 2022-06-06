// import React, { useState, useEffect } from 'react';
import React from 'react';
import 'components/Application.scss';
import Appointment from 'components/Appointment';
import DayList from 'components/DayList';
// import axios from 'axios';
import {
 getAppointmentsForDay,
 getInterview,
 getInterviewersForDay,
} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';



export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

 // const dailyAppointments = [];
 const dailyAppointments = getAppointmentsForDay(state, state.day);
 const interviewersArr = getInterviewersForDay(state, state.day);

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
        cancelInterview={cancelInterview}
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
