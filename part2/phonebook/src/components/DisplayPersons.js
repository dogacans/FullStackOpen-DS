import Person from "./Person"

const DisplayPersons = (props) => {
    const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(props.searchString))

    return (
        <div>
        {personsToShow.map(person =>
            <Person  key={person.name} personId={person.id} 
            name={person.name} number={person.number}
            deleteFunc={() => props.deleteFunc(person.id)} />)}
        </div>
    )
}

export default DisplayPersons