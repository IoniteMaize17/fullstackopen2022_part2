import { useState, useEffect  } from 'react'
import { personService } from './services/persons'
import { Filter } from './Filter'
import { Persons } from './Persons'
import { PersonForm } from './PersonForm'
import { Notification } from './Notification'


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [notification_data, setNotificationData] = useState({messages: null, type: null}); 

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
          pushNotification(`Changed ${person.name}`);
          getListPersons();
        });
      }
    } else {
      personService.create(person).then(response => {
        const persons_clone = [...persons];
        persons_clone.push(response.data);
        setPersons(persons_clone);
        pushNotification(`Added ${response.data.name}`);
      });
    }
  }

  const handleRemovePerson = (person) => {
    personService.delete(person.id).then(() => {
      getListPersons();
    }).catch(() => {
      pushNotification(`Information of ${person.name} has already been removed form server`, 'e')
    })
  }

  const pushNotification = (messages, type) => {
    setNotificationData({
      messages: messages,
      type: type
    });
    setTimeout(() => {
      setNotificationData({
        messages: null,
        type: null
      })
    }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messages={notification_data.messages} type={notification_data.type} />
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm handleAddNewPerson={(p) => {handleAddNewPerson(p)}} persons={persons} />
      <h3>Numbers</h3>
      <Persons handleRemovePerson={handleRemovePerson} persons={persons} />
    </div>
  )
}

export default App