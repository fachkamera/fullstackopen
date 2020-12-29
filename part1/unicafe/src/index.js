import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ title, clickHandler }) => {
  return <button onClick={clickHandler}>{title}</button>;
};

const Statistic = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total)
    return (
      <table>
        <tbody>
          <Statistic title="good" value={good} />
          <Statistic title="neutral" value={neutral} />
          <Statistic title="bad" value={bad} />
          <Statistic title="total" value={total} />
          <Statistic title="average" value={(good - bad) / total} />
          <Statistic title="positive" value={(good / total) * 100 + ' %'} />
        </tbody>
      </table>
    );
  return <p>No feedback given</p>;
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button title="good" clickHandler={() => setGood(good + 1)} />{' '}
      <Button title="neutral" clickHandler={() => setNeutral(neutral + 1)} />{' '}
      <Button title="bad" clickHandler={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
