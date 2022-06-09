import { useState, useEffect } from 'react';
import axios from 'axios';
import {getDay} from 'helpers/selectors'

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
    // console.log("update spots state", state)
    // console.log('updatespots id', id)
    // console.log("updatespots appointments", appointments)
    
    let spots = 0;
    //FIND day object(it has spots inside) within state.days that match the day we are booking
    const dayObj = state.days.find(d => d.name === state.day);
    //Loop through the object's appointments 
    for (const item of dayObj.appointments) {
      //use the item as an index to loop through each appointments for the day eg.Monday
      const appointment = appointments[item] // specific appointment using item as index/id
      //if no interview for that day then increase spots
      if (!appointment.interview) {
        spots++;
        // console.log("updatespots spots++", spots)
      }
    }
    return spots;
  };

 const setDay = (day) => setState((prev) => ({ ...prev, day }));
  
  function bookInterview(id, interview) {
    // console.log("bookInterview id", id);
    // console.log("interview", interview);

    const appointment = {
      ...state.appointments[id], //create a new appointment object starting with the values copied from the existing appointment
      interview: { ...interview },
    };
    // console.log("appointment", appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // console.log("appointments", appointments)
    // console.log("state.appointments[id]", state.appointments[id]);
    // console.log('state.days[id].spots', state.days[id].spots);

    let days = getDay(state, appointments, id, updateSpots);
    return axios
     .put(`http://localhost:8001/api/appointments/${id}`, { interview })
     .then(() => {
      //  console.log("axios put state", state)
      //  console.log('axios put id', id)
      //  console.log("axios put appointments", appointments)
      setState({ ...state, appointments, days});
     });
  }
  
   function cancelInterview(id, interview) {
    const appointment = {
     ...state.appointments[id],
     interview: null,
    };
    // console.log("appointment - Del ", appointment)  //this show interview is null
    const appointments = {
     ...state.appointments,
     [id]: appointment,
    };
    // console.log("AppointmentS - Del ", appointments) //also null in appointments

    let days = getDay(state, appointments, id, updateSpots);
    return axios
     .delete(`http://localhost:8001/api/appointments/${id}`, { interview })
     .then(() => {
      setState({ ...state, appointments, days});
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