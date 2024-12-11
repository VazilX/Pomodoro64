import React from 'react';
import './TaskList.scss';
import { TaskCell } from '../TaskCell/TaskCell';
import { useAppSelector } from '../../hooks/redux';
import { AnimatePresence, motion } from 'motion/react';

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
      <AnimatePresence>
        {filteredTasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <li className="task-list__item">
              <TaskCell task={task} />
            </li>
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
};
