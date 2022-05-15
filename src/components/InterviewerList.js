import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {

  const interviewers = props.interviewers;
  // console.log(interviewers)
  
  const listOfNames = interviewers.map((person) =>   //To fix "selected"
    <InterviewerListItem key={person.id} name={person.name} avatar={person.avatar} 
    selected={person.id === props.value} setInterviewer={()=>props.onChange(person)}/>
  )
 return (
  <>
   <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {listOfNames}
    </ul>
   </section>
  </>
 );
}
