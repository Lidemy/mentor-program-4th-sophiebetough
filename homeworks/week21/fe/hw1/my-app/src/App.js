import React from "react";
import TodoItem from "./todoItem";
import useTodos from "./useTodos";
import {
  FilterButton,
  AddTodoButton,
  DeleteAllTodoButton,
  Title,
  TodoContainer,
  TodoInputWrapper,
  Input,
  FilterButtonWrapper,
} from "./style";

export default function App() {
  const {
    todos,
    handleButtonSubmit,
    handleToggleIsDone,
    handleDeleteTodo,
    showAllTodos,
    showCompletedTodos,
    showUncompletedTodos,
    clearAllTodos,
    filter,
    value,
    handleChange,
  } = useTodos();

  return (
    <>
      <Title>TODOS</Title>
      <TodoContainer>
        <TodoInputWrapper>
          <Input
            type="text"
            placeholder="What needs to be done？"
            value={value}
            onChange={handleChange}
          />
          <AddTodoButton onClick={handleButtonSubmit}>Add</AddTodoButton>
        </TodoInputWrapper>
        {todos
          .filter((todo) => {
            if (filter === "showAll") return todo;
            return filter === "done" ? todo.isDone : !todo.isDone;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleIsDone={handleToggleIsDone}
            />
          ))}
        <FilterButtonWrapper>
          <FilterButton onClick={showAllTodos}>全部</FilterButton>
          <FilterButton onClick={showCompletedTodos}>已完成</FilterButton>
          <FilterButton onClick={showUncompletedTodos}>未完成</FilterButton>
          <DeleteAllTodoButton onClick={clearAllTodos}>
            清空
          </DeleteAllTodoButton>
        </FilterButtonWrapper>
      </TodoContainer>
    </>
  );
}
