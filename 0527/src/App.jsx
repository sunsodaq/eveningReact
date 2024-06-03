import { useEffect, useState } from 'react'
import './App.css'
import { RiCheckboxBlankFill, RiCheckboxFill, RiDeleteBin6Line } from "react-icons/ri"
import { TbPencilPlus } from "react-icons/tb"
import { v4 as uuid } from 'uuid'

const toDoListDefault = [
  {
    id: uuid(),
    text: "Testign 1",
    complete: false
  },
  {
    id: uuid(),
    text: "Testign 2",
    complete: false
  }
]

function App() {
  const [todoList, setTodoList] = useState(()=>{
    const storedList = localStorage.getItem("toDoList")
    return storedList ? JSON.parse(storedList) : []
  })
  const [popUP, setPopUP] = useState(false)
  const [newTaskText, setnewTaskText] = useState("강아지와 산책하기")

  useEffect(()=>{
    localStorage.setItem("toDoList", JSON.stringify(todoList))
  }, [todoList])
  function handlePopup(action) {
    if (action === "open") setPopUP(true)
    else setPopUP(false)
  }

  function addTask() {
    if (newTaskText !== "") {
      setTodoList(current => {
        return [
          ...current, {
            id: uuid(),
            complete: false,
            text: newTaskText
          }
        ]
      })
      setnewTaskText("")
      setPopUP(false)
    }
  }

  function toggleComplete(id) {
    setTodoList(current => {
      return current.map(item => {
        if (item.id === id) {
          return {
            ...item, complete: !item.complete
          }
        }
        return item
      })
    })
  }

  function deleteTask(id) {
    setTodoList(current => current.filter(item => item.id !== id))
  }

  return (
    <>
      {popUP && <div className="pop-up-container">
        <div className="pop-up">
          <p className="pop-up-title">
            당신의 작업을 추가하세요
          </p>
          <input
            type="text"
            className='pop-up-input'
            value={newTaskText}
            onChange={e => setnewTaskText(e.target.value)}
          />
          <div className="pop-up-button-container">
            <button className="pop-up-button back" onClick={() => handlePopup("close")}>뒤로가기</button>
            <button className="pop-up-button add" onClick={addTask}>작업 추가</button>
          </div>
        </div>
      </div>}
      <div className='header-container'>
        <div className='header'>
          <p className='header-title'>My Tasks</p>
          <div className='header-add-task' onClick={() => handlePopup("open")}>
            <p className='header-add-task-text'>
              <TbPencilPlus />
            </p>
          </div>
        </div>
      </div>
      <div className="to-do-list">
        {todoList.map(listItem => {
          return (
            <div key={listItem.id} className="to-do-container">
              <p className="to-do-checkbox" onClick={() => toggleComplete(listItem.id)}>
                {listItem.complete ? <RiCheckboxFill /> : <RiCheckboxBlankFill />}
              </p>
              <p className="to-do-text">{listItem.text}</p>
              <p className="to-do-delete" onClick={() => deleteTask(listItem.id)}>
                <RiDeleteBin6Line />
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
