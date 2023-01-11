import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result:DropResult) => { 
    const {source, destination} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
     active = todos, complete = completedTodos;
     
     if(source.droppableId === 'TodosList'){
      add=active[source.index];
      active.splice(source.index, 1);
     } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
     }


     if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
     } else {
      complete.splice(destination.index, 0, add);
     }
     

    if (destination.droppableId === 'CompletedTasksList') {
      add.isDone = true;
    }

    setTodos(active.filter(todo => !todo.isDone));
    setCompletedTodos(complete);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TodoList</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
           activeTodos={todos.filter(todo => !todo.isDone)} 
           completedTodos={completedTodos}
           setCompletedTodos={setCompletedTodos}
           setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
