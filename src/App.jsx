import { useState } from 'react'
import ToDoList from './ToDoList'
import './App.css'
import Chat from './Chat'

function App() {
 

  return (  
    
    <div className="App">
       <h1>Tasks Guide</h1>
      <Chat />
    
      {/* <ToDoList/> */}
    </div>
  )
}

export default App
