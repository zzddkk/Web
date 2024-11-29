import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{name : 'Arto Hellas',Number: '040-123456'}])
  const [newPerson, setNewPersons] = useState({name: '', Number: ''})


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
  



  return(
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <p key={person.name}>{person.name} {person.Number}</p>)}
      </div>
    </div>
  )
} 

export default App