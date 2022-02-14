import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const VoteCount = (props) => {
  return <div>has {props.count} votes</div>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients"
  ];

  const [selected, setSelected] = useState(0);
  const [vote, incrementVote] = useState(Array(anecdotes.length).fill(0));

  // console.log(vote);

  const votefor = () => {
    const copy = [...vote];
    copy[selected] += 1;
    incrementVote(copy);
  };

  const next = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  let mostVotes = 0;
  let index = 0;
  for (let i = 0; i < anecdotes.length; i++) {
    if (vote[i] > mostVotes) {
      index = i;
      mostVotes = vote[i];
    }
  }

  return (
    <div>
      <h1>Anectode of the Day</h1>
      <div className="fourlines">{anecdotes[selected]}</div>
      <VoteCount count={vote[selected]} />
      <Button text="Vote" onClick={votefor} />
      <Button text="Next Anectode" onClick={next} />
      <h2>Most Voted Anecdote</h2>
      <div> {anecdotes[index]} </div>
    </div>
  );
};

export default App;
