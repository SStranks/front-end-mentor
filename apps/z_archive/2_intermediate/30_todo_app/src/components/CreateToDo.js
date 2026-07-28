import PropTypes from 'prop-types';
import { useState } from 'react';

import '../styles/CreateToDo.scss';

const CreateToDo = (props) => {
  const { theme, newTaskHandler } = props;
  const [newTask, setNewTask] = useState('');

  const textInput = (event) => {
    setNewTask(event.target.value);
  };

  const addTaskHandler = (event) => {
    if (newTask === '' || event.key !== 'Enter') return;
    const idx = Math.floor(Math.random() * 10_000);
    newTaskHandler(idx, newTask);
    setNewTask('');
  };

  return (
    <div className={`card create-todo ${theme ? '' : 'dark-card'}`}>
      <input type="checkbox" onClick={addTaskHandler} />
      <input
        type="text"
        value={newTask}
        placeholder="Create a new todo.."
        onChange={textInput}
        onKeyDown={addTaskHandler}
      />
    </div>
  );
};

CreateToDo.propTypes = {
  newTaskHandler: PropTypes.func,
  theme: PropTypes.bool,
};

CreateToDo.defaultProps = {
  newTaskHandler: null,
  theme: true,
};

export default CreateToDo;
