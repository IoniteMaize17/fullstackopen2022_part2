import { Persons } from './Persons'
import { useState } from 'react'

export const Filter = (props) => {
    const [newFilter, setNewFilter] = useState('')
    
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    return (
        <div>
            <div>filter shown with: <input value={newFilter} onChange={handleFilterChange} /></div>
            <Persons persons={props.persons.filter((person) => person.name.toLowerCase() === newFilter.toLowerCase())} />
        </div>
    )
}