import React, { useState } from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {(good - bad) / (good + bad + neutral)}</p>
      <p>positive {good / (good + bad + neutral) * 100} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good+1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral+1)} />
      <Button text='bad' onClick={() => setBad(bad+1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App
