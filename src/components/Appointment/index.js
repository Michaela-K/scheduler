import React, { Fragment } from "react";
// import React from "react";
import './styles.scss'
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'


export default function Appointment(props) {
  
  const time = () => {
    let result = '';
    if (props.time) {
      result = `Appointment at ${props.time}`;
      result = props.time;
    }
    else {
      result = "No Appointments";
    }
    return result;
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={time()}/>
         {props.interview? <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          /> : <Empty/>}
      </article>
    </Fragment>
  );
}