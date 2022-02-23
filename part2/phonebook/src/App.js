import { useEffect, useState } from 'react'
import NewPersonForm from "./components/NewPersonForm"
import FilterPersons from "./components/FilterPersons"
import DisplayPersons from "./components/DisplayPersons"
import personsService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorOrNotification, seterrorOrNotification] = useState()

  useEffect(() => {
    console.log("here comes the data!")
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')


  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const submitNewPerson = (event) => {
    event.preventDefault();
    console.log(event.target);

    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.find(obj => obj.name === newPersonObject.name))
    {
      const response = window.confirm(`${newName} is already in the phonebook. Do you want to change the number?`)
     
      if (response) {
      
        const person = persons.find(person => person.name === newPersonObject.name)
        
        personsService.update(person.id, newPersonObject)
        .then(response => console.log("Person updated!"))
        .catch(error => {
          seterrorOrNotification("error")
          setNotificationMessage(error.response.data.error)
        })

        

        const newPersons = persons.map(person => 
          // Must put id here, or it will give "bad id" error, since it will be undefined.
          person.name === newPersonObject.name ? {...newPersonObject, id: person.id} : person
        )
        console.log(newPersons)
        setPersons(newPersons)

        setTimeout(() => {
          setNotificationMessage(null)
    
        }, 10000)


      }
      
      else 
        return 
 
    }
    
    else {
      personsService.create(newPersonObject)
        .then(response =>{
        setPersons(persons.concat(newPersonObject))
       })
        .catch(error => {
          seterrorOrNotification("error")
          setNotificationMessage(error.response.data.error)
        })

    setNewName("")
    setNewNumber("")
    // seterrorOrNotification("notification")
    // setNotificationMessage(
    //   `Added ${newPersonObject.name}`
    // )
    setTimeout(() => {
      setNotificationMessage(null)

    }, 10000)
    }
  }

const searchNames = (event) => {
  setSearchString(event.target.value.toLowerCase())
  
}


const deletePerson = (id) => {
  const person = persons.find(person => person.id === id)

  const message = "Do you want to delete " + person.name + "?"
  if (window.confirm(message)) {
    console.log("delete prompt confirmed...")
  }
  else {
    console.log("Not deleting.")
    return
  }

  personsService.deleteResource(id)
    .then(console.log("Deleted!!!"))
    .catch(error => {
      seterrorOrNotification("error")
      setNotificationMessage(
        `The person ${person.name} was already deleted.`
      )
      setTimeout(() => {
        setNotificationMessage(null)

      }, 5000)
    })
  
  setPersons(persons.filter(person => person.id !== id))

}



return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} errorOrNotification={errorOrNotification}/>

      <NewPersonForm newName={newName} handleNameInputChange={handleNameInputChange}
      newNumber={newNumber} handleNumberInputChange={handleNumberInputChange}
      submitNewPerson={submitNewPerson} />

      <h3>Numbers</h3>
      
      <FilterPersons searchNames={searchNames}/>
      ----------------
      
      <DisplayPersons persons={persons} searchString={searchString} 
        deleteFunc={deletePerson}
        />
    </div>
  )
}
// key={person.id}
export default App
