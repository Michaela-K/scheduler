import { useState, useEffect } from 'react';
import axios from 'axios';

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