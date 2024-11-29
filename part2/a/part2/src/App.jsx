
const Sum = (parts) => {
  parts = parts.parts
  console.log(parts)
  const res = parts.reduce((total,p) => {return total+p.exercises},0)
  console.log(res)
  return(
    <p>total of {res} exercises</p>
  )
}
const Course = ({ course }) => {
  const parts = course['parts'] 

  return (
    <>
      <h1>{course.name}</h1>
      <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
      <Sum parts={parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
