import React from "react";

import 'components/DayListItem.scss';
import classNames from "classnames";

//responsible for displaying the name and remaining spots for a single day
export default function DayListItem(props) {
  // console.log(props.name);
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    // console.log("PROPS.SPOTS", spots);
    if (spots === 0){
      return 'no spots remaining'
    }else if (spots === 1){
      return "1 spot remaining"
    }else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} data-testid="day" onClick={()=>props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}