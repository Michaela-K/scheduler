import React, { Fragment } from 'react';
// import React from "react";
import './styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM ='CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    // console.log("abc")
    transition(SHOW); 
  }) 
  // .catch((err) => console.log("error", err)); 
  .catch(() => transition(ERROR_SAVE, true)) //When we transition from SAVING to ERROR_SAVE we replace the mode in the history rather than pushing it on to the end.
 }
 //We are creating functions for SAVING and ERROR_SAVE in the same scope. When we do this, they use the same transition function with the same history value.

 function deleteApp(id, interview){
  // transition(CONFIRM)
  transition(DELETE);
  props.cancelInterview(props.id, props.interview)
  .then(() => {
    console.log("123")
    transition(EMPTY)
  })
  // console.log("INDEX.JS INTERVIEW ",props.interview)
  .catch(() => transition(ERROR_DELETE, true)) 
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
      student={props.interview && props.interview.student}
      interviewer={props.interview && props.interview.interviewer}
      onDelete={()=> transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
     />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}
    {mode === SAVING && <Status message = "Saving"/>}
    {mode === DELETE && <Status message = 'Deleting'/>}
    {mode === CONFIRM && <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteApp}/>}
    {mode === EDIT && <Form student={props.interview.student} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
    {mode === ERROR_SAVE &&
        <Error
          onClose={back}
          message="Your request could not be completed"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          onClose={back}
          message="Your request could not be completed"
        />
      }
   </article>
  </Fragment>
 );
}
