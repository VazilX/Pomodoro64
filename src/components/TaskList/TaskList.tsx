import React from 'react';
import './TaskList.scss';
import { TaskCell } from '../TaskCell/TaskCell';
import { useAppSelector } from '../../hooks/redux';

export const TaskList: React.FC = () => {
  const { taskList, filterParam } = useAppSelector(s => s.task);

  const filteredTasks = taskList.filter(t => {
    switch (filterParam) {
      case 'completed':
        return t.isCompleted;

      case 'uncompleted':
        return !t.isCompleted;

      default:
        return true;
    }
  });

  return (
    <ul className="task-list">
      {filteredTasks.map(task => (
        <li className="task-list__item" key={task.id}>
          <TaskCell task={task} />
        </li>
      ))}
    </ul>
  );
};
