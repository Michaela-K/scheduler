import React, { Fragment } from 'react';
// import React from "react";
import './styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
 const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
 );

 const time = () => {
  let result = '';
  if (props.time) {
   result = `Appointment at ${props.time}`;
   result = props.time;
  } else {
   result = 'No Appointments';
  }
  return result;
 };

 return (
  <Fragment>
   <article className="appointment">
    <Header time={time()} />
    {/* {props.interview? <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          /> : <Empty/>} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
     <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
     />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave={props.onSave} onCancel={back}/>}
   </article>
  </Fragment>
 );
}
