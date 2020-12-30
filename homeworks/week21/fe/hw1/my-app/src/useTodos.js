import { useState, useEffect, useRef } from "react";
import useInput from "./useInput";

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function useTodos() {
  const id = useRef(1);
  const [value, setValue, handleChange] = useInput();
  const [filter, setFilter] = useState("showAll");
  const [todos, setTodos] = useState(() => {
    let todoData = JSON.parse(window.localStorage.getItem("todos"));
    if (todoData && todoData[0] !== undefined) {
      id.current = todoData[0].id + 1;
      return todoData;
    }
    return [];
  });

  const newTodoItem = {
    id: id.current,
    content: value,
  };

  const handleButtonSubmit = (e) => {
    if (value !== "") {
      setTodos([newTodoItem, ...todos]);
      setValue("");
      id.current++;
    }
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const showAllTodos = () => setFilter("showAll");
  const showCompletedTodos = () => setFilter("done");
  const showUncompletedTodos = () => setFilter("undone");

  const clearAllTodos = () => {
    setTodos([]);
  };

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  return {
    todos,
    setTodos,
    id,
    handleButtonSubmit,
    handleToggleIsDone,
    handleDeleteTodo,
    showAllTodos,
    showCompletedTodos,
    showUncompletedTodos,
    clearAllTodos,
    filter,
    value,
    setValue,
    handleChange,
  };
}

export default useTodos;
