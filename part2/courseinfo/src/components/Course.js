const Header = ({ heading }) => {
  return (
    <header>
      <h1>{heading}</h1>
    </header>
  );
};

const Content = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  );
};

const Total = ({ total }) => {
  return <h3>total of {total} exercises</h3>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header heading={course.name} />
      <main>
        <ul>
          {course.parts.map((part) => {
            return (
              <Content
                key={part.id}
                name={part.name}
                exercises={part.exercises}
              />
            );
          })}
        </ul>
      </main>
      <Total
        total={course.parts
          .map((part) => part.exercises)
          .reduce((a, c) => a + c)}
      />
    </>
  );
};
export default Course;
