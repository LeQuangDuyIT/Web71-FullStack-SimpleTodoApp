import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [isDoneAtEnd, setIsDoneAtEnd] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleSort = () => {
      const newTodoList = todoListSorter(todoList);
      setTodoList(newTodoList);
      if (isDoneAtEnd) {
        scrollToWrapperEnd();
      }
    };
    handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDoneAtEnd]);

  const handleAddTodo = newTodo => {
    let newTodoList = [...todoList, newTodo];
    newTodoList = todoListSorter(newTodoList);
    setTodoList(newTodoList);
  };

  // Xử lý sau khi thêm todo thì cuộn xuống todo cuối cùng (vừa thêm)
  const scrollToWrapperEnd = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.scrollTo({
      top: wrapperRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    let newTodoList = todoList.map(todo => (todo._id === id ? updatedTodo : todo));
    newTodoList = todoListSorter(newTodoList);
    setTodoList(newTodoList);
  };

  const handleRemoveTodo = id => {
    const newTodoList = todoList.filter(todo => todo._id !== id);
    setTodoList(newTodoList);
  };

  const todoListSorter = sorterList => {
    const newTodoList = [...sorterList];
    if (isDoneAtEnd) {
      newTodoList.sort((a, b) =>
        a.isCompleted && !b.isCompleted ? 1 : !a.isCompleted && b.isCompleted ? -1 : 0
      );
    } else {
      newTodoList.sort((a, b) => (new Date(a.createAt) > new Date(b.createAt) ? 1 : -1));
    }
    return newTodoList;
  };

  const handleChangeSortMode = () => {
    setIsDoneAtEnd(!isDoneAtEnd);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        handleAddTodo,
        handleUpdateTodo,
        wrapperRef,
        scrollToWrapperEnd,
        handleRemoveTodo,
        isDoneAtEnd,
        handleChangeSortMode
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default TodoProvider;
