const Course = ({ course }) => {
    const parts = course['parts']
    let total = 0
    for (let i = 0; i < parts.length; i++) {
      total += parts[i]['exercises']
    }
    return (
      <div>
        <h2>{course.name}</h2>
        <div>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        </div>
        <p>total of {total} exercises</p>
      </div>
    )
}
export default Course