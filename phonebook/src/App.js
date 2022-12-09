import { useState, useEffect  } from 'react'
import { personService } from './services/persons'
import { Filter } from './Filter'
import { Persons } from './Persons'
import { PersonForm } from './PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]); 

  useEffect(() => {
    getListPersons();
  }, [])

  const getListPersons = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  const handleAddNewPerson = (person) => {
    const find = persons.find(p => p.name === person.name);
    if (find) {
      const status = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`);
      if (status) {
        personService.update(find.id, person).then(() => {
          getListPersons();
        });
      }
    } else {
      personService.create(person).then(response => {
        const persons_clone = [...persons];
        persons_clone.push(response.data);
        setPersons(persons_clone);
        alert(`${response.data.name} is already added to phonebook`)
      });
    }
  }

  const handleRemovePerson = (person) => {
    personService.delete(person.id).then(() => {
      getListPersons();
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm handleAddNewPerson={(p) => {handleAddNewPerson(p)}} persons={persons} />
      <h3>Numbers</h3>
      <Persons handleRemovePerson={handleRemovePerson} persons={persons} />
    </div>
  )
}

export default App