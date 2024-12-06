import React from 'react';
import './TaskFilter.scss';
import { FilterButton } from '../FilterButton/FilterButton';
import { FilterParam } from '../../types/FilterParam';
import { useAppDispatch } from '../../hooks/redux';
import { taskSlice } from '../../store/reducers/task';

export const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { switchTaskFilter } = taskSlice.actions;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterParam = e.target.value as FilterParam;

    dispatch(switchTaskFilter(newFilterParam));
  };

  return (
    <article className="task-filter">
      <FilterButton text="All" value="all" onChange={onChange} />
      <FilterButton
        text="Uncompleted"
        value="uncompleted"
        onChange={onChange}
      />
      <FilterButton text="Completed" value="completed" onChange={onChange} />
    </article>
  );
};
