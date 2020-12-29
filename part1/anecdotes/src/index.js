import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = ({ anecdote, voteCount }) => {
  return (
    <>
      <figure>
        <blockquote style={{ margin: 0 }}>
          <p
            style={{
              fontSize: '1.9em',
              fontStyle: 'italic',
              margin: '.3rem 0',
            }}
          >
            “{anecdote}”
          </p>
        </blockquote>
        <figcaption>has {voteCount} votes</figcaption>
      </figure>
    </>
  );
};

const MostVoted = ({ anecdote, anecdotes }) => {
  if (anecdote.voteCount)
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <Anecdote
          anecdote={anecdotes[anecdote.index]}
          voteCount={anecdote.voteCount}
        />
      </>
    );
  return null;
};

const randomizer = (min, max, not = []) => {
  // third argument can be a Number or an Array of numbers
  const notArray = typeof not === 'number' ? [not] : not;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  // if too many numbers are excluded, ignore them to prevent an infinite loop
  return Math.abs(Math.abs(max) - Math.abs(min)) >= notArray.length
    ? notArray.every((n) => n !== random)
      ? random
      : randomizer(min, max, not)
    : random;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, updateVotes] = useState({
    ...anecdotes.map(() => ({ voteCount: 0 })),
  });

  const mostVotedAnecdote = Object.values(votes)
    .map((el, index) => ({ ...el, index: index }))
    .reduce((acc, curr) => (curr.voteCount > acc.voteCount ? curr : acc));

  const plus1 = () => {
    updateVotes({
      ...votes,
      [selected]: { voteCount: votes[selected].voteCount + 1 },
    });
  };
  const nextAnecdote = () =>
    // randomizer ensures through the third argument that the
    // same vote is not shown twice in a row
    setSelected(randomizer(0, anecdotes.length - 1, selected));
  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={props.anecdotes[selected]}
        voteCount={votes[selected].voteCount}
      />
      <button onClick={plus1}>vote</button>{' '}
      <button onClick={nextAnecdote}>next anecdote</button>
      <MostVoted anecdote={mostVotedAnecdote} anecdotes={anecdotes} />
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
