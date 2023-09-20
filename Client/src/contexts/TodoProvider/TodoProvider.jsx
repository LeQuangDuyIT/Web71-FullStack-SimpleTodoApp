import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [isDoneAtEnd, setIsDoneAtEnd] = useState(false);
  const wrapperRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/todos');
      const data = await response.json();
      console.log(data);
      setTodoList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleAddTodo = async newTodo => {
    let newTodoList = [...todoList, newTodo];
    newTodoList = todoListSorter(newTodoList);
    setTodoList(newTodoList);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    };
    try {
      const response = await fetch('http://localhost:3001/api/v1/todos', requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Xử lý sau khi thêm todo thì cuộn xuống todo cuối cùng (vừa thêm)
  const scrollToWrapperEnd = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.scrollTo({
      top: wrapperRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    let newTodoList = todoList.map(todo => (todo._id === id ? updatedTodo : todo));
    newTodoList = todoListSorter(newTodoList);
    setTodoList(newTodoList);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    };
    try {
      const response = await fetch(`http://localhost:3001/api/v1/todos/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTodo = async id => {
    const newTodoList = todoList.filter(todo => todo._id !== id);
    setTodoList(newTodoList);

    try {
      const response = await fetch(`http://localhost:3001/api/v1/todos/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const todoListSorter = sorterList => {
    let newTodoList = [...sorterList];
    if (isDoneAtEnd) {
      newTodoList.sort((a, b) =>
        a.isCompleted && !b.isCompleted ? 1 : !a.isCompleted && b.isCompleted ? -1 : 0
      );
    } else {
      newTodoList.sort((a, b) => (a.createAt > b.createAt ? 1 : -1));
      console.log('sắp xếp bình thường');
    }
    return newTodoList;
  };

  const handleChangeSortMode = () => {
    setIsDoneAtEnd(pre => !pre);
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
