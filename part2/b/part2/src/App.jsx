import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{id: 1, name: 'Arto Hellas',Number: '040-123456'}])
  const [newPerson, setNewPersons] = useState({id: 0, name: '', Number: ''})
  const [showpersons, setShowPersons] = useState(persons)
  const [filter, setFilter] = useState('')
  const addperson = (event) => {
    const checkName = (name) => {
      persons.forEach(person => {
        if(person.name === name){
          alert(`${name} is already added to phonebook`)
        }
      })
    }
    event.preventDefault()
    const personObject = {
      id : persons.length + 1,
      name: newPerson.name,
      Number: newPerson.Number
    }
    checkName(newPerson.name)
    setPersons(persons.concat(personObject))
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
        <input type="submit" value="add"/>
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