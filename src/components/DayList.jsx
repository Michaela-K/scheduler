import React from "react";
import DayListItem from "components/DayListItem";


//DayList renders a list of days, has a prop which declares which day is currently selected
export default function DayList(props) {
  // console.log(props)
  //{} - Creates a code block that expects an explicit return statement.
  // With () - implicit return takes place.
  const days = props.days;
  const listOfDays = days.map((day) =>{
    return (
      <DayListItem  key={day.id} name={day.name} spots={day.spots} selected={day.name === props.value} 
      setDay={props.onChange} />
    )
  }
  );


  return(
    <ul>
      {listOfDays}
    </ul>
  )
}