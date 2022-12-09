import { useState, useEffect  } from 'react'
import axios from 'axios'
import { Filter } from './Filter'
import { Persons } from './Persons'
import { PersonForm } from './PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]); 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const handleAddNewPerson = (person) => {
    const persons_clone = [...persons];
    persons_clone.push(person);
    setPersons(persons_clone);
    alert(`${person.name} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm handleAddNewPerson={(p) => {handleAddNewPerson(p)}} persons={persons} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App