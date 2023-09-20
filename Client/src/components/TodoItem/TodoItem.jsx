import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faSquareCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import { TodoContext } from '~/contexts/TodoProvider';
import styles from './TodoItem.module.css';

const TodoItem = ({ data }) => {
  const { _id, title, isCompleted, isNewest } = data;
  const { handleUpdateTodo, handleRemoveTodo } = useContext(TodoContext);

  const onToggleCompleted = () => {
    const updatedTodo = { ...data, isCompleted: !isCompleted };
    handleUpdateTodo(_id, updatedTodo);
  };

  const handleDisableAnimation = () => {
    if (!isNewest) return;
    const updatedTodo = { ...data };
    delete updatedTodo.isNewest;
    handleUpdateTodo(_id, updatedTodo);
  };

  return (
    <div
      className={clsx(
        'flex justify-between items-center gap-4 min-h-[calc(20%-4px*4/5)] px-16 bg-white/10',
        { 'animate-slide-down': isNewest }
      )}
      // onAnimationEnd={handleDisableAnimation}
    >
      <div
        className={clsx(styles['ct-todo-title'], {
          [styles['ct-todo-title--completed']]: isCompleted
        })}
      >
        <h3 className="text-lg">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onToggleCompleted}>
          <FontAwesomeIcon icon={isCompleted ? faSquareCheck : faSquare} size="lg" />
        </button>
        <button>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button onClick={() => handleRemoveTodo(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default TodoItem;
