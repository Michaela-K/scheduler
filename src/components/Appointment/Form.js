// import React, { useState } from 'react';
// import Button from '../Button';
// import InterviewerList from 'components/InterviewerList';
// import Appointment from '.';

// export default function Form(props) {
//  const [student, setStudent] = useState(props.student || '');
//  const [interviewer, setInterviewer] = useState(props.interviewer || null);
// //  const [interviewerId, setInterviewerId] = useState();

//  const reset = () => {
//   setStudent('');
//   setInterviewer(null);
//  };
//  const cancel = () => {
//   reset();
//   props.onCancel();
//  };

//  const onChange = (interviewer) => {
//   // console.log(id);
//   setInterviewer(interviewer);
//  };

//  return (
//   <main className="appointment__card appointment__card--create">
//    <section className="appointment__card-left">
//     <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
//      <input
//       className="appointment__create-input text--semi-bold"
//       name="name"
//       type="text"
//       placeholder="Enter Student Name"
//       onChange={(event) => setStudent(event.target.value)}
//       value={student}
//      />
//     </form>
//     <InterviewerList
//      interviewers={props.interviewers}
//     //  interviewer={interviewer}
//     //  setInterviewer={setInterviewer}
//      onChange={setInterviewer}
//      value={interviewer && interviewer.id} //evaluates to last truthy thing found
//     />
//    </section>
//    <section className="appointment__card-right">
//     <section className="appointment__actions">
//      <Button danger onClick={cancel}>
//       Cancel
//      </Button>
//      <Button confirm onClick={() => props.onSave(student, interviewer)}>
//       Save
//      </Button>
//     </section>
//    </section>
//   </main>
//  );
// }

import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = props => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const handleSubmit = e => {
    e.preventDefault();
    validate()
  };

  const validate = function() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            data-testid="student-name-input"
            onChange={event => {
              setStudent(event.target.value);
            }}
          />
          <section className="appointment_validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers.toString()}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={handleSubmit}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
