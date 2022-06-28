import React from "react";
import { ACTIONS } from "../App";

const TodoList = ({ todo, dispatch }) => {
  const styles = {
    textDecoration: todo.complete && "line-through",
  };

  return (
    <div className="todoList">
      <span style={styles}>{todo.todoName}</span>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: todo.id } })
        }
      >
        {todo.complete ? "Complete" : "Completed"}
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        Delete
      </button>
    </div>
  );
};

export default TodoList;
