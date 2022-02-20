const SearchBar = (props) => {
    return(
        <div>
            Find Countries <input onChange={props.onChange}></input>
        </div>
    )
}


export default SearchBar