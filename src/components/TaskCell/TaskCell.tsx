import React, { useState } from 'react';
import './TaskCell.scss';
import { Task } from '../../types/Task';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { taskSlice } from '../../store/reducers/task';
import { appLocalStorage } from '../../utils/appLocalStorage';
import { KEY } from '../../utils/variables';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';

type Props = {
  task: Task;
};

export const TaskCell: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { taskList } = useAppSelector(s => s.task);
  const { setTaskList } = taskSlice.actions;
  const [isEdit, setIsEdit] = useState(false);

  const { isCompleted, title, description, id } = task;

  const save = (value: Task[]) => {
    dispatch(setTaskList(value));
    appLocalStorage.set(KEY, value);
  };

  const onToggle = () => {
    const newTaskList = taskList.map(t => {
      if (t.id === id) {
        return { ...t, isCompleted: !t.isCompleted };
      }

      return t;
    });

    save(newTaskList);
  };

  const deleteTask = () => {
    const newTaskList = taskList.filter(t => t.id !== id);

    save(newTaskList);
  };

  const onEditTask = (newTitle: string, newDesc: string) => {
    setIsEdit(false);

    if (newTitle === title && newDesc === description) {
      return;
    }

    const newTaskList = taskList.map(t => {
      if (t.id === id) {
        return { ...t, title: newTitle, description: newDesc };
      }

      return t;
    });

    dispatch(setTaskList(newTaskList));

    appLocalStorage.set(KEY, newTaskList);
  };

  return (
    <>
      {isEdit ? (
        <AddTaskForm
          onClose={() => setIsEdit(false)}
          onSave={onEditTask}
          task={task}
        />
      ) : (
        <div
          className={classNames('task-cell', 'cell', {
            'task-cell--completed': isCompleted,
          })}
          onDoubleClick={() => setIsEdit(true)}
        >
          <label
            className={classNames('task-cell__check', {
              'task-cell__check--checked': isCompleted,
            })}
          >
            <input
              type="checkbox"
              name="check"
              className="task-cell__check-input"
              checked={isCompleted}
              onChange={onToggle}
            />
            is completed
          </label>

          <h2
            className={classNames('task-cell__title', {
              'task-cell__title--checked': isCompleted,
            })}
          >
            {title}
          </h2>
          {description && (
            <p
              className={classNames('task-cell__desc', {
                'task-cell__desc--checked': isCompleted,
              })}
            >
              {description}
            </p>
          )}

          <button className="task-cell__bin" onClick={deleteTask}></button>
        </div>
      )}
    </>
  );
};
