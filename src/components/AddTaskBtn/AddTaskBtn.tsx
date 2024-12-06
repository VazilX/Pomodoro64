import React from 'react';
import './AddTaskBtn.scss';

type Props = {
  onClick: () => void;
};

export const AddTaskBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="add-task-btn cell" onClick={onClick}>
      <div className="add-task-btn__cross"></div>
      <span className="add-task-btn__text">Add task</span>
    </button>
  );
};
