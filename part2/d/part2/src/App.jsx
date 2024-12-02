import { useState, useEffect } from "react"
import axios from 'axios'


const Person = ({person,deletePerson}) => {
  return(
      <li >{person.name} {person.Number}
      <button onClick={deletePerson}>delete</button></li>
  )
}


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
      name: newPerson.name,
      Number: newPerson.Number
    }
    checkName(newPerson.name)

    axios.post('http://localhost:3001/persons', personObject).then(response => {
      const data = response.data
      const newpersons = persons.concat(data)
      setPersons(newpersons)
      setShowPersons(newpersons)
    })
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewPersons({...newPerson, name: event.target.value})
    
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewPersons({...newPerson, Number: event.target.value})
  }
  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    //console.log(filterValue);
    setFilter(filterValue);
    const show = persons.filter(person => person.name.includes(filterValue));
    setShowPersons(show);
  }

  const deletePersonfn = (id) => {
    console.log("delete",id)
    if (window.confirm(`Are sure delete ${id}? the action is irreversible`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
      const newpersons = persons.filter(person => person.id !== id)
      setPersons(newpersons)
      setShowPersons(newpersons)
    }
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
          {showpersons.map(showperson => <Person key={showperson.id} person={showperson} deletePerson={() => deletePersonfn(showperson.id)}/>)}
        </ul>
      </div>
    </div>
  )
} 

export default App