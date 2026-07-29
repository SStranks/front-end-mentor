import PropTypes from 'prop-types';

const ListItem = (props) => {
  const { theme, listItem, completeTask, deleteTask, dragTask, dragEnter, itemNum, dragging } = props;

  return (
    <li
      className={`card list__item ${theme ? '' : 'dark-card'} ${dragging ? 'task-drag' : ''}`}
      key={listItem.id}
      data-complete={listItem.complete ? listItem.id : ''}
      draggable
      onDragStart={(e) => {
        dragTask(e, itemNum);
      }}
      onDragEnter={(e) => {
        dragEnter(e, itemNum);
      }}>
      <input
        type="checkbox"
        onChange={() => completeTask(listItem)}
        defaultChecked={listItem.complete}
        id={listItem.id}
      />
      <label className={listItem.complete ? 'task-complete' : ''} htmlFor={listItem.id}>
        {listItem.task}
      </label>
      <button className="btn-delete" type="button" aria-label="delete task" onClick={() => deleteTask(listItem)} />
    </li>
  );
};

export default ListItem;

ListItem.propTypes = {
  completeTask: PropTypes.func,
  deleteTask: PropTypes.func,
  dragEnter: PropTypes.func,
  dragging: PropTypes.bool,
  dragTask: PropTypes.func,
  itemNum: PropTypes.number,
  listItem: PropTypes.shape({
    id: PropTypes.number,
    complete: PropTypes.bool,
    task: PropTypes.string,
  }),
  theme: PropTypes.bool,
};

ListItem.defaultProps = {
  completeTask: null,
  deleteTask: null,
  dragEnter: null,
  dragging: null,
  dragTask: null,
  itemNum: null,
  listItem: null,
  theme: null,
};
