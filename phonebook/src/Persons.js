const Person = (props) => {
    return <p>{props.person.name} {props.person.number}</p>
}

export const Persons = (props) => {
    return props.persons.map((person) => (
        <Person key={person.name} person={person} />
    ));
}