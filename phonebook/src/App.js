import { useState } from 'react'
import { Filter } from './Filter'
import { Persons } from './Persons'
import { PersonForm } from './PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

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