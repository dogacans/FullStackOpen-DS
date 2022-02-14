import React, {useState} from 'react'

const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Content = (props) => {

  return (
    <div>
      <Part name = {props.parts[0].name} excount = {props.parts[0].exercises} />
      <Part name = {props.parts[1].name} excount = {props.parts[1].exercises} />
      <Part name = {props.parts[2].name} excount = {props.parts[2].exercises} />
    </div>
    )
}

const Part = (props) => {
  return <p>
    {props.name} {props.excount}
    </p>
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


const Display = (props) => {

  return (
    <label> {props.count} </label>
  )

}


const App = () => {

  /*
  const [counter, setCounter] = useState(0)

  const incrementer = () => {
    setCounter((prev) => prev + 1);
    console.log(counter + 1);
  }
  */

  const course =
  {
    name : 'Half Stack application development',
    parts : [
      {
        name : "Fundamentals of React",
        exercises : 10
      },
      {
        name : "Using props to pass data",
        exercises : 7
      },
      {
        name : "State of a component",
        exercises : 14
      }
    ]
  }

    return (
      <div>
        <Header course = {course.name}/> 
        
        <Content parts = {course.parts}/>

        <Total parts = {course.parts}/>

        
      </div>
    )
}
/*
        <button onClick={incrementer}>CLICK ME!</button>
        <Display count = {counter}/>
        */




export default App
