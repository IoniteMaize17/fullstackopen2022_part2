const Person = (props) => {
    const handleClickDelete = () => {
        const status = window.confirm(`Delete ${props.person.name} ?`);
        if (status) {
            props.handleRemovePerson(props.person);
        }
    }

    return <p>{props.person.name} {props.person.number} <button onClick={handleClickDelete}>delete</button></p>
}

export const Persons = (props) => {
    return props.persons.map((person) => (
        <Person handleRemovePerson={props.handleRemovePerson} key={person.id} person={person} />
    ));
}