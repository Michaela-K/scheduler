import { useState } from 'react';

function useVisualMode(initial) {  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false){
    setMode(newMode)
    setHistory([...history, newMode])
    if (replace) {
     
      const newArray = history.slice(0, -1) 
      newArray.push(newMode)
      setHistory(newArray)
    }
  }
 
  function back() { 

    if (history.length === 1) {
      setMode(...history)
    }
    
    if (history.length > 1) {
      
      const newArray = history.slice(0, -1) 

      setMode(newArray[newArray.length - 1])
      setHistory(newArray)
     
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;