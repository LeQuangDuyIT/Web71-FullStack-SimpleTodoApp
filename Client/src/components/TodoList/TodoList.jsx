import { useContext } from 'react';
import { TodoContext } from '~/contexts/TodoProvider';
import TodoItem from '../TodoItem';

const TodoList = () => {
  const { todoList, wrapperRef, isDoneAtEnd, handleChangeSortMode } = useContext(TodoContext);

  return (
    <div className="flex flex-col justify-between flex-grow my-10 overflow-hidden">
      <div ref={wrapperRef} className="flex flex-col gap-1 h-full overflow-auto">
        {todoList.map(todo => (
          <TodoItem key={todo._id} data={todo} />
        ))}
      </div>
      <div className="flex justify-end items-end gap-3 px-16 mt-4">
        <span className="leading-4">Move done items at the end?</span>
        <input
          type="checkbox"
          checked={isDoneAtEnd}
          onChange={handleChangeSortMode}
          className="w-[18px] h-[18px]"
        />
      </div>
    </div>
  );
};

export default TodoList;
