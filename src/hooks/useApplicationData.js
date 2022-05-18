import { useState, useEffect } from 'react';
import axios from 'axios';

//separating the rendering concern from the state management concern in our application.

function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
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


  const updateSpots = (state, appointments, id) => {
    console.log("UAD state", state)
    console.log("UAD Appointments", appointments)
    console.log("UAD Id", id)
    let spots = 0;
    //get day
    const dayObj = state.days.find(d => d.name === state.day);
    console.log("UAD dayObj", dayObj)
    //get id/index
    console.log("UAD dayObj.appointments", dayObj.appointments)
    for (const item of dayObj.appointments) {
      console.log("UAD All Appointments", appointments)//all the appointments
      const appointment = appointments[item] // specific appointment using item as index/id
      console.log("appointments[item]", appointment) //each appointment object
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...dayObj, spots } //creating a new obj - with dayObj created, and spots
    console.log("newDay", newDay)
    console.log("spots", spots)
    const newDays = state.days.map(d => d.name === state.day ? newDay : d)
    //if they both equal to Monday then newDays = newDay Object created
    console.log("newDays", newDays)
    return newDays;
  };

 const setDay = (day) => setState((prev) => ({ ...prev, day }));
  
  function bookInterview(id, interview) {
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
      days: updateSpots(state, appointments,id)
      // console.log(state);
     });
   }
  
   function cancelInterview(id, interview) {
    const appointment = {
     ...state.appointments[id],
     interview: null,
    };
    console.log("appointment - Del ", appointment)  //this show interview is null
    const appointments = {
     ...state.appointments,
     [id]: appointment,
    };
    console.log("AppointmentS - Del ", appointments) //also null in appointments
    return axios
     .delete(`http://localhost:8001/api/appointments/${id}`, { interview })
     .then(() => {
      console.log("axios test")
      setState({ ...state, appointments });
      days: updateSpots(state, appointments, id)
      console.log("Axios cancelInterview", state.appointments[`${id}`]);
     });
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview,
    }
   
}
export default useApplicationData;