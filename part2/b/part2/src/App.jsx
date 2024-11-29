import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{name : 'Arto Hellas'}])
  const [newName, setNewName] = useState('')


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
      name: newName
    }
    checkName(newName)
    setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }



  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addperson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <input type="submit" value="add"/>
        </div>
          
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
} 

export default App