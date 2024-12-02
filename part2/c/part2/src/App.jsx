import { useState, useEffect } from "react"
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPersons] = useState({id: 0, name: '', Number: ''})
  const [showpersons, setShowPersons] = useState(persons)
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        // 希望重复渲染，这样才能显示所有的数据，setPersons是异步的，在下一次渲染时使用新的状态值所以必须在这里设置showpersons
        setShowPersons(response.data)
      })}, [])
  const [filter, setFilter] = useState('')
  const addperson = (event) => {
    event.preventDefault()
    const checkName = (name) => {
      persons.forEach(person => {
        if(person.name === name){
          alert(`${name} is already added to phonebook`)
        }
      })
    }
    const personObject = {
      id : persons.length + 1,
      name: newPerson.name,
      Number: newPerson.Number
    }
    checkName(newPerson.name)
    const newpersons = persons.concat(personObject)
    setPersons(newpersons)
    setShowPersons(newpersons)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewPersons({...newPerson, name: event.target.value})
    
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewPersons({...newPerson, Number: event.target.value})
  }
  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    console.log(filterValue);
    setFilter(filterValue);
    const show = persons.filter(person => person.name.includes(filterValue));
    setShowPersons(show);
  }



  return(
    <div>
      <h2>Phonebook</h2>
      <div>
        {/* the input must bind filter more details on the https://www.w3schools.com/tags/att_input_value.asp
        filter shown with <input value={"default"} onChange={handleFilterChange}/> the onChange on can handle one character */}
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addperson}>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange}/>
        </div>
        <div>
          Numbers: <input value={newPerson.Number} onChange={handleNumberChange}/>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {showpersons.map(showperson => <li key={showperson.id}> {showperson.name} {showperson.Number}</li>)}
        </ul>
      </div>
    </div>
  )
} 

export default App