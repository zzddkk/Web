import { useState } from 'react';

const SetSelected = (l, setSelected) => {
  let num = Math.floor(Math.random() * l);
  setSelected(num);
}


const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const handleVote = (points,setPoints,selected) => {
  const copy = [...points];
  copy[selected] += 1;
  setPoints(copy);
}

const Maxvite = (points,anecdotes) => {
  let max = Math.max(...points);
  let index = points.indexOf(max);
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>Has {max} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  return (
    <>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>Has {points[selected]} votes</p>
        <Button onClick={() => SetSelected(anecdotes.length, setSelected)} text="Next Anecdote" />
        <Button onClick={() => handleVote(points,setPoints,selected)} text="Vote" />
      </div>
      <div>
        {Maxvite(points,anecdotes)}
      </div>
    </>
  );
}

export default App;