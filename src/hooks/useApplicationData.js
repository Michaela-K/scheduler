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
    // console.log("UAD state", state)
    // console.log("UAD Appointments", appointments)
    // console.log("UAD Id", id)
    let spots = 0;
    //FIND day object within state.days that match the day we are booking
    const dayObj = state.days.find(d => d.name === state.day);
    // console.log("UAD dayObj", dayObj)
    // console.log("UAD dayObj.appointments", dayObj.appointments)
    //Loop through the object's appointments 
    for (const item of dayObj.appointments) {
      // console.log("UAD All Appointments", appointments)//all the appointments
      //use the item as an index to loop through each appointments for the day eg.Monday
      const appointment = appointments[item] // specific appointment using item as index/id
      // console.log("appointments[item]", appointment) //each appointment object
      // console.log("spotsBefore", spots)
      //if no interview for that day then increase spots
      if (!appointment.interview) {
        spots++;
      }
      // console.log(dayObj.spots) //this wont change till its updated, when is it updated?
      // console.log("spotsAfter", spots)
    }
    return spots;
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