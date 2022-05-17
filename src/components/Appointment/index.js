import React, { Fragment } from 'react';
// import React from "react";
import './styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

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

 function save(student, interviewer) {
  const interview = {
    student: student,
    interviewer: interviewer
  };
  // console.log("student",student)
  // console.log("interviewer", interviewer)
  transition(SAVING)
  props.bookInterview(props.id, interview)
  .then(() => {
    console.log("abc")
    transition(SHOW); 
  }) 
  .catch((err) => console.log("error", err)); 
}

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
    {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}
    {mode=== SAVING && <Status message = "Saving"/>}
   </article>
  </Fragment>
 );
}
