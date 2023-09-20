import { useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from '~/contexts/TodoProvider';

const TodoForm = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const { handleAddTodo, scrollToWrapperEnd } = useContext(TodoContext);

  const onSubmitForm = async e => {
    e.preventDefault();
    if (inputValue !== '') {
      const newTodo = {
        _id: uuidv4(),
        title: inputValue,
        isCompleted: false,
        createAt: new Date().getTime(),
        updateAt: new Date().getTime(),
        isNewest: true
      };
      await handleAddTodo(newTodo);
      setInputValue('');
      scrollToWrapperEnd(); // Cuộn xuống cuối wrapper để thấy todo vừa thêm
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="px-16">
      <h2 className="text-2xl mb-1">Add to the todo list</h2>
      <form className="flex gap-1" onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          placeholder="Enter new todo"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="basis-3/4 py-4 px-4 text-black outline-none"
          autoFocus
        />
        <button type="submit" className="basis-1/4 bg-[#ff6666]">
          ADD ITEM
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
