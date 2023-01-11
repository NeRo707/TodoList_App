import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import './styles.css'
import {Droppable} from 'react-beautiful-dnd';
import { useState } from 'react';



interface Props{
  activeTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const TodoList:React.FC<Props> = ({activeTodos, setTodos, completedTodos, setCompletedTodos}) => {

  const [word, setWord] = useState<string>("");

  const [word2, setWord2] = useState<string>("");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setWord(e.target.value.toLowerCase());
    //console.log(word);
  } 

  const handleChange2 = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setWord2(e.target.value.toLowerCase());
    //console.log(word2);
  } 


  return (
   <>
    <div className='search-container'>
      <input id='completed-search' placeholder='Search Active Tasks...' onChange={(e) => handleChange2(e)}/>
      <input id='completed-search2' placeholder='Search Completed Tasks...' onChange={(e) => handleChange(e)}/>
    </div>
    
    <div className="container">
        <Droppable droppableId="TodosList" >
          {
            (provided, snapshot) => (
              <div className={`todos ${snapshot.isDraggingOver ? "dragactive": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="todos__heading">
                  Active Tasks
                </span>
              
                {activeTodos.filter((item) => item.todo.toLowerCase().includes(word2)).map((todo, index)=>(
                  <SingleTodo 
                  index={index} 
                  todo={todo} 
                  todos={activeTodos} 
                  key={todo.id} 
                  setTodos={setTodos} 
                  />
                ))}

                {provided.placeholder}
              </div>
            )
          }
        </Droppable>

      <Droppable droppableId='todos remove'>
        {
          (provided, snapshot) => (
             <div className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">
          Completed Tasks
        </span>
        {completedTodos.filter((item) => item.todo.toLowerCase().includes(word)).map((todo, index)=>(
          <SingleTodo index={index} todo={todo} todos={completedTodos} key={todo.id} setTodos={setCompletedTodos} />
        ))}
        {provided.placeholder}
        </div>
          )
        }
         
      </Droppable>

      
    </div>
   </>
  )
}

export default TodoList