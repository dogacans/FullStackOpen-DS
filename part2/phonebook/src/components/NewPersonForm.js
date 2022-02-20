const NewPersonForm = (props) => {
    return (
    <form>
        <h4>Add a new person:</h4>
        <div>
          Name: <input value={props.newName} onChange={props.handleNameInputChange}/>
          
        </div>

        <div>
          Number: <input value={props.newNumber} onChange={props.handleNumberInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.submitNewPerson}>add</button>
        </div>

      </form>
      )
}

export default NewPersonForm