import { useState, useEffect } from 'react'

export default function useVisualMode(initialMode) {
  
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  const transition = function (newMode, replaceCurMode = false) {
    const historyArr = history;
    setMode(newMode);
    if (replaceCurMode) {
      historyArr[history.length - 1]= newMode;
    } else {
      historyArr.push(newMode);
    }
    setHistory(historyArr);
  }
  const back = function () {
    if (history.length > 1) {
      const historyArr = history;
      historyArr.pop();
      setMode(history[history.length - 1]);
      setHistory(historyArr)
    }
  }
  return { mode, transition, back };
}