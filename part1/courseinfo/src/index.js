import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ heading }) => {
  return (
    <header>
      <h1>{heading}</h1>
    </header>
  );
};

const Content = ({ name, exercises }) => {
  return (
    <h3>
      {name} {exercises}
    </h3>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header heading={course.name} />
      <main>
        <Content
          name={course.parts[0].name}
          exercises={course.parts[0].exercises}
        />
        <Content
          name={course.parts[1].name}
          exercises={course.parts[1].exercises}
        />
        <Content
          name={course.parts[2].name}
          exercises={course.parts[2].exercises}
        />
      </main>
      <Total
        total={course.parts
          .map((part) => part.exercises)
          .reduce((a, c) => a + c)}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
