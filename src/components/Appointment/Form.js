import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
 const [student, setStudent] = useState(props.student || '');
 const [interviewer, setInterviewer] = useState(props.interviewer || null);
//  const [interviewerId, setInterviewerId] = useState();

 const reset = () => {
  setStudent('');
  setInterviewer(null);
 };
 const cancel = () => {
  reset();
  props.onCancel();
 };

 const onChange = (interviewer) => {
  // console.log(id);
  setInterviewer(interviewer);
 };

 return (
  <main className="appointment__card appointment__card--create">
   <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
     <input
      className="appointment__create-input text--semi-bold"
      name="name"
      type="text"
      placeholder="Enter Student Name"
      onChange={(event) => setStudent(event.target.value)}
      value={student}
     />
    </form>
    <InterviewerList
     interviewers={props.interviewers}
     interviewer={interviewer}
     //  setInterviewer={setInterviewer}
     onChange={onChange}
     value={interviewer && interviewer.id} //evaluates to last truthy thing found
    />
   </section>
   <section className="appointment__card-right">
    <section className="appointment__actions">
     <Button danger onClick={cancel}>
      Cancel
     </Button>
     <Button confirm onClick={() => props.onSave(student, interviewer)}>
      Save
     </Button>
    </section>
   </section>
  </main>
 );
}
