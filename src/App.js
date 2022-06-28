import "./App.css";
import { useReducer, useState } from "react";
import TodoList from "./components/TodoList";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  COMPLETE_TODO: "complete-todo",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      if (action.payload.todoName === "") {
        return state;
      }
      return [...state, newTodo(action.payload.todoName)];
    case ACTIONS.COMPLETE_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    default:
      return state;
  }
}

function newTodo(todoName) {
  return { id: Date.now(), todoName: todoName, complete: false };
}

function App() {
  const [todoName, setTodoName] = useState("");
  const [state, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { todoName: todoName } });
    setTodoName("");
  };

  return (
    <div className="container">
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder="Your Todo"
          />
          <button type="submit">Add Todo</button>
        </form>
        {state.map((todo) => {
          return <TodoList dispatch={dispatch} todo={todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
