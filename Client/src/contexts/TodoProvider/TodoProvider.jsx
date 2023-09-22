import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoAPI from '~/services/TodoAPI';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDoneAtEnd, setIsDoneAtEnd] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetchAllTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    if (isCreating) {
      scrollToWrapperEnd();
      setIsCreating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  const fetchAllTodos = async () => {
    try {
      setLoading(true);
      const todos = await TodoAPI.getAll();
      const todoData = [...todos.data.data];

      if (isCreating && todoData.length > 0) {
        const newestIndex = todoData.length - 1;
        todoData[newestIndex] = { ...todoData[newestIndex], isNewest: true };
      }

      const sortedList = todoListSorter(todoData);
      setTodoList(sortedList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async newTodo => {
    try {
      setLoading(true);
      await TodoAPI.create(newTodo);
      setReload(Math.random());
      if (!isDoneAtEnd) {
        setIsCreating(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    try {
      setLoading(true);
      await TodoAPI.update(id, updatedTodo);
      setReload(Math.random());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTodo = async id => {
    try {
      setLoading(true);
      await TodoAPI.deleteById(id);
      setReload(Math.random());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    }
    return newTodoList;
  };

  const handleChangeSortMode = () => {
    setIsDoneAtEnd(pre => !pre);
    setReload(Math.random());
  };

  const handleClickEdit = data => {
    setEditingTodo(data);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        handleAddTodo,
        handleUpdateTodo,
        wrapperRef,
        handleRemoveTodo,
        isDoneAtEnd,
        handleChangeSortMode,
        loading,
        editingTodo,
        handleClickEdit
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
