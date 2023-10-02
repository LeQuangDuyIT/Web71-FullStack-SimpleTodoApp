import { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '~/contexts/TodoProvider';

const TodoForm = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const { handleAddTodo, handleUpdateTodo, editingTodo, handleClickEdit } = useContext(TodoContext);

  useEffect(() => {
    if (!editingTodo) {
      setInputValue('');
      return;
    }
    setInputValue(editingTodo.title);
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [editingTodo]);

  const onSubmitForm = e => {
    e.preventDefault();
    console.log(editingTodo);
    if (inputValue === '') return;

    if (!editingTodo) {
      handleSubmitAdd();
    } else {
      handleSubmitEdit();
    }
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmitAdd = async () => {
    const newTodo = {
      title: inputValue,
      isCompleted: false,
      createAt: new Date().getTime(),
      updateAt: new Date().getTime()
    };
    await handleAddTodo(newTodo);
  };

  const handleSubmitEdit = async () => {
    const id = editingTodo._id;
    const updatedTodo = { ...editingTodo, title: inputValue };
    console.log(id, updatedTodo);
    await handleUpdateTodo(id, updatedTodo);
    handleClickEdit(null);
  };

  return (
    <div className="px-16">
      <h2 className="text-2xl mb-1">
        {editingTodo ? 'Edit todo in todo list' : 'Add to the todo list'}
      </h2>
      <form className="flex gap-1" onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          placeholder="Enter new todo"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={() => handleClickEdit(null)}
          className="basis-3/4 py-4 px-4 text-black outline-none"
          autoFocus
        />
        <button
          type="submit"
          className="basis-1/4 bg-[#ff6666]"
          onMouseDown={e => e.preventDefault()}
        >
          {editingTodo ? 'EDIT' : 'ADD ITEM'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
