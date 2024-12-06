import React, { useEffect, useState } from 'react';
import './TaskTracker.scss';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskList } from '../TaskList/TaskList';
import { AddTaskBtn } from '../AddTaskBtn/AddTaskBtn';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';
import { appLocalStorage } from '../../utils/appLocalStorage';
import { KEY } from '../../utils/variables';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { taskSlice } from '../../store/reducers/task';

export const TaskTracker: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useAppDispatch();
  const { setTaskList } = taskSlice.actions;
  const { taskList } = useAppSelector(s => s.task);

  useEffect(() => {
    dispatch(setTaskList(appLocalStorage.get(KEY, [])));
  }, []);

  const toggle = () => {
    setIsAdding(prev => !prev);
  };

  const createId = () => {
    const i = taskList.length - 1;

    if (i < 0) {
      return 0;
    }

    return taskList[i].id + 1;
  };

  const onSave = (newTitle: string, newDesc: string) => {
    const newTask = {
      title: newTitle,
      description: newDesc,
      isCompleted: false,
      id: createId(),
    };

    dispatch(setTaskList(newTask));

    appLocalStorage.set(KEY, [...taskList, newTask]);
  };

  return (
    <section className="task-tracker">
      <div className="task-tracker__container">
        <TaskFilter />
        <TaskList />
        {isAdding ? (
          <AddTaskForm onClose={toggle} onSave={onSave} />
        ) : (
          <AddTaskBtn onClick={toggle} />
        )}
      </div>
    </section>
  );
};
