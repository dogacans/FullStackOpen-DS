const Person = (props) => {

    return (
      <div person-id={props.personId} className="personInfo">
        {props.name} - {props.number} <button onClick={props.deleteFunc}>Delete</button>
      </div>
    )
  }

export default Person;