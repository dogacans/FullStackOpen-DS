import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'


axios.get('/api/notes').then(response => {
  const notes = response.data
  ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
  )
})
.catch(error => console.log('CHECK INDEX.JS'))