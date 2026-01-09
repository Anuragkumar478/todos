import { useState, useEffect } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished,setshowFinshed]=useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished=(e)=>{
setshowFinshed(!showfinished)
  }

  const handelEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handelDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handelChange = (e) => {
    setTodo(e.target.value)
  }

  const handelCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    saveToLS()
  }
  return (
    <>
      <Navbar />

      <div className=' mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'>
       <h1 className='font-bold text-center text-xl '> iTask-Manage your task  at one place</h1>
        <div className='addtodo my-5 flex flex-col gap-4'>
          <h2 className='text-lg font-bold'>Your todo</h2>
          <input onChange={handelChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 border border-violet-950' />
          <button onClick={handelAdd} disabled={todo.length<=3} className='bg-violet-950 hover:bg-violet-950 disabled:bg-violet-700 p-2 text-sm font-bold  py-1 text-white rounded-md '>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished}  type='checkbox' checked={showfinished}/> Show Finished
        <h2 className='text-xl font-bold'>your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> no todo display</div>}
          {todos.map(item => {


            return(showfinished || !item.isCompleted)&&<div key={item.id} className="todo flex md:w-1/2  my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handelCheckbox} type='checkbox' checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full' >
                <button onClick={(e) => { handelEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold  py-1 text-white rounded-md mg-6 mx-2'><FaEdit /></button>
                <button onClick={(e) => { handelDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold  py-1 text-white rounded-md mg-6 mx-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>

  )
}

export default App
