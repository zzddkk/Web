import React, { useState } from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  const text = props.text
  const value = props.value
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={good + neutral + bad} />
      <StatisticsLine text='average' value={(good - bad) / (good + neutral + bad)} />
      <StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100 + ' %'} />
      </tbody>
    </table>
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
