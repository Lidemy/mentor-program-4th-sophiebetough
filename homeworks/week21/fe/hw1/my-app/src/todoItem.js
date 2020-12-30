import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_MD } from "./constants/breakpoint";

const TodoButtonWrapper = styled.div`
  display: none;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  padding: 8px 0px;
  height: 40px;
  word-break: break-word;
  width: 100%;
  border-bottom: 0.3px solid #808080;

  &:hover {
    ${TodoButtonWrapper} {
      display: inline-block;
      transition: all 0.5s ease;
    }
  }
`;

const TodoContent = styled.div`
  color: grey;
  font-size: 1.3rem;
  word-break: break-word;

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const Button = styled.button`
  margin-right: 6px;
  cursor: pointer;
  font-size: 1.3rem;
  height: 2.4rem;
  border: none;
  border-radius: 5px;
  color: grey;
  background-color: #ffcccc;
  outline: none;
  padding: 0.2rem 0.8rem;

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    transform: translate(0, 0.2rem);
  }

  ${MEDIA_QUERY_MD} {
    font-size: 1rem;
  }
`;

const DeleteTodoButton = styled(Button)`
  background-color: #ff8c99;
  color: #f5f5f5;
`;

export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <DeleteTodoButton onClick={handleDeleteClick}>刪除</DeleteTodoButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
