import styled from "styled-components";
import { MEDIA_QUERY_MD } from "./constants/breakpoint";

export const Button = styled.button`
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

export const FilterButton = styled(Button)`
  &:focus {
    background: #f5bfc6;
  }
`;

export const AddTodoButton = styled(Button)`
  height: 3.2rem;
  padding: 0.2rem 1.5rem;

  ${MEDIA_QUERY_MD} {
    font-size: 1.2rem;
  }
`;

export const DeleteAllTodoButton = styled(Button)`
  background-color: #ff8c99;
  color: #f5f5f5;
`;

export const Title = styled.h1`
  color: #3b3b3b;
  font-size: 60px;
  letter-spacing: 2px;
  margin: 30px auto 20px auto;
`;

export const TodoContainer = styled.div`
  margin: 0 auto 100px auto;
  max-width: 650px;
  padding: 20px 30px;
  border-radius: 5px;
  background-color: rgba(241, 250, 250, 0.7);
  box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);

  ${MEDIA_QUERY_MD} {
    margin: 0 10px 100px 10px;
  }
`;

export const TodoInputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  outline: none;
  color: grey;
  font-size: 1.3rem;
  border: 0.5px grey dotted;
  border-radius: 5px;
  padding: 14px 14px;
`;

export const FilterButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;

  ${MEDIA_QUERY_MD} {
    justify-content: center;
  }
`;
