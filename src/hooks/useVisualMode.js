import { useState } from 'react';

function useVisualMode(initial) {  // take an initial argument to set the mode state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);//we will need to keep track of the history of the modes, so we can go backwards
  // console.log("history", history)
  
  function transition(newMode, replace = false){
    setMode(newMode)
    setHistory([...history, newMode])
    if (replace) {
      //remove last one from history array(SECOND)
      const newArray = history.slice(0, -1) //to make a new reference
      //add newMode to history(THIRD)
      newArray.push(newMode)
      //set history to replace the current mode
      setHistory(newArray)
    }
  }
  //our history array will always need to have a length that is greater than or equal to 1.
  function back() { 
    // console.log("history", history)
    if (history.length === 1) {
      setMode(...history)
    }
    
    if (history.length > 1) {
      //remove last one from history array
      const newArray = history.slice(0, -1)  //to make a new reference
      // console.log(`history slice: `, newArray)
      // console.log(`setting new mode with: `, newArray[newArray.length - 1])
      setMode(newArray[newArray.length - 1])
      setHistory(newArray)
      // console.log("history", history)
    }
  }
  //history is an array of past modes

  return { mode, transition, back }; //This lets our tests (and components) access the current value of the mode from the hook.
}

export default useVisualMode;