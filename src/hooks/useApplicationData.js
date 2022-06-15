import { useState, useEffect } from 'react';
import axios from 'axios';
import {getDay} from 'helpers/selectors'

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
    let spots = 0;
    //FIND day object(it has spots inside) within state.days that match the day we are booking
    const dayObj = state.days.find(d => d.name === state.day);
    //Loop through the object's appointments 
    for (const item of dayObj.appointments) {
      //use the item as an index to loop through each appointments for the day eg.Monday
      const appointment = appointments[item] 
      //if no interview for that day then increase spots
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

 const setDay = (day) => setState((prev) => ({ ...prev, day }));
  
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let days = getDay(state, appointments, id, updateSpots);
    return axios
     .put(`http://localhost:8001/api/appointments/${id}`, { interview })
     .then(() => {

      setState({ ...state, appointments, days});
     });
  }
  
   function cancelInterview(id, interview) {
    const appointment = {
     ...state.appointments[id],
     interview: null,
    };

    const appointments = {
     ...state.appointments,
     [id]: appointment,
    };

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