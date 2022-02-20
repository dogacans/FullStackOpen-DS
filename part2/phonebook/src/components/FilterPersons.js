const FilterPersons = (props) => {
    return (
        <div>
        Search names: <input onChange={props.searchNames}/>
      </div>
      )
}

export default FilterPersons